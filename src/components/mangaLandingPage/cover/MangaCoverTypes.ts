export type Dict = {
  [key: string]: string;
};

type Tags = {
  id: string;
  type: "tag";
  attributes: {
    name: Dict;
  };
};

type Attributes = {
  name?: string;
  fileName?: string;
  createdAt: string;
  updatedAt: string;
};

type Relationships = {
  id: string;
  type: string;
  attributes: Attributes[];
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
    relationships: Relationships[];
  };
  tags: Tags[];
};

export type MangaCoverType = {
  data: Data;
};
