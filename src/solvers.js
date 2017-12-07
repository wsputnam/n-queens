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



window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var rows = board.rows();
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      rows[i][j] = 1;
      if (board.hasRowConflictAt(i)) {
        rows[i][j] = 0;
      }
      if (board.hasColConflictAt(j)) {
        rows[i][j] = 0;
      }
    }
  }
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({n: n});
  var rows = board.rows();
  this.children = [];
  // set column value at r = 0
  // var colCount = 0;
  // var solutions = [];
  // var getSols = function(rowNumber, colNumber) {
  //   rows[rowNumber][colNumber] = 1;
  //   for (var i = 0; i < rows[0].length; i++) {
      
  //   }
  
  
  // iterate through remaining rows  














/*  var solutionCount = 0;
  var board = new Board({n: n});
  var rows = board.rows();
  var cols = board.getCols();
  // n places to put it top row
  // n-1 places to put it next row
  var sum = function(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        count = count + sum(arr[i]);
      } else {
        count = count + arr[i];
      }
    }
    return count;
  };
  if (n === 1) {
    return 1;
  }

  
 // n-2 places to put it in next row
  for (var j = 0; j < rows.length; j++) {
    // rows[0][j] = 1;
    for (var i = 1; i < rows[j].length; i++) {
      rows[i][j] = 1;
      if (board.hasRowConflictAt(i)) {
        rows[i][j] = 0;
      }
      if (board.hasColConflictAt(j)) {
        rows[i][j] = 0;
      }
    }
    if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && sum(board.rows()) === n) {
      solutionCount++;
    }
  
    // generate a solution 
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;


*/

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  /* 
  var solution = [];
  var board = new Board({n: n});
  var rows = board.rows();
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      rows[i][j] = 1;
      if (board.hasRowConflictAt(i)) {
        rows[i][j] = 0;
      }
      if (board.hasColConflictAt(j)) {
        rows[i][j] = 0;
      }
      if (board.hasMajorDiagonalConflictAt(j)) {
        rows[i][j] = 0;
      }
      if (board.hasMinorDiagonalConflictAt(j)) {
        rows[i][j] = 0;
      }
    }
  }
*/
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
