import { FC } from "react";
import { AccountInfo } from './AccountInfo';
import { Link } from "react-router-dom";
import { Post } from "../client/types";
import { getCIDLink } from "../utils/web3Storage";

export interface PostListingCardProps {
  url: string;
  post: Post;
}

export const PostListingCard: FC<PostListingCardProps> = ({
  url,
  post,
}) => {
  console.log(post);
  return (
    <Link to={url}>
      <div className="bg-base-100 shadow-xl rounded-lg group">
        <div className="w-full h-48 overflow-hidden">
          <div
            className="w-full h-48 bg-no-repeat bg-cover rounded-t-lg transition-all duration-500 ease-in-out transform group-hover:scale-125 overflow-hidden"
            style={{
              backgroundImage: `url(${getCIDLink(post.cover)})`,
            }}
          />
        </div>
        <div className="p-4">
          <div className="font-medium mb-2 flex items-center">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {post.title}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base-content/75 text-sm mb-1">
              0 views {/* TODO: add view here */}
            </div>
          </div>
          <div className="mt-4">
              <AccountInfo address="0x002121212"  />
          </div>
          <p>
          </p>
        </div>
      </div>
    </Link>
  );
};
