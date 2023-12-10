/* eslint-disable @typescript-eslint/no-unsafe-call */
import classnames from "classnames";
import React, { FC } from "react";
import Identicon from 'identicon.js'


export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  size?: number;
  ring?: boolean;
  shape?: "circle" | "rounded" | "square";
  status?: "online" | "offline";
}

const getHexCode = (hash = ''): string | null => {
  if (hash.length < 8) {
    return ''
  }
  let result = '';
  for (let i=0; i<hash.length; i++) {
    result += hash.charCodeAt(i).toString(16);
  }
  return result;
}

const getIdenticonSrc = (hash?: string) => {
  const hashFromHexCode = getHexCode(hash)
  if (!hashFromHexCode) {
    return
  }
  const data = new Identicon(hashFromHexCode, 420).toString() as string;
  return `data:image/png;base64,${data}`
}

export const Avatar: FC<AvatarProps> = ({
  className,
  address,
  status,
  size = 24,
  ring = true,
  shape = "circle",
}) => {
  const mainClassName = classnames(
    "Avatar avatar",
    {
      online: status === "online",
      offline: status === "offline",
    },
    className,
  );
  const avatarContainer = classnames({
    "ring ring-offset-base-100 ring-offset-2": ring,
    "rounded-full": shape === "circle",
    rounded: shape === "rounded",
  });
  const imgSrc = getIdenticonSrc(address)
  const sizePx = `${size}px`
  return (
    <div className={mainClassName}>
      <div className={avatarContainer} style={{ width: sizePx }}>
        <img
          style={{ width: sizePx, height: sizePx }}
          className="Avatar-image"
          src={imgSrc}
        />
      </div>
    </div>
  );
};