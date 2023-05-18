import { Autocomplete, TextField } from "@mui/material";
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";


/**
 * PhoneCountrySelector Component.
 *
 * @component
 * @param {Object} props
 * @param {Object[]} props.countries - Required. An array of objects each representing a country.
 * @param {number} props.countries[].id - The unique ID of the country.
 * @param {string} props.countries[].name - The name of the country.
 * @param {string} props.countries[].flagUrl - The URL of the country's flag.
 * @param {string} props.countries[].phonePrefix - The phone prefix of the country.
 * @param {number} props.countryId - The ID of the selected country.
 * @param {Function} props.setCountryId - A function that sets the countryId state.
 * @param {Function} props.onSelect - A function that is called when a country is selected.
 * @param {string} props.dataTestId - The test ID for the component.
 * @param {Object} props.textFieldProps - Additional properties for the TextField component.
 */
const PhoneCountrySelector = ({
  countries,
  countryId,
  setCountryId,
  onSelect,
  dataTestId,
  textFieldProps
}) => {
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickSelectNewCountry = () => {
    setShowAllCountries(true);
    setOpen(true);
  };

  const handleChangeCountry = (_, newValue) => {
    if (newValue) {
      setCountryId(newValue.id);
      onSelect(newValue);
      setShowAllCountries(false);
    }
  };

  useEffect(() => {
    if (!countryId) {
      // default to Uruguay
      const idUruguay = countries.find(
        (country) =>
          country.name.trim().toLowerCase() === "uruguay",
      )?.id;
      if (idUruguay) setCountryId(idUruguay);
    }
  }, []);

  const selectedCountry = countries.find((country) => country.id === countryId) ?? {};

  const getOptionLabel = (option) =>
    `${option?.name} (${option?.phonePrefix})` || "";

  return (
    <>
      {showAllCountries ? (
        <>
          <Autocomplete
            data-testid={dataTestId}
            options={countries}
            open={open}
            onBlur={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedCountry}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleChangeCountry}
            renderInput={(params) => (
              <TextField {...params} {...textFieldProps} />
            )}
            renderOption={(props, option) => {
              return (
                <li
                  {...props}
                  data-testid={`${dataTestId}-option-${option.id}`}>
                  {getOptionLabel(option)}
                </li>
              );
            }}
          />
        </>
      ) : (
        <Button variant="secondary" onClick={handleClickSelectNewCountry}>
          <div className="d-flex">
            <img
              className="country-flag"
              style={{ width: "25px", height: "auto" }}
              src={selectedCountry.flagUrl}
              alt={selectedCountry.name}
            />
            <span>{selectedCountry.phonePrefix}</span>
          </div>
        </Button>
      )}
    </>
  );
};

PhoneCountrySelector.propTypes = {
  countries: PropTypes.array.isRequired,
  countryId: PropTypes.number,
  setCountryId: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  dataTestId: PropTypes.string,
  textFieldProps: PropTypes.object,
};

PhoneCountrySelector.defaultProps = {
  onSelect: () => { },
  dataTestId: "phone-country-selector",
  textFieldProps: {
    size: "small",
    fullWidth: true,
    autoComplete: "off",
  },
};



export default PhoneCountrySelector