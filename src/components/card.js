import React, { Component, useEffect, useState } from "react";
import _ from "lodash";
import "./card.css";
import styled from "styled-components";

const Cards = (props) => {
  const { id, text, handleClick, array, winFlag, currentID } = props;

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div
      onClick={() => handleClick(id)}
      className={
        _.includes(array, id) && winFlag === true
          ? "text-white card CustomCard width_height"
          : " text-white card CustomCard btn width_height"
      }
      style={{
        width: isMobile ? "70px" : "120px",
        height: isMobile ? "70px" : "120px",
        backgroundColor:
          _.includes(array, id) && winFlag === true ? "#007e5c" : "#333333",
        display: "inline-block",
        borderRadius: id === 12 ? "50%" : "0.375rem",
        borderColor: "#38cacd",
      }}
    >
      <div
        className={isMobile ? "m-1" : "m-2 "}
        style={{
          width: "89%",
          height: "88%",
        }}
      >
        <div
          className={
            id === 12
              ? "d-flex justify-content-center"
              : "d-flex flex-row-reverse"
          }
          style={{
            width: "100%",
            height: "10%",
            fontSize: isMobile ? "7px" : "12px",
          }}
        >
          {id}
        </div>
        <div
          className={
            isMobile
              ? "d-flex justify-content-center align-items-center p-1"
              : "d-flex justify-content-center align-items-center p-2"
          }
          style={{
            width: "100%",
            height: "90%",
            fontSize: isMobile ? "7px" : "12px",
          }}
        >
          {_.includes(array, id) ? <del>{text}</del> : <span>{text}</span>}
        </div>
      </div>
    </div>
  );
};

export default Cards;
