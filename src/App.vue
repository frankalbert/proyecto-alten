<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  margin: 0;
  * {
    box-sizing: border-box;
  }
}
.container {
  margin: auto;
  padding: 0 16px;
  max-width: 1200px;
  width: 100%;
}
.row {
  margin: 0 -16px;
  display: flex;
  flex-wrap: wrap;
  &.no--wrap {
    flex-wrap: nowrap;
  }
}
.col {
  padding: 8px 16px;
  &-12 {
    width: 100%;
  }
  &-6 {
    width: 50%;
  }
  &-4 {
    width: 33.33%;
  }
  &-3 {
    width: 25%;
  }
}
</style>
