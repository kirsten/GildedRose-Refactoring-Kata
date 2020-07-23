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

  updateQuality() {
    this.items.forEach(item => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        // doesn't age & might increase in quality
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.incrementItemQuality(item)
        if (item.sellIn < 11) {
          this.incrementItemQuality(item)
        }
        if (item.sellIn < 6) {
          this.incrementItemQuality(item)
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.name != 'Aged Brie') {
          this.decrementItemQuality(item);
        } else {
          this.incrementItemQuality(item)
        }
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
          if (item.name != 'Aged Brie') {
            this.decrementItemQuality(item);
          } else {
            this.incrementItemQuality(item)
          }
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
