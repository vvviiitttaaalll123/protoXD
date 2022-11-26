import React from "react";
import styles from "./MangaCover.module.scss";

type Temp = {
  mangaId: string;
  coverUrl: string;
  mangaTitle: string;
  altTitle: string;
  author: string;
  backgroundImage: string;
  description: string;
};

const MangaCover: React.FC<Temp> = ({
  mangaId,
  altTitle,
  author,
  coverUrl,
  mangaTitle,
  backgroundImage,
  description,
}) => {

  return (
    <div className="container">
      <div className={`${styles.cardContainer} z-0 left text-white`}>
        <div className={`${styles.bannerContainer} block`}>
          <div
            className={`${styles.bannerImage}`}
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              width: "100%",
            }}
          ></div>
        </div>
        <div className={`container mt-[-6rem] z-10 ${styles.movPosition}`}>
          <div className={`${styles.right} gap-6 flex`}>
            <div className={`${styles.rightContainer}`}>
              <img src={coverUrl} alt="manga cover" />
            </div>
            <div className={`${styles.right} flex flex-shrink flex-col`}>
              <h2 className="text-5xl">{mangaTitle}</h2>
              <h5 className="text-3xl pt-3">{altTitle}</h5>
              <h6 className="text-2xl pt-3">{author}</h6>
              <p className="flex flex-shrink">{description.split("---")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCover;
