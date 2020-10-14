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

  updateExpiredItem(amount) {
    if (this.sellIn < 0) {
      this.changeQuality(amount);
    }
  }

  changeItemQualityBySellinDate() {
    if (this.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (this.sellIn < 6) {
        this.changeQuality(3);
      } else if (this.sellIn < 11) {
        this.changeQuality(2);
      } else {
        this.changeQuality(1);
      }
    }
  }

  updateSellinDate(amount) {
    this.sellIn = this.sellIn - amount;
  }

  updateItemQuality() {
    if (this.name === "Sulfuras, Hand of Ragnaros") {
      this.changeItemQualityBySellinDate();
      this.updateSellinDate(0);
      this.changeQuality(0);
      this.updateExpiredItem(0);
    } else if (this.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.changeItemQualityBySellinDate();
      this.updateSellinDate(1);
      this.changeQuality(0);
      this.updateExpiredItem(-this.quality);
    } else if (this.name === "Aged Brie") {
      this.changeItemQualityBySellinDate();
      this.updateSellinDate(1);
      this.changeQuality(1);
      this.updateExpiredItem(1);
    } else {
      this.changeItemQualityBySellinDate();
      this.updateSellinDate(1);
      this.changeQuality(-1);
      this.updateExpiredItem(-1);
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateItemQuality();
    });
  }
}

module.exports = {
  Item,
  Shop,
};
