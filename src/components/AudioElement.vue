<template>
  <div class="mainAudioLayout">

    <div class="player-container">
      <div class="player-container-content" @click="openAudioView" :class="isOpen ? 'player-container-span-open' : ''">
        <div>
          <!--suppress HtmlUnknownTarget -->
          <img class="icon" :src="this.icon" alt="icon">
          <br>
          <span>{{ this.name }}</span>
        </div>
      </div>
      <div>
        <div @click="openAudioView">
          <small class="smallSoundName" style="font-size: 16px">{{ this.name }}</small><br>
          <small class="smallSoundName">Volume {{ this.volume }}%</small>
        </div>
        <label aria-describedby="Change sound volume">
          <input class="slider" value="100" type="range" :id="this.queryKey + '-volume-control'">
        </label>
      </div>
      <br>
    </div>

  </div>
</template>

<script>
  export default {
    name: "AudioComponent",
    props: [
      'audioKey', 'queryKey', 'name', 'icon', 'audioSrc'
    ],
    data() {
      return {
        player: null,
        paused: true,
        isOpen: false,
        volume: 100,
      }
    },
    mounted() {
      this.initAudioPlayer();
    },
    methods: {
      initAudioPlayer() {
        const that = this;
        this.player = new Audio(this.audioSrc);
        // this.player.loop = true; // This is not gap less
        let volume = document.querySelector("#" + this.queryKey + "-volume-control");
        volume.addEventListener("change", function (e) {
          const c = e.currentTarget.value / 100;
          that.player.volume = c;
          that.volume = Number(c * 100).toFixed(0);
        });
        this.player.addEventListener('timeupdate', function () {
          const buffer = .44;
          if (this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
          }
        });
      },
      startAudio() {
        if (this.player !== null) {
          this.player.play();
          this.paused = false;
        }
      },
      pauseAudio() {
        if (this.player !== null) {
          this.player.pause();
          this.paused = true;
        }
      },
      openAudioView() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.startAudio();
        } else {
          this.pauseAudio();
        }
      },
    },
    watch: {},
    computed: {}
  }
</script>

<style scoped>

  .mainAudioLayout {
    margin: 15px;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    border-radius: 10px;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    outline: none;
    opacity: 0.5;
    border-radius: 25px;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 25px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #ffffff;
    cursor: pointer;
  }

  .player-container {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 130px;
    max-width: 150px;
    height: 80px;
    background: #2c3e50;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: .1s linear;
  }

  .player-container:hover {
    transform: scale(1.1);
  }

  .player-container-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2d3436;
    color: #f1f1f1;
    text-align: center;
    z-index: 999;
    transition: .4s linear;
    border-radius: 40px;
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 16px;
    padding-top: 8%;
  }

  .player-container img {
    width: 35px;
  }


  /*.player-container:hover span{ */
  .player-container-span-open {
    transform: translateX(-90%);
    transition-delay: .1s;
  }

  .player-container-span-open:hover {
    background: whitesmoke;
  }

  .smallSoundName {
    color: white;
    font-family: "MajorMonoDisplayRegular", Helvetica, Arial, serif;
    font-size: 12px;
  }


</style>
