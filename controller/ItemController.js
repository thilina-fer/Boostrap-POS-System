import {
    add_item,
    remove_item,
    get_items,
    get_item_detail,
    update_item,
    get_items_by_category,
    get_next_item_id
} from "../model/ItemModel.js";

// ==================== 1. Load Items by Category =======================
export const load_items_by_category = (category) => {
    console.log(`Loading items for category: ${category}`);
    const categoryMap = {
        'coffee': '#coffee-items .row',
        'tea': '#tea-items .row',
        'snack': '#snack-items .row'
    };

    const targetContainer = categoryMap[category];
    if (!targetContainer) return;

    $(targetContainer).empty();
    let item_list = get_items_by_category(category);
    console.log(`Found ${item_list.length} items for ${category}`);

    item_list.map((obj, index) => {
        // Find the actual index in the main array
        const allItems = get_items();
        const actualIndex = allItems.findIndex(item => item.item_id === obj.item_id);

        let item_card = `
            <div class="col">
                <div class="card h-100 shadow-sm" data-index="${actualIndex}">
                    <img
                        src="${obj.item_image}"
                        class="card-img-top w-50 img-fluid d-block mx-auto"
                        alt="${obj.item_name}"
                        onerror="this.src='assests/default-item.png'"
                    />
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${obj.item_name}</h5>
                        <p class="card-text text-muted">${obj.description}</p>
                        <p class="fs-5 fw-bold mb-0">${parseFloat(obj.price).toFixed(2)} RS</p>
                    </div>
                    <div class="card-footer bg-white border-0 pb-3">
                        <button type="button" class="btn btn-outline-secondary btn-edit-item" data-bs-toggle="modal" data-bs-target="#updateItemModal">
                            <i class="fa-solid fa-pen-to-square fa-xl"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-delete-item">
                            <i class="fa-solid fa-trash fa-xl"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        $(targetContainer).append(item_card);
    });
};

// ==================== 2. Load All Items =======================
export const load_all_items = () => {
    console.log("Loading all items...");
    load_items_by_category('coffee');
    load_items_by_category('tea');
    load_items_by_category('snack');

    // Update item counts in category tabs
    update_category_counts();
};

// ==================== 3. Update Category Counts =======================
const update_category_counts = () => {
    const categories = ['coffee', 'tea', 'snack'];

    categories.forEach(category => {
        const count = get_items_by_category(category).length;
        $(`#categoryTabs .category-tab[data-target="#${category}-items"] .category-info small`)
            .text(`${count} items`);
    });
};

// ==================== 4. Handle Image Selection and Preview =======================
let selectedImageFile = null;

// Preview selected image
$(document).on("change", "#itemImage", function (e) {
    const file = e.target.files[0];
    if (file) {
        selectedImageFile = file;
        // Create a preview (optional)
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log("Image selected:", file.name);
        };
        reader.readAsDataURL(file);
    }
});

// ==================== 5. Add Item (Save Button Click) =======================
$(document).on("submit", "#addItemForm", function (e) {
    e.preventDefault();
    console.log("Form submission intercepted!");

    let item_id = get_next_item_id();
    let item_name = $("#itemName").val();
    let category = $("#itemCategory").val();
    let price = $("#itemPrice").val();
    let description = $("#itemDescription").val();

    // Determine image path
    let item_image = "assests/default-item.png"; // Default image

    if (selectedImageFile) {
        // Use the actual filename from the selected file
        item_image = "assests/" + selectedImageFile.name;
        console.log("Using selected image:", item_image);
    }

    console.log("Form data:", { item_id, item_name, category, price, description, item_image });

    if (!item_name || !category || !price) {
        console.log("Validation failed - missing fields");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all required fields!",
        });
        return;
    }

    console.log("Adding item to database...");
    add_item(item_id, item_name, category, parseFloat(price), description, item_image);

    console.log("Refreshing items display...");
    load_all_items();

    $("#addItemModal").modal("hide");
    $("#addItemForm")[0].reset();

    // Reset the selected image
    selectedImageFile = null;

    Swal.fire({
        title: "Item Saved Successfully",
        icon: "success",
        draggable: true,
    });

    return false;
});

// ==================== 6. Handle Update Image Selection =======================
let selectedUpdateImageFile = null;

$(document).on("change", "#updateItemImage", function (e) {
    const file = e.target.files[0];
    if (file) {
        selectedUpdateImageFile = file;
        console.log("Update image selected:", file.name);
    }
});

// ==================== 7. Select Item for Editing =======================
let selected_item_index = -1;

$(document).on("click", ".btn-edit-item", function () {
    console.log("Edit item button clicked");
    selected_item_index = parseInt($(this).closest('.card').attr('data-index'));
    let item_obj = get_item_detail(selected_item_index);

    if (item_obj) {
        $("#updateItemName").val(item_obj.item_name);
        $("#updateItemCategory").val(item_obj.category);
        $("#updateItemPrice").val(item_obj.price);
        $("#updateItemDescription").val(item_obj.description);

        // Reset update image selection
        selectedUpdateImageFile = null;
        $("#updateItemImage").val("");

        console.log("Edit form populated with:", item_obj);
    }
});

// ==================== 8. Update Item (Update Modal Save Button) =======================
$(document).on("click", "#updateItemBtn", function () {
    console.log("Update item button clicked");
    let item_name = $("#updateItemName").val();
    let category = $("#updateItemCategory").val();
    let price = $("#updateItemPrice").val();
    let description = $("#updateItemDescription").val();

    // Get the current item to preserve existing image if no new one selected
    let current_item = get_item_detail(selected_item_index);
    let item_image = current_item ? current_item.item_image : "assests/default-item.png";

    // If a new image was selected for update, use it
    if (selectedUpdateImageFile) {
        item_image = "assests/" + selectedUpdateImageFile.name;
        console.log("Using updated image:", item_image);
    }

    if (selected_item_index !== -1) {
        console.log("Updating item at index:", selected_item_index);
        update_item(selected_item_index, item_name, category, parseFloat(price), description, item_image);
        load_all_items();

        $("#updateItemModal").modal("hide");
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item updated successfully!",
        });
        selected_item_index = -1;
        selectedUpdateImageFile = null;
    }
});

// ==================== 9. Delete Item =======================
$(document).on("click", ".btn-delete-item", function () {
    console.log("Delete item button clicked");
    let index_to_delete = parseInt($(this).closest('.card').attr('data-index'));

    Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            remove_item(index_to_delete);
            load_all_items();
            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success",
            });
        }
    });
});

// ==================== 10. Category Tab Switching =======================
$(document).on("click", ".category-tab", function () {
    const targetId = $(this).data("target");

    // Remove active from all tabs
    $(".category-tab").removeClass("active");
    // Add active to clicked tab
    $(this).addClass("active");
    // Hide all item sections
    $(".item-section").removeClass("active");
    // Show target section
    $(targetId).addClass("active");
});

// ==================== 11. Initialize Items =======================
$(document).ready(function () {
    console.log("ItemController initialized");
});