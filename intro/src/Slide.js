import React from "react";
import Bubbles from "./Bubbles.js";
import "@fortawesome/fontawesome-free/css/all.css";
import IconButton from "@material-ui/core/IconButton";

const uuidv4 = require("uuid/v4");
const content = require("./data/contents.json");

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = { nightMode: false, name: "toss" };
    this.bubbles = <Bubbles></Bubbles>;

    this.back = this.back.bind(this);
    this.next = this.next.bind(this);

    this.toggleNightMode = this.toggleNightMode.bind(this);
  }

  toggleNightMode() {
    this.setState({ nightMode: !this.state.nightMode });
  }

  back(event) {
    event.preventDefault();
    let last = content[this.state.name]["last"];
    if (last != null) {
      this.setState({ name: last });
    }
  }

  next(event) {
    event.preventDefault();

    if (this.state.name === "Nav") {
      this.setState({ name: event.target.innerHTML });
    } else {
      let next = content[this.state.name]["next"];
      if (next != null) {
        this.setState({ name: next });
      }
    }
  }

  render() {
    let name = this.state.name;
    let slideContent = <div></div>;

    if (name === "About") {
      slideContent = (
        <div className="container about-container">
          <div className="about-image-quote-container">
            <img
              alt="Roshini's Profile"
              className="about-image custom-card"
              src={require("./images/roshini-profile.jpg")}
            ></img>

            <div className="about-quote-name-container">
              <div className="d-block d-lg-none custom-card about-name">
                <h3>Roshini Saravanakumar</h3>
                <i>Creative Mind & Life-long Learner</i>
              </div>

              <div className="custom-card about-quote">
                <blockquote>
                  {content["About"]["aboutQuote"]["quote"]}
                </blockquote>
                <footer>
                  &mdash; {content["About"]["aboutQuote"]["footer"]}
                </footer>
              </div>
            </div>
          </div>

          <div className="custom-card about-description">
            {content["About"]["aboutSections"].map((section, index) => (
              <Section
                className={index === 0 ? "d-none d-lg-block" : ""}
                sectionKey={section.key}
                badges={section.badges}
                header={section.header}
                body={section.body}
              ></Section>
            ))}
          </div>
        </div>
      );
    } else if (name === "Nav") {
      slideContent = (
        <Navigation navItems={content["Nav"]["content"]}></Navigation>
      );
    } else if (content[name]["text"] !== undefined) {
      slideContent = <h1>{content[name]["text"]}</h1>;
    } else {
      slideContent = (
        <LinkedText content={content[name]["content"]}></LinkedText>
      );
    }

    return (
      <div className={this.state.nightMode ? "dark" : "light"}>
        <div className="navbar w-100 fixed-top">
          <div className="navbar-nav mr-auto navbar-expand">
            <IconButton
              color="inherit"
              onClick={this.back}
            >
              <i className="fas fa-reply"></i>
            </IconButton>

            <IconButton color="inherit" onClick={this.toggleNightMode}>
              <i
                className={this.state.nightMode ? "fas fa-moon" : "far fa-moon"}
              ></i>
            </IconButton>
          </div>
        </div>

        {this.bubbles}
        <div
          className="d-flex flex-column justify-content-center align-items-center p-3"
          style={{ position: "relative", zIndex: 20, minHeight: "100vh" }}
          onClick={this.next}
        >
          {slideContent}
          {content[this.state.name]["next"] != null && (
            <i>tap here to continue</i>
          )}
        </div>
      </div>
    );
  }
}

class Section extends React.Component {
  render() {
    return (
      <div key={this.props.sectionKey} className={this.props.className}>
        <p className="mb-0">
          <strong>{this.props.header}</strong>
        </p>

        <div
          style={this.props.badges ? { display: "flex", flexWrap: "wrap" } : {}}
        >
          {this.props.body.map(element => {
            if (this.props.badges) {
              return (
                <span key={uuidv4()} className="custom-badge">
                  {element}
                </span>
              );
            } else {
              return (
                <p key={uuidv4()} className="mb-0">
                  {element}
                </p>
              );
            }
          })}
        </div>

        <br />
      </div>
    );
  }
}

class LinkedText extends React.Component {
  render() {
    return (
      <div className="spaced-list">
        {this.props.content.map((element, index) => (
          <h2 key={uuidv4()}>
            {element.text}
            <br className="d-inline d-lg-none" />
            <a href={element.link}>{element.linkText}</a>
          </h2>
        ))}
      </div>
    );
  }
}

class Navigation extends React.Component {
  render() {
    return (
      <div className="spaced-list">
        {this.props.navItems.map(navItemName => (
          <h1 key={uuidv4()} onClick={this.props.next}>
            {navItemName}
          </h1>
        ))}
      </div>
    );
  }
}

export default Slide;
