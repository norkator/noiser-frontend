<template>
  <footer class="footer">
    <div class="headerBar">
      <small class="magictime vanishIn">Noiser by Nitramite</small>
    </div>
  </footer>
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
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2.5rem; /* Footer height */
  }

  small {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .headerBar {
    background-color: white;
    text-align: center;
    padding: 9px;
  }

</style>
