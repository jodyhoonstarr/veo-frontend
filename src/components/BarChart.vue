<template>
  <div>
    <svg :id="id" />
    <p>width: {{width}}</p>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  props: ["id", "width"]
};
</script>

<style lang="scss" scoped>
</style>>
