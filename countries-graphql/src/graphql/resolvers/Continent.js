export const Continent = {
  countries: (parent, __, { country }) => country.filter((c) => c.continent_code === parent.code),
};
