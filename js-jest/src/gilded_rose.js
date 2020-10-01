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

  updateExpiredItem(item, amount) {
    if (item.sellIn < 0) {
      this.changeItemQuality(item, amount);
    }
  }

  changeItemQualityBySellinDate(item) {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 6) {
        this.changeItemQuality(item, 3);
      } else if (item.sellIn < 11) {
        this.changeItemQuality(item, 2);
      } else {
        this.changeItemQuality(item, 1);
      }
    }
  }

  updateItemQuality(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      this.changeItemQualityBySellinDate(item);
      item.sellIn = item.sellIn - 0;
      this.changeItemQuality(item, 0);
      this.updateExpiredItem(item, 0);
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.changeItemQualityBySellinDate(item);
      item.sellIn = item.sellIn - 1;
      this.changeItemQuality(item, 0);
      this.updateExpiredItem(item, -item.quality);
    } else if (item.name === "Aged Brie") {
      this.changeItemQualityBySellinDate(item);
      item.sellIn = item.sellIn - 1;
      this.changeItemQuality(item, 1);
      this.updateExpiredItem(item, 1);
    } else {
      this.changeItemQualityBySellinDate(item);
      item.sellIn = item.sellIn - 1;
      this.changeItemQuality(item, -1);
      this.updateExpiredItem(item, -1);
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItemQuality(item);
    });
  }
}

module.exports = {
  Item,
  Shop,
};
