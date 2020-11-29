import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
let randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const keyPress = (event) => {
    let code = event.keyCode || event.which;
    if (code === 1) {
      newItem();
    }
  };

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light" }),
        defaultPos: { x: 100, y: 0 },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("Enter an item");
      setItem("");
    }
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Type your note here..."
          onKeyPress={(e) => keyPress(e)}
          required
          style={{
            width: "70%",
            height: "5vh",
            maxWidth: "80%",
            margin: "20px auto 25px auto",
            color: "#09193A",
            fontFamily: "Oxygen, sans-serif",
            fontSize: "1.5rem",
            textOverflow: "ellipsis",
            backgroundColor: "rgba(245, 206, 201, 0.5)",
            boxShadow: "0.2px solid rgba(226, 159, 120, 0.06)",
          }}
        />
        <button
          style={{
            padding: "7px 10px",
            backgroundColor: "#d17191",
            color: "white",
            fontSize: "1.6em",
            cursor: "pointer",
            boxShadow: "0.2px solid rgba(226, 159, 120, 0.06)",
            WebkitTransition: "all 300ms ease",
            transition: "all 300ms ease",
            fontFamily: "Fira Sans, sans-serif",
          }}
          onClick={newItem}
        >
          ENTER
        </button>{" "}
      </div>

      {items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePos(data, index);
            }}
          >
            <div
              style={{
                fontFamily: "Fira Sans, sans-serif",
                fontSize: "1em",
                position: "absolute",
                cursor: "move",
                color: "black",
                backgroundColor: "white",
                maxWidth: "215px",
                overflowWrap: "break-word",
                borderRadius: "5px",
                padding: "1em",
                margin: "auto",
                userSelect: "none",
                backgroundColor: item.color,
                opacity: "0.7"
              }}
            >
              {`${item.item}`}
              <button
                id="delete"
                onClick={(e) => deleteNote(item.id)}
                style={{
                  fontSize: "0.7em",
                  position: "fixed",
                  top: "0",
                  right: "0",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
