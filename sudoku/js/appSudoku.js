window.onload = () => {
  declareEvents();
};

const declareEvents = () => {
  let board = [
    [0, 0, 0, 0, 0, 0, 7, 0, 9],
    [4, 0, 6, 0, 0, 0, 1, 2, 0],
    [0, 8, 0, 1, 0, 3, 4, 0, 0],
    [2, 3, 0, 0, 6, 0, 8, 9, 1],
    [0, 6, 7, 0, 0, 1, 2, 0, 4],
    [8, 9, 1, 2, 0, 0, 0, 0, 0],
    [3, 4, 0, 6, 7, 0, 9, 1, 2],
    [6, 0, 0, 0, 0, 2, 3, 4, 5],
    [0, 1, 0, 0, 4, 5, 0, 7, 0],
  ];

  let level_list = document.querySelectorAll(".buttons button");
  level_list.forEach((element) => {
    element.addEventListener("click", (e) => {
      let id_level = e.target.id;
      console.log(id_level);
      setBoardLevel(id_level , board);
    });
  });

  setSudokuBoard(board);
};


const setBoardLevel =(_buttonId , _board)=> {
  let firstIndex = Number(_buttonId);
  console.log(firstIndex);
  let secondIndex = Math.floor(Math.random()* (boards_array[firstIndex].length))
  console.log(secondIndex);
  _board = boards_array[firstIndex][secondIndex];
  console.log(_board);
  setSudokuBoard(_board);
}

const setSudokuBoard =(_brd)=> {
  let result = JSON.parse(JSON.stringify(_brd));

  console.log(result);
  console.log(_brd);
  createDigits();
  sudokuSolver(result);
  createBoard(_brd, result);
}

