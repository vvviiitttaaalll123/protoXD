import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../axiosInstance";
import {
  GET_CHAPTER_DETAIL,
  GET_CHAPTER_IMAGES,
} from "../../../constants/AllUrls";
import { ChapterContext } from "../../../contextStore/ChapterContext";
import styles from "./ViewChapter.module.scss";
import { ChapterDetails, ViewChapterType } from "./ViewChaptertypes";

const ViewChapter = () => {
  const location = useLocation();
  const [chapterId, setChapterId] = useState<string>(
    location.pathname.split("/")[2]
  );
  const [chapterImages, setChapterImages] = useState<ViewChapterType>();
  const [scannerNames, setScannerNames] = useState<string>();
  const [chapterDetails, setChapterDetails] = useState<ChapterDetails>();
  const [dataSaver, setDataSaver] = useState<boolean>(false);
  const { allChapterArray } = useContext(ChapterContext);
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (chapterDetails)
      return (window.location.href =
        chapterDetails.data.attributes.externalUrl);
  };

  useEffect(() => {
    setChapterId(location.pathname.split("/")[2]);
  }, [location.pathname.split("/")[2]]);

  useEffect(() => {
    const getChapterImages = async (chapterId: string) => {
      try {
        const res = await instance.get(
          `${GET_CHAPTER_IMAGES}?chapter_id=${chapterId}`
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getChapterImages(chapterId).then((res) => {
      if (res) {
        setChapterImages(res);
      }
    });
  }, []);

  useEffect(() => {
    const getChapterDetail = async (chapterId: string) => {
      try {
        const res = await instance.get(
          `${GET_CHAPTER_DETAIL}?chapter_id=${chapterId}`
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getChapterDetail(chapterId).then((res) => {
      setChapterDetails(res);
    });
  }, []);

  useEffect(() => {
    if (chapterDetails) {
      for (let relation of chapterDetails?.data?.relationships) {
        if (relation.type.match("[A-Za-z0-9_.]*group")) {
          setScannerNames(relation?.attributes.name);
        }
      }
    }
  }, [chapterDetails]);

  if (allChapterArray) {
    console.log(allChapterArray);
  }

  return (
    <>
      {chapterDetails && chapterDetails.data && (
        <div className="container pt-3 text-white">
          <div className="chapter-info flex flex-col items-center">
            <p>Chapter {chapterDetails.data.attributes.chapter}</p>
            <p className="chapterTitle">
              {chapterDetails.data?.attributes.title}
            </p>
            <p className="scannerGroup">{scannerNames}</p>
          </div>
          {chapterImages &&
          chapterImages.chapter &&
          chapterImages.chapter.data &&
          chapterImages.chapter.data.length > 0 ? (
            <>
              <div className="flex p-6 justify-center">
                <button
                  onClick={() => setDataSaver(!dataSaver)}
                  className={`${styles.button} p-3`}
                >
                  {dataSaver === false ? "Data Saver" : "High Quality"}
                </button>
              </div>
              <div className="content flex flex-col items-center">
                {dataSaver === false &&
                  chapterImages.chapter.data.map((elem) => {
                    return (
                      <img
                        className="mx-auto"
                        key={elem}
                        src={`${chapterImages.baseUrl}/data/${chapterImages.chapter.hash}/${elem}`}
                      />
                    );
                  })}
                {dataSaver === true &&
                  chapterImages.chapter.dataSaver.map((elem) => {
                    return (
                      <img
                        className="mx-auto"
                        key={elem}
                        src={`${chapterImages.baseUrl}/data/${chapterImages.chapter.hash}/${elem}`}
                      />
                    );
                  })}
              </div>
              <div className="navigate p-9 flex justify-between">
                <button
                  onClick={() => navigate("/")}
                  className={`${styles.button} w-full p-4`}
                >
                  return to home
                </button>
              </div>
            </>
          ) : (
            <div className="content flex flex-col items-center">
              <button
                className={styles.redirect}
                onClick={() => handleRedirect()}
              >
                not available in mangadex redirect to external website
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewChapter;
