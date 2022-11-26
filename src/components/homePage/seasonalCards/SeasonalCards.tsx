import axios from "axios";
import { useEffect, useState } from "react";
import {
  GET_SEASONAL_UPDATES,
  IMAGE_URL,
  MANGA_DETAILS_URL_BUILD,
} from "../../../constants/AllUrls";
import SeasonalCard from "../seasonalCard/SeasonalCard";
import styles from "./SeasonalCards.module.scss";
import { MangaDetailsType, MangaList } from "./SeasonalCardsType";

const SeasonalCards = () => {
  const [seasonalList, setSeasonalList] = useState<MangaList>();
  const [parsedSeasonalList, setParsedSeasonalList] =
    useState<MangaDetailsType>();
  const [getMangaUrls, setMangaUrls] = useState<string>("");

  useEffect(() => {
    const getSeasonalMangaList = async () => {
      try {
        const res = await axios.get(GET_SEASONAL_UPDATES, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getSeasonalMangaList().then((res) => setSeasonalList(res));
  }, []);

  useEffect(() => {
    const getMangaDetailsUrl = async (seasonalList: MangaList) => {
      let urlBuild = MANGA_DETAILS_URL_BUILD;
      for (let mangaId of seasonalList.data.relationships) {
        urlBuild += mangaId.id;
        urlBuild += "&ids[]=";
      }
      urlBuild = urlBuild.slice(0, -7) + "&limit=24";
      return urlBuild;
    };

    if (seasonalList) {
      getMangaDetailsUrl(seasonalList).then((res) => {
        setMangaUrls(res);
      });
    }
  }, [seasonalList]);

  useEffect(() => {
    const populateDetails = async (url: string) => {
      if (getMangaUrls.length > 0) {
        try {
          const res = await axios.get(url, {
            headers: { "Access-Control-Allow-Origin": "*" },
          });
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
    };

    populateDetails(getMangaUrls).then((res) => {
      setParsedSeasonalList(res);
    });
  }, [getMangaUrls]);

  return (
    <>
      {parsedSeasonalList && (
        <p className={" container text-white text-3xl pt-4 "}>SEASONAL</p>
      )}
      <div className={styles.container + " container pt-3"}>
        <div className="flex">
          {parsedSeasonalList &&
            parsedSeasonalList.data.map((elem) => {
              let imgURL = "";
              for (let relation of elem.relationships) {
                if (relation.attributes) {
                  imgURL = IMAGE_URL(elem.id, relation.attributes.fileName);
                  break;
                }
              }
              return (
                <SeasonalCard
                  mangaTitle={
                    elem.attributes.title[Object.keys(elem.attributes.title)[0]]
                  }
                  description={elem.attributes.description["en"]}
                  imageUrl={imgURL}
                  key={elem.id}
                  mangaId={elem.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SeasonalCards;
