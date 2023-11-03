import { useState } from "react";
import From from "./Components/form";
import List from "./Components/list";

function App() {
  const [postalCode, setPostalCode] = useState("");

  const handleFormSubmit = (code) => {
    setPostalCode(code);
  };

  return (
    <div
      className="App h-screen flex flex-col bg-center md:bg-cover"
      style={{
        "background-image": "url(" + require("./Asset/background.png") + ")",
      }}
    >
      <From onSubmit={handleFormSubmit} />
      <List postalCode={postalCode} setPostalCode={setPostalCode} />
    </div>
  );
}

export default App;
