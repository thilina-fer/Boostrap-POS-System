import { customer } from "./pages/customer.js";
import { item } from "./pages/item.js";
import { order } from "./pages/order.js";

$("#nav-customer").on("click", () => loadPage("customer"));
$("#nav-item").on("click", () => loadPage("item"));
$("#nav-order").on("click", () => loadPage("order"));
$("#nav-order-history").on("click", () => loadPage("orderHistory"));

function loadPage(section) {
  switch (section) {
    case "customer":
      $("#app").html(customer());
      break;
    case "item":
      $("#app").html(item());
      break;
    case "order":
      $("#app").html(order());
      break;

    default:
      alert("Invalied section!");
  }
}
