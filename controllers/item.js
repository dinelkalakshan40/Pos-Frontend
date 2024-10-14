$(document).ready(function () {
  generateNewItemId();
  loadItemTable();

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
    const itemJson = JSON.stringify(itemData);
    console.log(itemJson);
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/items",
      type: "POST",
      data: itemJson,
      contentType: "application/json",
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
  function generateNewItemId() {
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/items/itemId", //
      method: "GET",
      dataType: "json",
      success: (res) => {
        console.log(res);

        $("#itemIDtxt").val(res.itemId);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
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
      url: `http://localhost:8080/SpringPosSystem/api/v1/items/${itemID}`,
      type: "PUT",
      data: itemJson,
      contentType: "application/json",
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
  function clearItemFields() {
    $("#itemIDtxt").val("");
    $("#itemNametxt").val("");
    $("#itemPricetxt").val("");
    $("#itemQtytxt").val("");
  }
  $("#item-deleteBtn").on("click", () => {
    event.preventDefault();
    let itemID = $("#itemIDtxt").val();

    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/items/" + itemID,
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
  $("#item-clearBtn").click(function () {
    $("#itemNametxt").val("");
    $("#itemPricetxt").val("");
    $("#itemQtytxt").val("");
    generateNewItemId();
  });
  function loadItemTable() {
    $("#itemTableBody").empty();
    $.ajax({
      url: "http://localhost:8080/SpringPosSystem/api/v1/items",
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res); // Log the response to verify the data format

        if (Array.isArray(res)) {
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
  /*  
  
  
  

  

  $("#item-cancelBtn").click(function () {
    $("#searchItem").val("");
  });
  
  $("#item-searchBtn").on("click", function () {
    const itemID = $("#searchItem").val().toLowerCase();

    $.ajax({
      url: "http://localhost:8080/CafeManagement2024/item?itemID=" + itemID,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response && response.itemID) {
          console.log("Item retrieved successfully:", response);

          $("#itemIDtxt").val(response.itemID);
          $("#itemNametxt").val(response.itemName);
          $("#itemPricetxt").val(response.itemPrice);
          $("#itemQtytxt").val(response.itemQty);
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
  }); */
});
