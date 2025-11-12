export default class OrderDTO {
    constructor(order_id, order_type, customer_name, customer_contact, items, total_amount, order_date) {
        this.order_id = order_id;
        this.order_type = order_type; // 'dine_in' or 'takeaway'
        this.customer_name = customer_name;
        this.customer_contact = customer_contact;
        this.items = items; // Array of items with quantity
        this.total_amount = total_amount;
        this.order_date = order_date;
        this.status = 'completed';
    }
}