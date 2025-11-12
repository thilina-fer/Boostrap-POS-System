// DB eken saha DTO eken data import karaganna
// *** IMPORT WALATA ".js" KIYANA EKA ANIWARYAI ***
import {customer_db} from "../db/DB.js";
import CustomerDTO from "../dto/CustomerDTO.js";

// 1. Add Customer
export const add_customer = (id, name, contact, nic, address) => {
    let new_customer = new CustomerDTO(id, name, contact, nic, address);
    customer_db.push(new_customer);
}

// 2. Delete Customer
// *** ME FUNCTION EKA HARIYATAMA MEHEMA THIYENNA ONE ***
export const delete_customer = (index) => {
    // 'splice' kiyanne array eken e index eke thiyena eka ain karanna
    customer_db.splice(index, 1);
}

// 3. Get All Customers
export const get_customers = () => {
    return customer_db;
}

// 4. Get One Customer
export const get_customer_detail = (index) => {
    return customer_db[index];
}

// 5. Update Customer
export const update_customer = (index, name, contact, nic, address) => {
    if (index >= 0 && index < customer_db.length) {
        let customer_obj = customer_db[index];
        customer_obj.name = name;
        customer_obj.contact = contact;
        customer_obj.nic = nic;
        customer_obj.address = address;
    }
}