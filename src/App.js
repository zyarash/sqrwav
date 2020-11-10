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

const test=({location:{pathname:prev}}, nextState, replace, cb) => {
    console.log("here");
    console.log(prev);
    console.log("done");
};

class App extends Component {
    constructor(props) { 
        super(props);
        this.getPageClassName = this.getPageClassName.bind(this);
        this.state = { prev: window.location.pathname };
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

    getPageClassName() {
        if (window.location.pathname !== this.state.prev) {
            this.setState({ prev: window.location.pathname });
        }

        if (window.location.pathname.match(/\/artists\/[a-z]+/)) {
            return "artist";
        }
        else if (window.location.pathname.slice(1) === "") {
            return "home";
        }
        return window.location.pathname.slice(1);
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
            <BrowserRouter onChange={test}>
            <Route onChange={test} render={({ location }) => (
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
                        <CSSTransition key={location.pathname} timeout={500} classNames={`${this.getPageClassName()} fade`}>
                            <div className={ "content-container " + this.getPageClassName() }>
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
