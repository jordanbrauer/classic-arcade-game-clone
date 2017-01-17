//-----------------------------------------------
// Enemy
//-----------------------------------------------

/**
 * @constructor Enemy
 * @classdesc Creates a new Enemy that our player must avoid.
 * @param {int} Enemy.x - The initial x value.
 * @param {int} Enemy.y - The initial y value.
 * @param {int} Enemy.speed - The enemies speed value.
 */
var Enemy = function(x, y, speed) {
  /**
   * Set the enemys' initial x (horizontal) value.
   * @prop {int} Enemy.x - The initial x value.
   */
  this.x = x;

  /**
   * Set the enemys' initial y (vertical) value.
   * @prop {int} Enemy.y - The initial y value.
   */
  this.y = y;

  /**
   * Set the enemy's speed. The value is multiplied by the time delta
   * variable for smooth animation purposes.
   * @prop {int} Enemy.speed - The enemies speed value.
   */
  this.speed = speed;

  /**
   * Save the enemy's initial x position for resetting.
   * @prop {int} Enemy.init - The init value. Equal to the initial x value.
   */
  this.init = x;

  /**
   * The sprite image used for our enemies.
   * @prop {string} Enemy.sprite - Image loaded via the `sprite` helper method.
   */
  this.sprite = 'images/enemy-bug.png';
};

/**
 * @method Enemy.prototype.update
 * @desc Update the enemy's position, required method for game.
 * @param {int} dt - the time delta.
 */
Enemy.prototype.update = function(dt) {
  /**
   * Multiply any movement by the time delta (dt) parameter which will ensure
   * the game runs at the same speed for all computers.
   */
  this.x += this.speed * dt;

  /**
   * Check to see if enemy has moved past the canvas window.
   * If they have, reset the enemy.
   *
   * TODO: Move edge detection logic into dedicated method and fire here..
   */
  if (this.x > 500) {
    this.reset();
  }

  /**
   * Check to see if the enemy collides with the Player object.
   * If they do, reset the player and bug.
   * If the Enemy colliding with the Player has an x value greather than or equal to
   *
   * TODO: Move Collision logic into dedicated method and fire here.
   */
  if ((this.x >= player.x - 50.5 && this.x <= player.x + 50.5)
  && (this.y >= player.y - 50.5 && this.y <= player.y + 50.5)) {
    this.reset();
    player.reset();
  }
};

/**
 * @method Enemy.prototype.render
 * @summary Draw the enemy on the screen, required method for game.
 * @desc Use the Resources helper to get the enemy sprite and place it
 * on the canvas at the Enemy default x and y coordinates.
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @method Enemy.prototype.reset
 * @desc Reset the enemy upon collision or travelling off the canvas.
 */
Enemy.prototype.reset = function() {
  /** Set the enemy x value to the initial value saved in the init property. */
  this.x = this.init;
};

//-----------------------------------------------
// Player
//-----------------------------------------------

/**
 * @constructor Player
 * @classdesc Player object to play the game as.
 * @param {int} Player.x - The initial x value of the Player.
 * @param {int} Player.y - The initial y value of the Player.
 */
var Player = function(x, y) {
  /**
   * Set intial x (horizontal) coordinates on the canvas.
   * @prop {int} Player.x - The initial x value of the Player.
   */
   this.x = x;

  /**
   * Set initial y (vertical) coordinates on the canvas.
   * @prop {int} Player.y - The initial y value of the Player.
   */
  this.y = y;

  /**
   * Store initial x and y coordinates in an object for reseting the player
   * upon death or winning.
   * @prop {obj} Player.init - Store the initial starting location for the player.
   */
  this.init = {
    "x": x,
    "y": y,
  };

  /**
   * Give the player a sprite for visualization.
   * @prop {string} Player.sprite - Image to be loaded via the Resource helper.
   */
  this.sprite = 'images/char-boy.png';
};

/**
 * @method Player.prototype.update
 * @desc Player update function.
 * @param {int} dt - The time delta.
 */
Player.prototype.update = function(dt) {
  /** multiply the player speed by the time delta variable for smooth animation. */
  this.x += this.speed * dt;
};

/**
 * BUG: The player does not seem to render unless Player.prototype.update is
 * defined twice.Not sure if this is a bug or what I am doing wrong...
 */
Player.prototype.update = function() {};

/**
 * @method Player.prototype.render
 * @desc Player render function.
 */
Player.prototype.render = function() {
  /**
   * Use the Resources helper to get the Player sprite and place it on the canvas
   * at the Player default x and y coordinates.
   */
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @method Player.handleInput
 * @desc Player handleInput fucntion.
 * @fires Player.move(direction)
 * @fires Player.checkForFinishLine
 */
Player.prototype.handleInput = function() {
  /** Use a switch statement to handle input from the 'keyup' document event listener. */
  switch (event.keyCode) {
    case 37:
      this.move('left');
      break;
    case 38:
      this.move('up');
      break;
    case 39:
      this.move('right');
      break;
    case 40:
      this.move('down');
      break;
  }

  /** Fire the checkForFinishLine() method to determine if we've landed on a finish line. */
  this.checkForFinishLine();
};

/**
 * @method Player.prototype.move
 * @param {string} direction - The direction in which to move the player.
 */
Player.prototype.move = function(direction) {
  /**
   * Get a tile resource to measure as reference for player movement.
   * @var {object} tile
   */
  var tile = Resources.get('images/grass-block.png');

  /**
   * The width of a tile. Used to move the Player on screen.
   * @var {int} tileWidth
   */
  var tileWidth = tile.width;

  /**
   * The height of a tile halved (slightly tweaked to improve the placement of the Player).
   * @var {int} tileHalfHeight
   */
  var tileHalfHeight = tile.height / 2.09;

  /** If direction from Player.prototype.handleInput is left, move left. */
  if (direction == 'left') {
    if (this.x >= 0) {
      return this.x -= tileWidth;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }

  /** If direction from Player.prototype.handleInput is up, move up. */
  if (direction == 'up') {
    if (this.y > 0) {
      return this.y -= tileHalfHeight;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }

  /** If direction from Player.prototype.handleInput is right, move right. */
  if (direction == 'right') {
    if (this.x < 400) {
      return this.x += tileWidth;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }

  /** If direction from Player.prototype.handleInput is down, move down. */
  if (direction == 'down') {
    if (this.y < 400) {
      return this.y += tileHalfHeight;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }
}

/**
 * @method Player.prototype.checkForFinishLine
 * @desc Check if the player has gotten to the finish line!
 */
Player.prototype.checkForFinishLine = function () {
  if (this.y < 0) {
    this.reset();
  }
};

/**
 * @method Player.prototype.reset
 * @desc Reset the Player upon collision.
 */
Player.prototype.reset = function () {
  this.x = this.init.x;
  this.y = this.init.y;
};

//-----------------------------------------------
// Object Instantiation
//-----------------------------------------------

/** Instantiate the player with a set of x and y coordinates. */
var player = new Player(200, 400);

/**
 * Populate the allEnemies array with new Enemy objects. Each row in the array
 * corresponds to the row on the canvas.
 */
var allEnemies = [
  new Enemy(-200, 60, 450),
  new Enemy(-200, 145, 210),
  new Enemy(-200, 225, 350),
];

//-----------------------------------------------
// Event Listeners
//-----------------------------------------------

/**
 * This listens for key presses and sends the keys to your Player.handleInput()
 * method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
