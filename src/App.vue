<template>
  <div id="app-container">
    <the-header app-name="Noiser"/>

    <div class="update-dialog" v-if="showUpdateUI">
      <div class="update-dialog__content">
        A new version is available. Refresh now to activate?
      </div>
      <div class="update-dialog__actions">
        <button class="button" @click="update">Update</button>
        <button class="button" @click="showUpdateUI = false">Cancel</button>
      </div>
    </div>

    <section class="mainContentLayout magictime slideDownReturn">
      <div v-bind:key="audioPack.key" v-for="audioPack in audioPacks">
        <h2 class="packName">{{audioPack.name}}</h2>
        <div v-if="audioPack.audioSources.length > 0" class="flexLayout">
          <audio-element
            v-for="as in audioPack.audioSources" v-bind:key="as.key"
            :audio-key="as.key"
            :query-key="as.queryKey"
            :name="as.name"
            :icon="as.icon"
            :audio-src="as.audioSrc"
          />
        </div>
        <h4 v-else class="packNoSounds">Sounds coming</h4>
        <hr>
      </div>


      <div class="timer-container">
        <h2 class="packName">Timer</h2>
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
              <div class="timer-button ripple" @click="startStopTimer">{{ this.fullTimer === null ? 'start' : 'stop'}}</div>
            </div>
          </div>
        </div>
        <small class="packNoSounds">Time given in minutes</small>
      </div>
      <hr>


      <h2 class="packName">Links</h2>
      <h4 class="packNoSounds">Download <a style="color: white;"
                                           href="https://play.google.com/store/apps/details?id=com.nitramite.noiser">Android
        App</a> here</h4>
      <h4 class="packNoSounds"><a style="color: white;" href="http://www.nitramite.com/noiser.html">Click here</a> for
        asset attribution notes</h4>
      <hr>
      <h4 class="packNoSounds">© Nitramite - All rights reserved</h4>
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
        audioPacks: AudioPack.audioPacks,
        showUpdateUI: false,
        timerMinutes: 10,
        fullTimer: null,
        indicatorInterval: null,
      }
    },
    mounted() {
    },
    methods: {
      async update() {
        this.showUpdateUI = false;
        await this.$workbox.messageSW({type: "SKIP_WAITING"});
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
    },
    created() {
      if (this.$workbox) {
        this.$workbox.addEventListener("waiting", () => {
          this.showUpdateUI = true;
        });
      }
    },
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
    background: #d9d8de radial-gradient(circle, transparent 1%, #d9d8de 1%) center/15000%;
  }

  .ripple:active {
    background-color: #ffffff;
    background-size: 100%;
    transition: background 0s;
  }

</style>
