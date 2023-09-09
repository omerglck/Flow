const InputArea = ({ label, type, name, holder }) => {
  return (
    <div>
      <label className="mb-2 text-md font-mediumpx-3 py-[2px] rounded-lg">
        {label}
      </label>
      <input
        className="mt-4 bg-gray-700 border border-gray-600 placeholder-gray-400 p-2.5 block rounded-lg w-full outline-none focus:ring focus:border-blue-500"
        placeholder={holder}
        type={type}
        name={name}
      />
    </div>
  );
};

export default InputArea;
