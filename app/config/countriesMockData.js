import data from "./countries.json";

export const countries = data.countries.map(country => ({
  id: country.code,
  name: country.country_name
}));
