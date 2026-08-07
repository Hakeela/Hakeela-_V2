import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './PhoneField.css'

/**
 * Shared phone number field: a country-flag selector in its own column and the
 * number input in a separate column. Real flag images (react-phone-input-2), so
 * it renders consistently across platforms.
 *
 * `variant` themes the boxes to match the surrounding form:
 *   - "settings" (default) → dashboard settings card inputs
 *   - "auth"               → light/dark auth form inputs
 */
function PhoneField({
  value,
  onChange,
  placeholder = 'Enter phone number',
  country = 'ng',
  variant = 'settings',
  inputProps,
}) {
  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      containerClass={`phone2 phone2--${variant}`}
      inputClass="phone2__input"
      buttonClass="phone2__flag"
      dropdownClass="phone2__dropdown"
      searchClass="phone2__search"
      enableSearch
      countryCodeEditable={false}
      inputProps={inputProps}
    />
  )
}

export default PhoneField
