function Store(location, ox, clothes, ammo, axle, wheel, tongue, food) {
    this.location = location;

    this.ox = ox || 20.00;
    this.clothing = clothes || 10.00;
    this.ammo = ammo || 2.00;
    this.wheel = wheel || 10.00;
    this.axle = axle || 10.00;
    this.tongue = tongue || 10.00;
    this.food = food || 0.20;
}