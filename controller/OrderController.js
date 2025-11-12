import { create_order, calculate_order_total } from "../model/OrderModel.js";
import { get_items, get_items_by_category } from "../model/ItemModel.js";
import { get_customers } from "../model/CustomerModel.js";

// Current order state
let currentOrder = {
    items: [],
    orderType: 'dine_in',
    customerId: '',
    customerName: '',
    customerContact: '',
    subtotal: 0,
    total: 0
};

// ==================== 1. Load Items for Order Section =======================
export const load_order_items = () => {
    console.log("Loading items for order section...");

    // Update date
    updateCurrentDate();

    // Reset order state
    resetOrder();

    // Load coffee items by default
    load_items_by_category_for_order('coffee');
    load_customer_dropdown();
    update_category_counts();
    initializeEventListeners();
    updateOrderSummary();
};

// ==================== 2. Update Current Date =======================
const updateCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
};

// ==================== 3. Load Customer Dropdown =======================
const load_customer_dropdown = () => {
    console.log("Loading customer dropdown...");
    const customerSelect = $("#customer-select");
    customerSelect.empty();
    customerSelect.append('<option value="">Select Customer</option>');

    const customers = get_customers();

    if (customers.length === 0) {
        customerSelect.append('<option value="" disabled>No customers found</option>');
        return;
    }

    customers.forEach(customer => {
        customerSelect.append(`
            <option value="${customer.id}" data-contact="${customer.contact}">
                ${customer.name} - ${customer.contact}
            </option>
        `);
    });

    console.log(`Loaded ${customers.length} customers`);
};

// ==================== 4. Load Items by Category for Order =======================
const load_items_by_category_for_order = (category) => {
    console.log(`Loading ${category} items for order`);

    const itemsContainer = $("#items-container");
    itemsContainer.empty();

    const items = get_items_by_category(category);

    if (items.length === 0) {
        itemsContainer.html(`
            <div class="col-12 text-center py-5">
                <p class="text-muted">No ${category} items available</p>
            </div>
        `);
        return;
    }

    items.forEach((item) => {
        const itemCard = `
            <div class="col">
                <div class="card h-100 product-card">
                    <img
                        src="${item.item_image}"
                        class="card-img-top"
                        alt="${item.item_name}"
                        onerror="this.src='assests/default-item.png'"
                        style="height: 120px; object-fit: cover;"
                    />
                    <div class="card-body">
                        <h6 class="card-title fw-bold">${item.item_name}</h6>
                        <p class="card-text text-muted small mb-2">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-success">RS ${parseFloat(item.price).toFixed(2)}</span>
                            <button class="btn btn-primary btn-sm add-to-order-btn" 
                                    data-item-id="${item.item_id}"
                                    data-item-name="${item.item_name}"
                                    data-item-price="${item.price}">
                                <i class="bi bi-plus-circle me-1"></i>Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        itemsContainer.append(itemCard);
    });
};

// ==================== 5. Update Category Counts =======================
const update_category_counts = () => {
    const coffeeCount = get_items_by_category('coffee').length;
    const teaCount = get_items_by_category('tea').length;
    const snackCount = get_items_by_category('snack').length;

    $("#coffee-count").text(`${coffeeCount} items`);
    $("#tea-count").text(`${teaCount} items`);
    $("#snack-count").text(`${snackCount} items`);
};

// ==================== 6. Initialize Event Listeners =======================
const initializeEventListeners = () => {
    console.log("Initializing order event listeners...");

    // Category tab switching
    $(document).on("click", ".category-card", function () {
        const category = $(this).data("category");
        console.log("Category clicked:", category);

        // Update active category
        $(".category-card").removeClass("active");
        $(this).addClass("active");

        // Load items for selected category
        load_items_by_category_for_order(category);
    });

    // Add to order button
    $(document).on("click", ".add-to-order-btn", function () {
        console.log("Add to order button clicked");
        const itemId = $(this).data("item-id");
        const itemName = $(this).data("item-name");
        const itemPrice = parseFloat($(this).data("item-price"));

        const item = {
            item_id: itemId,
            item_name: itemName,
            price: itemPrice
        };

        addItemToOrder(item);
    });

    // Order type switching
    $(document).on("click", "#dine-in-btn", function () {
        $("#dine-in-btn").addClass("active");
        $("#takeaway-btn").removeClass("active");
        currentOrder.orderType = 'dine_in';
        updateOrderTitle();
    });

    $(document).on("click", "#takeaway-btn", function () {
        $("#takeaway-btn").addClass("active");
        $("#dine-in-btn").removeClass("active");
        currentOrder.orderType = 'takeaway';
        updateOrderTitle();
    });

    // Customer selection
    $(document).on("change", "#customer-select", function () {
        const selectedOption = $(this).find(":selected");
        const customerId = selectedOption.val();
        const customerName = selectedOption.text().split(' - ')[0];
        const customerContact = selectedOption.data("contact");

        if (customerId) {
            currentOrder.customerId = customerId;
            currentOrder.customerName = customerName;
            currentOrder.customerContact = customerContact;
            $("#quick-customer-name").val(customerName);
        } else {
            currentOrder.customerId = '';
            currentOrder.customerName = '';
            currentOrder.customerContact = '';
            $("#quick-customer-name").val('');
        }
        updatePlaceOrderButton();
    });

    // Quick customer name input
    $(document).on("input", "#quick-customer-name", function () {
        const quickName = $(this).val();
        if (quickName.trim() && !$("#customer-select").val()) {
            currentOrder.customerName = quickName.trim();
            currentOrder.customerId = '';
            currentOrder.customerContact = '';
        }
        updatePlaceOrderButton();
    });

    // Refresh customers button
    $(document).on("click", "#refresh-customers-btn", function () {
        load_customer_dropdown();
        Swal.fire({
            title: "Refreshed!",
            text: "Customer list updated",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    });

    // Clear order button
    $(document).on("click", "#clear-order-btn", function () {
        Swal.fire({
            title: "Clear Order?",
            text: "This will remove all items from the current order",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                resetOrder();
                Swal.fire({
                    title: "Cleared!",
                    text: "Order has been cleared",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    });

    // Place order button
    $(document).on("click", "#place-order-btn", function (e) {
        e.preventDefault();
        placeOrder();
    });
};

// ==================== 7. Add Item to Order =======================
const addItemToOrder = (item) => {
    console.log("Adding item to order:", item);

    // Check if item already exists in order
    const existingItemIndex = currentOrder.items.findIndex(orderItem =>
        orderItem.item_id === item.item_id
    );

    if (existingItemIndex !== -1) {
        // Increment quantity if item exists
        currentOrder.items[existingItemIndex].quantity += 1;
        console.log(`Increased quantity for ${item.item_name} to ${currentOrder.items[existingItemIndex].quantity}`);
    } else {
        // Add new item to order
        currentOrder.items.push({
            item_id: item.item_id,
            item_name: item.item_name,
            price: item.price,
            quantity: 1
        });
        console.log(`Added new item: ${item.item_name}`);
    }

    updateOrderSummary();
    updatePlaceOrderButton();

    // Show quick feedback
    showAddToCartFeedback(item.item_name);
};

// ==================== 8. Show Add to Cart Feedback =======================
const showAddToCartFeedback = (itemName) => {
    // Remove existing feedback
    $('.alert').alert('close');

    // Create a temporary feedback element
    const feedback = $(`<div class="alert alert-success alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
        <i class="bi bi-cart-plus me-2"></i>Added <strong>${itemName}</strong> to order
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`);

    $("body").append(feedback);

    // Auto remove after 2 seconds
    setTimeout(() => {
        feedback.alert('close');
    }, 2000);
};

// ==================== 9. Update Order Summary =======================
const updateOrderSummary = () => {
    const orderItemsList = $("#order-items-list");
    orderItemsList.empty();

    if (currentOrder.items.length === 0) {
        orderItemsList.html(`
            <p class="text-muted text-center m-0 pt-5">Your order is empty</p>
            <p class="text-muted text-center small">Click 'Add' on items to add them to order</p>
        `);
        $("#subtotal").text("RS 0.00");
        $("#total").text("RS 0.00");
        currentOrder.subtotal = 0;
        currentOrder.total = 0;
        return;
    }

    let subtotal = 0;

    currentOrder.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const orderItemHtml = `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                <div class="flex-grow-1">
                    <div class="fw-semibold small">${item.item_name}</div>
                    <div class="text-muted small">RS ${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <span class="fw-bold text-success small">RS ${itemTotal.toFixed(2)}</span>
                    <div class="btn-group btn-group-sm ms-2">
                        <button class="btn btn-outline-secondary decrease-quantity" data-index="${index}">
                            <i class="bi bi-dash"></i>
                        </button>
                        <button class="btn btn-outline-danger remove-item" data-index="${index}">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-outline-secondary increase-quantity" data-index="${index}">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        orderItemsList.append(orderItemHtml);
    });

    currentOrder.subtotal = subtotal;
    currentOrder.total = subtotal;

    $("#subtotal").text(`RS ${subtotal.toFixed(2)}`);
    $("#total").text(`RS ${subtotal.toFixed(2)}`);

    // Add event listeners for quantity controls
    $(".decrease-quantity").off("click").on("click", function () {
        const index = parseInt($(this).data("index"));
        decreaseItemQuantity(index);
    });

    $(".increase-quantity").off("click").on("click", function () {
        const index = parseInt($(this).data("index"));
        increaseItemQuantity(index);
    });

    $(".remove-item").off("click").on("click", function () {
        const index = parseInt($(this).data("index"));
        removeItemFromOrder(index);
    });
};

// ==================== 10. Quantity Management =======================
const decreaseItemQuantity = (index) => {
    if (currentOrder.items[index].quantity > 1) {
        currentOrder.items[index].quantity -= 1;
    } else {
        currentOrder.items.splice(index, 1);
    }
    updateOrderSummary();
    updatePlaceOrderButton();
};

const increaseItemQuantity = (index) => {
    currentOrder.items[index].quantity += 1;
    updateOrderSummary();
    updatePlaceOrderButton();
};

const removeItemFromOrder = (index) => {
    const itemName = currentOrder.items[index].item_name;
    currentOrder.items.splice(index, 1);
    updateOrderSummary();
    updatePlaceOrderButton();

    // Show removal feedback
    showRemoveFromCartFeedback(itemName);
};

// ==================== 11. Show Remove Feedback =======================
const showRemoveFromCartFeedback = (itemName) => {
    $('.alert').alert('close');

    const feedback = $(`<div class="alert alert-warning alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
        <i class="bi bi-cart-dash me-2"></i>Removed <strong>${itemName}</strong> from order
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`);

    $("body").append(feedback);

    setTimeout(() => {
        feedback.alert('close');
    }, 2000);
};

// ==================== 12. Update Order Title =======================
const updateOrderTitle = () => {
    const orderId = generateTemporaryOrderId();
    $("#order-title").text(`Order #${orderId}`);
};

const generateTemporaryOrderId = () => {
    return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
};

// ==================== 13. Update Place Order Button =======================
const updatePlaceOrderButton = () => {
    const hasItems = currentOrder.items.length > 0;
    const hasCustomerInfo = currentOrder.customerName.trim() !== '';

    const placeOrderBtn = $("#place-order-btn");
    placeOrderBtn.prop("disabled", !(hasItems && hasCustomerInfo));

    if (placeOrderBtn.prop("disabled")) {
        placeOrderBtn.html('<i class="bi bi-check-circle me-2"></i>Place Order');
    } else {
        placeOrderBtn.html(`<i class="bi bi-check-circle me-2"></i>Place Order - RS ${currentOrder.total.toFixed(2)}`);
    }
};

// ==================== 14. Place Order Method =======================
const placeOrder = () => {
    console.log("Placing order...", currentOrder);

    if (currentOrder.items.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Empty Order",
            text: "Please add items to your order before placing it!",
        });
        return;
    }

    if (!currentOrder.customerName.trim()) {
        Swal.fire({
            icon: "error",
            title: "Missing Customer",
            text: "Please select or enter a customer name!",
        });
        return;
    }

    // Show confirmation dialog
    Swal.fire({
        title: "Confirm Order Placement",
        html: `
            <div class="text-start">
                <p><strong>Customer:</strong> ${currentOrder.customerName}</p>
                ${currentOrder.customerContact ? `<p><strong>Contact:</strong> ${currentOrder.customerContact}</p>` : ''}
                <p><strong>Order Type:</strong> ${currentOrder.orderType === 'dine_in' ? 'Dine In' : 'Take Away'}</p>
                <p><strong>Total Amount:</strong> RS ${currentOrder.total.toFixed(2)}</p>
                <hr>
                <p><strong>Order Items (${currentOrder.items.length}):</strong></p>
                <div class="small" style="max-height: 150px; overflow-y: auto;">
                    ${currentOrder.items.map(item => `
                        <div class="d-flex justify-content-between border-bottom pb-1 mb-1">
                            <span>${item.item_name}</span>
                            <span>${item.quantity} x RS ${item.price.toFixed(2)} = RS ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1e8a4c",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Place Order!",
        cancelButtonText: "Cancel",
        width: 500
    }).then((result) => {
        if (result.isConfirmed) {
            // Create the order
            const order = create_order(
                currentOrder.orderType,
                currentOrder.customerId,
                currentOrder.customerName,
                currentOrder.customerContact,
                currentOrder.items,
                currentOrder.total
            );

            console.log("Order placed successfully:", order);

            // Show success message
            Swal.fire({
                title: "Order Placed Successfully!",
                html: `
                    <div class="text-center">
                        <i class="bi bi-check-circle-fill text-success display-4 mb-3"></i>
                        <h5>Order #${order.order_id}</h5>
                        <p class="mb-1"><strong>Customer:</strong> ${order.customer_name}</p>
                        <p class="mb-2"><strong>Total:</strong> RS ${order.total_amount.toFixed(2)}</p>
                        <p class="text-muted small">Thank you for your business!</p>
                    </div>
                `,
                icon: "success",
                confirmButtonColor: "#1e8a4c",
                confirmButtonText: "Continue"
            });

            // Reset order
            resetOrder();
        }
    });
};

// ==================== 15. Reset Order =======================
const resetOrder = () => {
    currentOrder = {
        items: [],
        orderType: 'dine_in',
        customerId: '',
        customerName: '',
        customerContact: '',
        subtotal: 0,
        total: 0
    };

    // Reset UI
    $(".category-card").removeClass("active");
    $(".category-card[data-category='coffee']").addClass("active");
    $("#dine-in-btn").addClass("active");
    $("#takeaway-btn").removeClass("active");
    $("#customer-select").val("");
    $("#quick-customer-name").val("");

    // Reload default category
    load_items_by_category_for_order('coffee');
    updateOrderSummary();
    updatePlaceOrderButton();
    updateOrderTitle();
};

// ==================== 16. Public Methods =======================
export const getCurrentOrder = () => {
    return currentOrder;
};

export const clearCurrentOrder = () => {
    resetOrder();
};