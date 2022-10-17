import React, { Component } from "react";
import Cards from "./components/card";
import { dummyData, cardData } from "./components/dummyText";
import _ from "lodash";
import Confetti from "react-confetti";
import styled from "styled-components";

const MainStyledComponent = styled.div`
  width: 100%;
  height: 102vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(72, 65, 181);
  background: linear-gradient(
    90deg,
    rgba(72, 65, 181, 1) 0%,
    rgba(171, 137, 51, 1) 35%,
    rgba(103, 193, 162, 1) 66%,
    rgba(0, 212, 255, 1) 100%
  );
`;

class App extends Component {
  state = {
    data: dummyData,
    winArray: [],
    max: 5,
    currentID: 0,
    flag: false,
    maxTime: 0,
    celebratiFlag: false,
    recycleFlag: false,
  };

  checkWinningCondition = () => {
    let { winArray } = this.state;
    let flag = true;
    console.log(winArray);
    winArray.sort(function (a, b) {
      return a - b;
    });
    console.log(winArray);
    let count = 0;
    //condition top to bottom check;
    for (let x = 0; x < 4; x++) {
      if (winArray[x] !== winArray[x + 1] - 5) {
        flag = false;
        count = 0;
      } else {
        count++;
      }
    }
    if (count === 4) return true;
    //condition left to right check;
    for (let x = 0; x < 4; x++) {
      if (winArray[x] !== winArray[x + 1] - 1) {
        flag = false;
        count = 0;
      } else {
        count++;
      }
    }
    if (count === 4) return true;
    //condition top left to bottom right check;
    for (let x = 0; x < 4; x++) {
      if (winArray[x] !== winArray[x + 1] - 6) {
        flag = false;
        count = 0;
      } else {
        count++;
      }
    }
    if (count === 4) return true;
    //condition top right to bottom left check;
    for (let x = 0; x < 4; x++) {
      if (winArray[x] !== winArray[x + 1] - 4) {
        flag = false;
        count = 0;
      } else {
        count++;
      }
    }
    if (count === 4) return true;
    return flag;
  };

  handleClick = (id) => {
    let {
      winArray,
      max,
      currentID,
      flag,
      maxTime,
      celebratiFlag,
      recycleFlag,
    } = this.state;
    currentID = id;
    //if duplicate id will not be add in array
    //onclice push in array
    if (!_.includes(winArray, id)) {
      if (flag === true) {
        max = 5;
        winArray = [];
        flag = false;
      }
      winArray.push(id);
      max -= 1;
      this.setState({ currentID, winArray, max, flag });
    } else {
      //on click pop from array
      _.pull(winArray, id);
      max += 1;
      this.setState({ currentID, winArray, max, flag: false });
    }
    //winning condition handle
    if (max === 0) {
      let flag = this.checkWinningCondition();
      celebratiFlag = flag;
      recycleFlag = flag;
      maxTime = 5;
      this.setState({ flag, maxTime, celebratiFlag, recycleFlag });
      setTimeout(() => {
        this.setState({ celebratiFlag: false });
      }, 6000);
      setTimeout(() => {
        this.setState({ recycleFlag: false });
      }, 1000);
      console.log(flag);
      if (flag === false) {
        winArray = [];
        max = 5;
        this.setState({ winArray, max, maxTime });
      }
    }
  };

  render() {
    const { winArray, flag, currentID, celebratiFlag, recycleFlag } =
      this.state;

    return (
      <MainStyledComponent>
        <Confetti
          recycle={recycleFlag}
          run={celebratiFlag}
          numberOfPieces={500}
          gravity={1}
        />
        <div>
          {cardData.map((c) => {
            return (
              <div className="row">
                {c.map((d) => {
                  return (
                    <Cards
                      key={d.id}
                      id={d.id}
                      text={d.text}
                      handleClick={this.handleClick}
                      array={winArray}
                      winFlag={flag}
                      currentID={currentID}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </MainStyledComponent>
    );
  }
}

export default App;
