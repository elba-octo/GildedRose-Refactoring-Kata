export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    increaseQuality(index){
        if (this.items[index].quality < 50) {
            this.items[index].quality = this.items[index].quality + 1
        }
    }
    decreaseQuality(index){
        if (this.items[index].quality > 0) {
            this.items[index].quality = this.items[index].quality - 1
        }
    }
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if(this.items[i].name != 'Sulfuras, Hand of Ragnaros'){
 
                if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                    this.decreaseQuality(i)
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                            if (this.items[i].sellIn < 11) {
                                this.increaseQuality(i)
                            }
                            if (this.items[i].sellIn < 6) {
                                this.increaseQuality(i)
                            }
                        }
                    }
                }
                this.items[i].sellIn = this.items[i].sellIn - 1;
                if (this.items[i].sellIn < 0) {
                    if (this.items[i].name != 'Aged Brie') {
                        if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                            this.decreaseQuality(i)
                        } else {
                            this.items[i].quality = this.items[i].quality - this.items[i].quality
                        }
                    } else {
                        this.increaseQuality(i)
                    }
                }
            }
        }

        return this.items;
    }
}
