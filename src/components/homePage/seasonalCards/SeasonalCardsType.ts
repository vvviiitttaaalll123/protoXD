export type Relationship = {
  id: string;
  type: "manga" | "user" | "author";
};

export type DataMangaList = {
  id: string;
  relationships: Relationship[];
};

export type MangaList = {
  data: DataMangaList;
};

// ------------------MangaDetailsType-------------------------

type Dict = {
  [key: string]: string;
};

type RelationshipsDetails = {
  id: string;
  type: string;
  attributes?: {
    fileName: string;
    createdAt: string;
    updatedAt: string;
  };
};

type AttributesDetails = {
  title: Dict;
  altTitles: Dict[];
  description: Dict;
};

type DataDetails = {
  id: string;
  type: string;
  attributes: AttributesDetails;
  relationships: RelationshipsDetails[];
};

export type MangaDetailsType = {
  data: DataDetails[];
};
