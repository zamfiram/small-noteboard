import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
let randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  JSON.parse(localStorage.getItem("items")) || [];

  const keyPress = (event) => {
    let code = event.keyCode || event.which;
    if (code === 1) {
      newItem();
    }
  };

  return (
    <div className="App">
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter your note here"
        onKeyPress={(e) => keyPress(e)}
      />
      <button onClick={newItem}>ENTER</button>
    </div>
  );
}

export default App;
