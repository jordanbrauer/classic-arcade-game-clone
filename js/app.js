/**
 * @constructor Enemy
 * @classdesc Creates a new Enemy that our player must avoid.
 */
var Enemy = function(x, y, speed) {
  /**
   * Set the enemys' initial x (horizontal) value.
   * @param {int} x - The initial x value.
   */
  this.x = x;

  /**
   * Set the enemys' initial y (vertical) value.
   * @param {int} y - The initial y value.
   */
  this.y = y;

  /**
   * Set the enemy's speed. The value is multiplied by the time delta
   * variable for smooth animation purposes.
   * @param {int} speed - The enemies speed value.
   */
  this.speed = speed;

  /**
   * Save the enemy's initial x position for resetting.
   * @prop {int} init - The init value. Equal to the initial x value.
   */
  this.init = x;

  /**
   * The sprite image used for our enemies.
   * @prop {string} sprite - Image loaded via the `sprite` helper method.
   */
  this.sprite = 'images/enemy-bug.png';
};

/**
@method Enemy.prototype.update
@desc Update the enemy's position, required method for game.
*/
Enemy.prototype.update = function(dt) {
  /**
   * Multiply any movement by the time delta (dt) parameter which will ensure the game
   * runs at the same speed for all computers.
   * @param {int} dt - the time delta.
   */
  this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the enemy upon collision or travelling off the canvas.
Enemy.prototype.reset = function() {
  this.x = this.init;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// NOTE: use checkCollisions

// var allEnemies = [];

// var player = new Player();

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
