$(document).ready(function () {
  let customers = [];
  loadCustomerData();

  function loadCustomerData() {
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers", // The endpoint to get all customers
      type: "GET",
      dataType: "json", // Expecting a JSON response from the server
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

        // Optionally set the selected customer based on some condition
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
      // Handle the error appropriately (e.g., display a message to the user)
    }
  });
});
