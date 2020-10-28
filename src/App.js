import React, { Component } from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  SwitchTransition
} from 'react-transition-group';

import { ARTISTS } from "./CONSTANTS.js";

import Logo from './Logo';
import Home from './Home';
import Artists, { ArtistPage } from './Artists';
import About from './About';
import Contact from './Contact';
import Error from './Error';

import './App.css';

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = { previous: window.location.pathname };
    this.getClassName = this.getClassName.bind(this);
  }

  componentDidMount() {
    let twitter = document.getElementsByClassName("twitter social-media-icon")[0];
    twitter.onclick = () => { window.open("https://twitter.com/sqrwavmgmt"); };

    let insta = document.getElementsByClassName("instagram social-media-icon")[0];
    insta.onclick = () => { window.open("https://instagram.com/sqrwavmgmt"); };

    let facebook = document.getElementsByClassName("facebook social-media-icon")[0];
    facebook.onclick = () => { window.open("https://facebook.com/Square-Wave-Management-556509761423562/"); };

    let soundcloud = document.getElementsByClassName("soundcloud social-media-icon")[0];
    soundcloud.onclick = () => { window.open("https://soundcloud.com/sqrwavmgmt"); };
  }

  getClassName() {
      console.log(`previous: ${this.state.previous}`);
      console.log(`pathname: ${window.location.pathname}`);

      let classes = ['content-container'];
      if (window.location.pathname === "/") {
          classes.push("home");
      }
      if (window.location.pathname === "/about") {
          classes.push("about");
      }
      if (window.location.pathname === "/artists") {
          classes.push("artists");
      }
      if (window.location.pathname.match(/\/artists\/[a-z]+/)) {
          classes.push("artist");
      }
      if (window.location.pathname === "/contact") {
          classes.push("contact");
      }
      return classes.join(' ');
  }

  render() {
    let artistRoutes = [];
    for (const artist of ARTISTS) {
      artistRoutes.push(
        <Route key={`path-artists-${artist}`} exact path={`/artists/${artist}`}>
          <ArtistPage artistName={artist}/>
        </Route>
      )
    }

    return (
      <BrowserRouter>
        <Route render={({ location, history }) => (
          <React.Fragment>
            <header>
              <Logo/>
              <nav className="home">
                <NavLink className="home" exact to="/">HOME</NavLink>
                <NavLink className="artists" to="/artists">ARTISTS</NavLink>
                <NavLink className="about" to="/about">ABOUT</NavLink>
                <NavLink className="contact" to="/contact">CONTACT</NavLink>
              </nav>
            </header>
            <SwitchTransition mode="out-in">
              <CSSTransition key={location.key} timeout={1000} classNames="fade">
                <div className={ this.getClassName() }>
                <Switch location={location}>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/artists" component={Artists}/>
                  <Route exact path="/about" component={About}/>
                  <Route exact path="/contact" component={Contact}/>
                  {artistRoutes}
                  <Route component={Error}/>
                </Switch>
                </div>
              </CSSTransition>
            </SwitchTransition>
          <footer>
            <div className="social-media-bar">
              <div className="twitter social-media-icon"/>
              <div className="instagram social-media-icon"/>
              <div className="facebook social-media-icon"/>
              <div className="soundcloud social-media-icon"/>
            </div>
            <div>The official website of Square Wave Artist Management | all content © Square Wave Artist Management 2020</div>
          </footer>
        </React.Fragment>
        )} />
      </BrowserRouter>
    )
  }
}

export default App;
