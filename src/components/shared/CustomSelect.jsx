"use client";

import Select from "react-select";

export default function CustomSelect({ label, htmlFor, options = [], placeholder, value, onChange, error }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "52px",
      borderRadius: "9999px",
      backgroundColor: "#FFFFFF",
      border: state.isFocused ? "1px solid #2243A4" : "1px solid #D2D2D2",
      boxShadow: "none",
      paddingInline: "12px",
      "&:hover": {
        border: state.isFocused ? "1px solid #2243A4" : "1px solid #D2D2D2",
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    placeholder: (provided) => ({ ...provided, color: "#9CA3AF" }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "16px",
      overflow: "hidden",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2243A4"
        : state.isFocused
        ? "#EEF1FB"
        : "#fff",
      color: state.isSelected ? "#fff" : "#0A0A0A",
      cursor: "pointer",
    }),
  };

  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={htmlFor} className="text-base sm:text-lg font-semibold">
            {label}
          </label>
        )}
        <Select
          inputId={htmlFor}
          options={options}
          placeholder={placeholder}
          value={selectedOption}
          onChange={(selected) => onChange(selected?.value ?? "")}
          styles={customStyles}
          menuPortalTarget={typeof document !== "undefined" ? document.body : null}
          menuPosition="fixed"
          isSearchable={false}
        />
        {error && <span className="text-sm text-red-500 pr-4">{error}</span>}
      </div>
    </div>
  );
}
