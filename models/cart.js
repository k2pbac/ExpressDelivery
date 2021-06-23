module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.store = oldCart.storeName || "";

    this.add = function (item, quantity, id, store) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }
        storedItem.qty = storedItem.qty + quantity;
        storedItem.price = parseFloat((storedItem.item.price * storedItem.qty).toFixed(2));
        this.store = store;
        this.totalQty = this.totalQty + quantity;
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2)) + parseFloat((storedItem.item.price).toFixed(2) * quantity);
    }

    this.remove = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            //do nothing
            return "No item found";
        }
        if (storedItem.qty > 1) {
            storedItem.qty--;
            storedItem.price = parseFloat((storedItem.item.price * storedItem.qty).toFixed(2));
            this.totalQty--;
            this.totalPrice -= parseFloat((storedItem.item.price).toFixed(2));
        }
        else {
            this.totalQty--;
            this.totalPrice -= parseFloat((storedItem.item.price).toFixed(2));
            delete this.items[id];
        }

        if (this.totalQty <= 0) {
            this.totalPrice = 0;
        }
    }


    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
}