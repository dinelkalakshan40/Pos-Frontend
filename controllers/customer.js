$(document).ready(function () {
  // Optionally, generate a new customer ID when the page loads
  window.onload = function () {
    generateNewCustomerId();
    loadCustomerTable();
  };

  $("#save-customer").click(function () {
    event.preventDefault();

    let id = $("#customerId").val();
    let name = $("#customerName").val();
    let phone = $("#customerPhone").val();
    let address = $("#customerAddress").val();

    const customerData = {
      id: id,
      name: name,
      phone: phone,
      address: address,
    };
    console.log(customerData);

    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer",
      type: "POST",
      data: customerJSON,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));

        clearCustomerFields();
      },
      error: (res) => {
        console.error(res);
      },
    });
  });

  // Event listener for the "Add" button

  function generateNewCustomerId() {
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer", // URL of your servlet
      method: "GET",
      success: (res) => {
        // Populate the Customer ID input field with the response data
        $("#customerId").val(res);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
  function clearCustomerFields() {
    $("#customerId").val("");
    $("#customerName").val("");
    $("#customerPhone").val("");
    $("#customerAddress").val("");
  }
  /* function loadCustomerTable() {
    $("#customerTableBody").empty();
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer",
      method: "GET",
      success: function (resp) {
        console.log("Success: ", resp);
        for (const customer of resp) {
          $("#customerTableBody").append(`<tr>
                  <td>${customer.id}</td>
                  <td>${customer.name}</td>
                  <td>${customer.address}</td>
                  <td>${customer.phone}</td>
              </tr>`);
        }
      },
    });
  } */
  function loadCustomerTable() {
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer",
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res); // Log the response to verify the data format

        if (Array.isArray(res)) {
          // Check if 'res' is an array
          res.forEach(function (customer) {
            var customerRecord = `
                <tr>
                    <td class="c-id">${customer.id}</td>
                    <td class="c-name">${customer.name}</td>
                    <td class="c-address">${customer.phone}</td>
                    <td class="c-phoneNumber">${customer.address}</td>
                </tr>`;
            $("#customerTableBody").append(customerRecord);
          });
        } else {
          console.log("No customer data found or incorrect response format.");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading customer data:", textStatus, errorThrown);
      },
    });
  }

  /* function loadCustomerTable() {
    const $tableBody = $("#customerTableBody");
    $tableBody.empty();

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer",
      method: "GET",
      dataType: "json", // Ensures the response is parsed as JSON
      success: (customerss) => {
        if (Array.isArray(customerss) && customerss.length > 0) {
          console.log("Customers received:", customerss);
          customerss.forEach((customer) => {
            const $row = $("<tr></tr>"); // Create a new row

            // Create and append cells to the row
            $("<td></td>").text(customer.id).appendTo($row);
            $("<td></td>").text(customer.name).appendTo($row);
            $("<td></td>").text(customer.address).appendTo($row);
            $("<td></td>").text(customer.phone).appendTo($row);

            // Append the row to the table body
            $tableBody.append($row);
          });
        } else {
          console.warn("No customers available or response is not an array.");
          const $row = $("<tr></tr>");
          $('<td colspan="4">No customers available</td>').appendTo($row);
          $tableBody.append($row);
        }
      },
      error: function (error) {
        console.error("Error fetching customers:", error);
        alert("An error occurred while fetching the customers.");
      },
    });
  } */
});
