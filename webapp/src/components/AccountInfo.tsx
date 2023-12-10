import classNames from "classnames";
import React from "react";
import { getShortAddress } from "../utils/getShortAddress";
import { Avatar } from "./Avatar";
import { NetworkLabel } from "./NetworkLabel";

export interface AccountInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  infoPlacement?: "left" | "right";
  secondaryInfo?: 'network' | null
  networkName?: string;
  networkColor?: string;
}

export const AccountInfo = ({
  address,
  infoPlacement = "right",
  secondaryInfo,
  networkName,
  networkColor,
  ...rest
}: AccountInfoProps) => {
  const renderInfo = () => {
    const className = classNames(
      "AccountInfo-address text-base-content text-sm text-left",
      {
        "ml-3": infoPlacement === "right",
        "mr-3": infoPlacement === "left",
      }
    );
    const secondaryInfoWapperClassName = classNames({
      "text-right": infoPlacement === "left",
      "text-left": infoPlacement === "right",
    });
    return (
      <div className={className}>
        {getShortAddress(address)}
        {secondaryInfo && (
          <div className={secondaryInfoWapperClassName}>
            {secondaryInfo === 'network' && (
              <NetworkLabel name={networkName} color={networkColor} />
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="AccountInfo flex items-center" {...rest}>
      {infoPlacement === "left" && renderInfo()}
      <Avatar size={24} address={address} />
      {infoPlacement === "right" && renderInfo()}
    </div>
  );
};
