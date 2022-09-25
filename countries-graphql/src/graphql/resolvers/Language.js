export const Language = {
  countries: (parent, __, { country }) =>
    country.filter((c) => c.language_codes.includes(parent.code.toString())),
};
