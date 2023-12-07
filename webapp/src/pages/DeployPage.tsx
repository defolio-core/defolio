/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect, useState } from "react";
import { DeployForm } from "../components/forms/DeployForm";
import { useForm } from "react-hook-form";

import {
  deFolioSpaceFactoryABI,
  useDeFolioSpaceFactoryDeployContract,
} from "../generated";
import { decodeEventLog } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FACTORY } from "../consts/factory";
import { PATHS } from "../consts/paths";

export interface DeployPageProps {}

export const DeployPage: FC<DeployPageProps> = () => {
  const navigate = useNavigate();
  const acc = useAccount();
  const [loading, setLoading] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string>();
  const form = useForm({});
  const { writeAsync, data } = useDeFolioSpaceFactoryDeployContract({
    address: FACTORY.address as `0x${string}`,
  });
  const { data: txData } = useWaitForTransaction({
    hash: data?.hash,
  });
  useEffect(() => {
    if (txData && txData?.logs) {
      console.log(txData);
      const logs = txData.logs;
      const topics = decodeEventLog({
        abi: deFolioSpaceFactoryABI,
        data: logs[0].data,
        topics: logs[0].topics,
      });
      setDeployedAddress(topics.args.newContractAddress);
      setLoading(false);
      toast.success('Deployment successful');
      navigate(PATHS.app);
    }
  }, [navigate, txData]);
  const onSubmit = async () => {
    setLoading(true);
    await writeAsync({
      args: [
        acc.address!,
      ]
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {acc.isConnected ? (
        <div>
          <DeployForm form={form} onSubmit={onSubmit} loading={loading} />
          {deployedAddress && (
            <div className="mt-4">Deployed Address: {deployedAddress}</div>
          )}
        </div>
      ) : (
        <Web3Button />
      )}
    </div>
  );
};
