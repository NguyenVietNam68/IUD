import React from "react";
import ReactDOM from "react-dom";
import BoxSquare from "./box";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 50,
      isRed: true
    };
  }

  handleIncrement() {
    this.setState({
      height: this.state.height + 10
    });
  }

  handleDecrement() {
    this.setState({
      height: this.state.height > 10 ? this.state.height - 10 : 10
    });
  }

  handleChangeColor() {
    this.setState({
      isRed: !this.state.isRed
    });
  }
  render() {
    console.log(this.state.height);

    // boxStyle tạo biến hoặc chèn trực tiếp
    const boxStyle = {
      height: this.state.height,
      width: this.state.height
    };

    console.log(this.state.isRed);
    let colorBox = "";
    if (this.state.isRed) {
      colorBox = "App-box red";
    } else {
      colorBox = "App-box yellow";
    }

    return (
      <div>
        {/* <div className={colorBox} style={boxStyle} /> */}
        <BoxSquare colorbox={colorBox} style={boxStyle} />
        <button onClick={() => this.handleIncrement()}>+</button>
        <button onClick={() => this.handleDecrement()}>-</button>
        <button onClick={() => this.handleChangeColor()}>change color</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
