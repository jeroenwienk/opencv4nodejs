import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';

const { desktopCapturer } = require('electron');

console.log(process.env.path);

desktopCapturer.getSources(
  {
    types: [
      // 'window',
      'screen'
    ]
  },
  (error, sources) => {
    if (error) throw error;
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name === 'Screen 1') {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[i].id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          })
          .then(stream => handleStream(stream))
          .catch(e => handleError(e));
        return;
      }
    }
  }
);

function handleStream(stream) {
  console.log(stream);

  //const mediaSource = new MediaSource();
  const video = document.createElement('video');
  const el = document.getElementById('video');
  el.appendChild(video);

  video.srcObject = stream;
  video.onloadedmetadata = e => video.play();
}

function handleError(e) {
  console.log(e);
}

ReactDOM.render(<Root />, document.getElementById('root'));

if (module['hot']) {
  module['hot'].accept('./Root', () => {
    const HotRoot = require('./Root').default;
    ReactDOM.render(<HotRoot />, document.getElementById('root'));
  });
}
