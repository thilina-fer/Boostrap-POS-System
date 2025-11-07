export const customer = function () {
  return ` <section>
          <div class="row">
            <div class="col-md-4">
              <a href="#" class="text-decoration-none">
                <div
                  class="card bg-success text-white rounded-3 shadow-sm stat-card"
                >
                  <div class="card-body">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div class="small">Total Customers</div>
                        <h5 class="card-title fw-bold mb-0">30</h5>
                      </div>
                      <i class="fa-solid fa-users fa-2x opacity-50"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-4">
            <h2 class="fs-4 fw-bold mb-0">All Customers</h2>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addCustomerModal"
            >
              <i class="fa-solid fa-plus"></i> Add Customer
            </button>
          </div>

          <div class="bg-white rounded-3 shadow-sm p-3 mt-3">
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>C001</td>
                    <td>Thilina Dilshan</td>
                    <td>077-1234567</td>
                    <td>123456789V</td>
                    <td>Galle, Sri Lanka</td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateCustomerModal"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        data-bs-toggle="tooltip"
                        title="Delete"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>C002</td>
                    <td>Ruvunda</td>
                    <td>071-7654321</td>
                    <td>987654321V</td>
                    <td>Colombo, Sri Lanka</td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateCustomerModal"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        data-bs-toggle="tooltip"
                        title="Delete"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>`;
};
