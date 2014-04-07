// CONSTS

var SHAPES = {
    SNAKE : "snake",
    APPLE : "apple",
    BORDER : 'border'
};

var DIRECTION = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39
};


var TEXTURE = {
    snake : {
        'background-color' : '#009200',
        'border-radius' : 0
    },
    apple : {
        'background-color' : '#920000',
        'border-radius' : '50%'
    },
    text : {
        'background-color' : '#cf4000',
        'border-radius' : 0
    }
};


function Game() {
    // todo    
}

function Canvas(domTarget, gridX, gridY) {
    // Creates canvas in dom element

    var matrix = new Matrix($(domTarget), gridX, gridY);
    
    this.draw = function(x,y, shape) {
        var cell = matrix.getCell(x,y)
        if (cell !== null) {
            cell.queuedShape = shape;
        }       
    };
    
    this.clear = function(x,y) {
        matrix.getCell(x,y).hide();
    };
    
    this.clearAll = function() {
        matrix.clearAll();
    };
    
    this.update = function() {
        matrix.renderAll();
    };
    
    // this.drawStraight = function(horizontal, start, end, plane, shape) {
        // if (end < start) {
            // var holdStart = start;
            // start = end;
            // end = holdStart;
        // }
//         
        // var units = (end - start) +1;
//         
        // for (var i = 0; i < units; i++) {
            // if (horizontal) {
                // var xToDraw = start + i;
                // this.draw(xToDraw, plane, shape);
            // }
            // else {
                // var yToDraw = start + i;
                // this.draw(plane, yToDraw, shape);
            // }
        // }
    // };
     
    this.drawStraight = function(startX, startY, direction, delta, shape) {
        var xIncrementPerPoint = 0;
        var yIncrementPerPoint = 0;
        
        if (direction == DIRECTION.RIGHT) {
            xIncrementPerPoint = 1;
        }
        else if (direction == DIRECTION.LEFT) {
            xIncrementPerPoint = -1;
        }
        else if (direction == DIRECTION.DOWN) {
            yIncrementPerPoint = 1;
        }
        else {
            yIncrementPerPoint = -1;
        }
        
        for(var i = 0; i < delta; i++) {
            var xToDraw = startX + (i * xIncrementPerPoint);
            var yToDraw = startY + (i * yIncrementPerPoint);
            this.draw(xToDraw, yToDraw, shape);            
        }
        
        // Make chainable
        return {
            x : xToDraw,
            y : yToDraw
        };
    };
    
    this.drawPaths = function(startX, startY, commands, shape) {
        // Commands is a tuple of [DIRECTION, DELTA]s, eg ['DOWN', 14]
        var currentX = startX;
        var currentY = startY;
        
        for (var i = 0; i < commands.length; i++) {
            var direction = commands[i][0];
            var delta = commands[i][1];
            var newPosition = this.drawStraight(currentX, currentY, direction, delta, shape);
            currentX = newPosition.x;
            currentY = newPosition.y;
        }
        
        // Make chainable
        return {
            x : currentX,
            y : currentY
        }
        
    }

}

function Matrix($domTarget, gridX, gridY) {  
    
    var cellSize = {
        width : ($domTarget.width() / gridX),
        height : ($domTarget.height() / gridY)
    }
    
    // Create matrix and add cells to dom
    
    $domTarget.css(Cell.containerStyles);
    
    var rows = [];
    for (var y = 0; y < gridY; y++) {
        rows[y] = [];
        for (var x = 0; x < gridX; x++) {             
            rows[y][x] = new Cell(x, y, cellSize, $domTarget);            
        }        
    }
    
    // Maxes to make map loops easier to read
    
    var maxRow = gridY - 1;
    var maxCol = gridX - 1;
    
    this.clearAll = function(method) {
       for (var i = 0; i <= gridY; i++) {
            for (var j = 0; j <= gridX; j++) {
                rows[i][j].hide();
            }
        }  
    };
    
    this.renderAll = function(method) {
       for (var i = 0; i <= maxRow; i++) {
            for (var j = 0; j <= maxCol; j++) {
                rows[i][j].render();
            }
        }  
    };    
    
    this.getCell = function(x,y) {
        var cell = rows[y][x];
        if (cell) {
            return cell
        }
        else {
            return null;
        }       
    };
}

function Cell(x, y, cellSize, $domTarget) {
    
    // Initial state
    
    var hidden = true;
    var cellShape = undefined;
    this.queuedShape = undefined;
  
    // Add to dom
      
    var cell = $('<div>');
    $domTarget.append(cell);
    cell.css({
        position    : 'absolute',
        height      : cellSize.height,
        width       : cellSize.width,
        left        : (x * cellSize.width),
        top         : (y * cellSize.height)
    });
    
    // Interfaces
    
    this.hide = function() {
        if (hidden == false) {
            cell.css({display : 'none'});
            hidden = true;
        }
    }
    
    this.show = function() {
        if (hidden == true) {
            cell.css({display : 'block'});
            hidden = false;
        }  
    };
    
    this.render = function() {
        if (cellShape != this.queuedShape) {
            cell.css(TEXTURE[this.queuedShape]);
            cellShape = this.queuedShape;
        }
        this.show();
    };
    
    this.destroy = function() {
        cell.remove();
        return [x,y];
    };        
}

Cell.containerStyles = {
    position : 'relative'
}
