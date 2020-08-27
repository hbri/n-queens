/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// construct an array -> trees
// member of trees = n
// push {} into trees n times
// then set queenAt property for each object from 0,0 -> 0,1 -> 0,n
// give parent property at null
// give children array -> empty
// do a thing for each object in array:
//   generate a new empty nxn board
//   call toggle pieces method on new board at queenAt  value
//   check if parent that's not null
//     if so, look at that parents queenAt value and toggle the board at that location
//       if that parent has a parent that has a parent that's not null do the same step as above
//         once parent at null, stop toggling pieces and check board
//   check if board passes board conflict tests
//   check last row for queen, if preent, increment counter up
//   return counter value


window.findNPiecesSolution = function(n, piece) {

  var solution = new Board({n: n});
  if (piece === 'rook') {
    solution.conflictChecker = solution.hasAnyRooksConflicts;
  } else if (piece === 'queen') {
    solution.conflictChecker = solution.hasAnyQueensConflicts;
  }
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      solution.togglePiece(r, c);
      if (!solution.conflictChecker()) {
        break;
      } else {
        solution.togglePiece(r, c);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

window.findNRooksSolution = function(n) {
  return findNPiecesSolution(n, 'rook');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  return findNPiecesSolution(n, 'queen');
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
