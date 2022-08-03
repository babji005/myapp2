import React, { Component } from "react";
import content from "../mock/mock";
import "./Main.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: 0,
      bestScore: 0,
      isFlipped: false,
      id: 0,
      YourScore: 0,
      BestScore: 10,
      yourmoves: 0,
      clicked: [],
    };
  }

  reload = () => {
    window.location.reload();
  };

  shufle = () => {
    console.log("clicked this event");
    // window.location.reload ()
    console.log("reloaded");
    this.setState({ moves: 0 });
    if (content.List.length > 0) {

      for (let i = content.List.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = content.List[i];
        content.List[i] = content.List[j];
        content.List[j] = temp;
      }
    }
  };

  called(item) {
    console.log("called", this.state.moves, this.state.clicked);

    if (this.state.clicked[0] == this.state.clicked[1]) {
      console.log("success in matching");
      this.setState({
        yourmoves: this.state.yourmoves + 1,
        YourScore: this.state.YourScore + 1,
      });

      this.deleteItem(this.state.clicked[0]);
    }
    if (this.state.clicked[0] != this.state.clicked[1]) {
      console.log("success for not matching");
      this.setState({ yourmoves: this.state.yourmoves + 1 });
      this.setState({
        clicked: [],
        moves: 0,
      });
    }
  }
  deleteItem = (index) => {
    console.log(content.List);
    const items = content.List.filter((item) => item.image !== index);
    content.List = items;
    this.setState({
      clicked: [],
      moves: 0,
    });
    console.log(content.List);
  };

  handleClick(item) {
    console.log(this.state.moves, item.item, "moves", this.state.isFlipped);
    this.setState({ moves: this.state.moves + 1 });

    this.setState({ isFlipped: !this.state.isFlipped });

    console.log(this.state.moves, "moves", this.state.isFlipped);
    console.log("card handle click", this.state.clicked);
    this.setState({ isFlipped: !this.state.isFlipped });

    console.log(this.state.isFlipped, 5333);

    this.setState((prevState) => ({
      id: item.index,
      clicked: [...prevState.clicked, item.image],
    }));

    console.log(this.state.clicked);

    const timer = setTimeout(() => {
      console.log("first");
      console.log(this.state.isFlipped, 55555);
      this.setState({ isFlipped: !this.state.isFlipped });
      this.setState((prevState) => ({
        clicked: [...prevState.clicked],
        id: item.index,
      }));
      console.log("card handle click", this.state.clicked);
      console.log(this.state.moves, "moves");
      console.log(this.state.isFlipped, 55555);
      if (this.state.moves == 2) {
        this.called(item);
      }
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }

  render() {
    console.log(this.state.clicked, " in render");
    console.log(this.state.moves, " in render");
    const number = content.List.map((item, index) => {
      return (
        <div>
          <a>
            <Flippy
              isFlipped={this.state.isFlipped}
              style={{
                width: 180,
                height: 130,
                marginLeft: 100,
                marginTop: 10,
                backgroundColor: "green",
              }}
              className="flip"
            >
              <FrontSide onClick={() => this.handleClick(item)}>Card{item.index}</FrontSide>
              {this.state.id === item.index && (
                <BackSide
                  style={{
                    width: 180,
                    height: 130,
                    // marginLeft: 100,
                    // marginTop: 20,
                    backgroundColor: "blue",
                  }}
                >
                  ROCKS
                  <img src={item.image} height={100} width={100} />
                </BackSide>
              )}
            </Flippy>
          </a>
        </div>
      );
    });

    return (
      <div>
      <div className="cards">
        {number}
        </div>
        <br />
        <hr/>

        <div
          style={{
            marginLeft: 80,
            marginTop: 20,
            fontSize:25
            // textAlign: "right",
            // backgroundColor: "green",
          }}
        >
          <b>Moves: </b>{this.state.moves} <b>Your-Moves:</b>{this.state.yourmoves}{" "}
          <b>Your-Score:</b>{this.state.YourScore}{" "}<b>Best-Score:</b> {this.state.BestScore}{" "}
          {"          "}
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.shufle}
            // flipOnClick={true}
          >
            reset
          </button>{"  "}
          {/* <br /> */}
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.reload}
            // flipOnClick={true}
          >
            reload the game
          </button>
          <hr/>
        </div>
      </div>
    );
  }
}