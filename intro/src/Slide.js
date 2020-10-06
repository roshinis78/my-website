import React from "react";
import Bubbles from "./Bubbles.js";
import "@fortawesome/fontawesome-free/css/all.css";
import IconButton from "@material-ui/core/IconButton";

import $ from "jquery";

const uuidv4 = require("uuid/v4");
const content = require("./data/contents.json");

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = { nightMode: false, name: "toss" };
    this.bubbles = <Bubbles></Bubbles>;

    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.toMenu = this.toMenu.bind(this);
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

  toMenu(event) {
    let isNotContent = $(event.target).parents(".content").length === 0;
    if (this.state.name !== "Nav" && isNotContent) {
      this.setState({ name: "Nav" });
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
                'Don’t get attached to any words. They are only stepping stones, to be left behind as quickly as possible.'
                </blockquote>
                <footer>
                  &mdash; Eckhart Tolle, The Power of Now
                </footer>
              </div>
            </div>
          </div>

          <div className="custom-card about-description">
            <Section
              className="d-none d-lg-block"
              header="Roshini Saravanakumar"
              content={<p>Creative Mind and Life-long Learner</p>} />
            <Section 
              header="Updates" 
              content={<Summary p={[
                <span>📚 Reading <Link text="If the Oceans Were Ink by Carla Power" link="https://www.goodreads.com/book/show/22320455-if-the-oceans-were-ink"/></span>,
                <span>😎 Interned with <Link text="Cloud Engineering @ The Climate Corp" link="https://climate.com/"/> this summer!</span>,
                <span>🚣🏾‍♀️ <Link text="Lyft OSS Cartography" link="https://github.com/lyft/cartography"/> Contributor/Maintainer</span>
              ]}/>}/>
            <Section 
              header="University of Illinois at Urbana-Champaign"
              content={<Summary p={[
                <span>B.S. Computer Engineering (May 2021)</span>,
                <span>GPA: 3.83</span>
              ]}/>}
            />
            <Section 
              header="Relevant Coursework"
              content={<Badges badges={["Distributed Systems", "Communication Networks", "Computer Security", "Database Systems", "Operating Systems", "Applied Parallel Programming", "Data Structures & Algorithms", "Data Science"]}/>}
            />
            <Section
              header="Honors"
              content={<Summary p={[
                <span>🏅 James Scholar Honors Student (2017-2020)</span>,
                <span>🏅 Frank C. Mock Scholarship (2019)</span>,
                <span>🏅 John Deere Foundation Scholarship (2018)</span>
              ]}/>}
            />
          </div>
        </div>
      );
    } else if (name === "Nav") {
      slideContent = (
        <Navigation
          navItems={content["Nav"]["content"]}
          next={this.next}
        ></Navigation>
      );
    } else if (content[name]["text"] !== undefined) {
      slideContent = <h1>{content[name]["text"]}</h1>;
    } else {
      slideContent = (
        <LinkedText content={content[name]["content"]}></LinkedText>
      );
    }

    return (
      <div
        className={this.state.nightMode ? "dark fixed-top" : "light fixed-top"}
      >
        <div style={{ position: "fixed", top: "1%", left: "1%", zIndex: 40 }}>
          <IconButton color="inherit" onClick={this.back}>
            <i className="fas fa-reply"></i>
          </IconButton>

          <IconButton color="inherit" onClick={this.toggleNightMode}>
            <i
              className={this.state.nightMode ? "fas fa-moon" : "far fa-moon"}
            ></i>
          </IconButton>
        </div>

        {this.bubbles}
        <div
          id="slide"
          className="d-flex flex-column justify-content-center align-items-center p-3"
          style={{ position: "relative", zIndex: 30, minHeight: "100vh" }}
          onClick={
            content[this.state.name]["next"] != null ? this.next : this.toMenu
          }
        >

          <div className="content">
            {slideContent}
          </div>

          {content[this.state.name]["next"] != null && <i>tap to continue</i>}
        </div>
      </div>
    );
  }
}

class Badges extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.props.badges.map(badge =>
          <span key={uuidv4()} className="custom-badge">
            {badge}
          </span>)}
      </div>
    )
  }
}

class Link extends React.Component {
  render() {
    return (
      <a href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.text}</a>
    );
  }
}

class Summary extends React.Component {
  render() {
    return (
      <div>
        {this.props.p.map(p => <p className="mb-0">{p}</p>)}
      </div>
    );
  }
}

class Section extends React.Component {
  render() {
    return (
      <div key={uuidv4()} className={this.props.className ? this.props.className : "mb-4"}>
        <p className="mb-0">
          <strong>{this.props.header}</strong>
        </p>

        {this.props.content}
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
            <a href={element.link} target="_blank" rel="noopener noreferrer">
              {element.linkText}
            </a>
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
