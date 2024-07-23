const countryCodeMap: { [key: string]: string } = {
  USA: "US",
  Canada: "CA",
  India: "IN",
  Australia: "AU",
};

export const getCountryCode = (countryName: string): string => {
  return countryCodeMap[countryName] || "";
};
