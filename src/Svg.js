import React, { Component } from 'react';

const L = "60px";
const VIEWBOX = "0 0 24 24";
const CLSNAME = (s) => { return `artist-social ${s}-artist-social`;}

class BaseSVGComponent extends Component {
  handleClick() {
    window.open(this.props.link);
  }

  render() {
    let cls = CLSNAME(this.name);
    if (this.props.top) {
        cls = cls + " top";
    }

    return (
      <svg width={L} height={L} viewBox={VIEWBOX} onClick={this.handleClick.bind(this)} className={cls}>
        {this.innerPath}
      </svg>
    )
  }
}

class InstagramSVG extends BaseSVGComponent {
  constructor(props) {
    super(props);
    this.name = "instagram";
  }

  render() {
    let cls = CLSNAME(this.name);
    if (this.props.top) {
        cls = cls + " top";
    }

    return (
      <svg width={L} height={L} viewBox={VIEWBOX} onClick={this.handleClick.bind(this)} className={cls}>
        <path className="instagram-path-colored" xmlns="http://www.w3.org/2000/svg" d="M18 6.615v1.45c0 .34-.275.616-.616.616h-1.449c-.341 0-.615-.276-.615-.616v-1.45c0-.34.274-.615.615-.615h1.449c.341 0 .616.275.616.615zm-1.131 4.699c.033.225.054.453.054.686 0 2.72-2.204 4.923-4.922 4.923s-4.923-2.204-4.923-4.923c0-.233.021-.461.054-.686.031-.221.075-.437.134-.647h-1.266v6.719c0 .339.275.614.616.614h10.769c.34 0 .615-.275.615-.615v-6.719h-1.265c.058.211.102.427.134.648zm-4.869 3.763c1.699 0 3.078-1.378 3.078-3.077s-1.379-3.077-3.078-3.077-3.077 1.377-3.077 3.077 1.378 3.077 3.077 3.077zm12-15.077v24h-24v-24h24zm-4 5.846c0-1.019-.826-1.846-1.846-1.846h-12.308c-1.019 0-1.846.827-1.846 1.846v12.307c0 1.02.827 1.847 1.846 1.847h12.309c1.019 0 1.845-.827 1.845-1.847v-12.307z"/>
        <path className="instagram-path" xmlns="http://www.w3.org/2000/svg" d="M18 6.615v1.45c0 .34-.275.616-.616.616h-1.449c-.341 0-.615-.276-.615-.616v-1.45c0-.34.274-.615.615-.615h1.449c.341 0 .616.275.616.615zm-1.131 4.699c.033.225.054.453.054.686 0 2.72-2.204 4.923-4.922 4.923s-4.923-2.204-4.923-4.923c0-.233.021-.461.054-.686.031-.221.075-.437.134-.647h-1.266v6.719c0 .339.275.614.616.614h10.769c.34 0 .615-.275.615-.615v-6.719h-1.265c.058.211.102.427.134.648zm-4.869 3.763c1.699 0 3.078-1.378 3.078-3.077s-1.379-3.077-3.078-3.077-3.077 1.377-3.077 3.077 1.378 3.077 3.077 3.077zm12-15.077v24h-24v-24h24zm-4 5.846c0-1.019-.826-1.846-1.846-1.846h-12.308c-1.019 0-1.846.827-1.846 1.846v12.307c0 1.02.827 1.847 1.846 1.847h12.309c1.019 0 1.845-.827 1.845-1.847v-12.307z"/>
        <rect className="instagram-path-hover" width="100%" height="100%" fillOpacity="0"/>
        <defs>
          <radialGradient id="instagram-color" cx="50%" cy="50%" r="140%" fx="20%" fy="110%">
            <stop offset="0%" stopColor="#feda75"/>
            <stop offset="22%" stopColor="#fa7e11" />
            <stop offset="45%" stopColor="#d62976"/>
            <stop offset="60%" stopColor="#962fbf"/>
            <stop offset="85%" stopColor="#4f5bd5"/>
          </radialGradient>
        </defs>
      </svg>
    )
  }
}

class SpotifySVG extends BaseSVGComponent {
  constructor(props) {
    super(props);
    this.name = "spotify";
    this.innerPath = <path xmlns="http://www.w3.org/2000/svg" d="M24 0v24h-24v-24h24zm-12 4c-4.418 0-8 3.582-8 8 0 4.419 3.582 8 8 8s8-3.581 8-8c0-4.418-3.582-8-8-8zm3.669 11.539c-.144.236-.451.31-.686.166-1.878-1.148-4.243-1.408-7.028-.772-.268.062-.535-.106-.597-.375-.061-.268.106-.535.375-.596 3.048-.697 5.662-.397 7.771.891.235.144.309.451.165.686zm.979-2.178c-.181.293-.565.385-.858.205-2.15-1.322-5.428-1.704-7.972-.932-.33.099-.678-.087-.778-.416-.1-.33.086-.677.416-.778 2.905-.881 6.517-.454 8.987 1.063.293.181.385.565.205.858zm.084-2.269c-2.578-1.531-6.832-1.672-9.294-.925-.395.12-.813-.103-.933-.498-.12-.396.103-.814.499-.934 2.826-.858 7.523-.692 10.492 1.07.356.211.472.671.262 1.026-.211.355-.671.472-1.026.261z"/>;
  }
}

class SoundCloudSVG extends BaseSVGComponent {
  constructor(props) {
    super(props);
    this.name = "soundcloud";
    this.innerPath = <path xmlns="http://www.w3.org/2000/svg" d="M0 0v24h24v-24h-24zm4.667 15.524c-.405-.365-.667-.903-.667-1.512 0-.608.262-1.146.667-1.512v3.024zm1.333.476c-.243 0-.369.003-.667-.092v-3.792c.316-.101.465-.097.667-.081v3.965zm1.333 0h-.666v-3.778l.206.121c.091-.375.253-.718.461-1.023v4.68zm1.334 0h-.667v-5.378c.206-.154.426-.286.667-.377v5.755zm1.333 0h-.667v-5.905c.251-.027.328-.046.667.006v5.899zm1.333 0h-.667v-5.7l.253.123c.119-.207.261-.395.414-.572v6.149zm6.727 0h-6.06v-6.748c.532-.366 1.16-.585 1.841-.585 1.809 0 3.275 1.494 3.411 3.386 1.302-.638 2.748.387 2.748 1.876 0 1.143-.869 2.071-1.94 2.071z"/>;
  }
}

class TwitterSVG extends BaseSVGComponent {
  constructor(props) {
    super(props);
    this.name = "twitter";
    this.innerPath = <path d="M0 0v24h24v-24h-24zm18.862 9.237c.208 4.617-3.235 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.079-4.03 3.198-4.03.944 0 1.797.398 2.396 1.037.748-.147 1.451-.42 2.085-.796-.245.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.44.656-.997 1.234-1.638 1.697z"/>;
  }
}

class FacebookSVG extends BaseSVGComponent {
  constructor(props) {
    super(props);
    this.name = "facebook";
    this.innerPath = <path xmlns="http://www.w3.org/2000/svg" d="M0 0v24h24v-24h-24zm16 7h-1.923c-.616 0-1.077.252-1.077.889v1.111h3l-.239 3h-2.761v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"/>;
  }
}

export { FacebookSVG, InstagramSVG, SoundCloudSVG, SpotifySVG, TwitterSVG };
