import {item_db} from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

const add_item = (item_id, item_name, category, price, description, item_image) => {
    console.log("Adding item with image:", item_image);
    let newItem = new ItemDTO(item_id, item_name, category, price, description, item_image);
    item_db.push(newItem);
    console.log("Current items in database:", item_db);
    return newItem;
}

const remove_item = (index) => {
    if(index >= 0 && index < item_db.length) {
        return item_db.splice(index, 1);
    }
    return null;
}

const get_items = () => {
    return item_db;
}

const get_item_detail = (index) => {
    if(index >= 0 && index < item_db.length) {
        return item_db[index];
    }
    return null;
}

const update_item = (index, item_name, category, price, description, item_image) => {
    if (index >= 0 && index < item_db.length) {
        let item_obj = item_db[index];
        item_obj.item_name = item_name;
        item_obj.category = category;
        item_obj.price = price;
        item_obj.description = description;
        item_obj.item_image = item_image;
        console.log("Updated item image to:", item_image);
        return item_obj;
    }
    return null;
}

// New method to get items by category
const get_items_by_category = (category) => {
    return item_db.filter(item => item.category === category);
}

// New method to get next available ID
const get_next_item_id = () => {
    if (item_db.length === 0) {
        return "I001";
    }
    const lastItem = item_db[item_db.length - 1];
    const lastId = lastItem.item_id;
    const lastNum = parseInt(lastId.substring(1));
    const newNum = lastNum + 1;
    return "I" + String(newNum).padStart(3, "0");
}

export {
    add_item,
    remove_item,
    get_items,
    get_item_detail,
    update_item,
    get_items_by_category,
    get_next_item_id
}