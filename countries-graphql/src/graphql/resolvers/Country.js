export const Country = {
  languages: (parent, __, { languages }) =>
    parent.language_codes.map((code) => languages.find((lang) => lang.code === code)),
  continents: (parent, __, { continent }) =>
    continent.find((c) => c.code === parent.continent_code),
};
