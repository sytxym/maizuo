<template>
  <ul>
    <li v-for="item in datalist" :key="item.filmId">
      <img :src="item.poster" alt="" />
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
$width: 300px;
ul {
  list-style: none;
  li {
    border: 2px dotted gray;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}

ul li {
  overflow: auto;
}

ul img {
  width: 120px;
  margin-right: 10px;
  float: left;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return { datalist: [] };
  },
  mounted() {
    // fetch("/maizuo.json").then(res=>res.json()).then(res=>{
    //     console.log(res)
    //     this.datalist=res.data.films
    // })
    axios.get("/maizuo_small.json").then((res) => {
      console.log("axios", res.data);
      this.datalist = res.data.data.films;
    });
  },
};
</script>