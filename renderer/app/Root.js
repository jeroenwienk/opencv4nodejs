import * as React from 'react';

import cv from '../node_modules/opencv4nodejs'
import path from 'path';

//const cv = require(`opencv4nodejs`);
//const path = require('path');

export default class Root extends React.Component {
  renderImage(img) {
    const { canvas } = this;
    const matRGBA =
      img.channels === 1
        ? img.cvtColor(cv.COLOR_GRAY2RGBA)
        : img.cvtColor(cv.COLOR_BGR2RGBA);

    canvas.height = img.rows;
    canvas.width = img.cols;
    const imgData = new ImageData(
      new Uint8ClampedArray(matRGBA.getData()),
      img.cols,
      img.rows
    );
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
  }

  componentDidMount() {
    const img = cv.imread(path.resolve('assets', 'got.jpg')).resizeToMax(500);
    this.renderImage(img);
  }

  render() {
    return (
      <div>
        <div>Test</div>
        <canvas
          ref={el => {
            this.canvas = el;
          }}
        />
      </div>
    );
  }
}
