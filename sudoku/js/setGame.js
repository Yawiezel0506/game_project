let numSelected = null;
let tileSelected = null;
let prevButton = null;

let errors = 0;

const createDigits = () => {
  document.querySelector("#digits").innerHTML = '';
  // digitd 1-9
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", () => {
      // 
      if (prevButton != null) {
        prevButton.classList.remove("numberSelected");
      }
      // 
      prevButton = number;
      numSelected = number.id;
      console.log(numSelected);
      //
      number.classList.add("numberSelected");
    });
    number.classList.add("numbers");
    document.querySelector("#digits").append(number);
  }
};

const createBoard = (_brd, _solution) => {
  document.querySelector('#board').innerHTML = '';
  errors = 0;
  document.querySelector("#errors").innerHTML = errors;
  // board 9*9
  for (let row = 0; row < 9; row++) {
    for (let colm = 0; colm < 9; colm++) {
      let tile = document.createElement("div");
      tile.id = `${row}${colm}`;
      console.log("id=" + tile.id);
      if (_brd[row][colm] != 0) {
        tile.innerText += _brd[row][colm];
        tile.classList.add("tile-start");
      }
      if (row == 2 || row == 5) {
        tile.classList.add("bottom-line");
      }
      if (colm == 2 || colm == 5) {
        tile.classList.add("right-line");
      }
      tile.addEventListener("click", (e) => {
        if (numSelected) {
          if (e.target.innerText != "") {
            return;
          }
        }

        let cords = e.target.id.split("");
        console.log(cords);
        let row = parseInt(cords[0]);
        let colm = parseInt(cords[1]);
        console.log(row, colm);
        console.log(_solution[row][colm]);
        console.log(numSelected);

        if (_solution[row][colm] == numSelected) {
          e.target.innerText = numSelected;
        } else {
          errors++;
          document.querySelector("#errors").innerHTML = errors;
        }
      });
      tile.classList.add("tile");
      document.querySelector("#board").append(tile);
    }
  }
  // checkBoard();
};

// const checkBoard =(_board)=> {
//   let counter = 0;
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (_board[i][j] > 0) {
//         counter++;
//       }
//     }
//   }
//   if (counter == 81) {
//     alert('you won!');
//   }
// }


