import React, { useState } from "react";

const styles = {
  container: {
    position: "relative",
  },
  hovertip: {
    color: "#F2E7DC",
    boxSizing: "border-box",
    position: "absolute",
    width: "130px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-50px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    textAlign: "center",
    fontSize: "13px",
  },
};

//this Hover component can be used everywhere I want to have a small popup window with some hint for the user.
//when called, I just have to pass in the text I want to show
//NOT BEING USED AT THE MOMENT

export default function Hovertip({ text, children }) {
  const [hovering, setHovering] = useState(false);

  function handleMouseOver() {
    setHovering(true);
  }

  function handleMouseOut() {
    setHovering(false);
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={styles.container}
    >
      {hovering ? <div style={styles.hovertip}>{text}</div> : null}
      {children}
    </div>
  );
}
