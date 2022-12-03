type Attribute = {
  name?: string;
  altNames?: [{ [key: string]: string }];
  updatedAt: string;
  title?: {
    [key: string]: string;
  };
  altTitles?: [{ [key: string]: string }];
};

type Relationship = {
  id: string;
  type: string;
  attributes: Attribute;
};

type Data = {
  id: string;
  type: string;
  attributes: {
    chapter: string;
    title: string;
  };
  relationships: Relationship[];
};

export type RecentlyUpdatedType = {
  data: Data[];
};

export type ObjectTemplate = {
  mangaName: string;
  mangaId: string;
  scannerName: string;
  imageUrl: string;
  updatedAt: string;
  id: string;
  chapter: string;
};
