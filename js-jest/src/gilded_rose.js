class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  changeItemQuality(item, amount) {
    const maxQuality = 50;
    if (item.quality >= maxQuality && amount > 0) {
      return;
    }
    if (item.quality <= 0 && amount < 0) {
      return;
    }

    item.quality = item.quality + amount;
  }

  updateItemQuality(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 6) {
        this.changeItemQuality(item, 3);
      } else if (item.sellIn < 11) {
        this.changeItemQuality(item, 2);
      } else {
        this.changeItemQuality(item, 1)
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        this.changeItemQuality(item, -item.quality)
      }
    } else if (item.name === "Aged Brie") {
      item.sellIn = item.sellIn - 1;
      this.changeItemQuality(item, 1);
      if (item.sellIn < 0) {
        this.changeItemQuality(item, 1);
      }
    } else {
      this.changeItemQuality(item, -1);
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        this.updateItemQuality(item);
        return;
        // doesn't age & might increase in quality
      }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateItemQuality(item);
      } else if (item.name === "Aged Brie") {
        this.updateItemQuality(item);
      } else {
        item.sellIn = item.sellIn - 1;
        this.updateItemQuality(item);
        if (item.sellIn < 0) {
          this.changeItemQuality(item, -1);
        }
      }
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
