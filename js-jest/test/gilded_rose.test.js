const {Shop, Item} = require("../src/gilded_rose");

// Special items:
//
// 'Aged Brie'
// 'Sulfuras, Hand of Ragnaros'

const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";


describe("Gilded Rose", function() {
  it("has the correct name", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
  });

  describe("item quality", function() {
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

    describe("Backstage passes", function() {
      describe("when there are more than 10 days before the sell by date", function() {
        it("quality increases by 1 each day", function() {
          const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 11, 10)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(11);
        });
      });

      describe("when there are between 6 and 10 days before the sell by date", function() {
        it("quality increases by 2 each day", function() {
          const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 7, 10)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(12);
        });
      });

      describe("when there are 5 or fewer days before the sell by date", function() {
        it("quality increases by 3 each day", function() {
          const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 3, 10)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(13);
        });
      });

      describe("after the sell date", function() {
        it("quality drops to 0", function() {
          const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 0, 100)]);

          const items = gildedRose.updateQuality();

          expect(items[0].quality).toBe(0);
        });
      });
    });
  });
});
