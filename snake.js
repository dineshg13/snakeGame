// CONSTS

var SHAPE = {
    SNAKE : "snake",
    APPLE : "apple"
};

var KEY = {
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4
};

function Game() {
    // todo    
}

function Canvas(domTarget, width, height) {
    // Creates canvas in dom element

    var matrix = new Matrix($(domTarget), width, height);
    
    this.draw = function(x, y, shape) {
        matrix.getCell(x,y).render(shape);  
    }
    
    this.clear = function(x,y) {
        matrix.getCell(x,y).hide();
    }
    
    this.freeze = function() {
        matrix.turnRed();
    }
    
    this.clearAll = function() {
        matrix.hideAll();
    }    
}

function Matrix($domTarget, width, height) {
    
    function Cell(x, y, cellSize) {
        
        var hidden = true;
        var cellShape = SHAPES.SNAKE;
  
        var cell = $('<div>');
        $domTarget.append(cell);
        cell.css({
            position    : 'absolute',
            height      : cellSize.height,
            width       : cellSize.width,
            left        : (x * cellSize.width),
            top         : (y * cellSize.height)
        });
        
        this.hide = function() {
            if (hidden == false) {
                cell.css({display : 'none'});
                hidden = true;
            }
        }
        
        this.render = function(shape) {
            if (cellShape == shape) {
                // nop
            }
            else if (shape = SHAPES.SNAKE) {
                // nop
            }
            else if (shape = SHAPES.APPLE) {
                // nop
            }
        }
        
              
    
    }
    
    var cellSize = {
        width : ($domTarget.width() / width),
        height : ($domTarget.height() / height)
    }
    
    var rows = [];
    for (var y = 0; y < height; y++) {
        row[y] = [];
        for (var x = 0; x < width; x++) {             
            row[y][x] = new Cell(x, y, cellSize);            
        }        
    }
    
    return rows;    
}
