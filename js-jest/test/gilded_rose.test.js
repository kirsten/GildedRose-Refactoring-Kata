const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("has the correct name", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
  });
});
