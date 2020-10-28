import React, { Component } from 'react';

import "./Contact.css";

class BaseFormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getErrors(errors) {
    if (!errors) { return null; }
    let n = this.props.name;
    let e = errors.map(function(e) {
      if (e.param === n) { return e; }
      return undefined;
    }).filter(Boolean);
    return (e.length > 0 ? e : null);
  }
}

class TextFormInput extends BaseFormInput {
  render() {
    const errors = this.getErrors(this.props.errors);
    const classes = (errors ? "error" : "");

    return(
      <label>
        <p className={ classes }>{ this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) } *</p>
        { errors && 
            <div className="error-msg">
              { errors.map(function(e) { return (<li>{e.msg}</li>); }) }
            </div>
        }
        <input className={ classes } type="text" name={this.props.name} value={this.state.value} onChange={this.handleChange}/>
      </label>
    )
  }
}

class MessageFormInput extends BaseFormInput {
  constructor(props) {
    super(props);
    this.state = {value: ""};
  }

  render() {
    const errors = this.getErrors(this.props.errors);
    const classes = (errors ? "error" : "");

    return (
      <label>
        <p className={ classes }>Message *</p>
        { errors && 
            <div className="error-msg">{ 
              errors.map(function(e) { return `• ${e.msg}\n`; })
            }</div>
        }
        <textarea className={ classes }value={this.state.value} onChange={this.handleChange} placeholder="Type your message here"/>
      </label>
    )
  }
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errors: null, value: "SUBMIT"};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: null, errors: null, value: "SENDING..."});
    this.refs.submit.disabled = true;

    const data = {
      subject: this.refs.subject.state.value,
      name: this.refs.name.state.value,
      email: this.refs.email.state.value,
      message: this.refs.message.state.value,
    };

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    };

    const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
    await delay(1000);

    const response = await fetch("/contact", request);
    if (response.status === 200) {
      this.refs.submit.value = "THANK YOU!";
      this.refs.submit.disabled = true;
    }
    else {
      try {
        const body = await response.json();
        const errors = body.errors;
        const errorFields = Array.from(new Set(errors.map(function(e) {
            return e.param;
        })));
        this.setState({
            error: `
                Your message could not be processed, 
                please fix the following fields and try again:\n\n
                ${ errorFields.join(', ') }
            `,
            errors: errors,
            value: "SUBMIT",
        });
      }
      catch(err) {
          this.setState({
              error: "Your message could not be processed, please try again later.",
              errors: null,
              value: "SUBMIT",
          });
      }
      this.refs.submit.disabled = false;
    }
  }

  render() {
    return (
      <form className="content contact">
        { this.state.error && 
            <div className="master error-msg">{ this.state.error }</div>
        }
        <TextFormInput ref="name" name="name" errors={this.state.errors}/>
        <TextFormInput ref="email" name="email" errors={this.state.errors}/>
        <TextFormInput ref="subject" name="subject" errors={this.state.errors}/>
        <MessageFormInput ref="message" name="message" errors={this.state.errors}/>
        <input ref="submit" type="submit" value={this.state.value} onClick={this.handleSubmit}/>
      </form>
    )
  }
}

export default Contact;
