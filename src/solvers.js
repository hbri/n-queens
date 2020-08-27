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

var trees = [{
  queenAt: [0, 0],
  parent: null,
  children: []
}, {
  queenAt: [0, 1],
  parent: null,
  children: [{
    queenAt: [1, 0],
    parent: trees[1],
    children: []
  }, {
    queenAt: [1, 1],
    parent: trees[1],
    children: []
  }, {
    queenAt: [1, 2],
    parent: trees[1],
    children: []
  }, {
    queenAt: [1, 3],
    parent: trees[1],
    children: []
  }]
}, {
  queenAt: [0, 2],
  parent: null,
  children: []
}, {
  queenAt: [0, 3],
  parent: null,
  children: []
}];

var firstBoard = new Board([
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
var curRow = firstBoard.get(0);
var nextRow = firstBoard.get(1);
nextRow.togglePiece(0, 2);
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


window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
