import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import close from "../../assets/close.svg";
import { instance } from "../../axiosInstance";
import { IMAGE_URL, SEARCH_URL } from "../../constants/AllUrls";
import styles from "./NavBar.module.scss";
import { SearchResultType } from "./SearchResultType";

const NavBar = () => {
  const [searchResult, setSearchResult] = useState<SearchResultType>();
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue: string) {
    if (inputValue.length > 0) {
      instance.get(SEARCH_URL + `?title=${inputValue}`).then((res) => {
        setSearchResult(res.data);
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSearchResult(true);
    debounceFn(e.target.value);
  };

  const handleResetSearch = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setShowSearchResult(false);
    if (searchRef.current !== null) searchRef.current.value = "";
  };

  return (
    <>
      <div className={styles.container + " text-white flex w-full"}>
        <div
          className="left"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo flex">Proto-XD</div>
        </div>
        <div className={styles.right + " flex"}>
          <div className="search flex">
            <form className={styles.searchForm + " flex"}>
              <input
                placeholder="Search"
                title="Search"
                name="q"
                className={styles.searchBox}
                onChange={(e) => handleChange(e)}
                ref={searchRef}
              />
              <div className={styles.searchIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    "svg" +
                    " text-icon-black dark:text-icon-white text-false icon m-auto"
                  }
                >
                  <path
                    d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="md-border"></div>
            </form>
          </div>
          <div className={styles.profile}>
            <div
              className={styles.profileIcon + " flex "}
              style={{ minWidth: "40px", minHeight: "40px" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="large text-icon-black dark:text-icon-white text-false icon m-auto"
                id="avatar"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showSearchResult && searchResult && (
        <div
          className={`flex h-52 w-full flex-col overflow-scroll ${styles.searchContainer} `}
        >
          <div className="flex cursor-pointer p-2">
            <div
              className="flex justify-between w-full gap-4 pb-3"
              onClick={(e) => handleResetSearch(e)}
            >
              <p className="text-white">clear search</p>
              <img src={close} alt="close search" />
            </div>
          </div>
          {searchResult.data.map((elem) => {
            let imageUrl = "";

            for (let relation of elem.relationships) {
              if (relation.attributes) {
                imageUrl = relation.attributes.fileName;
              }
            }

            return (
              <Link
                to={`/manga/${elem.id}/${
                  elem.attributes.title[Object.keys(elem.attributes.title)[0]]
                }`}
                key={elem.id}
                className={`${styles.removeDecoration} flex p-2`}
              >
                <div className="flex justify-between w-full gap-4 pb-3">
                  <img
                    src={IMAGE_URL + `?manga_id=${elem.id}&image_url=${imageUrl}`}
                    alt="search cover image"
                    className="h-[7rem] w-[5rem] object-cover"
                  />
                  <p className="line-clamp-1">
                    {
                      elem.attributes.title[
                        "en" in Object.keys(elem.attributes.title)
                          ? "en"
                          : Object.keys(elem.attributes.title)[0]
                      ]
                    }
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavBar;
