import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../axiosInstance";
import { GET_CHAPTERS } from "../../../constants/AllUrls";
import styles from "./Chapter.module.scss";
import { ChapterData, ChapterType } from "./chapterType";

type Chapter = {
  chapter: string;
  title: string;
  updatedAt: string;
  groupName: string;
  id: string;
};

let limit = 0;

const Chapter: React.FC<{ mangaId: string }> = ({ mangaId }) => {
  const [allChapters, setAllChapters] = useState<ChapterType>();
  const [partitionedChapter, setPartitionedChapter] = useState<
    Map<string, Chapter[]>
  >(new Map());

  const showMoreHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      if (allChapters && allChapters.data) {
        const res = await instance.get(GET_CHAPTERS(mangaId, limit, 96));
        let allChaptersArr: ChapterData[] = allChapters.data.slice(0);
        allChaptersArr = [...allChapters.data, ...res.data.data];
        setAllChapters({ data: allChaptersArr, total: allChapters.total });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getChapters = async () => {
      try {
        const res = await instance.get(GET_CHAPTERS(mangaId));
        limit = res.data.total;
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    getChapters().then((res) => setAllChapters(res));
  }, []);

  useEffect(() => {
    const getByVolumes = (allChapters: ChapterType) => {
      const res = new Map<string, Chapter[]>();
      let i = 0;
      if (allChapters.data)
        for (let chapter of allChapters.data) {
          if (chapter.type === "chapter") {
            let temp: Chapter = {
              chapter: chapter.attributes.chapter,
              title: chapter.attributes.title,
              updatedAt: chapter.attributes.updatedAt,
              groupName: "",
              id: "",
            };
            for (let relation of chapter.relationships) {
              if (relation.type.match("[A-Za-z0-9_.]*group")) {
                temp.groupName = relation.attributes.name;
              }
            }

            temp.id = chapter.id;

            if (
              !res.has(
                chapter.attributes.volume !== null
                  ? chapter.attributes.volume
                  : "null"
              )
            ) {
              res.set(
                chapter.attributes.volume !== null
                  ? chapter.attributes.volume
                  : "null",
                []
              );
              res
                .get(
                  chapter.attributes.volume !== null
                    ? chapter.attributes.volume
                    : "null"
                )
                ?.push(temp);
            } else {
              res
                .get(
                  chapter.attributes.volume !== null
                    ? chapter.attributes.volume
                    : "null"
                )
                ?.push(temp);
            }
          }
        }
      return res;
    };

    if (allChapters) setPartitionedChapter(getByVolumes(allChapters));
  }, [allChapters]);

  const getFromMap = (elem: string) => {
    if (
      partitionedChapter.has(elem) &&
      partitionedChapter.get(elem) !== undefined
    )
      return partitionedChapter.get(elem) as Chapter[];
    else return [] as Chapter[];
  };

  return (
    <div className="container text-white">
      {partitionedChapter &&
        Array.from(partitionedChapter.keys()).map((elem) => (
          <div key={elem}>
            <p className="mt-3 mb-3">Volume: {elem}</p>
            {partitionedChapter &&
              getFromMap(elem).map((content) => {
                return (
                  <div className="flex pb-2 flex-col" key={content.id}>
                    <div className="rounded flex flex-col">
                      <div>
                        <Link
                          to={`/chapter/${content.id}`}
                          className={`${styles.contentContainer} p-2 rounded flex`}
                        >
                          <div className={`${styles.content} flex`}>
                            <div className="left">
                              <div className="chapter-number">
                                ch. {content.chapter}{" "}
                                {content.title && ` - ${content.title}`}
                              </div>
                              <div className="scanner-name">
                                {content.groupName}
                              </div>
                            </div>
                            <div className="right">
                              <div className="time">{content.updatedAt}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}

      {allChapters &&
        allChapters.data &&
        allChapters.data.length !== allChapters?.total && (
          <button
            className={`${styles.showMore}`}
            onClick={(e) => showMoreHandler(e)}
          >
            Show more
          </button>
        )}
    </div>
  );
};

export default Chapter;
