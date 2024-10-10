$(document).ready(function () {
  // loadCustomerTable();
  generateNewCustomerId();

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
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers",
      type: "POST",
      contentType: "application/json",
      data: customerJSON,
      success: function (res, status, xhr) {
        console.log("Response received:", xhr.status); // Should print 201 (Created)
        console.log(res);
        generateNewCustomerId();
        clearCustomerFields();
      },
      error: (res) => {
        console.error(JSON.stringify(res));
      },
    });
  });
  function generateNewCustomerId() {
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers/customerId", //
      method: "GET",
      dataType: "json",
      success: (res) => {
        console.log(res);

        $("#customerId").val(res.customerId);
        if (res.message) {
          console.log(res.message); // Log the message with the customer ID
        }
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
  $("#update-customer").click(function () {
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

    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);

    $.ajax({
      url: `http://localhost:8080/SpringPosSystem/api/v1/customers/${id}`,
      type: "PUT",
      contentType: "application/json", // Ensure content type is JSON
      data: customerJSON,
      success: function (res, status, xhr) {
        console.log("Customer Updated", xhr.status); // Should print 201 (Created)
        generateNewCustomerId();
        clearCustomerFields();
      },
      error: (res) => {
        console.error(res);
        console.log("customer update failed");
      },
    });
  });
  $("#delete-customer").on("click", () => {
    event.preventDefault();
    let id = $("#customerId").val();

    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers/" + id,
      type: "DELETE",
      success: (res) => {
        console.log(JSON.stringify(res));
        generateNewCustomerId();
        //  loadCustomerTable();
        clearCustomerFields();
      },
      error: (res) => {
        console.error(res);
        console.log("Customer Not Deleted");
      },
    });
  });
  /*  
  
  

  
  
  $("#customer-clear-btn").click(function () {
    $("#customerName").val("");
    $("#customerPhone").val("");
    $("#customerAddress").val("");
    generateNewCustomerId();
  });

  $("#searchCustomerCanel").click(function () {
    $("#searchCustomer").val("");
  });

  function loadCustomerTable() {
    $("#customerTableBody").empty();
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/customers?action=loadAll",
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res); // Log the response to verify the data format

        if (Array.isArray(res)) {
          console.log(res);
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

  $("#search-customer").on("click", function () {
    const customerID = $("#searchCustomer").val().toLowerCase();

    $.ajax({
      url:
        "http://localhost:8080/CafeManagement2024/customer?customerID=" +
        customerID,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response && response.id) {
          console.log("Customer retrieved successfully:", response);

          $("#customerId").val(response.id);
          $("#customerName").val(response.name);
          $("#customerPhone").val(response.phone);
          $("#customerAddress").val(response.address);

          // generateNewCustomerId(); // Uncomment if needed.
          clearBtn();
        } else {
          alert("Customer ID not found in the database.");
        }
      },

      error: function (error) {
        console.error("Error searching customer:", error);
        alert("Error: Customer not found");
        loadCustomerTable();
      },
    });
  });

  $("#customerTableBody").on("click", "tr", function () {
    var index = $(this).index();
    recordIndex = index;
    var id = $(this).find("td:eq(0)").text();
    var name = $(this).find("td:eq(1)").text();
    var phone = $(this).find("td:eq(2)").text();
    var address = $(this).find("td:eq(3)").text();

    $("#customerId").val(id);
    $("#customerName").val(name);
    $("#customerPhone").val(phone);
    $("#customerAddress").val(address);
  }); */
});
