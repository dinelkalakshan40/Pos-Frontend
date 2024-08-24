$(document).ready(function () {
  $("#save-customer").click(function () {
    event.preventDefault();

    let customerIdF = $("#customerId").val();
    let customerNameF = $("#customerName").val();
    let customerPhoneF = $("#customerPhone").val();
    let customerAddressF = $("#customerAddress").val();

    const customerData = {
      customerid: customerIdF,
      customername: customerNameF,
      customerphone: customerPhoneF,
      customeraddress: customerAddressF,
    };
    console.log(customerData);

    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);

    $.ajax({
      url: "http://localhost:8080/CafeManangement2024/customer",
      type: "POST",
      data: customerJSON,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));
      },
      error: (res) => {
        console.error(res);
      },
    });
  });
});
