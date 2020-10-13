<template>
  <div id="app">
    <the-header app-name="Noiser"/>
    <div class="mainContentLayout magictime slideDownReturn">
      <audio-component
          v-for="as in audioSources" v-bind:key="as.key"
          :audio-key="as.key"
          :query-key="as.queryKey"
          :name="as.name"
          :audio-src="as.audioSrc"
      />
    </div>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import AudioComponent from "@/components/AudioComponent";
import AudioSource from './assets/AudioSource';
import TheFooter from "@/components/TheFooter";


export default {
  name: 'App',
  components: {
    TheHeader,
    AudioComponent,
    TheFooter,
  },
  data() {
    return {
      audioSources: AudioSource.audioSources
    }
  },
  mounted() {
  },
  methods: {},
}
</script>

<style>
@import './assets/css/magic.min.css';

@font-face {
  font-family: "MajorMonoDisplayRegular";
  src: local("MajorMonoDisplayRegular"), url("./assets/fonts/MajorMonoDisplay-Regular.ttf");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #DE6262;  /* fallback for old browsers */
  /*
  background: #c04848;
  background: -webkit-linear-gradient(to bottom, #480048, #c04848);
  background: linear-gradient(to bottom, #480048, #c04848);
  */
}

.mainContentLayout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 20px;
  margin: 20px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 25px 0 rgba(255, 255, 255, 0.1);
}
</style>
