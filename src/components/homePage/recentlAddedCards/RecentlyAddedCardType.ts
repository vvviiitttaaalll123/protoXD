type Relationship = {
  id: string;
  type: string;
  attributes?: {
    fileName: string;
    createdAt: string;
    updatedAt: string;
  };
};

type Dict = {
  [key: string]: string;
};

type Data = {
  id: string;
  type: string;
  attributes: {
    title: {
      [key: string]: string;
    };
  };
  altTitles: Dict[];
  description: Dict;
  createdAt: string;
  updatedAt: string;
  relationships: Relationship[];
};

export type RecentlyAddedType = {
  data: Data[];
};
