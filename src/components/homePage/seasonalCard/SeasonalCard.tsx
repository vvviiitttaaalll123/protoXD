import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SeasonalCard.module.scss";

type PropType = {
  mangaTitle: string;
  description: string;
  imageUrl: string;
  mangaId: string;
};

const SeasonalCard: React.FC<PropType> = ({
  mangaTitle,
  description,
  imageUrl,
  mangaId,
}) => {
  let urlMangaTitle = encodeURIComponent(mangaTitle).replace(
    /[\.!'()*,]/g,
    function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    }
  );
  const [urlEncodedMangaTitle, _] = useState<string>(urlMangaTitle);
  // console.log(urlMangaTitle);
  return (
    <div
      style={{
        width: "80%",
        maxWidth: "380px",
        minWidth: "380px",
        marginRight: "20px",
      }}
    >
      <Link
        to={`/manga/${mangaId}/${encodeURIComponent(urlEncodedMangaTitle)}`}
      >
        <div className={styles.container + " text-white"}>
          <img
            src={imageUrl}
            alt="manga-cover-pic"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              overflow: "hidden",
              height: "100%",
            }}
          />
          <div className="details-container col-span-3 p-4">
            <div
              className={
                " text-base break-words line-clamp-1 font-bold min-w-0 mb-1"
              }
            >
              {mangaTitle}
            </div>
            <div
              className={
                " tracking-wider break-words line-clamp-6 text-base font-normal min-w-0"
              }
            >
              {description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SeasonalCard;
