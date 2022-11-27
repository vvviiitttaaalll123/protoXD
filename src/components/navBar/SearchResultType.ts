import { Dict } from "../../GlobalTypes/MangaTypes";


type Relationship = {
  id: string;
  type: string;
  attributes?: {
    fileName: string;
    createdAt: string;
    updatedAt: string;
  };
};

type SearchData = {
  id: string;
  type: string;
  attributes: {
    title: Dict;
  };
  altTitles: Dict[];
  description: Dict;
  relationships: Relationship[];
};

export type SearchResultType = {
  data: SearchData[];
  total: number;
};
