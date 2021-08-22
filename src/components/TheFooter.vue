<template>
  <footer class="footer">
    <div class="footerBar">
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

  small {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

</style>
