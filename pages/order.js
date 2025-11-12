export const order = function(){
    return(
        `
<!--        <div class="d-flex vh-100">-->
<!--            <div class="d-flex flex-column flex-shrink-0 sidebar">-->
<!--                <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">-->
<!--                    <li class="nav-item">-->
<!--                        <a href="#" class="nav-link py-3 logo" title="Home">-->
<!--                            <i class="bi bi-cup-straw fs-3"></i>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" class="nav-link py-3" title="Menu">-->
<!--                            <i class="bi bi-cup-hot-fill fs-3"></i>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" class="nav-link py-3 active" title="Orders">-->
<!--                            <i class="bi bi-cart fs-3"></i>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" class="nav-link py-3" title="Settings">-->
<!--                            <i class="bi bi-gear fs-3"></i>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" class="nav-link py-3" title="Refresh">-->
<!--                            <i class="bi bi-arrow-clockwise fs-3"></i>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->

<!--            <div class="flex-grow-1 p-4 overflow-auto">-->
<!--                <header class="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">-->
<!--                    <div>-->
<!--                        <h4 class="h4 mb-0 header-brand">GREEN GROUND COFFEE</h4>-->
<!--                        <small class="text-muted" id="current-date">Sunday, 25 November</small>-->
<!--                    </div>-->
<!--                    <div class="d-flex align-items-center">-->
<!--                        <div class="text-end me-3">-->
<!--                            <div class="fw-bold">Dilshan T</div>-->
<!--                            <small class="text-muted">Cashier</small>-->
<!--                        </div>-->
<!--                        <div class="user-avatar"></div>-->
<!--                    </div>-->
<!--                </header>-->

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
                        </div>
                    </div>
                    
                    <div class="col-lg-4 d-flex">
                        <div class="card order-summary h-100 w-100">
                            <div class="card-body d-flex flex-column">
                                <h5 id="order-title">Purchase report #0001</h5>

                                <div class="d-grid gap-2 d-flex justify-content-stretch my-3 btn-toggle-group">
                                    <button class="btn active" id="dine-in-btn">Dine in</button>
                                    <button class="btn" id="takeaway-btn">Take away</button>
                                </div>

                                <h6 class="text-muted">Order list</h6>

                                <div class="flex-grow-1 border-0 rounded-3 p-3 order-list-box" style="min-height: 250px; overflow-y: auto">
                                    <div id="order-items-list">
                                        <p class="text-muted text-center m-0 pt-5">Your order is empty</p>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <div class="input-group mb-2">
                                        <input type="text" class="form-control" placeholder="Customer Name" id="customer-name">
                                    </div>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Customer Contact" id="customer-contact">
                                    </div>
                                </div>

                                <div class="mt-auto pt-3 order-total">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="h6 mb-0">Subtotal</span>
                                        <span class="h6 mb-0" id="subtotal">$0.00</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 mb-0">Total</span>
                                        <span class="h4 mb-0" id="total">$0.00</span>
                                    </div>
                                    
                                    <div class="d-grid gap-2 mt-3">
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
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
}

// Initialize date when view loads
setTimeout(updateCurrentDate, 100);