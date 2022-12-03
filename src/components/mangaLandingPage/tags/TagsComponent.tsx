import React from "react";
import { Tags } from "../../../GlobalTypes/MangaTypes";

const TagsComponent: React.FC<{ tags: Tags[] }> = ({ tags }) => {
  return (
    <div className="row text-white">
      {tags &&
        tags.map((elem) => {
          return (
            <div
              className="bg-slate-500 mr-4 rounded p-2 col-sm-1 mt-2"
              key={elem.id}
            >
              <p className="line-clamp-1">
                {
                  elem.attributes.name[
                    "en" in Object.keys(elem.attributes.name)
                      ? "en"
                      : Object.keys(elem.attributes.name)[0]
                  ]
                }
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default TagsComponent;
