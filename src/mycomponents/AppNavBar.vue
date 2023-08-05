<template>
  <div>
    <button @click="handleLeft()">电影列表</button>
    <span>{{ myname }}</span>
    <button v-show="myright">right</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // props:['myname','myright']
  props: {
    myname: {
      type: String,
      default: "",
    },
    myright: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleLeft() {
      this.$emit("event");
    },
  },
  mounted() {
    console.log("mount");
  },
};
</script>

<style lang="scss" scoped>
div {
  background: gold;
  text-align: center;
  padding: 10px 0px;
}
</style>