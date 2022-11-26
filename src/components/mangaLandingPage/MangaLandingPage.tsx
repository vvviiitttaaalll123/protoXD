import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMAGE_URL, PERTICULAR_MANGA } from "../../constants/AllUrls";
import Chapter from "./chapters/Chapter";
import MangaCover from "./cover/MangaCover";
import { MangaLandingType } from "./MangaLandingType";

const MangaLandingPage = () => {
  const currLocation = useLocation();
  const [mangaId, setMangaId] = useState<string>(
    currLocation.pathname.split("/")[2]
  );
  const [author, setAuthor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [perticularMangaDetail, setPerticularMangaDetail] =
    useState<MangaLandingType>();

  useEffect(() => {
    setMangaId(currLocation.pathname.split("/")[2]);
  }, [currLocation]);

  useEffect(() => {
    const getMangaDetails = async () => {
      const url = PERTICULAR_MANGA(mangaId);
      try {
        const res = await axios.get(url, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getMangaDetails().then((res) => setPerticularMangaDetail(res));
  }, [mangaId]);

  useEffect(() => {
    const extractAuthor = (perticularMangaDetail: MangaLandingType) => {
      for (let relationship of perticularMangaDetail.data.relationships) {
        if (relationship.type === "author" && relationship.attributes.name) {
          setAuthor(relationship.attributes.name);
        }

        if (relationship.attributes?.fileName) {
          setImageUrl(relationship.attributes.fileName);
        }
      }
    };

    if (perticularMangaDetail) extractAuthor(perticularMangaDetail);
  }, [perticularMangaDetail]);

  return (
    <>
      {perticularMangaDetail && (
        <>
          <MangaCover
            mangaId={perticularMangaDetail.data.id}
            altTitle={
              perticularMangaDetail.data.attributes.altTitles[0]
                ? perticularMangaDetail.data.attributes.altTitles[0][
                    Object.keys(
                      perticularMangaDetail.data.attributes.altTitles[0]
                    )[0]
                  ]
                : "No alternate Title"
            }
            author={author}
            coverUrl={IMAGE_URL(mangaId, imageUrl, ".256.jpg")}
            mangaTitle={
              perticularMangaDetail.data.attributes.title[
                "en" in Object.keys(perticularMangaDetail.data.attributes.title)
                  ? "en"
                  : Object.keys(perticularMangaDetail.data.attributes.title)[0]
              ]
            }
            backgroundImage={IMAGE_URL(mangaId, imageUrl, "")}
            key={perticularMangaDetail.data.id}
            description={
              perticularMangaDetail.data.attributes.description["en"]
            }
          />
          <Chapter mangaId={perticularMangaDetail.data.id} />
        </>
      )}
    </>
  );
};

export default MangaLandingPage;
