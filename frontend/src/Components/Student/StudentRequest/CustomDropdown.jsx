import PropTypes from "prop-types";

const CustomDropdown = ({ label, name, value, onChange, options }) => {
  return (
    <div className="relative">
      <label className="text-gray-700 font-medium">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#00BFA5] cursor-pointer appearance-none"
          required
        >
          <option value="" disabled>Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-4 top-4 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomDropdown;