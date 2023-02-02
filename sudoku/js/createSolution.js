const sudokuSolver = (_brd) => {
  let nonPossibilities = {};
  let impossibleNumbers;
  let emptySpaces = 81;

  while (emptySpaces > 0) {
    emptySpaces = 0;
    for (let vert = 0; vert < _brd.length; vert++) {
      for (let horiz = 0; horiz < _brd.length; horiz++) {
        // console.log(_brd[vert][horiz]);
        if (_brd[vert][horiz] == 0) {
          nonPossibilities = {};
          for (let i = 0; i < 9; i++) {
            if (_brd[vert][i] > 0) {
              nonPossibilities[_brd[vert][i]] = true;
            }

            if (_brd[i][horiz] > 0) {
              nonPossibilities[_brd[i][horiz]] = true;
            }
          }

          for (
            let vertBox = Math.floor(vert / 3) * 3;
            vertBox < Math.floor(vert / 3) * 3 + 3;
            vertBox++
          ) {
            for (
              let horizBox = Math.floor(horiz / 3) * 3;
              horizBox < Math.floor(horiz / 3) * 3 + 3;
              horizBox++
            ) {
              if (_brd[vertBox][horizBox] > 0) {
                nonPossibilities[_brd[vertBox][horizBox]] = true;
              }
            }
          }

          console.log(nonPossibilities);

          impossibleNumbers = Object.keys(nonPossibilities);
          if (impossibleNumbers.length == 8) {
            for (let i = 1; i < 10; i++) {
              if (impossibleNumbers.indexOf(String(i)) < 0) {
                _brd[vert][horiz] = i;
              }
            }
          } else {
            emptySpaces++;
          }
        }
      }
    }
  }
  return _brd;
};
