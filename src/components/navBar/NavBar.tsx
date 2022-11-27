import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance";
import { IMAGE_URL, SEARCH_URL } from "../../constants/AllUrls";
import styles from "./NavBar.module.scss";
import { SearchResultType } from "./SearchResultType";

const NavBar = () => {
  const [searchResult, setSearchResult] = useState<SearchResultType>();

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue: string) {
    if (inputValue.length > 0) {
      instance.get(SEARCH_URL(inputValue)).then((res) => {
        setSearchResult(res.data);
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

  const navigate = useNavigate();
  console.log(searchResult);
  return (
    <>
      <div className={styles.container + " text-white flex "}>
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
      {searchResult && (
        <div className="flex flex-col">
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
                className={`${styles.removeDecoration}`}
              >
                <div className="flex pb-3">
                  <img
                    src={IMAGE_URL(elem.id, imageUrl)}
                    alt="search cover image"
                    className="h-[5rem] w-[4rem] object-cover"
                    style={{}}
                  />
                  <p>
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
