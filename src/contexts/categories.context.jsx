import { createContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS_QUERY = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(COLLECTIONS_QUERY);
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((accumulator, collection) => {
        const { title, items } = collection;
        return accumulator;
      }, {});
      setCategoriesMap(collectionsMap, loading);
    }
  }, [data]);

  console.log("loading ", loading);
  console.log("data ", data);

  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
