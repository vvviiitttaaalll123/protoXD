type Attributes = {
  volume: string | number | null;
  chapter: string;
  title: string;
  externalUrl: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
};

type Attribute = {
  attributes?: {
    title: {
      [key: string]: string;
    };
  };
  name?: string;
  altNames?: [{ [key: string]: string }];
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
  title?: {
    [key: string]: string;
  };
  altTitles?: [{ [key: string]: string }];
  description?: {
    [key: string]: string;
  };
  originalLanguage?: string;
};

type Relationship = {
  id: string;
  type: string;
  attributes: Attribute;
};

type Data = {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
};

export type RecentlyUpdatedType = {
  limit: number;
  offset: number;
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
