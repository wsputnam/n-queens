// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // if there are multiple 1's in row with index rowIndex
    
  
      var row = this.rows()[rowIndex];
      var sum = 0;
      for (var i = 0; i < row.length; i++) {
        sum += row[i];
        if (sum > 1) {
          return true;
        }
      }

      
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        var sum = 0;
        for (var j = 0; j < rows[i].length; j++) {
          sum += rows[i][j];
        }
        if (sum > 1) {
          return true;
        }
      
      }
      return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    getCols: function() {
      var n = this.rows().length;
      var output = new Array(n);
      for (var i = 0; i < output.length; i++) {
        output[i] = [];
      }
      // output needs to be an array of Arrays with length n;
      var rowArr = this.rows();
      //debugger;
      for (var i = 0; i < rowArr.length; i++) {
        for (var j = 0; j < rowArr[i].length; j++) {
          output[j].push(rowArr[i][j]);
        }
      }
      return output; 
    },

    hasColConflictAt: function(colIndex) {
      //console.log(4);
      var columns = this.getCols();
      var col = columns[colIndex];
      // console.log(columns);
      // debugger; 
      var sum = 0;
      for (var i = 0; i < col.length; i++) {
        sum += col[i];
        if (sum > 1) {
          return true;
        }
      }

      
      return false; 
      
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
 

      var columns = this.getCols();
      for (var i = 0; i < columns.length; i++) {
        var sum = 0;  
        for (var j = 0; j < columns[i].length; j++) {
          sum += columns[i][j];      
        }
        if (sum > 1) {
          return true; 
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {


      var rows = this.rows();
      var n = rows.length;
      //debugger;
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var sum = 0;
        var diagLength = n + majorDiagonalColumnIndexAtFirstRow;
        var j = 0;
        for (var i = -1 * majorDiagonalColumnIndexAtFirstRow; i < n; i++) {
          sum += rows[i][j];
          j++;
          if (sum > 1) {
            return true; 
          }
        }
        return false; 
      }
        
      var sum = 0;
      var i = 0;
      for (var j = majorDiagonalColumnIndexAtFirstRow; j < n; j++) {
        sum += rows[i][j];
        i++;
        if (sum > 1) {
          return true; 
        }
      }

      
      return false;   
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var n = rows.length; 
      for (var k = -n + 1; k < n; k++) {
        var sum = 0;
        if (k < 0) {
          var j = 0;
          for (var i = -1 * k; i < n; i++) {
            sum += rows[i][j];
            j++;
            if (sum > 1) {
              return true; 
            }
          }
        }
        if (k >= 0) {
          var diagLength = n - k;
          var j = k;
          for (var i = 0; i < diagLength; i++) {
            sum += rows[i][j];
            j++;
            if (sum > 1) {
              return true; 
            }
          }
        }
      }
      return false; 
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var n = rows.length; 
      var sum = 0;
      var i = 0;
      if (minorDiagonalColumnIndexAtFirstRow < n) {
        for (var j = minorDiagonalColumnIndexAtFirstRow; j >= 0; j--) {
          sum += rows[i][j];
          i++;
          if (sum > 1) {
            return true; 
          }
        }
        return false;  
      }
      if (minorDiagonalColumnIndexAtFirstRow >= n) {
        var rowInd = minorDiagonalColumnIndexAtFirstRow - (n - 1);
        for (var j = n - 1; j >= minorDiagonalColumnIndexAtFirstRow - (n - 1); j--) {
          sum += rows[rowInd][j];
          rowInd++;
          if (sum > 1) {
            return true;
          }
        }
        return false;
      }
      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var n = rows.length; 
      for (var k = 0; k < 2 * n - 2; k++) {
        var sum = 0;
        var colIndex = k;
        if (k < n) {
          //debugger;
          for (var i = 0; i < k + 1; i++) {
            sum += rows[colIndex][i];
            colIndex--;
            if (sum > 1) {
              return true; 
            }
          }
        }
        if (k >= n) {
          var rowInd = k - (n - 1);
          for (var j = n - 1; j >= k - (n - 1); j--) {
            //debugger;
            sum += rows[rowInd][j];
            rowInd++;
            if (sum > 1) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };



}());
