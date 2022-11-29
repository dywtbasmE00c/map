<template>
  <div class="session">
    <button class="okok" @click="toInfo">okok</button>
    <div class="okok">okok</div>
  </div>
</template>
<script>
export default {
  methods: {
    toInfo() {
      this.$router.push("/cockpitInfo");
    },
  },
};
</script>
<style lang="less" scoped>
.session {
  display: flex;
  justify-content: space-between;
  pointer-events: all;
  & .okok {
    width: 80px;
    height: 80px;
    color: white;
    background-color: green;
  }
}
</style>