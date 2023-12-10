import { FC, useMemo } from "react";
import readingTime from "reading-time";
import moment from "moment";
import { PostAuthorInfo } from "./PostAuthorInfo";
import { getCIDLink } from "../utils/web3Storage";

export interface PostViewProps {
  title: string;
  content: string;
  coverCID?: string;
  author?: {
    address?: string;
  };
  createdAt?: Date;
}

export const PostView: FC<PostViewProps> = ({
  content,
  title,
  author,
  coverCID,
  createdAt,
}) => {
  const readingTimeStr = useMemo(() => {
    return (
      <div className="text-base-content/70">
        {readingTime(content || "").text}
      </div>
    );
  }, [content]);
  const coverImageUrl = useMemo(() => {
    if (!coverCID) {
      return null;
    }
    return getCIDLink(coverCID);
  }, [coverCID]);
  const dateComp = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return (
      <div className="text-base-content/70 mb-4">
        {moment(createdAt).format("ll")}
      </div>
    );
  }, [createdAt]);
  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
          </h1>
          {coverImageUrl && (
            <div className="w-full h-56 overflow-hidden mt-6">
              <div
                className="w-full h-56 bg-no-repeat bg-cover bg-center rounded-lg transition-all duration-500 ease-in-out transform group-hover:scale-125 overflow-hidden"
                style={{
                  backgroundImage: `url(${coverImageUrl})`,
                }}
              />
            </div>
          )}
          <div className="mt-8">
            {dateComp}
            {author && author.address && (              
              <PostAuthorInfo
                author={author}
                info={<div>{readingTimeStr}</div>}
              />
            )}
          </div>
        </div>
        <div
          className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};
