<template>
  <header>
    <div class="headerBar">
      <h1 class="magictime vanishIn">{{ this.appName }}</h1>
    </div>
  </header>
</template>

<script>
  export default {
    props: [
      'appName'
    ],
    name: "TheHeader"
  }
</script>

<style scoped>
  h1 {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 50px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .headerBar {
    background-color: white;
    text-align: center;
    padding: 10px;
  }

</style>
