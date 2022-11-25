<template>
  <button @click="toCockpit">toCockpit</button>
</template>
<script>
export default {
  methods: {
    toCockpit() {
      this.$router.push("/cockpit");
    },
  },
};
</script>