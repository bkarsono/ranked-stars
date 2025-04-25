const { createApp } = Vue;

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
