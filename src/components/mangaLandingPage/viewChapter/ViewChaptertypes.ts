import { Dict } from "../cover/MangaCoverTypes";

export type ViewChapterType = {
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
};

export type Relationships = {
  id: string;
  type: string;
  attributes: {
    name: string;
    altNames: Dict[];
    description: string;
  };
};

export type ChapterDetails = {
  data: {
    id: string;
    type: string;
    attributes: {
      volume: string;
      chapter: string;
      title: string;
      externalUrl: string;
    };
    relationships: Relationships[];
  };
};
