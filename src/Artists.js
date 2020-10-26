import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ARTISTS, LINKS, MEDIA, MEDIA_TYPE, MUSIC, SCROLL_OFFSETS } from "./CONSTANTS.js";
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

  componentDidMount() {
    if (MEDIA[this.props.artistName].type === MEDIA_TYPE.VIDEO) {
        let video = document.getElementsByTagName("video")[0];
        let source = MEDIA[this.props.artistName].sources[0];
        video.currentTime = source.start;
        video.ontimeupdate = function() {
            if (this.currentTime >= source.end) {
                video.currentTime = source.start;
            }
        };
    }
  }

  render() {
    let name = this.props.artistName.toUpperCase();

    let media = null;
    let source = MEDIA[this.props.artistName].sources[0];
    if (MEDIA[this.props.artistName].type === MEDIA_TYPE.VIDEO) {
        media =  (
            <div className="artist-page-img">
                <video key={source.src} muted autoPlay loop>
                  <source src={source.src} type="video/mp4"/>
                </video>
            </div>
       )
    }
    else {
      media = <div 
        className={`artist-page-img ${this.props.artistName}`}
        style={{backgroundImage: `url('${source.src}')`}}
      />
    }

    let socials = []
    for (const [social, link] of Object.entries(LINKS[this.props.artistName])) {
      const Component = this.components[social];
      socials.push(<Component key={`artist-social-${this.props.artistName}-${social}`} link={link}/>);
    }

    let s = `https://w.soundcloud.com/player/?url=${MUSIC[this.props.artistName]}&color=%23555555&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=true&show_teaser=true&visual=true%22%3E`;

    return (
      <div className="content artist-page">
        <div className="artist-name">{name}</div>
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
  render() {
    let cn = `artist-img ${this.props.artistName}`;
    let link = `/artists/${this.props.artistName}`;
    let logo = `artist-img-link ${this.props.artistName}`;
    let name = this.props.artistName.charAt(0).toUpperCase() + this.props.artistName.slice(1);

    return (
      <div className="artist-box">
        <p className="artist-name">{name}</p>
        <div className={cn}><Link className={logo} to={link}/></div>
      </div>
    )
  }
}

class Artists extends Component {
  handleLogoFade(name, start, end) {
    let logo = document.getElementsByClassName(`artist-img-link ${name}`)[0];
    let offset = window.pageYOffset;
    if (logo) {
      if (offset > start && offset < end) {
         logo.classList = `artist-img-link ${name} show-logo`
      }
      else {
         logo.classList = `artist-img-link ${name}`
      }
    }
  }

  componentDidMount() {
    this.scrollListener = null;

    if (isMobileDevice()) {
      this.scrollListener = window.addEventListener("scroll", () => {
        for (const artist of ARTISTS) {
          this.handleLogoFade(artist, SCROLL_OFFSETS[artist]["min"], SCROLL_OFFSETS[artist]["max"]);
        }
      });
    }
  }

  render() {
    let artists = [];
    for (const artist of ARTISTS) {
      artists.push(<ArtistBox artistName={artist}/>)
    }
    return (
      <div className="content artists">
        {artists}
      </div>
    )
  }

  componentWillUnmount() {
    if (this.scrollListener) {
      window.removeEventListener(this.scrollListener);
    }
  }
}

export default Artists;
export { ArtistPage };
