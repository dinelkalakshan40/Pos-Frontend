$(document).ready(function () {
  // Optionally, generate a new customer ID when the page loads
  // loadCustomerTable();
  generateNewCustomerId();
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
      url: "http://localhost:8080/CafeManagement2024/customer" + id,
      type: "POST",
      data: customerJSON,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));
        generateNewCustomerId();
        loadCustomerTable();
        clearCustomerFields();
      },
      error: (res) => {
        console.error(res);
      },
    });
  });
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
    console.log(customerData);

    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer?id=" + id,
      type: "PUT",
      data: customerJSON,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));
        console.log("customer updated");
        generateNewCustomerId();
        loadCustomerTable();
        clearCustomerFields();
      },
      error: (res) => {
        console.error(res);
        console.log("customer update failed");
      },
    });
  });

  function generateNewCustomerId() {
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer", //
      method: "GET",
      dataType: "json",
      success: (res) => {
        console.log(res);
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

  function loadCustomerTable() {
    $("#customerTableBody").empty();
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/customer?action=loadAll",
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
  });
});
