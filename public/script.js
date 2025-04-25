const { createApp } = Vue;

let backgroundSpeed = 1;
let currentBackground = 1;

$(document).ready(() => {
  game_screen = $(".wrapper");
  movingBackground = $(".moving-background");
  moveBackground();
});

function spawnBottomBackground() {
  for (let i = 0; i < 20; ++i) {
    spawn(200 + 200 * i, 1500 - 50 * i);
  }
  // spawn(200, 900);
  // spawn(400, 850);
  // spawn(600, 800);
  // spawn(800, 750);
  // spawn(1000, 700);
}

function spawnStaggeredBackground() {
  for (let i = 0; i < 20; ++i) {
    spawn(50 + 200 * i, 1400 - 50 * i);
  }
  // spawn(50, 800);
  // spawn(250, 750);
  // spawn(450, 700);
  // spawn(650, 650);
  // spawn(850, 600);
}

function fillBackground() {
  for (let j = 0; j < 12; ++j) {
    for (let i = 0; i < 20; ++i) {
      spawn((-100 - 150 * j) + (200 * i), (1300 - 100 * j) - (50 * i));
    }
  }
  // for (let i = 0; i < 20; ++i) {
  //   spawn(-100 + 200 * i, 1300 - 50 * i);
  // }

  // for (let i = 0; i < 20; ++i) {
  //   spawn(-250 + 200 * i, 1200 - 50 * i);
  // }

  // for (let i = 0; i < 20; ++i) {
  //   spawn(-400 + 200 * i, 1100 - 50 * i);
  // }
}

function moveBackground() {
  spawnBottomBackground();
  spawnStaggeredBackground();
  fillBackground();
  setInterval(() => {
    spawnBottomBackground();
    spawnStaggeredBackground();
  }, 4000);
}

function spawn(x, y) {
  const background = new Background(x, y);
  move(background);
}

function move(background) {
  const backgroundMovement = setInterval(() => {
    background.updatePosition();
  }, 15);
  setTimeout(() => {
    background.id.remove();
    clearInterval(backgroundMovement);
  }, 40000);
}

// Starter Code for randomly generating and moving an asteroid on screen
class Background {
  // constructs an Asteroid object
  constructor(x, y) {
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
    this.cur_x = x; // number of pixels from right
    this.cur_y = y; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = -1;
    this.y_dest = -2;
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
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
  },
}).mount("#app");
