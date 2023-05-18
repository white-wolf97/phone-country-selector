import logo from "./logo.svg";
import "./App.css";
import PhoneCountrySelector from "@practiauy/phone-country-selector";
import { useState } from "react";

function App() {
  const [countryId, setCountryId] = useState(1);
  const countries = [
    {
      id: 1,
      name: "Uruguay",
      flagUrl: "",
      phonePrefix: "+598",
    },
    {
      id: 2,
      name: "Argentina",
      flagUrl: "",
      phonePrefix: "+54",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PhoneCountrySelector
          countries={countries}
          countryId={countryId}
          setCountryId={setCountryId}
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
