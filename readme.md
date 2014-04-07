##snakeGame

A JavaScript / jQuery implementation of the classic game, *Snake*.

##Wot, no canvas?

No, and no SVG / VML either. Snake can be rendered as a simple grid of square cells with solid colours, so I figured I could just use the DOM. Besides, it seemed like a good way to learn about high-performance DOM manipulation and jQuery optimization.

##Remind me of the rules

Here's the basic tennets of Snake:

- your snake is always moving. You can change its direction, but you cannot stop it
- directionality 'cascades' down the snake (e.g. hitting left then right will make the snake's neck, body and tail weave in succession)
- your snake cannot crash into the walls
- your snake cannot crash into itself
- your snake can eat apples randomly spawned to increase the player's score. Every apple eaten increases the length of the snake.
- you win if you manage to fill the whole canvas with snake

##Features (planned)

- use both keyboard and touch-friendly arrow controls to move the snake
- use localstorage to keep the player's high score

##Performance aims
I'd like snakeGame to animate at 60fps on a first generation iPad. This shouldn't be too hard, but I'd also like to try out some performance optimization for its own sake:

- snakeGame doesn't add or remove DOM elements, just hides / unhides them. GC events should be minimal.
- DOM queries and lookups to native DOM interfaces should be aliased wherever feasible
- paints should be optimized

##Design aims

- separate model of game from view and game canvas rendering
- be able to swap canvas out easily
- game should be pretty customizable
- try and keep final JS quite lightweight