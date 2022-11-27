type Dict = {
  [key: string]: string;
};

type Tags = {
  id: string;
  type: string;
  attributes: {
    name: Dict;
  };
};

export type GlobalRelationship = {
  id: string;
  type: string;
  attributes?: {
    description: string;
    volume: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
  };
};

type GlobalData = {
  id: string;
  type: string;
  attributes: {
    title: Dict;
    description: Dict;
    altTitles: Dict[];
    tags: Tags[];
    createdAt: string;
    updatedAt: string;
  };
  relationships: GlobalRelationship[];
};

export type HomePageType = {
  data: GlobalData[];
};
