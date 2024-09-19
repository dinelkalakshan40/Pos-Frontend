$(document).ready(function () {
  generateNewItemId();
  loadItemTable();
  window.onload = function () {
    generateNewItemId();
  };
  $("#item-saveBtn").click(function () {
    event.preventDefault();
    let itemID = $("#itemIDtxt").val();
    let itemName = $("#itemNametxt").val();
    let itemPrice = $("#itemPricetxt").val();
    let itemQty = $("#itemQtytxt").val();

    const itemData = {
      itemID: itemID,
      itemName: itemName,
      itemPrice: itemPrice,
      itemQty: itemQty,
    };
    console.log(itemData);
    const itemJson = JSON.stringify(itemData);
    console.log(itemJson);
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item",
      type: "POST",
      data: itemJson,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));
        console.log("Item is Saved");
        loadItemTable();
        generateNewItemId();
        clearItemFields();
      },
      error: (res) => {
        console.error(res);
      },
    });
  });
  $("#item-updateBtn").click(function () {
    event.preventDefault();

    let itemID = $("#itemIDtxt").val();
    let itemName = $("#itemNametxt").val();
    let itemPrice = $("#itemPricetxt").val();
    let itemQty = $("#itemQtytxt").val();

    const itemData = {
      itemID: itemID,
      itemName: itemName,
      itemPrice: itemPrice,
      itemQty: itemQty,
    };
    console.log(itemData);
    const itemJson = JSON.stringify(itemData);
    console.log(itemJson);

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item?id=" + id,
      type: "PUT",
      data: itemJson,
      headers: { "Content-Type": "application/json" },
      success: (res) => {
        console.log(JSON.stringify(res));
        generateNewItemId();
        loadItemTable();
        clearItemFields();
      },
      error: (res) => {
        console.error(res);
        console.log("item update failed");
      },
    });
  });
  $("#item-deleteBtn").on("click", () => {
    event.preventDefault();
    let id = $("#itemIDtxt").val();

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item?id=" + id,
      type: "DELETE",
      success: (res) => {
        console.log(JSON.stringify(res));
        generateNewItemId();
        loadItemTable();
        clearItemFields();
      },
      error: (res) => {
        console.error(res);
        console.log("Item Not Deleted");
      },
    });
  });
  function generateNewItemId() {
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item", //
      method: "GET",
      dataType: "json",
      success: (res) => {
        console.log(res);

        $("#itemIDtxt").val(res);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
  function clearItemFields() {
    $("#itemIDtxt").val("");
    $("#itemNametxt").val("");
    $("#itemPricetxt").val("");
    $("#itemQtytxt").val("");
  }

  $("#item-clearBtn").click(function () {
    $("#itemNametxt").val("");
    $("#itemPricetxt").val("");
    $("#itemQtytxt").val("");
    generateNewItemId();
  });

  $("#item-searchBtn").click(function () {
    $("#searchItem").val("");
  });
  function loadItemTable() {
    $("#itemTableBody").empty();
    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item?action=loadAll",
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res); // Log the response to verify the data format

        if (Array.isArray(res)) {
          console.log(res);
          // Check if 'res' is an array
          res.forEach(function (item) {
            var itemRecord = `
                <tr>
                    <td class="c-itemID">${item.itemID}</td>
                    <td class="c-itemName">${item.itemName}</td>
                    <td class="c-itemPrice">${item.itemPrice}</td>
                    <td class="c-itemQty">${item.itemQty}</td>
                </tr>`;
            $("#itemTableBody").append(itemRecord);
          });
        } else {
          console.log("No Item data found or incorrect response format.");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading Item data:", textStatus, errorThrown);
      },
    });
  }
  $("#item-searchBtn").on("click", function () {
    const itemID = $("#searchItem").val().toLowerCase();

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item?itemID=" + itemID,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response && response.id) {
          console.log("Item retrieved successfully:", response);

          $("#itemIDtxt").val(response.itemID);
          $("#itemNametxt").val(response.itemName);
          $("#itemPricetxt").val(response.itemPrice);
          $("#itemQtytxt").val(response.itemQty);

          // generateNewCustomerId(); // Uncomment if needed.
          clearItemBtn();
        } else {
          alert("Item ID not found in the database.");
        }
      },

      error: function (error) {
        console.error("Error searching Item:", error);
        alert("Error: Item not found");
        loadItemTable();
      },
    });
  });
  $("#itemTableBody").on("click", "tr", function () {
    var index = $(this).index();
    recordIndex = index;
    var itemID = $(this).find("td:eq(0)").text();
    var itemName = $(this).find("td:eq(1)").text();
    var itemPrice = $(this).find("td:eq(2)").text();
    var itemQty = $(this).find("td:eq(3)").text();

    $("#itemIDtxt").val(itemID);
    $("#itemNametxt").val(itemName);
    $("#itemPricetxt").val(itemPrice);
    $("#itemQtytxt").val(itemQty);
  });
});
