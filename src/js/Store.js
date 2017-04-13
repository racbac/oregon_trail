function Store(location, ox, clothes, ammo, axle, wheel, tongue, food) {
    this.location = location;

    this.oxen = ox || 20.00;
    this.clothing = clothes || 10.00;
    this.ammo = ammo || 2.00;
    this.wheels = wheel || 10.00;
    this.axles = axle || 10.00;
    this.tongues = tongue || 10.00;
    this.food = food || 0.20;
}