window.onload = () => {
  let user = document.querySelector('#userName');
  user.innerHTML = localStorage.getItem('playerName');
  
  
    createAllGames();
  }
  
  const createAllGames = () => {

    //create cards for games
    json_ar.forEach(item => {
      let game = new GamesClass(".row", item);
      game.render();
    });
  }