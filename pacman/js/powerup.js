// class for create the powerUp
class powerUp {
    // bild the pallet elements
    constructor({ position }) {
      this.position = position;
      this.radius = 7;
    }
  
    // drow the pallet
    drow() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = "orange";
      c.fill();
      c.closePath();
    }
  }