<template>
  <div class="box">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />

    <ul v-if="value">
      <li v-for="item in computedList" :key="item.cinemaId">
        <div class="left">
          <div>{{ item.name }}</div>
          <div class="cimemas-address" style="color: gray; font-size: 12px">
            {{ item.address }}
          </div>
        </div>
        <div class="right">
          <span style="color: red; font-size: 13px"
            >￥{{ item.lowPrice / 100 }}起</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import obj from "@/util/mixinObj";

export default {
  mixins: [obj],
  data() {
    return {
      value: "",
    };
  },
  computed: {
    computedList() {
      return this.$store.state.cinemasList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
  mounted() {
    if (this.$store.state.cinemasList.length === 0) {
      this.$store.dispatch("getCimemaData", this.$store.state.cityId);
    } else {
      console.log("缓存");
    }
  },
  methods: {
    onSearch() {},
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 12.5rem;
  float: left;
  font-size: 15px;
  .cimemas-address {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.right {
  float: right;
}

.box ul li {
  padding: 10px;
  height: 3.75rem;
  line-height: 1.875rem;
  border-bottom: 1px solid #eee;
}

.box {
  position: relative;
  overflow: hidden;
}
</style>