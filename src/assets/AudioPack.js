exports.audioPacks = {
  summerPack: {
    name: 'Summer pack',
    audioSources: [
      {
        key: 1,
        queryKey: 'stream-one',
        name: 'Stream#1',
        icon: require('./images/water.svg'),
        audioSrc: require('../assets/audio/lake1.mp3')
      },
      {
        key: 2,
        queryKey: 'stream-two',
        name: 'Stream#2',
        icon: require('./images/water.svg'),
        audioSrc: require('../assets/audio/lake2.mp3')
      },
      {
        key: 3,
        queryKey: 'tower-one',
        name: 'Tower#1',
        icon: require('./images/tower.svg'),
        audioSrc: require('../assets/audio/tower1.mp3')
      },
    ]
  },
  winterPack: {
    name: 'Winter pack',
    audioSources: [

    ]
  },
  other: {
    name: 'Others',
    audioSources: [
      {
        key: 1,
        queryKey: 'server-one',
        name: 'Server#1',
        icon: require('./images/server.svg'),
        audioSrc: require('../assets/audio/server1.mp3')
      },
      {
        key: 2,
        queryKey: 'car-one',
        name: 'Car#1',
        icon: require('./images/car.svg'),
        audioSrc: require('../assets/audio/car1.mp3')
      },
      {
        key: 3,
        queryKey: 'heater-one',
        name: 'Heater#1',
        icon: require('./images/house.svg'),
        audioSrc: require('../assets/audio/waterheater1.mp3')
      },
    ]
  },
};
