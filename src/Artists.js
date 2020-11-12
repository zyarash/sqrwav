import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ARTISTS, LINKS, MEDIA, MEDIA_TYPE, MUSIC } from "./CONSTANTS.js";
import { isMobileDevice } from "./HELPERS.js";

import {
  FacebookSVG,
  InstagramSVG,
  SoundCloudSVG,
  SpotifySVG,
  TwitterSVG,
} from './Svg';

import './Artists.css';

class ArtistPage extends Component {
  components = {
    "spotify": SpotifySVG,
    "soundcloud": SoundCloudSVG,
    "instagram": InstagramSVG,
    "twitter": TwitterSVG,
    "facebook": FacebookSVG
  };

  render() {
    let media = null;
    let source = MEDIA[this.props.artistName].sources[0];
    if (MEDIA[this.props.artistName].type === MEDIA_TYPE.VIDEO) {
        media = (
            <div className="artist-page-img-contain">
                <div className="artist-page-img">
                    <video key={source.src} muted autoPlay loop playsinline>
                      <source src={source.src} type="video/mp4"/>
                    </video>
                    <div className={`artist-name page ${this.props.artistName}`}/>
                </div>
                <div className={`artist-media-credit ${this.props.artistName}`}>
                    <div className={`photographer ${this.props.artistName}`}/>
                    <div className={`location ${this.props.artistName}`}/>
                </div>
            </div>
       )
    }
    else {
      media = (
        <div className="artist-page-img-contain">
            <div 
            className={`artist-page-img ${this.props.artistName}`}
            style={{backgroundImage: `url('${source.src}')`}}
            >
                <div className={`artist-name page ${this.props.artistName}`}/>
            </div>
            <div className={`artist-media-credit ${this.props.artistName}`}>
                <div className={`photographer ${this.props.artistName}`}/>
                <div className={`location ${this.props.artistName}`}/>
            </div>
        </div>
        )
    }

    let socials = []
    for (const [social, link] of Object.entries(LINKS[this.props.artistName])) {
      const Component = this.components[social];
      socials.push(
          <div className="artist-info-social">
              <Component key={`artist-social-${this.props.artistName}-${social}`} link={link}/>
              <Component key={`artist-social-${this.props.artistName}-${social}`} link={link} top={true}/>
          </div>
      );
    }

    let s = `https://w.soundcloud.com/player/?url=${MUSIC[this.props.artistName]}&color=%23555555&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=true&show_teaser=true&visual=true%22%3E`;

    return (
      <div className="content artist-page">
        <div className="artist-page-main-contain">
          {media}
          <div className="hr"/>
          <div className="artist-info">
            <div className="artist-info-socials">
              {socials}
            </div>
            <div className="hr hidden"/>
            <div className="artist-info-music">
              <iframe title="soundcloud" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={s}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ArtistBox extends Component {
  constructor(props) {
      super(props);
      this.mouseEnter = this.mouseEnter.bind(this);
      this.mouseLeave = this.mouseLeave.bind(this);
      this.state = { hover: false };
  }

  mouseEnter() {
      this.setState({hover: true});
  }

  mouseLeave() {
      this.setState({hover: false});
  }

  render() {
    let cn = `artist-img ${this.props.artistName}`;
    let link = `/artists/${this.props.artistName}`;
    let logo = `artist-img-link ${this.props.artistName}`;
    let nb = `artist-name-animate ${this.props.artistName}`;
    let n = `artist-name ${this.props.artistName}`;

    if (this.state.hover) {
        cn = cn + " hover";
        logo = logo + " hover";
        n = n + " hover";
        nb = nb + " hover";
    }

    return (
      <div className={`artist-box ${this.props.artistName}`}>
        <div
            className={`artist-box-animate ${this.props.artistName}`}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
        >
            <div className={cn}/>
            <Link className={logo} to={link}/>
            <div className={nb}>
                <div className={n}>{this.props.artistName.toUpperCase()}</div>
            </div>
        </div>
      </div>
    )
  }
}

class Artists extends Component {
  handleLogoFade(name) {
    let logo = document.getElementsByClassName(`artist-img-link ${name}`)[0];
    let img = document.getElementsByClassName(`artist-img ${name}`)[0];
    let n = document.getElementsByClassName(`artist-name ${name}`)[0];
    if (!logo || !img || !n) { return; }

    let rect = logo.getBoundingClientRect();
    let page = document.getElementById("root").getBoundingClientRect();

    let pageCenter = (-1 * page.y) + (window.innerHeight / 2);
    let rectCenter = (rect.y) + (rect.height / 2) + (-1 * page.y);

    if (pageCenter >= rectCenter - 160 && pageCenter <= rectCenter + 160) {
        logo.classList = `artist-img-link ${name} hover`;
        img.classList = `artist-img ${name} hover`;
        n.classList = `artist-name ${name} hover`;
    }
    else {
        logo.classList = `artist-img-link ${name}`
        img.classList = `artist-img ${name}`;
        n.classList = `artist-name ${name}`;
    }
  }

  componentDidMount() {
    this.scrollListener = null;

    if (isMobileDevice()) {
      this.scrollListener = window.addEventListener("scroll", () => {
        for (const artist of ARTISTS) {
          this.handleLogoFade(artist);
        }
      });
    }
  }

  render() {
    let artists = [];
    for (const artist of ARTISTS) {
      artists.push(<ArtistBox key={`artist-box-${artist}`} artistName={artist}/>)
    }
    return (
      <div className="content artists">
        {artists}
      </div>
    )
  }

  async componentWillUnmount() {
    if (this.scrollListener) {
      window.removeEventListener(this.scrollListener);
    }
  }
}

export default Artists;
export { ArtistPage };
