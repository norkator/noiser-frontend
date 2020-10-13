exports.audioPacks = {
  winterPack: {
    name: 'Winter pack',
    audioSources: [
      {
        key: 1,
        queryKey: 'water',
        name: 'Water',
        icon: require('../assets/images/bus.svg'),
        audioSrc: 'http://21273.live.streamtheworld.com/LOS40_DANCE.mp3'
      },
      {
        key: 2,
        queryKey: 'wind',
        name: 'Wind',
        icon: require('../assets/images/bus.svg'),
        audioSrc: 'https://21233.live.streamtheworld.com/LOS40_URBANAAC.aac'
      },
      {
        key: 3,
        queryKey: 'camp-fire',
        name: 'Campfire',
        icon: require('../assets/images/bus.svg'),
        audioSrc: 'https://22713.live.streamtheworld.com/LOS40_CLASSICAAC.aac'
      },
      {
        key: 4,
        queryKey: 'test',
        name: 'Test',
        icon: require('../assets/images/bus.svg'),
        audioSrc: 'https://21233.live.streamtheworld.com/LOS40AAC.aac'
      }
    ]
  },
  summerPack: {
    name: 'Summer pack',
    audioSources: []
  },
  other: {
    name: 'Others',
    audioSources: []
  },
};
