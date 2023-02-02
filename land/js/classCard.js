class GamesClass{
    constructor(_parent, _item){
      this.parent = _parent;
      this.name = _item.name;
      this.kind = _item.kind;
      this.players = _item.players;
      this.img = _item.image;
      this.description = _item.descrption;
      this.src = _item.src;

    }
  
    render(){
      let div = document.createElement("div");
      div.className = "col-lg-0 border p-3 m-4 bg-dark ";
  
      document.querySelector(this.parent).append(div);
  
      div.innerHTML += `
      <img src="${this.img}" class="w-25 float-start me-2 p-1">
      <h4>${this.name}</h4>
      <div> Kind:</div>
      <div>${this.kind}</div><br>
      <div> Description:</div>
      <div>${this.description}</div><br>
      <div> Players:</div>
      <div> ${this.players}</div><br>
      `
  
      let btn = document.createElement("button");
      btn.innerHTML = "Start to play";
      btn.className = "btn btn-primary w-25";
      div.append(btn);
  
      
  
      btn.addEventListener("click", ()=>{
        open(this.src, '_self')
      })
    }
  }