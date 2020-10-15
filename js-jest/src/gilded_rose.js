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

  changeQualityBySellinDate() {
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

  advanceAge() {
    this.changeQualityBySellinDate();
    this.updateSellinDate(1);
    this.changeQuality(-1);
    this.updateExpiredItem(-1);
  }
}

class AgedBrie extends Item {
  advanceAge() {
    this.changeQualityBySellinDate();
    this.updateSellinDate(1);
    this.changeQuality(1);
    this.updateExpiredItem(1);
  }
}

class BackstagePasses extends Item {
  advanceAge() {
    this.changeQualityBySellinDate();
    this.updateSellinDate(1);
    this.changeQuality(0);
    this.updateExpiredItem(-this.quality);
  }
}

class Sulfuras extends Item {
  advanceAge() {
    this.changeQualityBySellinDate();
    this.updateSellinDate(0);
    this.changeQuality(0);
    this.updateExpiredItem(0);
  }
}

const itemFactory = (item) => {
  switch (item.name) {
    case "Sulfuras, Hand of Ragnaros":
      return new Sulfuras(item.name, item.sellIn, item.quality);
    case "Backstage passes to a TAFKAL80ETC concert":
      return new BackstagePasses(item.name, item.sellIn, item.quality);
    case "Aged Brie":
      return new AgedBrie(item.name, item.sellIn, item.quality);
    default:
      return item;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map(item => itemFactory(item));
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.advanceAge();
    });
  }
}

module.exports = {
  Item,
  Shop,
};
