<template>
  <div>
    <button @click="toCockpit">toCockpit</button>
    <button @click="toPlatform">toPlatform</button>
  </div>
</template>
<script>
export default {
  methods: {
    toCockpit() {
      this.$router.push("/cockpit");
    },
    toPlatform() {
      this.$router.push("/platform");
    }
  },
};
</script>