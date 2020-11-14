<template>
  <div class="mainAudioLayout">

    <div class="player-container">
      <div class="player-container-content" @click="openAudioView" :class="isOpen ? 'player-container-span-open' : ''">
        <div>
          <!--suppress HtmlUnknownTarget -->
          <img class="icon" :src="getIcon" alt="icon">
          <br>
          <span>{{ this.name }}</span>
          <div v-if="isOpen" class="close-icon"/>
        </div>
      </div>
      <div>
        <div @click="openAudioView">
          <small class="smallSoundName" :style="getSoundNameStyle()">{{ this.name }}</small><br>
          <small class="smallSoundName">Volume {{ this.volume }}%</small>
        </div>
        <label aria-describedby="Change sound volume">
          <input class="slider" value="100" type="range" :id="this.queryKey + '-volume-control'">
        </label>
        <video class="video-player" :id="this.queryKey + '-m3u8'"></video>
      </div>
      <br>
    </div>

  </div>
</template>

<script>
  import LocalStorage from '../LocalStorage';
  import Hls from 'hls.js';

  export default {
    name: "AudioComponent",
    props: [
      'queryKey', 'name', 'icon', 'audioSrc'
    ],
    mixins: [LocalStorage],
    data() {
      return {
        player: null,
        hlsPlayer: null,
        hlsPlayerElement: null,
        manifestParsed: false,
        paused: true,
        isOpen: false,
        volume: 100,
        lsPlayingKey: this.queryKey + '-playing',
        lsVolumeKey: this.queryKey + '-volume-level',
      }
    },
    mounted() {
      this.initAudioPlayer();
    },
    methods: {
      initAudioPlayer() {
        const that = this;
        if (!this.audioSrc.includes('.m3u8')) {
          this.player = new Audio(this.audioSrc);
          this.player.preload = false;
        } else {
          this.hlsPlayerElement = document.querySelector("#" + this.queryKey + "-m3u8");
          this.hlsPlayer = new Hls();
        }
        // this.player.loop = true; // This is not gap less
        let volume = document.querySelector("#" + this.queryKey + "-volume-control");

        const savedVolume = this.lsGetValue(this.lsVolumeKey);
        if (savedVolume !== null) {
          this.setVolumeLevel(savedVolume);
          volume.value = Number(savedVolume * 100).toFixed(0);
        }

        volume.addEventListener("change", function (e) {
          const c = e.currentTarget.value / 100;
          that.setVolumeLevel(c);
        });
        if (this.player !== null) {
          this.player.addEventListener('timeupdate', function () {
            const buffer = .44;
            if (this.currentTime > this.duration - buffer) {
              this.currentTime = 0;
              this.play();
            }
          });
        }

        const wasPlaying = this.lsGetValue(this.lsPlayingKey);
        if (wasPlaying !== null && wasPlaying === 'true') {
          this.isOpen = true;
          this.startAudio();
        }
      },
      setVolumeLevel(volumeValue) {
        if (this.player !== null) {
          this.player.volume = volumeValue;
        } else if (this.hlsPlayerElement !== null) {
          this.hlsPlayerElement.volume = volumeValue;
        }
        this.volume = Number(volumeValue * 100).toFixed(0);
        this.lsSaveValue(this.lsVolumeKey, volumeValue);
      },
      startAudio() {
        if (this.player !== null) {
          this.player.src = this.audioSrc;
          this.player.play();
          this.paused = false;
          this.lsSaveValue(this.lsPlayingKey, true);
        } else if (this.hlsPlayerElement !== null) {
          this.hlsPlayer.loadSource(this.audioSrc);
          this.hlsPlayer.attachMedia(this.hlsPlayerElement);
          this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function() {
            this.manifestParsed = true;
          });
          this.hlsPlayerElement.play();
        }
      },
      pauseAudio() {
        if (this.player !== null) {
          this.player.pause();
          this.player.src = '';
          this.paused = true;
          this.lsSaveValue(this.lsPlayingKey, false);
        } else if (this.hlsPlayerElement !== null) {
          this.hlsPlayerElement.pause();
          this.hlsPlayer.stopLoad();
          this.paused = true;
          this.lsSaveValue(this.lsPlayingKey, false);
        }
      },
      emitStopAudio() {
        this.isOpen = false;
        this.pauseAudio();
      },
      openAudioView() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.startAudio();
        } else {
          this.pauseAudio();
        }
      },
      getSoundNameStyle() {
        return String(this.name).length > 12 ? 'font-size: 12px' : 'font-size: 16px';
      }
    },
    watch: {},
    computed: {
      getIcon() {
        return this.icon !== null ? this.icon : require('../assets/images/play.svg');
      },
    },
    created() {
      this.$parent.$on('pauseAudio', this.emitStopAudio);
    },
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

  .close-icon {
    position: absolute;
    display: block;
    width: 24px;
    height: 24px;
    background: url('../assets/images/close.svg');
    bottom: 37px;
    right: 0;
  }

  .video-player {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  }

</style>
