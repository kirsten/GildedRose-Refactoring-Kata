class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  incrementItemQuality(item) {
    const maxQuality = 50;

    if (item.quality < maxQuality) {
      item.quality = item.quality + 1
    }
  }

  decrementItemQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  increaseQualityCloserToSellInDate(item) {
    if (item.sellIn < 11) {
      this.incrementItemQuality(item)
    }
    if (item.sellIn < 6) {
      this.incrementItemQuality(item)
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return;
        // doesn't age & might increase in quality
      }
      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.incrementItemQuality(item)
        this.increaseQualityCloserToSellInDate(item);
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
      } else if (item.name === 'Aged Brie') {
        this.incrementItemQuality(item);
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          this.incrementItemQuality(item)
        }
      } else {
        this.decrementItemQuality(item);
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
          this.decrementItemQuality(item);
        }
      }
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
