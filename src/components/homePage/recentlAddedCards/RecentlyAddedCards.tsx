import { useEffect, useState } from "react";
import { instance, instanceIso } from "../../../axiosInstance";
import { GET_RECENTLY_ADDED, IMAGE_URL } from "../../../constants/AllUrls";
import { HomePageType } from "../../../GlobalTypes/HomePageTypes";
import RecentlyAddedCard from "../recentlyAddedCard/RecentlyAddedCard";

const RecentlyAddedCards = () => {
  const [recentlyAddedData, setRecentlyAddedData] = useState<HomePageType>();

  useEffect(() => {
    const getRecentlyAddedDetails = async () => {
      try {
        instanceIso(GET_RECENTLY_ADDED);
        const res = await instance.get(GET_RECENTLY_ADDED);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getRecentlyAddedDetails().then((res) => setRecentlyAddedData(res));
  }, []);

  return (
    <div className="container text-white flex flex-col pt-4">
      {recentlyAddedData && (
        <p className="text-white pb-3 text-3xl">RECENTLY ADDED</p>
      )}
      <div className={" flex overflow-x-auto mb-9"}>
        {recentlyAddedData?.data.map((elem) => {
          let imgUrl = "";
          for (let relation of elem.relationships) {
            if (relation.attributes) {
              imgUrl = IMAGE_URL(elem.id, relation.attributes.fileName);
            }
          }
          return (
            <RecentlyAddedCard
              key={elem.id}
              imageUrl={imgUrl}
              mangaTitle={elem.attributes.title["en"]}
              mangaId={elem.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyAddedCards;
