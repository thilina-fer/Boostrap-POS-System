export const order = function(){
    return(
        `
            <div class="flex-grow-1 p-4 overflow-auto">

                <div class="row g-4" style="height: calc(100% - 100px)">
                    <div class="col-lg-8 d-flex flex-column">
                        <div class="row g-3 mb-4" id="categoryTabs">
                            <div class="col-4">
                                <div class="category-card active" data-category="coffee">
                                    <span class="badge">Available</span>
                                    <h5>Coffee</h5>
                                    <small id="coffee-count">0 items</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="category-card" data-category="tea">
                                    <span class="badge">Available</span>
                                    <h5>Tea</h5>
                                    <small id="tea-count">0 items</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="category-card" data-category="snack">
                                    <span class="badge">Available</span>
                                    <h5>Snacks</h5>
                                    <small id="snack-count">0 items</small>
                                </div>
                            </div>
                        </div>

                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 overflow-auto pe-2" id="items-container">
                            <!-- Items will be loaded dynamically here -->
                            <div class="col-12 text-center py-5">
                                <p class="text-muted">Loading items...</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 d-flex">
                        <div class="card order-summary h-100 w-100">
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="mb-0" id="order-title">Order #0001</h5>
                                    <button class="btn btn-outline-secondary btn-sm" id="clear-order-btn">
                                        <i class="bi bi-trash"></i> Clear
                                    </button>
                                </div>

                                <div class="d-grid gap-2 d-flex justify-content-stretch my-3 btn-toggle-group">
                                    <button class="btn active" id="dine-in-btn">Dine in</button>
                                    <button class="btn" id="takeaway-btn">Take away</button>
                                </div>

                                <!-- Customer Selection Section -->
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Select Customer</label>
                                    <div class="input-group mb-2">
                                        <select class="form-select" id="customer-select">
                                            <option value="">Select Customer</option>
                                        </select>
                                        <button class="btn btn-outline-primary" type="button" id="refresh-customers-btn">
                                            <i class="bi bi-arrow-clockwise"></i>
                                        </button>
                                    </div>
                                    <div class="text-center">
                                        <small class="text-muted">OR</small>
                                    </div>
                                    <div class="input-group mt-1">
                                        <input type="text" class="form-control" placeholder="Quick Customer Name" id="quick-customer-name">
                                    </div>
                                </div>

                                <h6 class="text-muted mt-2">Order Items</h6>

                                <div class="flex-grow-1 border-0 rounded-3 p-3 order-list-box" style="min-height: 200px; overflow-y: auto">
                                    <div id="order-items-list">
                                        <p class="text-muted text-center m-0 pt-5">Your order is empty</p>
                                        <p class="text-muted text-center small">Click 'Add' on items to add them to order</p>
                                    </div>
                                </div>

                                <div class="mt-auto pt-3 order-total">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="h6 mb-0">Subtotal</span>
                                        <span class="h6 mb-0" id="subtotal">RS 0.00</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="h5 mb-0">Total</span>
                                        <span class="h4 mb-0 text-success" id="total">RS 0.00</span>
                                    </div>
                                    
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-success btn-lg" id="place-order-btn" disabled>
                                            <i class="bi bi-check-circle me-2"></i>Place Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    );
}

// Update date function
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize date when view loads
setTimeout(updateCurrentDate, 100);