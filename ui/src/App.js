import { useState } from "react";
import service from "./utils/service";
import "./styles/App.css";
import TweetSegment from "./components/TweetSegment";
import LoadScreen from "./components/LoadScreen";
import logo from "./logo.png";

function App() {
  const [identifier, setIdentifier] = useState("screen_name");
  const [query, setQuery] = useState();
  const [slider, setSlider] = useState(40);
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);

  const fetchBy = {
    screen_name: service.byScreenName,
    user_id: service.byUserId,
  };

  const searchTweets = async () => {
    if (query) {
      const resp = await fetchBy[identifier](query, slider);
      setLoad(false);
      setData(resp.data);
    }
  };

  if (load) return <LoadScreen />;

  return (
    <div>
      <div className="dashboard">
        <div onClick={()=>window.location.reload()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-house-fill"
            viewBox="0 0 16 14"
          >
            <path
              fillRule="evenodd"
              d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
          &nbsp;Home
        </div>
        <div className="input">
            <input
              type="radio"
              name="by_identifier"
              value="screen_name"
              defaultChecked="true"
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <label>User Screen Name</label>
            <input
              type="radio"
              name="by_identifier"
              value="user_id"
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <label>User Id</label>
        </div>
        <div className="input">
          <input
            type="range"
            min={40}
            max={800}
            step={20}
            defaultValue={20}
            onChange={(e) => setSlider(e.target.value)}
          />
          <label>{slider}</label>
        </div>
        <div className="search">
          <input
            id="search"
            className="input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            className="input"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              searchTweets();
              setLoad(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="container">
        {data ? (
          <TweetSegment data={data} />
        ) : (
          <img src={logo} className="logobg" />
        )}
      </div>
    </div>
  );
}

export default App;
