const countryOptions = [
  { key: "af", value: "af", flag: "af", name: "Afghanistan" },
  { key: "ax", value: "ax", flag: "ax", name: "Aland Islands" },
  { key: "al", value: "al", flag: "al", name: "Albania" },
  { key: "dz", value: "dz", flag: "dz", name: "Algeria" },
  { key: "as", value: "as", flag: "as", name: "American Samoa" },
  { key: "ad", value: "ad", flag: "ad", name: "Andorra" },
  { key: "ao", value: "ao", flag: "ao", name: "Angola" },
  { key: "ai", value: "ai", flag: "ai", name: "Anguilla" },
  { key: "ag", value: "ag", flag: "ag", name: "Antigua" },
  { key: "ar", value: "ar", flag: "ar", name: "Argentina" },
  { key: "am", value: "am", flag: "am", name: "Armenia" },
  { key: "aw", value: "aw", flag: "aw", name: "Aruba" },
  { key: "au", value: "au", flag: "au", name: "Australia" },
  { key: "at", value: "at", flag: "at", name: "Austria" },
  { key: "az", value: "az", flag: "az", name: "Azerbaijan" },
  { key: "bs", value: "bs", flag: "bs", name: "Bahamas" },
  { key: "bh", value: "bh", flag: "bh", name: "Bahrain" },
  { key: "bd", value: "bd", flag: "bd", name: "Bangladesh" },
  { key: "bb", value: "bb", flag: "bb", name: "Barbados" },
  { key: "by", value: "by", flag: "by", name: "Belarus" },
  { key: "be", value: "be", flag: "be", name: "Belgium" },
  { key: "bz", value: "bz", flag: "bz", name: "Belize" },
  { key: "bj", value: "bj", flag: "bj", name: "Benin" },
];

const DropdownComponent = ({ onChange, countries }) => {
  const onSelectCountry = (e) => {
    const country = countryOptions.find(
      (country) => country.value === e.target.value
    );

    onChange(country);
  };
  return <></>;
};
export default DropdownComponent;
