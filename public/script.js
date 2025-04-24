const { createApp } = Vue;

createApp({
  data() {
    return {};
  },
  methods: {
    startGame() {
      fetch("https://api.brawlify.com/v1/brawlers", {
        headers: {
          "User-Agent": "ranked-stars.web.app",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    },
  },
}).mount("#app");
