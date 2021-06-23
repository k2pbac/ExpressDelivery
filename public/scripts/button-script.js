const minus = document.querySelectorAll(".quantityMinus");
const add = document.querySelectorAll(".quantityPlus");
const addCart = document.querySelectorAll(".addCart");


$(document).on('click', '.removeCart', function (event) {
    event.preventDefault(); // Stops browser from navigating away from page

    console.log((this.id).substring(5, (this.id).length));

    var storeId = $("#storeID0").val();
    var productId = (this.id).substring(5, (this.id).length);
    $.ajax({
        type: "GET",
        url: `/delivery/stores/${storeId}/removeFromCart/${productId}`,
        data: "",
        success: function (msg) {
            $(".offcanvas-body").load("/reloadCart", function (response, status, xhr) {
                console.log(status);
            });
            $("#cartCount").html(parseInt($("#cartCount").html()) - 1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
        }
    });
});

$(document).on('click', '.addCart', function (event) {

    event.preventDefault(); // Stops browser from navigating away from page
    var storeId = $("#storeID" + this.id).val();
    var productId = $("#productID" + this.id).val();
    var quantity = $("#quantity" + this.id).val();


    $.ajax({
        type: "GET",
        url: `/delivery/stores/${storeId}/addToCart/${productId}`,
        data: { quantity: quantity },
        success: function (data) {
            $(".offcanvas-body").load("/reloadCart", function (response, status, xhr) {
                console.log(status);
            });
            $("#cartCount").html(parseInt($("#cartCount").html()) + parseInt(quantity));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
        }
    });
})


$(document).on('click', '.add2Cart', function (event) {
    event.preventDefault(); // Stops browser from navigating away from page
    var storeId = $("#storeID0").val();
    var productId = this.id;
    var quantity = 1;

    $.ajax({
        type: "GET",
        url: `/delivery/stores/${storeId}/addToCart/${productId}`,
        data: { quantity: quantity },
        success: function (data) {
            $(".offcanvas-body").load("/reloadCart", function (response, status, xhr) {
                console.log(status);
            });
            $("#cartCount").html(parseInt($("#cartCount").html()) + 1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
        }
    });

})



add.forEach((el, index) => {
    const setCost = document.querySelector("#cost" + index).innerHTML;

    el.addEventListener("click", function () {
        let cost = document.querySelector("#cost" + index);
        let quantity = parseInt(document.querySelector("#quantity" + index).value) + 1;
        const totalCost = parseFloat((setCost * quantity).toFixed(2));
        cost.innerHTML = totalCost;
    });
})


minus.forEach((el, index) => {
    const setCost = document.querySelector("#cost" + index).innerHTML;

    el.addEventListener("click", function () {
        let cost = document.querySelector("#cost" + index);
        let quantity = parseInt(document.querySelector("#quantity" + index).value) - 1;
        if (quantity > 0) {
            const totalCost = parseFloat((setCost * quantity).toFixed(2));
            cost.innerHTML = totalCost;
        }
    });
})
