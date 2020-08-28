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

var Tree = function(row, col, parent = null) {
  this.queenRow = row;
  this.queenCol = col;
  this.parent = parent;
};

Tree.prototype.getNumAncestors = function() {
  var count = 0;
  var tree = this;
  while (tree.parent !== null) {
    count++;
    tree = tree.parent;
  }
  return count;
};

Tree.prototype.generateChildren = function(numChildren) {
  var row = this.getNumAncestors();
  this.children = [];
  for (var i = 0; i < numChildren; i++) {
    this.children.push(new Tree(row, i, this));
  }
};

Tree.prototype.toggleBoard = function(board) {
  var me = this;
  while (me.queenRow !== undefined) {
    board.togglePiece(me.queenRow, me.queenCol);
    me = me.parent;
  }
};

window.findNPiecesSolution = function(n, pieces) {

  var solution = new Board({n: n});
  if (pieces === 'rooks') {
    solution.conflictChecker = solution.hasAnyRooksConflicts;
  } else if (pieces === 'queens') {
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

  console.log('Single solution for ' + n + ' ' + pieces + ':', JSON.stringify(solution));
  return solution.rows();
};

window.findNRooksSolution = function(n) {
  return findNPiecesSolution(n, 'rooks');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var root = new Tree();
  var solution;
  var traverse = function(tree) {
    var board = new Board({n: n});
    tree.toggleBoard(board);
    if (!board.hasAnyQueensConflicts()) {
      if (tree.getNumAncestors() === n) {
        solution = board.rows();
      } else {
        if (solution === undefined) {
          tree.generateChildren(n);
          for (var i = 0; i < tree.children.length; i++) {
            var child = tree.children[i];
            traverse(child);
          }
        }
        //   // return solution;
        // }
      }
    }
  };

  traverse(root);
  return solution === undefined ? new Board({n: n}).rows() : solution;
};

window.countNPiecesSolutions = function(n, pieces) {
  if (pieces === 'rooks') {
    Board.prototype.conflictChecker = Board.prototype.hasAnyRooksConflicts;
  } else if (pieces === 'queens') {
    Board.prototype.conflictChecker = Board.prototype.hasAnyQueensConflicts;
  }

  var solutionCount = 0;
  var root = new Tree();

  var traverse = function(tree) {
    var board = new Board({n: n});
    tree.toggleBoard(board);
    if (!board.conflictChecker()) {
      if (tree.getNumAncestors() === n) {
        solutionCount++;
      } else {
        tree.generateChildren(n);
        tree.children.forEach(function(child) {
          traverse(child);
        });
      }
    }
  };

  traverse(root);

  console.log('Number of solutions for ' + n + ' ' + pieces + ':', solutionCount);
  return solutionCount;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return countNPiecesSolutions(n, 'rooks');
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  debugger;
  return countNPiecesSolutions(n, 'queens');
};
