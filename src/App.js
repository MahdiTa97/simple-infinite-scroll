import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState(
    Array.from(Array(20).keys(), (n) => n + 1)
  );
  const [isFetching, setIsFetching] = useState(false);

  const heightCalculator = () => Math.floor(Math.random() * 135) + 30;
  const colorGenerator = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const fetchMoreListItems = () => {
    setTimeout(() => {
      setListItems([
        ...listItems,
        ...Array.from(Array(20).keys(), (n) => n + listItems.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
  };

  const handleScroll = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (
      Math.round(
        path[0].scrollingElement.scrollHeight -
          path[0].scrollingElement.clientHeight
      ) <= Math.round(path[0].scrollingElement.scrollTop)
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      {console.log(listItems)}
      {listItems.map((item, index) => (
        <div
          style={{
            width: "100%",
            height: heightCalculator(),
            backgroundColor: colorGenerator(),
            marginTop: "5px",
            fontSize: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          key={index}
        >
          {item}
        </div>
      ))}
      <h2>{isFetching && "Fetching more list items..."}</h2>
    </div>
  );
}

export default App;
