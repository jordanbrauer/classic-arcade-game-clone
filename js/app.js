/**
Enemies our player must avoid
@param int x starting x position on the canvas.
@param int y starting y position on the canvas.
@param int speed value to be multiplied by the time delta variable for smooth animation.
*/
var Enemy = function(x, y, speed)
{
    this.x = x; // Set the enemy x (horizontal) position.
    this.y = y; // Set the enemy y (vertical) position.
    this.speed = speed; // Set the enemy speed.
    this.init = x; // Save the enemy's initial x position for resetting.

    this.sprite = 'images/enemy-bug.png'; // The sprite for our enemies. Using helper fn.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// NOTE: use checkCollisions


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
