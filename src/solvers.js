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
  // fred's solution recreated
  var solutionCount = 0;
  var board = new Board({n: n});
  var findSolution = function(row) {
    
    // if all rows exhausted
    if (row === n) {
      // increment solutionCount
      // stop
      solutionCount++;
      return; 
    } 

    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }  
    };
  findSolution(0);
  return solutionCount;
    // iterate over possible decisions
      // place a piece
      // recurse into remaining problem
      // unplace a piece

  /*var getNSolutions = function(n) {
    var nMinusOneSolutions = [];
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
    }


    var lastRow = nMinusOneSolutions[nMinusOneSolutions.length - 1];
    var tempArray = nMinusOneSolutions.slice(0);
    tempArray.pop();
    
   // store indices combos rather than copying every array each time
   // this logic will not work for queens though

    /*_.memoize(function(row) {
      if (row[index].includes(1)) {
        return row[index];
      }

    });
  
    for (var i = 0; i < nMinusOneSolutions.length; i++) {
      tempArray.splice(i, 0, lastRow); // insert in that particular row
      variations.push(tempArray);
      console.log(tempArray);
    }
    return nMinusOneSolutions.concat(variations);
    console.log(nMinusOneSolutions.concat(variations));
  };
   if (n === 1) {
     return 1;
   };
  return (getNSolutions(n).length-1)/(n/(n-1));*/
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }

  if (n === 2) {
    return new Board({n: 2});
  }

  if (n === 3) {
    return new Board({n: 3});
  }
  
  var solution = [];
  var board = new Board({n: n});
  var rows = board.rows();
  for (var i = 1; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      if (board.hasRowConflictAt(i) || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
        rows[i][j] = 0;
      }
      if (board.hasColConflictAt(j) || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
        rows[i][j] = 0;
      }
    }
  }
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }

  var solutionCount = 0;
  var board = new Board({n: n});
  var findSolution = function(row) {
    
    // if all rows exhausted
    if (row === n) {
      // increment solutionCount
      // stop
      solutionCount++;
      return; 
    } 

    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  return solutionCount;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};
