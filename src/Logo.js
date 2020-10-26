import React, { Component } from 'react';

import './Logo.css';

class Logo extends Component {

  constructor() {
    super();
    this.r = 20;
    this.logoAlpha = 0;
    this.logoText = "S Q R     W A V";
    this.logoSubText = "a     r     t     i     s     t            m     a     n     a     g     e     m     e     n     t";

    this.leftLine = 0;
    this.middleLine = 0;
    this.rightLine = 0;

    this._leftLine = -1;
    this._middleLine = 0;
    this._rightLine = 0;
  }

  componentDidMount() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 2.3;

    let lazyLoad = document.getElementsByClassName("lazyLoad")[0];
    let i = setInterval(() => {
      if (lazyLoad) {
        clearInterval(i);
        this.fadeInLogo();
      }
    }, 50);
  }

  render() {
    return (
      <div style={{fontFamily: "LOGOFONT"}}>
        <img alt="" className="lazyLoad"/>
        <canvas width={document.body.clientWidth} height={200}/>
      </div>
    )
  }

  fadeInLogo() {
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    requestAnimationFrame(this._fadeInLogo.bind(this));
  }

  _fadeInLogo() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.logoAlpha += 0.01;

    this._drawLogo();

    if (this.logoAlpha > 1.5) {
      this.logoAlpha = 1;
      requestAnimationFrame(this.animateLine.bind(this));
    }
    else {
      requestAnimationFrame(this._fadeInLogo.bind(this));
    }
  }

  _getLogoFontSize() {
    let fontBase = 391;
    let logoFontSizeBase = 60;
    let logoFontRatio = logoFontSizeBase / fontBase;
    let logoFontSize = this.canvas.width * logoFontRatio;
    if (logoFontSize > 90) {
        return 70;
    }
    return logoFontSize;
  }

  _getLogoSubFontSize() {
    let fontBase = 391;
    let logoSubFontSizeBase = 13;
    let logoSubFontRatio = logoSubFontSizeBase / fontBase;
    let logoSubFontSize = this.canvas.width * logoSubFontRatio;
    if (logoSubFontSize > 15) {
        return 15;
    }
    return logoSubFontSize;
  }

  _drawLogo() {
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.logoAlpha})`;
    this.ctx.font = `${this._getLogoFontSize()}px LOGOFONT`;
    this.ctx.fillText(this.logoText, this.canvas.width/2, this.canvas.height/2);
                                                                                           
    this.ctx.font = `${this._getLogoSubFontSize()}px LOGOFONT`;
    this.ctx.fillText(this.logoSubText, this.canvas.width/2, (this.canvas.height/2) + 70);
  }

  animateLine() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawLogo();

    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2.3;

    this.ctx.font = `${this._getLogoFontSize()}px LOGOFONT`;
    let w = this.ctx.measureText(this.logoText).width;
    let h = this._getLogoFontSize();

    this.ctx.beginPath()
    this.ctx.moveTo(this.canvas.width/2 - w/2, this.canvas.height/2 + h/2 + 5);
    this._animateLeftLine(w, h);
    this._animateMiddleLine(w, h);
    this._animateRightLine(w, h);
    this.ctx.stroke();

    if (this.rightLine >= w/2) {
      setTimeout(() => { requestAnimationFrame(this.unanimateLine.bind(this)); }, 0);
    }
    else {
    requestAnimationFrame(this.animateLine.bind(this));
    }
  }

  _animateLeftLine(w, h) {
    let rate = (w/2) / this.r;
    if (this.leftLine < w/2 - 8) {
      this.leftLine = this.leftLine + rate;
    }
    this.ctx.lineTo(this.canvas.width/2 - w/2 + this.leftLine, this.canvas.height/2 + h/2 + 5);
  }

  _animateMiddleLine(w, h) {
    let rate = h / this.r;
    if (this.leftLine >= w/2 - 8) {
      if (this.middleLine < h + 15) { this.middleLine = this.middleLine + rate; }
      this.ctx.lineTo(this.canvas.width/2 - w/2 + this.leftLine, this.canvas.height/2 + h/2 - this.middleLine);
    }
  }

  _animateRightLine(w, h) {
    let rate = (w/2) / this.r;
    if (this.leftLine >= w/2 - 8 && this.middleLine >= h + 15) {
      if (this.rightLine < w/2) { this.rightLine = this.rightLine + rate; }
      this.ctx.lineTo(this.canvas.width/2 + this.rightLine, this.canvas.height/2 + h/2 - this.middleLine);
    }
  }

  unanimateLine() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawLogo();

    this.ctx.font = `${this._getLogoFontSize()}px LOGOFONT`;
    let w = this.ctx.measureText(this.logoText).width;
    let h = this._getLogoFontSize();

    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2.3;
    this.ctx.beginPath()
    this.ctx.moveTo(this.canvas.width/2 - w/2, this.canvas.height/2 + h/2 + 5);
    this._animateLeftLine(w, h)
    this._animateMiddleLine(w, h)
    this._animateRightLine(w, h)
    this.ctx.stroke();

    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "#fff";
    this.ctx.beginPath()
    this.ctx.moveTo(this.canvas.width/2 - w/2, this.canvas.height/2 + h/2 + 5);
    this._unanimateLeftLine(w, h);
    this._unanimateMiddleLine(w, h);
    this._unanimateRightLine(w, h);
    this.ctx.stroke();

    if (this._rightLine >= w/2) {
      this.leftLine = 0;
      this._leftLine = 0;
      this.middleLine = 0;
      this._middleLine = 0;
      this.rightLine = 0;
      this._rightLine = 0;
      setTimeout(() => { requestAnimationFrame(this.animateLine.bind(this)); }, 1000);
    }
    else {
      requestAnimationFrame(this.unanimateLine.bind(this));
    }
  }

  _unanimateLeftLine(w, h) {
    let rate = (w/2) / this.r;
    if (this._leftLine < w/2 - 8) {
      this._leftLine = this._leftLine + rate;
    }
    this.ctx.lineTo(this.canvas.width/2 - w/2 + this._leftLine, this.canvas.height/2 + h/2 + 5);
  }
                                                                                                                
  _unanimateMiddleLine(w, h) {
    let rate = h / this.r;
    if (this._leftLine >= w/2 - 8) {
      if (this._middleLine < h + 15) { this._middleLine = this._middleLine + rate; }
      this.ctx.lineTo(this.canvas.width/2 - w/2 + this._leftLine, this.canvas.height/2 + h/2 - this._middleLine);
    }
  }

  _unanimateRightLine(w, h) {
    let rate = (w/2) / this.r;
    if (this._leftLine >= w/2 - 8 && this._middleLine >= h + 15) {
      if (this._rightLine < w/2) { this._rightLine = this._rightLine + rate; }
      this.ctx.lineTo(this.canvas.width/2 + this._rightLine, this.canvas.height/2 + h/2 - this._middleLine);
    }
  }
}

export default Logo;
