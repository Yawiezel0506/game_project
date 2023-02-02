// class for create the pallets
class Pallet {
  // bild the pallet elements
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  // drow the pallet
  drow() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "silver";
    c.fill();
    c.closePath();
  }
}
