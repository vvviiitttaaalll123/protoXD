import { useEffect, useState } from "react";
import { instance } from "../../../axiosInstance";
import {
  GET_SEASONAL_UPDATES,
  IMAGE_URL,
  MANGA_DETAILS_URL_BUILD,
} from "../../../constants/AllUrls";
import { HomePageType } from "../../../GlobalTypes/HomePageTypes";
import SeasonalCard from "../seasonalCard/SeasonalCard";
import styles from "./SeasonalCards.module.scss";
import { MangaList } from "./SeasonalCardsType";

const SeasonalCards = () => {
  const [seasonalList, setSeasonalList] = useState<MangaList>();
  const [parsedSeasonalList, setParsedSeasonalList] = useState<HomePageType>();
  const [getMangaUrls, setMangaUrls] = useState<string[]>([]);

  useEffect(() => {
    const getSeasonalMangaList = async () => {
      try {
        const res = await instance.get(GET_SEASONAL_UPDATES);
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
      let mangaIdArray = [];
      for (let mangaId of seasonalList.data.relationships) {
        mangaIdArray.push(mangaId.id);
      }
      return mangaIdArray;
    };

    if (seasonalList) {
      getMangaDetailsUrl(seasonalList).then((res) => {
        setMangaUrls(res);
      });
    }
  }, [seasonalList]);

  useEffect(() => {
    const populateDetails = async (mangaIdArray: string[]) => {
      if (getMangaUrls.length > 0) {
        try {
          const res = await instance.post(MANGA_DETAILS_URL_BUILD, {
            ids: mangaIdArray,
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
                  imgURL = `${IMAGE_URL}?manga_id=${elem.id}&image_url=${relation.attributes.fileName}`;
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
