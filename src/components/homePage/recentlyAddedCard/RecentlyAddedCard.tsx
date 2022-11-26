import { Link } from "react-router-dom";
import styles from "./RecentlyAddedCard.module.scss";

const RecentlyAddedCard: React.FC<{
  mangaTitle: string;
  imageUrl: string;
  mangaId: string;
}> = ({ mangaTitle, mangaId, imageUrl }) => {
  const wordBreak = " line-clamp-2 text-sm ";

  return (
    <div className="flex mr-3 text-white">
      <Link
        to={`/manga/${mangaId}/${mangaTitle}`}
        className={`${styles.removeDecorations}`}
      >
        <div className="p-1 w-[128px] mr-2">
          <span className="min-w-[160px]">
            <img
              src={imageUrl}
              alt="cover-pic"
              height={300}
              width={200}
              style={{ borderRadius: "5px", height: "180px" }}
              className="w-full"
            />
          </span>
          <span>
            <p className={wordBreak}>{mangaTitle}</p>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RecentlyAddedCard;
