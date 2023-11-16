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
        <PhoneCountrySelector
          countryId={countryId}
          setCountryId={setCountryId}
        />
      </header>
    </div>
  );
}

export default App;
