/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect, useState } from "react";
import {
  CreateSpaceForm,
  CreateSpaceFormFields,
} from "../../../components/forms/CreateSpaceForm";
import { useForm } from "react-hook-form";

import {
  deFolioSpaceFactoryABI,
  useDeFolioSpaceFactoryDeployContract,
} from "../../../generated";
import { decodeEventLog } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FACTORY } from "../../../consts/factory";
import { PATHS } from "../../../consts/paths";
import { useMutation } from "@tanstack/react-query";
import { createSpace } from "../../../client/mutations/spaces";
import { LoggedContainer } from "../../../components/LoggedContainer";

export interface SpacesCreateProps {}

export const SpacesCreate: FC<SpacesCreateProps> = () => {
  const navigate = useNavigate();
  const acc = useAccount();
  const [loading, setLoading] = useState(false);
  const createSpaceMutation = useMutation({
    mutationFn: createSpace
  });
  const [formFieldsData, setFormFieldsData] = useState<CreateSpaceFormFields>();
  const form = useForm<CreateSpaceFormFields>();
  const { writeAsync, data } = useDeFolioSpaceFactoryDeployContract({
    address: FACTORY.address as `0x${string}`,
  });
  const { data: txData } = useWaitForTransaction({
    hash: data?.hash,
  });
  useEffect(() => {
    if (txData && txData?.logs && formFieldsData) {
      console.log(txData);
      const logs = txData.logs;
      const topics = decodeEventLog({
        abi: deFolioSpaceFactoryABI,
        data: logs[0].data,
        topics: logs[0].topics,
      });
      const address = topics.args.newContractAddress;
      setLoading(false);
      createSpaceMutation.mutateAsync({
        logo: formFieldsData.logo,
        name: formFieldsData.name,
        slug: formFieldsData.slug,
        address,
      }).then(() => {
          toast.success("Deployment successful");
          navigate(PATHS.app);
      })
      .catch((err) => {
        toast.error("Deployment failed");
        console.error(err);
      });
    }
  }, [navigate, txData]);
  const onSubmit = async (data: CreateSpaceFormFields) => {
    setLoading(true);
    setFormFieldsData(data);
    await writeAsync({
      args: [acc.address!],
    });
  };

  return (
    <LoggedContainer>
      <div className="w-screen h-screen bg-base-200 flex items-center justify-center">
        <div className="shadow-sm bg-white rounded-md max-w-xl w-full">
          <div className="bg-white border rounded shadow p-4 max-w-2xl mx-auto">
            <div className="flex justify-between mb-8">
              <h1 className="text-lg font-bold">Create Space</h1>
            </div>
            <CreateSpaceForm form={form} onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </LoggedContainer>
  );
};
