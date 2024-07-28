const countryCodeMap: { [key: string]: string } = {
  USA: "US",
  Canada: "CA",
  India: "IN",
  Australia: "AU",
  SriLanka: "LK",
  Belgium: "BE",
  Denmark: "DK",
  Netherlands: "NL",
  Sweden: "SE",
};

export const getCountryCode = (countryName: string): string => {
  return countryCodeMap[countryName] || "";
};
