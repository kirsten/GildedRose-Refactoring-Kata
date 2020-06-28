const {Shop, Item} = require("../src/gilded_rose");

// Special items:
//
// 'Aged Brie'
// 'Backstage passes to a TAFKAL80ETC concert'
// 'Sulfuras, Hand of Ragnaros'

describe("Gilded Rose", function() {
  it("has the correct name", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
  });

  describe("updateQuality", function() {
    describe("standard items", function() {
      describe("when the sell by date has not yet passed", function() {
        it("quality degrades by 1 every day", function() {
          const gildedRose = new Shop([new Item("+5 Dexterity Vest", 9, 19)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(18);
        });

        it("quality does not become negative", function() {
          const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 1)]);

          gildedRose.updateQuality();
          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(0);
        });
      });

      describe("on the sell by date", function() {
        it("quality degrades twice as fast", function() {
          const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 19)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(18);
        });
      });

      describe("when the sell by date has passed", function() {
        it("quality degrades twice as fast", function() {
          const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 19)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(17);
        });
      });
    });

    describe("Aged Brie", function() {
      describe("when the sell by date has not yet passed", function() {
        it("quality *increases* by 1 each day", function() {
          const gildedRose = new Shop([new Item("Aged Brie", 9, 1)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(2);
        });
      });

      describe("when the sell by date has passed", function() {
        it("quality increases twice as fast", function() {
          const gildedRose = new Shop([new Item("Aged Brie", 0, 2)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(4);
        });
      });

      it("quality cannot exceed 50", function() {
        const gildedRose = new Shop([new Item("Aged Brie", 9, 50)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(50);
      });
    });

    describe("Sulfuras", function() {
      it("never has to be sold", function() {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(2);
      });

      it("does not decrease *or* increase in quality over time", function() {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(80);
      });
    });

  });
});
