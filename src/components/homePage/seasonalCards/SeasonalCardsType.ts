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