<template>

  <div id="app-container">
    <the-header app-name="Noiser"/>

    <button @click="toggleTheme" aria-label="Toggle themes" class="changeThemeBtn magictime vanishIn"
            id="changeThemeBtn">
      &#9790;
    </button>

    <section class="mainContentLayout magictime slideDownReturn">

      <h2 class="pack-name">radio channels</h2>
      <div class="chartContainer">
        <div id="chartdiv" class="chartDiv" ref="chartdiv"></div>
        <div class="flexLayout">
          <audio-element
            v-for="cs in customStreams" v-bind:key="cs.queryKey"
            :query-key="cs.queryKey"
            :name="cs.name"
            :icon="cs.icon"
            :audio-src="cs.audioSrc"
          />
        </div>
        <h3 v-if="noRadioStreams" class="medium-text">no streams for this country</h3>
        <h4 class="smaller-text">add more streams at <a style="color: white;"
                                                        href="https://github.com/norkator/noiser-extras">github</a>
        </h4>
      </div>


      <hr>
      <div v-bind:key="audioPack.key" v-for="audioPack in audioPacks">
        <h2 class="pack-name">{{audioPack.name}}</h2>
        <div v-if="audioPack.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioPack.audioSources" v-bind:key="as.queryKey"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="smaller-text">sounds coming</h4>
        <hr>
      </div>


      <div class="timer-container">
        <h2 class="pack-name">Timer</h2>
        <div class="flexLayout" style="margin-bottom: 0;">
          <div class="timer">
            <div class="timer-content" style="margin-top: 10px;">
              <div @click="incrementTimer" class="timer-number-button ripple">+</div>
              <label class="timer-input">
                <input type="number" class="timer-input" v-model="timerMinutes"/>
              </label>
              <div @click="decrementTimer" class="timer-number-button ripple">-</div>
            </div>
            <div class="timer-content">
              <div class="timer-button ripple" @click="startStopTimer">{{ this.fullTimer === null ? 'start' : 'stop'}}
              </div>
            </div>
          </div>
        </div>
        <small class="smaller-text">time given in minutes</small>
      </div>
      <hr>

      <h2 class="pack-name">extra</h2>
      <div class="flexLayout">
        <div class="dashed-border">
          <div>
            <small class="smaller-text">select extra streams -
              <a style="color: white;" href="https://github.com/norkator/noiser-extras">manage here</a>
            </small>
          </div>
          <select class="custom-button" @change="loadStreams($event)">
            <option value="null">Select...</option>
            <option v-bind:key="index" v-for="(s, index) in extraStreamData" :value="JSON.stringify(s.streams)">
              {{s.name}}
            </option>
          </select>
        </div>
      </div>
      <div v-if="showUploadBtn">
        <div style="margin-bottom: 10px;">
          <small class="smaller-text">or</small>
        </div>
        <div class="flexLayout">
          <div class="dashed-border">
            <small class="smaller-text">upload custom streams json -
              <a style="color: white;" href="http://www.nitramite.com/noiser.html">sample here</a></small>
            <div class="flexLayout">
              <input class="custom-button" style="max-width: 240px;" type="file"
                     v-on:change="uploadStreamsJson($event)">
            </div>
          </div>
        </div>
      </div>
      <hr>

      <h2 class="pack-name">links</h2>
      <h4 class="smaller-text">download <a style="color: white;"
                                           href="https://play.google.com/store/apps/details?id=com.nitramite.noiser">ANDROID
        APP</a> here</h4>
      <h4 class="smaller-text"><a style="color: white;" href="http://www.nitramite.com/noiser.html">CLICK HERE</a> for
        asset attribution notes</h4>
      <hr>
      <h4 class="smaller-text">© Nitramite {{getYear()}} - All rights reserved</h4>
      <hr>
      <h4 class="smaller-text">Version {{versionInfo}}</h4>
      <hr>
    </section>
    <the-footer/>
  </div>
</template>
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

<script>

  import TheHeader from "./components/TheHeader.vue";
  import AudioElement from "./components/AudioElement.vue";
  import TheFooter from "./components/TheFooter.vue";
  import AudioPack from './assets/AudioPack';

  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4maps from "@amcharts/amcharts4/maps";
  import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


  const version = require('../package').version;

  export default {
    name: 'App',
    components: {
      TheHeader,
      AudioElement,
      TheFooter,
    },
    data() {
      return {
        audioPacks: AudioPack.audioPacks,
        showUpdateUI: false,
        timerMinutes: 10,
        fullTimer: null,
        indicatorInterval: null,
        extraStreamData: null,
        customStreams: [],
        showUploadBtn: true,
        versionInfo: version,
        noRadioStreams: false,
      }
    },
    mounted() {
      this.getExtraStreams();
      this.initMap();
    },
    methods: {
      _addDarkTheme() {
        let darkThemeLinkEl = document.createElement("link");
        darkThemeLinkEl.setAttribute("rel", "stylesheet");
        darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
        darkThemeLinkEl.setAttribute("id", "dark-theme-style");

        let docHead = document.querySelector("head");
        docHead.append(darkThemeLinkEl);
      },
      _removeDarkTheme() {
        let darkThemeLinkEl = document.querySelector("#dark-theme-style");
        let parentNode = darkThemeLinkEl.parentNode;
        parentNode.removeChild(darkThemeLinkEl);
      },
      toggleTheme() {
        let darkThemeLinkEl = document.querySelector("#dark-theme-style");
        if (!darkThemeLinkEl) {
          this._addDarkTheme();
          document.getElementById('changeThemeBtn').innerHTML = '&#9728;';
        } else {
          this._removeDarkTheme();
          document.getElementById('changeThemeBtn').innerHTML = '&#9790;';
        }
      },

      incrementTimer() {
        if (this.timerMinutes < 120) {
          this.timerMinutes += 1;
        }
      },
      decrementTimer() {
        if (this.timerMinutes > 1) {
          this.timerMinutes -= 1;
        }
      },
      startStopTimer() {
        if (this.fullTimer === null) {
          console.log('Timer started', this.timerMinutes, 'minutes');
          this.fullTimer = setTimeout(() => {
            this.stopAudioPlayers();
            this.fullTimer = null;
            clearInterval(this.indicatorInterval);
            console.log('Timer timeout...');
          }, (this.timerMinutes * 60 * 1000));
          this.indicatorInterval = setInterval(() => {
            this.timerMinutes -= 1;
          }, (60 * 1000));
        } else {
          clearTimeout(this.fullTimer);
          this.fullTimer = null;
          clearInterval(this.indicatorInterval);
          this.indicatorInterval = null;
          console.log('Timer cleared by user');
        }
      },
      stopAudioPlayers() {
        this.$emit('pauseAudio');
      },
      uploadStreamsJson(event) {
        const that = this;
        const files = event.target.files;
        let json = null;
        if (files.length >= 0) {
          let reader = new FileReader();
          reader.readAsText(files[0], "UTF-8");
          reader.onload = function (evt) {
            json = JSON.parse(evt.target.result);
            that.customStreams = json;
            that.showUploadBtn = false;
          }
        }
      },
      getExtraStreams() {
        const repo = "https://raw.githubusercontent.com/norkator/noiser-extras/main/streams.json";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", repo, false);
        xmlHttp.send(null);
        this.extraStreamData = JSON.parse(xmlHttp.responseText);
      },
      loadStreams(event) {
        this.$emit('pauseAudio');
        this.customStreams = null;
        this.customStreams = JSON.parse(event.target.value);
        this.showUploadBtn = this.customStreams === null;
      },
      getYear() {
        return new Date().getFullYear();
      },
      initMap() {
        const this_ = this;
        let map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
        map.geodata = am4geodata_worldLow;
        map.projection = new am4maps.projections.Miller();
        map.seriesContainer.draggable = true;
        map.seriesContainer.resizable = true;
        // map.maxZoomLevel = 1;

        // Series for World map
        const worldSeries = map.series.push(new am4maps.MapPolygonSeries());
        worldSeries.exclude = ["AQ"];
        worldSeries.useGeodata = true;

        const polygonTemplate = worldSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = map.colors.getIndex(0);
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.fill = am4core.color("#e1e1e1");

        const hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#2d3436");

        worldSeries.mapPolygons.template.events.on("hit", function (ev) {
          this_.mapCountrySelected(ev.target.dataItem.dataContext.name)
        });
      },
      mapCountrySelected(country) {
        console.log('Country name:', country);
        const s = this.extraStreamData.filter(s => {
          return s.country === country;
        });
        if (s.length > 0) {
          this.noRadioStreams = false;
          this.$emit('pauseAudio');
          this.customStreams = null;
          this.customStreams = s[0].streams;
          this.showUploadBtn = this.customStreams === null;
        } else {
          this.customStreams = null;
          this.noRadioStreams = true;
        }
      },
    },
    created() {
      if (this.$workbox) {
        this.$workbox.addEventListener("waiting", () => {
          this.showUpdateUI = true;
        });
      }
    },
    computed: {
      /* */
    },
    beforeDestroy() {
      /* */
    }
  }
</script>

<style>
  @import './assets/css/magic.min.css';

  @font-face {
    font-family: "MajorMonoDisplayRegular";
    src: local("MajorMonoDisplayRegular"), url("./assets/fonts/MajorMonoDisplay-Regular.ttf");
  }

  .headerBar {
    background-color: white;
    text-align: center;
    padding: 9px;
  }

  .footer {
    margin-top: -50px;
    width: 100%;
    height: 2.3rem; /* Footer height */
    background-color: white;
  }

  .footerBar {
    background-color: white;
    text-align: center;
    padding: 9px;
  }

  .changeThemeBtn {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    border: 1px solid #2c3e50;
    background-color: #2d3436;
    font-size: 20px;
    color: white;
    padding: 8px;
    width: 80px;
    border-radius: 200px;
    cursor: pointer;
    margin-top: -60px;
    margin-right: 10px;
    position: relative;
    float: right;
  }

  .changeThemeBtn:hover {
    background: #3e4547 radial-gradient(circle, transparent 1%, #3e4547 1%) center/15000%;
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

  @media screen and (max-width: 500px) {
    .mainContentLayout {
      border-radius: 0;
      margin: 0;
    }

    .footerBar {
      margin-top: 50px;
      background-color: white;
      text-align: center;
      padding: 9px;
    }

    .changeThemeBtn {
      font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
      border: 1px solid #2c3e50;
      background-color: #2d3436;
      font-size: 20px;
      color: white;
      padding: 8px;
      width: 50px;
      border-radius: 200px;
      cursor: pointer;
      margin-top: -60px;
      margin-right: 10px;
      position: relative;
      float: right;
    }
  }

  .flexLayout {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }

  .pack-name {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 24px;
    color: white;
    margin-bottom: 10px;
  }

  .medium-text {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 16px;
    color: #170c28;
  }

  .smaller-text {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 12px;
    color: white;
  }

  hr {
    border: 1px dashed rgba(255, 255, 255, 0.2);
    margin: 0 20px 0 20px;
    border-radius: 5px;
  }

  .dashed-border {
    border-radius: 25px;
    border-style: dashed;
    border-color: rgba(255, 255, 255, 0.3);
    border-width: 2px;
    margin: 5px;
    padding: 10px;
  }

  .update-dialog {
    text-align: center;
    border-radius: 20px;
    margin: 10px 20px 10px 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: white;
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 25px 0 rgba(255, 255, 255, 0.1);
  }

  .button {
    min-width: 100px;
    height: 40px;
    background: #2d3436;
    border-radius: 40px;
    overflow: hidden;
    cursor: pointer;
    transition: .1s linear;
    margin: 5px 5px 0 5px;
    color: white;
  }

  .button:hover {
    transform: scale(1.1);
  }

  .timer-container {
    margin-bottom: 10px;
  }

  .timer {
    margin-bottom: 10px;
    min-width: 150px;
    max-width: 150px;
    height: 100px;
    background: #2d3436;
    border-radius: 40px;
    padding: 0 50px;
    overflow: hidden;
  }

  .timer-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timer-number-button {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 30px;
    color: white;
    padding: 10px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .timer-button {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 16px;
    color: white;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
  }


  .timer-input {
    width: 50px;
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #2d3436;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .ripple {
    background-position: center;
    transition: background 0.8s;
  }

  .ripple:hover {
    background: #de6363 radial-gradient(circle, transparent 1%, #de6363 1%) center/15000%;
  }

  .ripple:active {
    background-color: #ffffff;
    background-size: 100%;
    transition: background 0s;
  }

  .custom-button {
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    border: 1px solid #2c3e50;
    background-color: #282e2f;
    margin: 5px;
    font-size: 14px;
    color: white;
    padding: 8px;
    border-radius: 20px;
    cursor: pointer;
  }

  .chartContainer {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .chartDiv {
    width: 100%;
    height: 35vh;
    cursor: pointer;
  }

</style>
