export const Query = {
  languages: (_, __, { languages }) => languages,
  language: (_, args, { languages }) => {
    const language = languages.find((lang) => lang.code === args.code);
    if (!language) {
      return new Error('Language not found!');
    }
    return language;
  },

  countries: (_, __, { country }) => country,
  country: (_, args, { country }) => {
    const countryQuery = country.find((c) => c.id === args.id);
    if (!countryQuery) {
      return new Error('Country not found!');
    }
    return countryQuery;
  },

  continents: (_, __, { continent }) => continent,
  continent: (_, args, { continent }) => {
    const continentQuery = continent.find((c) => c.code === args.code);
    if (!continentQuery) {
      return new Error('Continent not found!');
    }
    return continentQuery;
  },
};
