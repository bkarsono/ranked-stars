const { createApp } = Vue;

createApp({
  data() {
    return {
      API_KEY:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImUxNzI3OWFmLTRjMzMtNDkxYi1iZTRkLWRjNDVmMWJjYjkwOCIsImlhdCI6MTc0NTUyODMyNCwic3ViIjoiZGV2ZWxvcGVyLzgxNTIzODE4LWJkMTUtODA4YS1mY2M1LWZlZTRkZmQ3MGU3ZCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzMuMTQ1LjE2NS4xMDEiLCIxOTkuMzYuMTU4LjEwMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.K-JEamhT4G1FzopujnPpvhvuWOKyM4hpa3wIBIe6n7RBmRxLxmr4y1OSEZa2coQLKPz25TsxIsloWyxw11M5jg",
    };
  },
  methods: {
    startGame() {
      fetch("https://api.brawlstars.com/v1/brawlers", {
        methods: "GET",
        headers: {
          Authorization: this.API_KEY,
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
