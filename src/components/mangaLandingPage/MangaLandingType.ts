import { Dict } from "./cover/MangaCoverTypes";

type Relationships = {
  id: string;
  type: string;
  attributes: {
    fileName?: string;
    updatedAt: string;
    createdAt: string;
    name?: string;
  };
};

type Data = {
  id: string;
  type: string;
  attributes: {
    title: Dict;
    altTitles: Dict[];
    description: Dict;
    createdAt: string;
    updatedAt: string;
  };
  relationships: Relationships[];
};

export type MangaLandingType = {
  data: Data;
};
