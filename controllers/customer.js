$(document).ready(function () {
  // Optionally, generate a new customer ID when the page loads
  window.onload = function () {
    generateNewCustomerId();
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

        generateNewCustomerId();
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
});
