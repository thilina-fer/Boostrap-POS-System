export default class ItemDTO{
    constructor(item_id, item_name, category, price, description, item_image) {
        this._item_id = item_id;
        this._item_name = item_name;
        this._category = category;
        this._price = price;
        this._description = description;
        this._item_image = item_image;
    }

    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {
        this._item_name = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get item_image() {
        return this._item_image;
    }

    set item_image(value) {
        this._item_image = value;
    }

}