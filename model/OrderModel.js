import { order_db } from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";

// Create a new order
const create_order = (order_type, customer_id, customer_name, customer_contact, items, total_amount) => {
    const order_id = generate_order_id();
    const newOrder = new OrderDTO(order_id, order_type, customer_id, customer_name, customer_contact, items, total_amount, new Date());
    order_db.push(newOrder);
    console.log("Order created:", newOrder);
    return newOrder;
}

// Get all orders
const get_orders = () => {
    return order_db;
}

// Get order by ID
const get_order_by_id = (order_id) => {
    return order_db.find(order => order.order_id === order_id);
}

// Generate order ID
const generate_order_id = () => {
    if (order_db.length === 0) {
        return "ORD001";
    }
    const lastOrder = order_db[order_db.length - 1];
    const lastId = lastOrder.order_id;
    const lastNum = parseInt(lastId.substring(3));
    const newNum = lastNum + 1;
    return "ORD" + String(newNum).padStart(3, "0");
}

// Calculate order total
const calculate_order_total = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export {
    create_order,
    get_orders,
    get_order_by_id,
    generate_order_id,
    calculate_order_total
}