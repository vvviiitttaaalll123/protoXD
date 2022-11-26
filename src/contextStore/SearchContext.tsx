import React, { createContext, useState } from "react";

// type SearchContextType = {
//   isTyping: boolean,
//   searchString: string,
//   setIsTyping: Dispatch<React.SetStateAction<boolean>>,
//   setSearchString: Dispatch<React.SetStateAction<string>>
// }

type children = {
  children: React.ReactElement;
};

export const SearchContext = createContext({
  isTyping: false,
  searchString: "",
  setIsTyping: (value: boolean) => {},
  setSearchString: (value: string) => {},
});

const SearchProvider: React.FC<children> = ({ children }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [searchString, setSearchString] = useState("");

  return (
    <SearchContext.Provider
      value={{
        isTyping,
        setIsTyping,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
