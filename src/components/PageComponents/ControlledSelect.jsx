import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SelectInputStyle } from "../../styles";
import { Controller } from "react-hook-form";
import { components } from "react-select";

export default function ControlledSelect({
  control,
  name,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
  uniqueKey,
  defaultValue = false,
  NewComponent,
  autoFocus,
  reset,
  tabindex,
  onChange=false,
  isMulti,
  error,
  required=false,
  isClearable=true,
  storeToLocal = false
}) {
  const IndicatorDropDown = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div style={{ width: "0.5vw" }}></div>
      </components.DropdownIndicator>
    );
  };
  const [defaulter, setDefaulter] = useState(null);

  const [uniqueKeyer, setUniqueKey] = useState(""); // State to hold the unique key

  useEffect(() => {
    const storedValue = localStorage.getItem(name);
    const parsedValue = JSON.parse(storedValue);

    if (parsedValue?.id) {
      // If there's a value in local storage, update the unique key
      setUniqueKey(`entrance-settings${parsedValue.id}`);
    } else {
      // Otherwise, generate a new unique key
      setUniqueKey(`entrance-settings`);
    }
  }, [name]);

  useEffect(() => {
    const storedDefaultValue = localStorage.getItem(name);
    if (storedDefaultValue) {
      setDefaulter(JSON.parse(storedDefaultValue));
    } 
    else if (defaultValue == '') {
      setDefaulter('')
    }
    else if (defaultValue) {
      setDefaulter(defaultValue)
    }
  }, [name, defaultValue]);

  useEffect(() => {
    defaulter && reset && reset({
        name: defaulter.id
      })
  }, [defaulter]);

  const [key, setKey] = useState(0); // State to hold the key for forcing re-render

  useEffect(() => {
    // When defaultValue changes, update the key to force re-render
    defaultValue ? setKey(new Date()) : setKey(new Date())
  }, [defaultValue === null ? null : defaultValue, defaultValue === '' ? '' : defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ ref, field }) => (
        <div className={`react-select-container ${error ? 'react-select-container-error' : ''}`}>
          <Select
            inputRef={ref}
            options={options}
            isMulti={isMulti ? isMulti : false}
            menuPortalTarget={document.body} 
            placeholder={placeholder}
            isClearable={isClearable}
            tabIndex={tabindex ? tabindex : ''}
            autoFocus={autoFocus ? autoFocus : false}
            components={{ DropdownIndicator: IndicatorDropDown, IndicatorSeparator: () => null }}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            key={defaultValue ? key : uniqueKeyer}
            value={defaulter} // Set defaultValue to defaulter
            onChange={onChange ? onChange : (val) => {
              setDefaulter(val); // Update defaulter state with the selected value
              field.onChange(val ? val.id : ''); // Use the selected value to update the form field
              if (storeToLocal) {
                localStorage.setItem(name, JSON.stringify(val));
              }
            }}
            styles={SelectInputStyle}
          />
          {NewComponent}
        </div>
      )}
    />
  );
}