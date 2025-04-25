const { createApp } = Vue;

let backgroundSpeed = 3;
let currentBackground = 1;

$(document).ready(() => {
  game_screen = $(".wrapper");
  movingBackground = $(".moving-background");
});

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Starter Code for randomly generating and moving an asteroid on screen
class Background {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    const objectString =
      "<div id = 'b-" +
      currentBackground +
      "' class = 'curBackground' > <img src = './assets/transparent.png'/></div>";
    movingBackground.append(objectString);
    // select id of this Asteroid
    this.id = $("#b-" + currentBackground);
    currentBackground++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the border
    this.hide_axis = "x";
    this.hide_after = 0;
    this.sign_of_switch = "neg";
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    // get the current position of interest (either the x position or the y position):
    const cur_pos = this.hide_axis === "x" ? this.cur_x : this.cur_y;
    // determine if the asteroid has reached its destination:
    return this.sign_of_switch === "pos"
      ? cur_pos > this.hide_after
      : cur_pos < this.hide_after;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * backgroundSpeed;
    this.cur_x += this.x_dest * backgroundSpeed;
    // update asteroid's css position
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    const x = getRandomNumber(0, 1280);
    const y = getRandomNumber(0, 720);
    const floor = 784;
    const ceiling = -64;
    const left = 1344;
    const right = -64;
    const major_axis = Math.floor(getRandomNumber(0, 2));
    const minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      const bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / backgroundSpeed) || 1;

      this.x_dest = game_screen.width() - x;
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-0.5, 0.5);
      this.y_dest = -backgroundSpeed - getRandomNumber(0, 0.5);
      this.hide_axis = "y";
      this.hide_after = -64;
      this.sign_of_switch = "neg";
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      const bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / backgroundSpeed) || 1;

      this.x_dest = game_screen.width() - x;
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-0.5, 0.5);
      this.y_dest = backgroundSpeed + getRandomNumber(0, 0.5);
      this.hide_axis = "y";
      this.hide_after = 784;
      this.sign_of_switch = "pos";
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      const bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / backgroundSpeed) || 1;

      this.x_dest = -backgroundSpeed - getRandomNumber(0, 0.5);
      this.y_dest = game_screen.height() - y;
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-0.5, 0.5);
      this.hide_axis = "x";
      this.hide_after = -64;
      this.sign_of_switch = "neg";
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      const bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / backgroundSpeed) || 1;

      this.x_dest = backgroundSpeed + getRandomNumber(0, 0.5);
      this.y_dest = game_screen.height() - y;
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-0.5, 0.5);
      this.hide_axis = "x";
      this.hide_after = 1344;
      this.sign_of_switch = "pos";
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    const speed = Math.sqrt(
      this.x_dest * this.x_dest + this.y_dest * this.y_dest
    );
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

createApp({
  mounted() {
    window.addEventListener("keyup", this.handleKey);
    this.moveBackground();
  },
  beforeUnmount() {
    window.removeEventListener("keyup", this.handleKey);
  },
  data() {
    return {
      brawlerReleaseDates: {
        16000000: 0,
        16000001: 2000,
        16000002: 3000,
        16000003: 4000,
        16000004: 13000,
        16000005: 79000,
        16000006: 6000,
        16000007: 9000,
        16000008: 1000,
        16000009: 10000,
        16000010: 5000,
        16000011: 47000,
        16000012: 80000,
        16000013: 7000,
        16000014: 19000,
        16000015: 22000,
        16000016: 23000,
        16000017: 48000,
        16000018: 14000,
        16000019: 15000,
        16000020: 24000,
        16000021: 49000,
        16000022: 11000,
        16000023: 81000,
        16000024: 8000,
        16000025: 16000,
        16000026: 25000,
        16000027: 12000,
        16000028: 82000,
        16000029: 26000,
        16000030: 20000,
        16000031: 51000,
        16000032: 50000,
        16000034: 17000,
        16000035: 32000,
        16000036: 27000,
        16000037: 52000,
        16000038: 85000,
        16000039: 33000,
        16000040: 83000,
        16000041: 55000,
        16000042: 53000,
        16000043: 28000,
        16000044: 56000,
        16000045: 21000,
        16000046: 34000,
        16000047: 54000,
        16000048: 30000,
        16000049: 57000,
        16000050: 29000,
        16000051: 35000,
        16000052: 84000,
        16000053: 36000,
        16000054: 58000,
        16000056: 59000,
        16000057: 60000,
        16000058: 31000,
        16000059: 61000,
        16000060: 37000,
        16000061: 18000,
        16000062: 62000,
        16000063: 86000,
        16000064: 63000,
        16000065: 38000,
        16000066: 64000,
        16000067: 65000,
        16000068: 39000,
        16000069: 40000,
        16000070: 87000,
        16000071: 66000,
        16000072: 41000,
        16000073: 67000,
        16000074: 68000,
        16000075: 69000,
        16000076: 88000,
        16000077: 42000,
        16000078: 70000,
        16000079: 43000,
        16000080: 89000,
        16000081: 71000,
        16000082: 44000,
        16000083: 72000,
        16000084: 73000,
        16000085: 90000,
        16000086: 45000,
        16000087: 74000,
        16000089: 46000,
        16000090: 75000,
        16000091: 76000,
        16000092: 77000,
        16000093: 78000,
        16000094: 91000,
      },
      muteButtonText: "Mute",
      currentBrawler: "",
      backgroundMusic: new Audio("./assets/music.m4a"),
      joinSFX: new Audio("./assets/join.mp3"),
      selectSFX: new Audio(),
      brawlers: [],
      topRowBrawlers: [],
      bottomRowBrawlers: [],
    };
  },
  methods: {
    startGame() {
      if (this.brawlers.length > 0) {
        return;
      }
      fetch("https://api.brawlify.com/v1/brawlers")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.brawlers = data.list;
          this.brawlers = this.brawlers.filter((brawler) => brawler.released);
          this.brawlers.sort((a, b) => {
            if (a.rarity.id === b.rarity.id) {
              return (
                this.brawlerReleaseDates[a.id] - this.brawlerReleaseDates[b.id]
              );
            }
            return a.rarity.id - b.rarity.id;
          });
          this.topRowBrawlers = this.brawlers.filter(
            (brawler, index) => index % 2 === 0
          );
          this.bottomRowBrawlers = this.brawlers.filter(
            (brawler, index) => index % 2 === 1
          );
        })
        .catch((error) => console.log(error));
      this.joinSFX.play();
      this.backgroundMusic.loop = true;
      this.backgroundMusic.play();
    },
    selectBrawler(brawler) {
      if (this.currentBrawler === brawler.name) {
        return;
      }
      this.currentBrawler = brawler.name;
      this.selectSFX = new Audio("./assets/select.mp3");
      this.selectSFX.play();
    },
    handleKey(e) {
      if (e.key === "m") {
        this.handleMute();
      }
    },
    handleMute() {
      this.backgroundMusic.muted = !this.backgroundMusic.muted;
      if (this.backgroundMusic.muted) {
        this.muteButtonText = "Unmute";
      } else {
        this.muteButtonText = "Mute";
      }
    },
    moveBackground() {
      setInterval(this.spawn, 1000);
    },
    spawn() {
      const background = new Background();
      this.move(background);
    },
    move(background) {
      const backgroundMovement = setInterval(() => {
        background.updatePosition();
        // determine whether Asteroid has reached its end position
        if (background.hasReachedEnd()) {
          // i.e. outside the game border
          // remove this Asteroid from DOM (using jQuery .remove() method)
          background.id.remove();
          // clear the interval that moves this Asteroid
          clearInterval(backgroundMovement);
          console.log("helo");
        }
      }, 15);
    },
  },
}).mount("#app");
