import {expect} from 'chai';
import {Item, GildedRose} from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function () {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateItem();
        expect(items[0].name).to.equal('foo');
    });

    it('should decrease the quality by one ', function () {
        // Given
        const gildedRose = new GildedRose([new Item('lala', 0, 1)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(0);
    });

    it('should not have a negative quality ', function () {
        // Given
        const gildedRose = new GildedRose([new Item('lala', 0, 0)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(0);
    });

    it("should not update quality when the name is Sulfuras, Hand of Ragnaros ", function () {
        // Given
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 1)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.not.change;
    });

    it("should increase the quality by 1 when the name is Aged Brie ", function () {
        // Given
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 1)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(2);
    });

    it("should not increase the quality when the quality is 50 or more", function () {
        // Given
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(50);
    });

    it("should increase the quality by 2 when the name is Backstage passes to a TAFKAL80ETC concert and the sell in date is below 11 ", function () {
        // Given
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(3);
    })

    it("should increase the quality by 3 when the name is Backstage passes to a TAFKAL80ETC concert and the sell in date is below 6 ", function () {
        // Given
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(4);
    })

    it('should limit the quality to 50 when the name is Backstage passes to a TAFKAL80ETC concert', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(50);
    });

    it('should drop the quality to 0 after sell in date is passed when the name is Backstage passes to a TAFKAL80ETC concert', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 48)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(0);
    });

    it('should decrease sell in by 1 if not Sulfuras, Hand of Ragnaros', function () {
        // Given
        const gildedRose = new GildedRose([new Item('lala', 5, 10)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].sellIn).to.equal(4);
    });

    it('should not change sell in value if name is Sulfuras, Hand of Ragnaros', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].sellIn).to.equal(5);
    });

    it('should not change quality value if name is Sulfuras, Hand of Ragnaros', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(80);
    });

    it('should decrease quality by 2 when the sell in date is below 0', function () {
        // Given
        const gildedRose = new GildedRose([new Item('lala', -1, 10)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(8);
    });

    it('should limit the quality to 50', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Aged Brie', -1, 48)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(50);
    });

    it('should limit the quality to 50 when the name is Aged Brie when sell in is negative', function () {
        // Given
        const gildedRose = new GildedRose([new Item('Aged Brie', -1, 50)]);

        // When
        const itemsUpdated = gildedRose.updateItem();
        // Then
        expect(itemsUpdated[0].quality).to.equal(50);
    });
});
