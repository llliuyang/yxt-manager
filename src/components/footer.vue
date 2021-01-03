<template>
  <div class="footer">
    {{ poem }}—— [{{ dynasty }}] {{ author }}《{{ poemTitle }}》
  </div>
</template>

<script>
const jinrishici = require('jinrishici');
export default {
  name: "footer",
  data() {
    return {
      poem: "",
      dynasty: "",
      author: "",
      poemTitle: "",
    };
  },
  created() {
    this.loadSentence();
  },
  mounted() {
    setInterval(() => {
      this.loadSentence();
    }, 20000);
  },
  methods: {
    loadSentence: function () {
      jinrishici.load((result) => {
          this.poem = result.data.content;
          this.dynasty = result.data.origin.dynasty;
          this.author = result.data.origin.author;
          this.poemTitle = result.data.origin.title;
        },
        (err) => {
          console.log("error");
        }
      );
    },
  },
};
</script>

<style>
.footer {
  height: 40px;
  background: #2a2a2a;
  color: #f2f2f2;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  -webkit-transition: 1s linear;
  transition: 1s linear;
}
</style>