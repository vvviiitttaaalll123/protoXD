import { Dict } from "../../../GlobalTypes/MangaTypes";

type Relationships = {
  id: string;
  type: string;
  attributes: {
    name: string;
    altNames: Dict[];
  };
};

export type ChapterData = {
  id: string;
  type: string;
  attributes: {
    volume: null | string;
    chapter: string;
    title: string;
    updatedAt: string;
  };
  relationships: Relationships[];
};

export type ChapterType = {
  data?: ChapterData[];
  total: number;
};
