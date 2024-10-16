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
});
