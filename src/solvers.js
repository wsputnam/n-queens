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


  var getNSolutions = function(n) {
    var nMinusOneSolutions = [];
    var nSolutions = [];
    var variations = [];
    var nRows;
    if (n === 1) {
      return [[1]];
    }
    if (n > 1) {
      nMinusOneSolutions = getNSolutions(n - 1);

      for (var i = 0; i < nMinusOneSolutions.length; i++) {
        nMinusOneSolutions[i].push(0);
      }

      nMinusOneSolutions.push(Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0));
      nMinusOneSolutions[n - 1][n - 1] = 1;
      console.log(nMinusOneSolutions);
    }
    var lastRow = nMinusOneSolutions[nMinusOneSolutions.length - 1];
    var tempArray = nMinusOneSolutions;
    tempArray.pop();
    for (var i = 0; i < nMinusOneSolutions.length; i++) {
      tempArray.splice(i, 0, lastRow); // insert in that particular row
      variations.push(tempArray);
    }
    console.log(variations);
    return getMinusOneSolutions.concat(variations);

  };
  return getNSolutions(n).length;
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
