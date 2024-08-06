module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
