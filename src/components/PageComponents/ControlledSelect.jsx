import React from "react";
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
  defaultValue,
  NewComponent,
  autoFocus,
  tabindex,
  isMulti,
  error,
  required=false
}) {
  const IndicatorDropDown = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div style={{ width: "0.5vw" }}></div>
      </components.DropdownIndicator>
    );
  };

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
            isClearable
            tabIndex={tabindex ? tabindex : ''}
            autoFocus={autoFocus ? autoFocus : false}
            components={{ DropdownIndicator: IndicatorDropDown, IndicatorSeparator: () => null }}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            key={uniqueKey}
            defaultValue={defaultValue}
            onChange={(val) => {
              val ? field.onChange(val.id) : field.onChange("");
            }}
            styles={SelectInputStyle}
          />
          {NewComponent}
        </div>
      )}
    />
  );
}
