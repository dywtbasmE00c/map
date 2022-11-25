<template>
  <router-view :key="key"></router-view>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>