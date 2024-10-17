$(document).ready(function () {
  let customers = [];
  let items = [];
  loadCustomerData();
  loadItemData();

  function loadCustomerData() {
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers",
      type: "GET",
      dataType: "json",
      success: function (response) {
        customers = response;
        // Clear the table and select dropdown
        $("#customer-tbl-body").empty();
        $("#customer-select").empty();

        // Loop through the customers and populate table and dropdown
        customers.forEach((customer) => {
          let record = `
                    <tr>
                        <td class='customer-id-value' data-customer-id="${customer.id}">${customer.id}</td>
                        <td class='customer-name-value'>${customer.name}</td>
                        <td class='customer-address-value'>${customer.address}</td>
                        <td class='customer-salary-value'>${customer.phone}</td>
                    </tr>`;
          $("#customer-tbl-body").append(record);

          // Append options to the dropdown
          $("#customer-select").append(
            `<option value="${customer.id}">${customer.id}</option>`
          );
        });

        $("#customer-select").val($("#customerIdOrder").val()); // Assuming you want to pre-select a value
      },
      error: function (error) {
        console.error("Error fetching customer data:", error);
      },
    });
  }
  $("#customer-select").change(() => {
    const selectedCustomerId = $("#customer-select").val();
    console.log("Selected Customer ID:", selectedCustomerId);
    const selectedCustomer = customers.find(
      (customer) => customer.id == selectedCustomerId
    );
    if (selectedCustomer) {
      $("#customerIdOrder").val(selectedCustomer.id);
      $("#customerNameOrder").val(selectedCustomer.name);
      $("#customerAddressOrder").val(selectedCustomer.address);
      $("#customerPhoneOrder").val(selectedCustomer.phone);
    } else {
      console.error(`Customer with ID ${selectedCustomerId} not found.`);
    }
  });
  function loadItemData() {
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/items",
      type: "GET",
      dataType: "json",
      success: function (response) {
        items = response;

        // Clear the table and dropdown
        $("#item-tbl-body").empty();
        $("#item-select").empty();

        items.forEach((item) => {
          let record = `
            <tr>
                <td class='item-code-value' data-item-Code="${item.itemID}">${item.itemID}</td>
                <td class='item-name-value'>${item.itemName}</td>
                <td class='item-price-value'>${item.itemPrice}</td>
                <td class='item-qty-value'>${item.itemQty}</td>
            </tr>`;
          $("#item-tbl-body").append(record);

          // Append options to the dropdown
          $("#item-select").append(
            `<option value="${item.itemID}">${item.itemID}</option>`
          );
        });

        // Optionally set the selected item based on some condition (e.g., matching an order)
        $("#item-select").val($("#itemCodeOrder").val());
      },
      error: function (error) {
        console.error("Error fetching item data:", error);
      },
    });
  }
  $("#item-select").change(() => {
    const selectedItemCode = $("#item-select").val();
    console.log("Selected Item ID:", selectedItemCode);
    const selectedItem = items.find((item) => item.itemID == selectedItemCode);
    if (selectedItem) {
      $("#itemCodeOrder").val(selectedItem.itemID);
      $("#itemNameOrder").val(selectedItem.itemName);
      $("#itemPriceOrder").val(selectedItem.itemPrice);
      $("#itemQtyOrder").val(selectedItem.itemQty);
    } else {
      console.error(`Item with code ${selectedItemCode} not found.`);
      // Handle the error appropriately (e.g., display a message to the user)
    }
  });
  function showToast(message, duration = 4000) {
    const toast = document.createElement("div");

    // Styling for the toast
    toast.style.position = "relative";
    toast.style.padding = "20px 20px";
    toast.style.marginBottom = "10px";
    toast.style.borderRadius = "5px";
    toast.style.backgroundColor = "#f44336";
    toast.style.color = "white";
    toast.style.fontSize = "16px";
    toast.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
    toast.innerText = message;

    // Add the toast to the container
    document.getElementById("toast-container").appendChild(toast);

    // Remove the toast after the specified duration
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
  //test Order qty
  $("#OrderQty").on("input", () => {
    const orderQty = parseInt($("#OrderQty").val());
    const availableQty = parseInt($("#itemQtyOrder").val());

    if (orderQty > availableQty) {
      showToast("Order quantity exceeds available quantity!", 3000);
      $("#OrderQty").val(availableQty); // Reset to maximum available quantity
    }
  });
  $("#AddCartBtn").click(function () {
    const selectedItemCode = $("#itemCodeOrder").val();
    const selectedItem = items.find((item) => item.itemID == selectedItemCode);

    const availableQtyElement = $("#itemQtyOrder");
    const orderQtyElement = $("#OrderQty");

    const availableQty = parseInt(availableQtyElement.val()); // Get available quantity
    const orderQty = parseInt(orderQtyElement.val()); // Get order quantity

    if (orderQty > availableQty) {
      showToast("Order quantity exceeds available quantity!", 3000);
      return; // Prevent adding if order quantity exceeds available quantity
    }

    // Update the QtyOnHand (reduce by the OrderQty)
    const newQtyOnHand = availableQty - orderQty;
    availableQtyElement.val(newQtyOnHand); // Set the new available quantity

    selectedItem.itemQty = newQtyOnHand;

    // Create the order object with the dynamic OrderQty
    const order = {
      ItemCode: $("#itemCodeOrder").val(),
      ItemName: $("#itemNameOrder").val(),
      ItemPrice: parseFloat($("#itemPriceOrder").val()),
      ItemQty: orderQty,
      total: parseFloat($("#itemPriceOrder").val()) * orderQty,
    };

    // Add the item to the cart
    addItemToCart(order);
  });
  function addItemToCart(order) {
    const cartRow = document.createElement("tr");
    cartRow.innerHTML = `
        <td>${order.ItemCode}</td>
        <td>${order.ItemName}</td>
        <td>${order.ItemPrice.toFixed(2)}</td>
        <td>${order.ItemQty}</td>
        <td>${order.total.toFixed(2)}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
    `;
    document.getElementById("cart-tbl-body").appendChild(cartRow);
    const originalQty = parseInt($("#itemQtyOrder").val());

    // Add event listener to the Delete button
    cartRow.querySelector(".delete-btn").addEventListener("click", function () {
      // Restore the original quantity back to #itemQtyOrder
      const currentQty = parseInt($("#itemQtyOrder").val());
      const updatedQty = currentQty + order.ItemQty; // Add back the removed quantity
      $("#itemQtyOrder").val(updatedQty);

      cartRow.remove(); // Remove the row when the Delete button is clicked
    });
  }
});
