function Store(ox, clothes, bait, axle, wheel, tongue, food) {
    this.bill = 0.00;

    this.oxen = {price: ox || 20.00, amt: 0};
    this.clothing = {price: clothes || 10.00, amt: 0};
    this.bait = {price: bait || 2.00, amt: 0};
    this.wheels = {price: wheel || 10.00, amt: 0};
    this.axles = {price: axle || 10.00, amt: 0};
    this.tongues = {price: tongue || 10.00, amt: 0};
    this.food = {price: food || 0.20, amt: 0};
}

Store.prototype.buyItem = function(itemName,caravan,amt){
	caravan.itemName+=amt;
	caravan.money-=this.itemName*amt;
}

Store.prototype.adjust_bill = function(item, new_amt) {
    this.bill -= this[item].price * this[item].amt;
    this[item].amt = new_amt;
    this.bill += this[item].price * this[item].amt;
}

Store.prototype.item_bill = function(...items) {
    var bill = 0.00;
    for (var i = 0; i < items.length; i++) {
        bill += this[items[i]].price * this[items[i]].amt;
    }
    return bill;
}