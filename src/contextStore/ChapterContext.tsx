import React, { createContext, useState } from "react";
import { ChapterData } from "../components/mangaLandingPage/chapters/chapterType";

type children = {
  children: React.ReactElement;
};

export const ChapterContext = createContext({
  allChapterArray: [] as ChapterData[],
  setAllChapterArray: (value: Array<ChapterData>) => {},
});

const ChapterContextProvider: React.FC<children> = ({ children }) => {
  const [allChapterArray, setAllChapterArray] = useState<Array<ChapterData>>(
    [] as ChapterData[]
  );

  return (
    <ChapterContext.Provider
      value={{
        allChapterArray,
        setAllChapterArray,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export default ChapterContextProvider;
