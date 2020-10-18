<template>
  <div id="app-container">
    <the-header app-name="Noiser"/>
    <section class="mainContentLayout magictime slideDownReturn">

      <div>
        <h2 class="packName">{{audioSources.summerPack.name}}</h2>
        <div v-if="audioSources.summerPack.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioSources.summerPack.audioSources" v-bind:key="as.key"
            :audio-key="as.key"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="packNoSounds">Sounds coming</h4>
      </div>
      <hr>
      <div>
        <h2 class="packName">{{audioSources.winterPack.name}}</h2>
        <div v-if="audioSources.winterPack.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioSources.winterPack.audioSources" v-bind:key="as.key"
            :audio-key="as.key"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="packNoSounds">Sounds coming</h4>
      </div>
      <hr>
      <div>
        <h2 class="packName">{{audioSources.homePack.name}}</h2>
        <div v-if="audioSources.homePack.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioSources.homePack.audioSources" v-bind:key="as.key"
            :audio-key="as.key"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="packNoSounds">Sounds coming</h4>
      </div>
      <hr>
      <div>
        <h2 class="packName">{{audioSources.other.name}}</h2>
        <div v-if="audioSources.other.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioSources.other.audioSources" v-bind:key="as.key"
            :audio-key="as.key"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="packNoSounds">Sounds coming</h4>
      </div>
      <hr>
      <h4 class="packNoSounds"><a style="color: white;" href="http://www.nitramite.com/noiser.html">Click here</a> for asset attribution notes</h4>
      <hr>

    </section>
    <the-footer/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader.vue";
  import AudioElement from "./components/AudioElement.vue";
  import TheFooter from "./components/TheFooter.vue";

  import AudioPack from './assets/AudioPack';


  export default {
    name: 'App',
    components: {
      TheHeader,
      AudioElement,
      TheFooter,
    },
    data() {
      return {
        audioSources: AudioPack.audioPacks
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

  #app-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #DE6262; /* fallback for old browsers */
    min-height: 100vh; /* will cover the 100% of viewport */
    overflow: hidden;
    display: block;
    position: relative;
  }

  .mainContentLayout {
    text-align: center;
    border-radius: 20px;
    margin: 20px 20px 60px 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 25px 0 rgba(255, 255, 255, 0.1);
  }

  .flexLayout {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }

  .packName {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 28px;
    color: white;
  }

  .packNoSounds {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 14px;
    color: white;
  }

  hr {
    border: 1px dashed rgba(255, 255, 255, 0.2);
    margin: 0 20px 0 20px;
    border-radius: 5px;
  }

</style>
