import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
  query ($page: Int!, $gender: String!, $species: String!, $name: String!) {
    characters(page: $page, filter: { gender: $gender, species: $species, name: $name }) {
      results {
        id
        name
        species
        image
        location {
          name
        }
        gender
      }
      info {
        count
      }
    }
  }
`;
