
export const item = function(){

  alert("yedfsdfhuksd")
    return(
        `
        <div class="container mt-5">
        <div class="d-flex flex-wrap gap-3 mb-3" id="categoryTabs">
          <div
            class="category-tab shadow-sm active"
            data-target="#coffee-items"
          >
            <span class="badge text-dark">Available</span>
            <div class="category-info">
              <h5 class="fw-bold mb-0">Coffee</h5>
              <small>30 items</small>
            </div>
          </div>

          <div class="category-tab shadow-sm" data-target="#tea-items">
            <span class="badge text-dark">Available</span>
            <div class="category-info">
              <h5 class="fw-bold mb-0">Tea</h5>
              <small>30 items</small>
            </div>
          </div>

          <div class="category-tab shadow-sm" data-target="#snack-items">
            <span class="badge text-dark">Available</span>
            <div class="category-info">
              <h5 class="fw-bold mb-0">Snacks</h5>
              <small>30 items</small>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4 mb-3">
          <h2 class="fs-4 fw-bold mb-0">All Items</h2>
          <button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#addItemModal" 
>
  <i class="fa-solid fa-plus"></i> Add Item
</button>
        </div>

        <!-- Coffee section -->
        <div class="item-section active" id="coffee-items">
          <h3 class="fs-5 fw-semibold mb-3">Coffee Selection</h3>
          <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col">
              <div class="card h-100 shadow-sm">
                <img
                  src="assests/coffee.png"
                  class="card-img-top w-50 img-fluid d-block mx-auto"
                  alt="Espresso"
                />
                <div class="card-body">
                  <h5 class="card-title fw-bold">Espresso</h5>
                  <p class="card-text text-muted">
                    Strong, concentrated coffee.
                  </p>
                  <p class="fs-5 fw-bold mb-0">400.00RS</p>
                </div>
                <div class="card-footer bg-white border-0 pb-3">
                  <button type="button" class="btn btn-outline-secondary">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                     <i class="fa-solid fa-trash fa-xl"></i>
                    </button> 
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100 shadow-sm">
                <img
                  src="assests/coffe1.png"
                  class="card-img-top w-50 img-fluid d-block mx-auto"
                  alt="Latte"
                />
                <div class="card-body">
                  <h5 class="card-title fw-bold">Latte</h5>
                  <p class="card-text text-muted">
                    Espresso with steamed milk.
                  </p>
                  <p class="fs-5 fw-bold mb-0">500.00RS</p>
                </div>
                <div class="card-footer bg-white border-0 pb-3">
                  <button type="button" class="btn btn-outline-secondary">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                     <i class="fa-solid fa-trash fa-xl"></i>
                    </button> 
                </div>
              </div>
            </div>
            </div>
        </div>

        <!--Tea Section  -->
        <div class="item-section" id="tea-items">
          <h3 class="fs-5 fw-semibold mb-3">Tea Selection</h3>
          <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col">
              <div class="card h-100 shadow-sm">
               <img
                  src="assests/tea1.png"
                  class="card-img-top w-50 img-fluid d-block mx-auto"
                  alt="Green Tea"
                />
                <div class="card-body">
                  <h5 class="card-title fw-bold">Green Tea</h5>
                  <p class="card-text text-muted">
                    Light and refreshing herbal tea.
                  </p>
                  <p class="fs-5 fw-bold mb-0">300.00 RS</p>
                </div>
                <div class="card-footer bg-white border-0 pb-3">
                  <button type="button" class="btn btn-outline-secondary">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                     <i class="fa-solid fa-trash fa-xl"></i>
                    </button>
                </div>
              </div>
            </div>
            </div>
        </div>

        <div class="item-section" id="snack-items">
          <h3 class="fs-5 fw-semibold mb-3">Snack Selection</h3>
          <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col">
              <div class="card h-100 shadow-sm">
               <img
                  src="assests/snack1.png"
                  class="card-img-top w-50 img-fluid d-block mx-auto"
                  alt="Green Tea"
                />
                <div class="card-body">
                  <h5 class="card-title fw-bold">Croissant</h5>
                  <p class="card-text text-muted">
                    Flaky, buttery pastry.
                  </p>
                  <p class="fs-5 fw-bold mb-0">350.00 RS</p>
                </div>
                <div class="card-footer bg-white border-0 pb-3">
                  <button type="button" class="btn btn-outline-secondary">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                     <i class="fa-solid fa-trash fa-xl"></i>
                    </button>
                </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      
        <!-- =============   POp Up Page  ============= -->
            <div
  class="modal fade"
  id="addItemModal"
  tabindex="-1"
  aria-labelledby="addItemModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="addItemForm">
          <div class="mb-3">
            <label for="itemName" class="form-label">Item Name</label>
            <input
              type="text"
              class="form-control"
              id="itemName"
              placeholder="e.g., Espresso"
              required
            />
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemCategory" class="form-label">Category</label>
              <select class="form-select" id="itemCategory" required>
                <option value="" selected disabled>Choose...</option>
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="itemPrice" class="form-label">Price (RS)</label>
              <input
                type="number"
                class="form-control"
                id="itemPrice"
                placeholder="e.g., 400.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="itemDescription" class="form-label">Description</label>
            <textarea
              class="form-control"
              id="itemDescription"
              rows="3"
              placeholder="e.g., Strong, concentrated coffee."
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="itemImage" class="form-label">Item Image</label>
            <input class="form-control" type="file" id="itemImage" accept="image/*" />
          </div>
        </form>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" class="btn btn-primary" form="addItemForm">
          Save Item
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
        `
    )
}
$(document).ready(function () {
  $(".category-tab").on("click", function () {
    // Get the target ID from 'data-target'
    const targetId = $(this).data("target");

    // 1. Remove 'active' from all tabs
    $(".category-tab").removeClass("active");

    // 2. Add 'active' to the clicked tab
    $(this).addClass("active");

    // 3. Hide all item sections
    $(".item-section").removeClass("active");

    // 4. Show the target item section
    $(targetId).addClass("active");
  });
});
