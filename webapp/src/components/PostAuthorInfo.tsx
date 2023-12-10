import React, { FC } from "react";
import { Avatar } from "./Avatar";
import { AddressInfo } from "./AddressInfo";

export interface PostAuthorInfoProps {
  author: {
    address?: string;
  },
  info?: React.ReactNode;
}

export const PostAuthorInfo: FC<PostAuthorInfoProps> = ({ author, info }) => {
  return (
    <div className="flex items-center">
      <Avatar address={author.address || ''} className="flex-shrink-0" size={32} />
      <div className="ml-4 text-sm">
        <div>
          <AddressInfo address={author.address || ''} short />
        </div>
        {info ? <div>{info}</div> : null}
      </div>
    </div>
  );
};
