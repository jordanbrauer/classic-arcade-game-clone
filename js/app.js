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

var Enemy = function (x, y, speed)
{
  /** @property {int} Enemy.x - The initial x value. */
  this.x = x;

  /** @property {int} Enemy.y - The initial y value. */
  this.y = y;

  /** @property {int} Enemy.speed - The enemies speed value. */
  this.speed = speed;

  /** @property {int} Enemy.init - The init value. Equal to the initial x value. */
  this.init = x;

  /** @property {string} Enemy.sprite - Image loaded via the Resource helper method. */
  this.sprite = 'images/enemy-bug.png';
};

/**
 * @method Enemy.prototype.render
 * @summary Draw the enemy on the screen, required method for game.
 * @desc Use the Resources helper to get the enemy sprite and place it
 * on the canvas at the Enemy default x and y coordinates.
 */

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @method Enemy.prototype.move
 * @summary Propel the Enemy vehicles/bugs forward on the canvas.
 * @desc
 */

Enemy.prototype.move = function (direction, _speed) {
  if (direction == 'right') {
    this.x += _speed;
  }
  // Useful for switching up the direction of the bugs. First have to
  // fix up the Enemy constructor for starting location.
  // if (direction == 'left') {
  //   this.x -= _speed;
  // }
};

/**
 * @method Enemy.prototype.checkEdges
 * @summary Check if the Enemy has passed the edges of the canvas.
 * @param {obj} obj - The object to check against.
 * @desc If the Enemy passing the canvas edges has an x value greater
 * than the width of the canvas, reset the Enemy. This function could be more
 * robust if they bugs were omnidirectional.
 */

Enemy.prototype.checkEdges = function (obj) {
  if (this.x > obj) {
    this.reset();
  }
};

/**
 * @method Enemy.prototype.checkCollision
 * @summary Check for collision with the Player. Can be used for other things too.
 * @param {obj} obj - Object to check against.
 * @desc If both this Enemy colliding with the Player has an x value greather than
 * or eqaul to the Players' x value (subtracting half of the Players' width for
 * "edge detection" on the left) AND has an x value less than or equal to the
 * Players' x value (adding half of the Players' width for "edge detection" on the
 * right), are true AND the exact same for the y coordinates are both true, than
 * reset the Player and this Enemy. Bet you thought I was going to repeat the
 * whole thing for y coordinates as well. ;-)
 */

Enemy.prototype.checkCollision = function (obj) {
  if ((this.x >= obj.x - 50.5 && this.x <= obj.x + 50.5)
  && (this.y >= obj.y - 50.5 && this.y <= obj.y + 50.5)) {
    /** Reset this enemy */
    this.reset();

    /** If the obj was the Player, reset them. */
    if (obj == player) {
      player.reset();
    }
  }
};

/**
 * @method Enemy.prototype.reset
 * @desc Reset the enemy upon collision or travelling off the canvas.
 */

Enemy.prototype.reset = function () {
  /** Set the enemy x value to the initial value saved in the init property. */
  this.x = this.init;
};

/**
 * @method Enemy.prototype.update
 * @summary Update the enemys on screen.
 * @param {int} dt - the time delta. Used for movement events.
 * @desc The update function for the enemy will fire of all enemy events. Put any
 * events in here for the enemies. Create a method and necessary properties on the
 * Enemy and call it in here.
 */

Enemy.prototype.update = function (dt) {
  /** Multiply any movement by the time delta (dt) parameter which will ensure the game runs at the same speed for all computers. */
  this.move('right', this.speed * dt);

  /** Check for collisions with the player. */
  this.checkCollision(player);

  /** Check to see if enemy has passed the canvas edge. */
  this.checkEdges(ctx.canvas.width);
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

var Player = function (x, y)
{
  /** @property {int} Player.x - The initial x value of the Player. */
   this.x = x;

  /** @property {int} Player.y - The initial y value of the Player. */
  this.y = y;

  /** @property {obj} Player.init - Store the initial starting location for the player. */
  this.init = {
    "x": x,
    "y": y,
  };

  /** @property {string} Player.sprite - Image to be loaded via the Resource helper. */
  this.sprite = 'images/char-boy.png';

  /** @property {obj} Player.controls - Object array of player controls. */
  this.controls = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };
};

/**
 * @method Player.prototype.render
 * @summary Player render function.
 * @description Use the Resources helper to get the Player sprite and place it on
 * the canvas at the Player default x and y coordinates.
 */

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @method Player.handleInput
 * @summary Player handleInput function.
 * @fires Player.move
 * @fires Player.checkForFinishLine
 * @description Handle the input events for player controls and make any necessary
 * checks that should be made before or after a player action is made, e.g.,
 * landing on the finish line after moving squares.
 */

Player.prototype.handleInput = function (e) {
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
 * @summary Move the player in one of four directions.
 * @param {string} direction - The direction in which to move the player.
 * @description The logic for player movement. We start by getting the width and
 * height of a square. We then check which direction has been requested and act
 * accordingly. Left/Right, subtract/add width of tile from players x value.
 * Up/Down, subtract/add height of tile divided by 2 from players y value.
 */

Player.prototype.move = function (direction) {
  /** @var {object} tile - Used as reference.*/
  var tile = Resources.get('images/grass-block.png');

  /** @var {int} tileWidth - Width of reference tile */
  var tileWidth = tile.width;

  /** @var {int} tileHalfHeight - Height of refernce tile (slightlty tweaked). */
  var tileHalfHeight = tile.height / 2.09;

  if (direction == 'left') {
    if (this.x >= 0) {
      return this.x -= tileWidth;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }
  if (direction == 'up') {
    if (this.y > 0) {
      return this.y -= tileHalfHeight;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }
  if (direction == 'right') {
    if (this.x < 400) {
      return this.x += tileWidth;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }
  if (direction == 'down') {
    if (this.y < 400) {
      return this.y += tileHalfHeight;
    }
    // console.warn(`You can\'t move ${direction} any farther.`);
  }
}

/**
 * @method Player.prototype.checkForFinishLine
 * @summary Check if the player has gotten to the finish line!
 * @fires Player.reset
 * @description Check the player's Y coordinates to see if they have reached the
 * finish line (in our case, the water).
 */

Player.prototype.checkForFinishLine = function () {
  if (this.y < 0) {
    this.reset();
  }
};

/**
 * @method Player.prototype.reset
 * @summary Reset the Player to initial starting coordinates.
 * @description Method used for reseting the player. This methods uses the values
 * that are stored within the Playr.init object property upon player instantiation.
 */

Player.prototype.reset = function () {
  this.x = this.init.x;
  this.y = this.init.y;
};

/**
 * @method Player.prototype.update
 * @summary Update player object.
 * @param {int} dt - The time delta.
 * @description Update player object according to the time delta parameter.
 */

Player.prototype.update = function (dt) {
  // ... unused.
};


//-----------------------------------------------
// Object Instantiation
//-----------------------------------------------

/** Instantiate the player with a set of x and y coordinates. */
var player = new Player(200, 400);

/** Populate the allEnemies array with new Enemy objects. Each row in the array corresponds to the row on the canvas. */
var allEnemies = [
  new Enemy(-200, 60, setRandomSpeed(225, 550)),
  new Enemy(-200, 145, setRandomSpeed(225, 550)),
  new Enemy(-200, 225, setRandomSpeed(225, 550)),
];

//-----------------------------------------------
// Event Listeners
//-----------------------------------------------

/** This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this. */
document.addEventListener('keyup', function(e) {
  player.handleInput(player.controls[e.keyCode]);
});

/** Prevent any double actions (e.g., scrolling page with arrow keys) through the preventDefault(); event method. */
window.addEventListener('keydown', function(e) {
  var playerControls = Object.keys(player.controls);

  if (playerControls.indexOf(`${e.keyCode}`) > -1) {
    e.preventDefault();
    return false;
  }
}, false);

//-----------------------------------------------
// Helper Functions
//-----------------------------------------------

/**
 * @function setRandomSpeed
 * @summary Set the enemy speed randomly.
 * @argument {int} min - Minimum speed value.
 * @argument {int} max - Maximum speed value.
 * @returns {int}
 * @description Set the enemy speed to a random integer between two values.
 * Useful for varrying the Enemy "behaviour" each time the game is loaded.
 */

function setRandomSpeed (min, max) {
  /** @var {int} min - Minimum value rounded up. */
  var min = Math.ceil(min);

  /** @var {int} max - Maximum value rounded down. */
  var max = Math.floor(max);

  /** Generate a random random number, multiply it by the difference of max and min, round the result down and add min. */
  return Math.floor(Math.random() * (max - min)) + min;
}
