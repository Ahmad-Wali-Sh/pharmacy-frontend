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
}) {
  const IndicatorDropDown = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div style={{ width: "0.8rem" }}></div>
      </components.DropdownIndicator>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ ref, field }) => (
        <div className="react-select-container">
          <Select
            inputRef={ref}
            options={options}
            placeholder={placeholder}
            isClearable
            components={{ DropdownIndicator: IndicatorDropDown }}
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
