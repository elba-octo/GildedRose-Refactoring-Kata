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

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_NAME= 'Backstage passes to a TAFKAL80ETC concert';
const AGED_BRIE_NAME = 'Aged Brie';
const BACKSTAGE_TEN_DAYS_LEFT = 10
const BACKSTAGE_FIVE_DAYS_LEFT = 5
export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    
    updateItem() {
        const itemsToUpdate = this.items.filter(item => item.name !== SULFURAS_NAME)

        for (let i = 0; i < itemsToUpdate.length; i++) {
            this.updateQuality(i);
            
            if (this.isBackstage(i)) {
                this.updateBackStageQuality(i);
            }
            this.decrementSellIn(i)

            if (this.itemHasExpired(i)) {
                this.updateQuality(i)
                if (this.items[i].name == BACKSTAGE_NAME) {
                    this.items[i].quality = MIN_QUALITY
                }
            }
        }

        return this.items;
    }

    private isBackstage(index: number) {
        return this.items[index].name == BACKSTAGE_NAME;
    }

    private updateQuality(index: number) {
        if (this.isRegularItem(index)) {
            this.decreaseQuality(index);
        } else {
            this.increaseQuality(index);
        }
    }

    private itemHasExpired(index: number) {
        return this.items[index].sellIn < 0;
    }

    private isRegularItem(index: number) {
        return this.items[index].name != AGED_BRIE_NAME && this.items[index].name != BACKSTAGE_NAME;
    }

    private updateBackStageQuality(index: number) {
        if (this.items[index].sellIn <= BACKSTAGE_TEN_DAYS_LEFT) {
            this.increaseQuality(index);
        }
        if (this.items[index].sellIn <= BACKSTAGE_FIVE_DAYS_LEFT) {
            this.increaseQuality(index);
        }
    }

    increaseQuality(index: number){
        if (this.items[index].quality < MAX_QUALITY) {
            this.items[index].quality++
        }
    }
    decreaseQuality(index: number){
        if (this.items[index].quality > MIN_QUALITY) {
            this.items[index].quality--
        }
    }
    decrementSellIn(index: number){
        this.items[index].sellIn--
    }
}
