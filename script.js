import { customer } from "./pages/customer.js";
import { item } from "./pages/item.js";
import { order } from "./pages/order.js";

// Import controllers
import { load_customer_tbl } from "./controller/CustomerController.js";
import { load_all_items } from "./controller/ItemController.js";
import { load_order_items } from "./controller/OrderController.js";

// Function to initialize navigation
function initializeNavigation() {
    console.log("Initializing navigation...");

    // Set up navigation using event delegation
    $(document).on("click", "#nav-customer", function(e) {
        e.preventDefault();
        loadPage("customer");
    });

    $(document).on("click", "#nav-item", function(e) {
        e.preventDefault();
        loadPage("item");
    });

    $(document).on("click", "#nav-order", function(e) {
        e.preventDefault();
        loadPage("order");
    });

    $(document).on("click", "#nav-order-history", function(e) {
        e.preventDefault();
        loadPage("orderHistory");
    });

    // Load default page
    loadPage("customer");
}

function loadPage(section) {
    console.log("Loading page:", section);

    // Update active nav link
    $(".nav-link").removeClass("active");
    $(`#nav-${section}`).addClass("active");

    switch (section) {
        case "customer":
            $("#app").html(customer());
            // Initialize customer section after a short delay
            setTimeout(() => {
                load_customer_tbl();
            }, 100);
            break;
        case "item":
            $("#app").html(item());
            // Initialize item section after a short delay
            setTimeout(() => {
                load_all_items();
            }, 100);
            break;
        case "order":
            $("#app").html(order());
            // Initialize order section after a short delay
            setTimeout(() => {
                load_order_items();
            }, 100);
            break;
        default:
            alert("Invalid section!");
    }
}

// Initialize when DOM is ready
$(document).ready(function () {
    console.log("Main application script loaded");
    initializeNavigation();
});

// Also make functions globally available for manual calling if needed
window.loadPage = loadPage;
window.initializeNavigation = initializeNavigation;