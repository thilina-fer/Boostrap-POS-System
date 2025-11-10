import { add_customer, delete_customer, get_customers, get_customer_detail, update_customer } from "../model/CustomerModel.js";

// ==================== 1. Load Customer Tbl =======================
//
// *** ME WENASA BALANNA: Function eka 'export' kara ***
// 
export const load_customer_tbl = () => {
    $("#customer_tbl_body").empty(); 
    let customer_list = get_customers(); 

    customer_list.map((obj, index) => {
        let tbl_row = `
            <tr data-index="${index}"> 
                <td>${obj.id}</td>
                <td>${obj.name}</td>
                <td>${obj.contact}</td>
                <td>${obj.nic}</td>
                <td>${obj.address}</td>
                <td>
                    <button
                        class="btn btn-sm btn-outline-primary btn-edit-customer"
                        data-bs-toggle="modal"
                        data-bs-target="#updateCustomerModal" title="Edit">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger btn-delete-customer" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>`;
        $("#customer_tbl_body").append(tbl_row); 
    });
}

// ==================== 2. Generate Customer ID =======================
const generate_customer_id = () => {
    let customers = get_customers();
    if (customers.length === 0) {
        return "C001";
    }
    let last_id = customers[customers.length - 1].id;
    let last_num = parseInt(last_id.substring(1));
    let new_num = last_num + 1;
    return "C" + String(new_num).padStart(3, "0");
}

// ==================== 3. Add Customer (Save Button Click) =======================
$(document).on("click", "#save_btn", function () {
    let id = generate_customer_id(); 
    let name = $("#customerName").val();
    let contact = $("#customerContact").val();
    let nic = $("#customerNIC").val();
    let address = $("#customerAddress").val();

    if (!name || !contact || !nic || !address) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill in all fields!' });
        return;
    }

    add_customer(id, name, contact, nic, address); 
    load_customer_tbl(); // Table eka refresh karanawa

    $("#addCustomerModal").modal('hide'); 
    $("#addCustomerModal form")[0].reset(); 

    Swal.fire({ icon: 'success', title: 'Success', text: 'Customer saved successfully!' });
});

// ==================== 4. Select Customer (Edit Button Click) =======================
let selected_customer_index = -1; 

$(document).on('click', '.btn-edit-customer', function () {
    selected_customer_index = parseInt($(this).closest('tr').attr('data-index'));
    let customer_obj = get_customer_detail(selected_customer_index);

    $("#updateCustomerName").val(customer_obj.name);
    $("#updateCustomerContact").val(customer_obj.contact);
    $("#updateCustomerNIC").val(customer_obj.nic);
    $("#updateCustomerAddress").val(customer_obj.address);
});

// ==================== 5. Update Customer (Update Modal Save Button) =======================
$(document).on('click', "#update_btn", function () {
    let name = $("#updateCustomerName").val();
    let contact = $("#updateCustomerContact").val();
    let nic = $("#updateCustomerNIC").val();
    let address = $("#updateCustomerAddress").val();

    if (selected_customer_index !== -1) { 
        update_customer(selected_customer_index, name, contact, nic, address);
        load_customer_tbl(); 
        
        $("#updateCustomerModal").modal('hide'); 
        Swal.fire({ icon: 'success', title: 'Success', text: 'Customer updated successfully!' });
        selected_customer_index = -1; 
    }
});

// ==================== 6. Delete Customer (Delete Button Click) =======================
$(document).on('click', '.btn-delete-customer', function () {
    let index_to_delete = parseInt($(this).closest('tr').attr('data-index'));

    Swal.fire({
        title: "Are you sure?",
        text: "Me data ain karoth aye ganna baha!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ow, Delete karanna!"
    }).then((result) => {
        if (result.isConfirmed) { 
            delete_customer(index_to_delete); 
            load_customer_tbl(); 
            Swal.fire({ title: "Deleted!", text: "Customer ain kara.", icon: "success" });
        }
    });
});

// ==================== Initial Load =======================
//
// *** ME LINE EKA ME THANIN DELETE KARALA THIYENNE ***
// load_customer_tbl();  <-- AIN KARA
//