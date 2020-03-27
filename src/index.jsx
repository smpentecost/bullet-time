import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Guide(props) {
  return(
    <div className="guide" style={props.style}></div>
  );
}

function BulletArea(props) {
  return (
    <textarea
      className="bullet-area"
      value={props.value}
      placeholder="Write your bullets here..."
      rows="10"
      onChange={event => props.onChange(event)}
    ></textarea>
  );
}

function GuidedBulletArea(props) {
  return (
    <div className="guided-bullet-area">
      <BulletArea
        value={props.value}
        onChange={event => props.onChange(event)}
      />
      <Guide
        style={props.guides[1]}
      />
    </div>
  );
}

function BulletTester(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  //Set the local state width any time the screen renders
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  });

  //Set the parent width any time the local state width changes
  useEffect(() => {
    props.handleWidthChange(props.index, width);
  }, [width]);
  
  return (
    <div ref={ref} className="bullet-tester">
      {props.value}
    </div>
  );
}

function Toggle(props) {
  return(
    <div>
    <label className="toggle-label">{props.label}</label>
      <label className="toggle">
        <input
          type="checkbox"
          checked={props.checked}
          onClick={() => props.onClick()}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

class BulletEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bullets: [], //'- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds',
      widths: [],
      graberized: false,
      guides: [{left: '600px'}, {left: '763px'}, {left: '800px'}],
      test_string: null,
    };
  }



  graberSpace() {
    /*
      The best way to do this is recursively, checking length as we
      go. That is because these spaces don't have specific pixel
      widths associated with them. Instead their widths are dynamic -
      based on font style, size and the other characters around
      them. So while it sucks that we need to use synchronous logic,
      atleast it only happens when the user toggles the spacing on.

      The whitespace unicode available for use with an OPR:
      2006:approx-2px(smallest), 2009:approx-1px(small),
      2004:approx+2px(big), 2007:approx+4px(biggest)
    */

    const isWhiteSpace = (element) => {
      switch(element) {
      case "\u2004": return true;
      case "\u2006": return true;
      case "\u2007": return true;
      case "\u2009": return true;
      case " ": return true;
      default: return false;
      }
    };

    const makeLonger = (
      spaces, spacesIndex, bullets, bulletArray, bulletIndex
    ) => {
      if (this.state.widths[bulletIndex] < 762) {
        bulletArray[spaces[spacesIndex]] = "\u2004";
        bullets[bulletIndex] = bulletArray.join('');
        this.setState(
          {bullets: bullets},
          makeLonger(spaces, spacesIndex+1, bullets, bulletArray, bulletIndex)
        );
      }
    };

    var bullets = this.state.bullets;

    bullets.forEach((bullet, index) => {
      let spaces = [];
      let spacesIndex = 1;
      let bulletArray = bullet.split("");
      let lengthDelta = 762 - this.state.widths[index];

      //Find all the white space character indexes
      let position = bulletArray.findIndex(isWhiteSpace);
      while (position !== -1) {
        spaces.push(position);
        let subArrayPosition = bulletArray.slice(position + 1).findIndex(isWhiteSpace);
        if (subArrayPosition > 0) {
          position = subArrayPosition + position + 1;
        } else {
          position = subArrayPosition;
        }
      }

      //Start adjusting spaces
      if (lengthDelta > 0) {
        makeLonger(
          spaces, spacesIndex, bullets, bulletArray, index
        );
      }
    });
  }

  handleBulletChange(event) {
    var bullets = this.state.bullets;
    bullets = event.target.value.split("\n");
    this.setState({bullets: bullets});
  }

  handleAutoSpace() {
    //If not currently graberized, that means it should now be
    //graberized
    if (!this.state.graberized) {
      this.graberSpace();
    } else { //Remove graber spaces
      var bullets = this.state.bullets;
      bullets.forEach((bullet, index) => {
        bullets[index] = bullet.replace(
          /[\u2004\u2006\u2007\u2009]/g,
          ' '
        );
      });
      this.setState({bullets: bullets});
    }
    this.setState({graberized: !this.state.graberized});
  }

  handleWidthChange(index, width) {
    let widths = this.state.widths;
    widths[index] = width;
    this.setState({widths: widths});
  }

  createBulletTesters() {
    var testers = [];
    var bullets = this.state.bullets;

    bullets.forEach(function(bullet, index) {
      testers.push(
        <BulletTester
          value={bullet}
          index={index}
          handleWidthChange={(index, width) => this.handleWidthChange(index, width)}
        />
      );
    }, this);

    return(testers);
  }


  render() {
    return (
      <div>
        <Toggle
          label="Apply Auto-Spacing:"
          checked={this.state.graberized}
          onClick={() => this.handleAutoSpace()}
        />
        <GuidedBulletArea
          value={this.state.bullets.join("\n")}
          guides={this.state.guides}
          onChange={event => this.handleBulletChange(event)}
        />
        {this.createBulletTesters()}
      </div>
    );
  }
}
      

class BulletTime extends React.Component {
  render() {
    return (
      <div className="app">
	<div className="game-board">
          <BulletEditor />
	</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <BulletTime />,
  document.getElementById('root')
);
