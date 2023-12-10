import { FC, useMemo } from "react";
import { getShortAddress } from "../utils/getShortAddress";
import { getAddressExplorerUrl } from "../utils/explorer";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export interface AddressInfoProps {
  className?: string;
  address: string;
  short?: boolean;
  explorer?: boolean;
}

export const AddressInfo: FC<AddressInfoProps> = ({ className, address, short, explorer }) => {
  const addressStr = useMemo(() => {
    if (short) {
      return getShortAddress(address);
    }
    return address;
  }, [address, short]);
  const explorerUrl = useMemo(() => {
    if (!explorer || !address) {
      return null;
    }
    return getAddressExplorerUrl(address);
  }, [address, explorer]);
  if (explorerUrl) {
    return (
      <a className={className} href={explorerUrl} target="_blank">
        <span className="flex items-center">
          {addressStr}
          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
        </span>
      </a>
    )
  }
  return (
    <span>{addressStr}</span>
  );
};
