<template>
  <ul>
    <router-link to="/films/hotplaying" custom v-slot="{ navigate, isActive }">
      <li ><span @click="navigate" :class="isActive ? 'xymactive' : ''">正在热映</span></li>
    </router-link>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li >
        <span @click="navigate" :class="isActive ? 'xymactive' : ''">正在上映</span></li>
    </router-link>
  </ul>
</template>

<style lang="scss" scoped>

*{
    margin: 0;
    padding: 0;
}
.xymactive {
  color: red;
  border-bottom: 1px solid red;
}
ul {
  display: flex;
  height: 3.125rem;
  list-style: none;
  line-height: 3.125rem;
  li {
    flex: 1;
    text-align: center;
    span{
        padding: 10px;
    }
  }
}
</style>