import { Link } from "react-router-dom";
import group from "../../../assets/group.svg";
import styles from "./MangaCard.module.scss";

type MangaCardPropType = {
  imageSrc: string;
  mangaTitle: string;
  scannerName: string;
  chapterNumber: string;
  time: string;
  mangaId: string;
};

const MangaCard: React.FC<MangaCardPropType> = ({
  imageSrc,
  mangaTitle,
  scannerName,
  chapterNumber,
  mangaId,
  time,
}) => {
  const wordBreak = " font-bold line-clamp-1 break-all ";
  return (
    <>
      <div className={styles.container + " flex gap-2 p-2"}>
        <div
          className="image-container group flex items-start relative mb-auto w-full h-full"
          style={{ height: "120px", width: "70px" }}
        >
          <img
            className="rounded shadow-md w-full h-full"
            src={imageSrc}
            alt="Manga image"
          />
        </div>
        <div className="flex-grow flex flex-col justify-evenly">
          <Link
            to={`/manga/${mangaId}/${mangaTitle}`}
            className={styles.removeDecoration}
          >
            <h6
              className={
                styles.hideText +
                " text-base " +
                wordBreak +
                styles.removeDecoration
              }
            >
              {mangaTitle}
            </h6>
          </Link>
          <Link
            to={`/manga/${mangaId}/${mangaTitle}`}
            className={
              " flex flex-row" + styles.removeDecoration + " align-items-center"
            }
          >
            <img
              className={"mr-2"}
              src={"https://mangadex.org/flags/gb.svg"}
              alt="country"
              height="20px"
              width="20px"
              style={{
                maxWidth: "25px",
              }}
            />
            <span
              className={
                " text-base " +
                wordBreak +
                styles.hideText +
                " " +
                styles.removeDecoration +
                " ml-2"
              }
            >
              Chapter {chapterNumber}
            </span>
          </Link>
          <div className={styles.scannerGroup}>
            <Link
              to={`/manga/${mangaId}/${mangaTitle}`}
              className={"flex " + styles.removeDecoration}
            >
              <img
                src={group}
                alt="country"
                height="24px"
                width="24px"
                className={"max-w-xs font-bold " + styles.group}
              />
              <span
                className={
                  styles.hideText +
                  " text-white " +
                  wordBreak +
                  " text-xs ml-1 " +
                  styles.fontSmall
                }
              >
                {scannerName.length > 0 ? scannerName : "No Group"}
              </span>
            </Link>
            <span className={styles.fontSmall + " text-white text-xs"}>
              {time}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaCard;
