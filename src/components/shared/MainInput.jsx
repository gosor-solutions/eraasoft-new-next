import Style from "./MainInput.module.css";

export default function MainInput({ label, placeholder, type, customClass, name, htmlFor }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor={htmlFor} className="text-lg font-semibold">
          {label}
        </label>
        <input type={type} placeholder={placeholder} className="outline-0 border border-[#D2D2D2] py-3 px-5 rounded-4xl" />
      </div>
    </div>
  );
}
