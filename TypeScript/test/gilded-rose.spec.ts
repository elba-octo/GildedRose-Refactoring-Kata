import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('should decrease the quality by one ',  function() {
        // Given
        const gildedRose = new GildedRose([new Item('lala', 0, 1)]);

        // When
        const itemsUpdated = gildedRose.updateQuality();
        // Then
        expect(itemsUpdated[0].quality).to.equal(0);
    });

    it('should not have a negative quality ',  function() {
        // Given
        const gildedRose = new GildedRose([new Item('lala', 0, 0)]);

        // When
        const itemsUpdated = gildedRose.updateQuality();
        // Then
        expect(itemsUpdated[0].quality).to.equal(0);
    });

    it("should not update quality when the name is Sulfuras, Hand of Ragnaros ", function() {
        // Given
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 1)]);

        // When
        const itemsUpdated = gildedRose.updateQuality();
        // Then
        expect(itemsUpdated[0].quality).to.not.change;
    });

    it("should increase the quality by 1 when the name is Aged Brie ", function() {
        // Given
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 1)]);

        // When
        const itemsUpdated = gildedRose.updateQuality();
        // Then
        expect(itemsUpdated[0].quality).to.equal(2);
    });

});
