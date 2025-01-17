import axios from "axios";
import { useState } from "react";
export default function DropdownMenu({
  list,
  setList,
  caption,
  urlToSendTo,
  position,
  setShowDropdown,
  correctCounter,
  setCorrectCounter,
}) {
  const [pkIdSelected, setPkIdSelected] = useState("");
  const [pkIndexSelected, setPkIndexSelected] = useState();

  function sendSelection() {
    setShowDropdown(false);
    axios.post(urlToSendTo, { pkIdSelected, position }).then((response) => {
      if (response.data.isCorrect) {
        for (const item of list) {
          if (item.id == pkIdSelected) {
            item.isCorrect = true;
            setCorrectCounter(correctCounter + 1);
            setList(list.filter((a) => a.id !== item.id));
            break;
          }
        }
      }
    });
  }

  function onSelectionChange(e) {
    setPkIdSelected(e.target.value);
  }

  return (
    <div
      className="dropdown-container"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="dropdown-caption">{caption}</div>
      <ul>
        {list.map((item) => {
          return (
            <div key={item.id} className="dropdown-content">
              <input
                type="radio"
                name="pkIdSelected"
                id={item.id}
                checked={pkIdSelected == item.id}
                onChange={onSelectionChange}
                value={item.id}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </div>
          );
        })}
      </ul>
      <button onClick={sendSelection}>Submit</button>
    </div>
  );
}
