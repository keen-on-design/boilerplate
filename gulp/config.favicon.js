'use strict';

module.exports = {
  design: {
    ios: {
      pictureAspect: 'backgroundAndMargin',
      backgroundColor: '#ffffff',
      margin: '7%',
      assets: {
        ios6AndPriorIcons: false,
        ios7AndLaterIcons: false,
        precomposedIcons: false,
        declareOnlyDefaultIcon: true
      }
    },
    desktopBrowser: {},
    windows: {
      pictureAspect: 'noChange',
      backgroundColor: '#ffffff',
      onConflict: 'override',
      assets: {
        windows80Ie10Tile: false,
        windows10Ie11EdgeTiles: {
          small: false,
          medium: true,
          big: false,
          rectangle: false
        }
      }
    },
    androidChrome: {
      pictureAspect: 'noChange',
      themeColor: '#ffffff',
      manifest: {
        name: 'Musicorum',
        display: 'standalone',
        orientation: 'notSet',
        onConflict: 'override',
        declared: true
      },
      assets: {
        legacyIcon: false,
        lowResolutionIcons: false
      }
    },
    safariPinnedTab: {
      pictureAspect: 'silhouette',
      themeColor: '#5a12a6'
    }
  },
  settings: {
    scalingAlgorithm: 'Mitchell',
    errorOnImageTooSmall: false
  },
};