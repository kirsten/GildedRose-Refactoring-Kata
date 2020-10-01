class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  changeQuality(amount) {
    const maxQuality = 50;
    if (this.quality >= maxQuality && amount > 0) {
      return;
    }
    if (this.quality <= 0 && amount < 0) {
      return;
    }

    this.quality = this.quality + amount;
  }

  updateExpiredItem(item, amount) {
    if (item.sellIn < 0) {
      this.changeQuality(amount);
    }
  }

  changeItemQualityBySellinDate(item) {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 6) {
        this.changeQuality(3);
      } else if (item.sellIn < 11) {
        this.changeQuality(2);
      } else {
        this.changeQuality(1);
      }
    }
  }

  updateSellinDate(item, amount) {
    item.sellIn = item.sellIn - amount;
  }

  updateItemQuality(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      this.changeItemQualityBySellinDate(item);
      this.updateSellinDate(item, 0);
      this.changeQuality(0);
      this.updateExpiredItem(item, 0);
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.changeItemQualityBySellinDate(item);
      this.updateSellinDate(item, 1);
      this.changeQuality(0);
      this.updateExpiredItem(item, -item.quality);
    } else if (item.name === "Aged Brie") {
      this.changeItemQualityBySellinDate(item);
      this.updateSellinDate(item, 1);
      this.changeQuality(1);
      this.updateExpiredItem(item, 1);
    } else {
      this.changeItemQualityBySellinDate(item);
      this.updateSellinDate(item, 1);
      this.changeQuality(-1);
      this.updateExpiredItem(item, -1);
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateItemQuality(item);
    });
  }
}

module.exports = {
  Item,
  Shop,
};
