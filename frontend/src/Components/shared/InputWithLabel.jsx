

const InputWithLabel = ({
  legendText,
  typeText = "text",
  setInput,
  optional = false,
  inputValue,
  edit=true
}) => {
  return (
    <div>
      <label
        htmlFor={legendText}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {legendText}
      </label>
      <div className="mt-2">
        <input
          type={typeText}
          name={legendText}
          value={inputValue}
          autoComplete={legendText}
          placeholder={`${legendText} here`}
          onChange={(e) => setInput(e.target.value)}
          disabled={!edit}
          className="block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-950
                    outline-1 -outline-offset-1 outline-white/10
                    placeholder:text-gray-500
                    focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500
                    sm:text-sm/6
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

      </div>
      {optional && <p className="label">Optional</p>}
    </div>
  );
};

export default InputWithLabel;
