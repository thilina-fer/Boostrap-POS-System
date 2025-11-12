import { create_order, calculate_order_total } from "../model/OrderModel.js";
import { get_items, get_items_by_category } from "../model/ItemModel.js";

// Current order state
let currentOrder = {
    items: [],
    orderType: 'dine_in',
    customerName: '',
    customerContact: '',
    subtotal: 0,
    total: 0
};

// ==================== 1. Load Items for Order Section =======================
export const load_order_items = () => {
    console.log("Loading items for order section...");

    // Reset order state
    resetOrder();

    // Load coffee items by default
    load_items_by_category_for_order('coffee');
    update_category_counts();
    initializeEventListeners();
    updateOrderSummary();
};

// ==================== 2. Load Items by Category for Order =======================
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
                <div class="card h-100 product-card" data-item-id="${item.item_id}">
                    <img
                        src="${item.item_image}"
                        class="card-img-top"
                        alt="${item.item_name}"
                        onerror="this.src='assests/default-item.png'"
                    />
                    <div class="card-body pt-0 d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-0">${item.item_name}</h6>
                            <small class="text-muted">RS ${parseFloat(item.price).toFixed(2)}</small>
                        </div>
                        <button class="btn btn-add add-to-order-btn" 
                                data-item-id="${item.item_id}"
                                data-item-name="${item.item_name}"
                                data-item-price="${item.price}"
                                data-item-image="${item.item_image}">
                            <i class="bi bi-plus fs-5"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        itemsContainer.append(itemCard);
    });
};

// ==================== 3. Update Category Counts =======================
const update_category_counts = () => {
    const coffeeCount = get_items_by_category('coffee').length;
    const teaCount = get_items_by_category('tea').length;
    const snackCount = get_items_by_category('snack').length;

    $("#coffee-count").text(`${coffeeCount} items`);
    $("#tea-count").text(`${teaCount} items`);
    $("#snack-count").text(`${snackCount} items`);
};

// ==================== 4. Initialize Event Listeners =======================
const initializeEventListeners = () => {
    console.log("Initializing order event listeners...");

    // Remove any existing listeners to prevent duplicates
    $(".category-card").off("click");
    $(".add-to-order-btn").off("click");
    $("#dine-in-btn").off("click");
    $("#takeaway-btn").off("click");
    $("#customer-name").off("input");
    $("#customer-contact").off("input");
    $("#place-order-btn").off("click");

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

    // Add to order button - using event delegation
    $(document).on("click", ".add-to-order-btn", function () {
        console.log("Add to order button clicked");
        const itemId = $(this).data("item-id");
        const itemName = $(this).data("item-name");
        const itemPrice = parseFloat($(this).data("item-price"));
        const itemImage = $(this).data("item-image");

        const item = {
            item_id: itemId,
            item_name: itemName,
            price: itemPrice,
            item_image: itemImage,
            quantity: 1
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

    // Customer info input
    $(document).on("input", "#customer-name, #customer-contact", function () {
        currentOrder.customerName = $("#customer-name").val();
        currentOrder.customerContact = $("#customer-contact").val();
        updatePlaceOrderButton();
    });

    // Place order button
    $(document).on("click", "#place-order-btn", function (e) {
        e.preventDefault();
        placeOrder();
    });
};

// ==================== 5. Add Item to Order =======================
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
            item_image: item.item_image,
            quantity: 1
        });
        console.log(`Added new item: ${item.item_name}`);
    }

    updateOrderSummary();
    updatePlaceOrderButton();

    // Show quick feedback
    showAddToCartFeedback(item.item_name);
};

// ==================== 6. Show Add to Cart Feedback =======================
const showAddToCartFeedback = (itemName) => {
    // Create a temporary feedback element
    const feedback = $(`<div class="alert alert-success alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
        <i class="bi bi-check-circle me-2"></i>Added ${itemName} to order
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`);

    $("body").append(feedback);

    // Auto remove after 2 seconds
    setTimeout(() => {
        feedback.alert('close');
    }, 2000);
};

// ==================== 7. Update Order Summary =======================
const updateOrderSummary = () => {
    const orderItemsList = $("#order-items-list");
    orderItemsList.empty();

    if (currentOrder.items.length === 0) {
        orderItemsList.html('<p class="text-muted text-center m-0 pt-5">Your order is empty</p>');
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
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div class="flex-grow-1">
                    <div class="fw-semibold">${item.item_name}</div>
                    <div class="text-muted small">RS ${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <span class="fw-bold">RS ${itemTotal.toFixed(2)}</span>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary decrease-quantity" data-index="${index}">-</button>
                        <span class="btn btn-outline-light disabled">${item.quantity}</span>
                        <button class="btn btn-outline-secondary increase-quantity" data-index="${index}">+</button>
                        <button class="btn btn-outline-danger remove-item" data-index="${index}">
                            <i class="bi bi-trash"></i>
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

    // Add event listeners for quantity controls using event delegation
    $(document).off("click", ".decrease-quantity").on("click", ".decrease-quantity", function () {
        const index = parseInt($(this).data("index"));
        decreaseItemQuantity(index);
    });

    $(document).off("click", ".increase-quantity").on("click", ".increase-quantity", function () {
        const index = parseInt($(this).data("index"));
        increaseItemQuantity(index);
    });

    $(document).off("click", ".remove-item").on("click", ".remove-item", function () {
        const index = parseInt($(this).data("index"));
        removeItemFromOrder(index);
    });
};

// ==================== 8. Quantity Management =======================
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
};

const removeItemFromOrder = (index) => {
    const itemName = currentOrder.items[index].item_name;
    currentOrder.items.splice(index, 1);
    updateOrderSummary();
    updatePlaceOrderButton();

    // Show removal feedback
    showRemoveFromCartFeedback(itemName);
};

// ==================== 9. Show Remove Feedback =======================
const showRemoveFromCartFeedback = (itemName) => {
    const feedback = $(`<div class="alert alert-warning alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;">
        <i class="bi bi-info-circle me-2"></i>Removed ${itemName} from order
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`);

    $("body").append(feedback);

    setTimeout(() => {
        feedback.alert('close');
    }, 2000);
};

// ==================== 10. Update Order Title =======================
const updateOrderTitle = () => {
    const orderId = generateTemporaryOrderId();
    $("#order-title").text(`Order #${orderId}`);
};

const generateTemporaryOrderId = () => {
    return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
};

// ==================== 11. Update Place Order Button =======================
const updatePlaceOrderButton = () => {
    const hasItems = currentOrder.items.length > 0;
    const hasCustomerInfo = currentOrder.customerName.trim() !== '' && currentOrder.customerContact.trim() !== '';

    const placeOrderBtn = $("#place-order-btn");
    placeOrderBtn.prop("disabled", !(hasItems && hasCustomerInfo));

    if (placeOrderBtn.prop("disabled")) {
        placeOrderBtn.html('<i class="bi bi-check-circle me-2"></i>Place Order');
    } else {
        placeOrderBtn.html(`<i class="bi bi-check-circle me-2"></i>Place Order - RS ${currentOrder.total.toFixed(2)}`);
    }
};

// ==================== 12. Place Order =======================
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

    if (!currentOrder.customerName.trim() || !currentOrder.customerContact.trim()) {
        Swal.fire({
            icon: "error",
            title: "Missing Information",
            text: "Please enter customer name and contact information!",
        });
        return;
    }

    // Show confirmation dialog
    Swal.fire({
        title: "Confirm Order",
        html: `
            <div class="text-start">
                <p><strong>Customer:</strong> ${currentOrder.customerName}</p>
                <p><strong>Contact:</strong> ${currentOrder.customerContact}</p>
                <p><strong>Type:</strong> ${currentOrder.orderType === 'dine_in' ? 'Dine In' : 'Take Away'}</p>
                <p><strong>Total:</strong> RS ${currentOrder.total.toFixed(2)}</p>
                <hr>
                <p><strong>Items:</strong></p>
                <ul class="small">
                    ${currentOrder.items.map(item => `<li>${item.item_name} x ${item.quantity} - RS ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                </ul>
            </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1e8a4c",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Place Order!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            // Create the order
            const order = create_order(
                currentOrder.orderType,
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
                        <p class="mb-2">Total: <strong>RS ${order.total_amount.toFixed(2)}</strong></p>
                        <p class="text-muted small">Thank you for your order!</p>
                    </div>
                `,
                icon: "success",
                confirmButtonColor: "#1e8a4c",
                confirmButtonText: "Great!"
            });

            // Reset order
            resetOrder();
        }
    });
};

// ==================== 13. Reset Order =======================
const resetOrder = () => {
    currentOrder = {
        items: [],
        orderType: 'dine_in',
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
    $("#customer-name").val("");
    $("#customer-contact").val("");

    // Reload default category
    load_items_by_category_for_order('coffee');
    updateOrderSummary();
    updatePlaceOrderButton();
    updateOrderTitle();
};

// ==================== 14. Initialize Order Section =======================
$(document).ready(function () {
    console.log("OrderController initialized and ready");
});