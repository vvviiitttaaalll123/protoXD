export type Dict = {
  [key: string]: string;
};

type Relationships = {
  id: string;
  type: string;
  attributes?: {
    fileName?: string;
    updatedAt: string;
    createdAt: string;
    name?: string;
  };
};

export type Tags = {
  id: string;
  type: string;
  attributes: {
    name: Dict;
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
    tags: Tags[];
  };
  relationships: Relationships[];
};

export type MangaLandingType = {
  data: Data;
  total: number;
};
