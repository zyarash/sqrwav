import React, { Component } from 'react';

import './Error.css';

class Error extends Component {
  render() {
    let msg = "Not Found :(";
    return (<div className="error">404<br/>{msg}</div>)
  }
}

export default Error;
