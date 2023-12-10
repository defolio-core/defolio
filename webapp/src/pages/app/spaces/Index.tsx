import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getProjects } from "../../../client/queries/spaces";
import { getSpaces } from "../../../client/queries/spaces";
import { SpaceAvatar } from "../../../components/SpaceAvatar";
// import { ProjectAvatar } from "../../../components/ProjectAvatar";
import { useSpaceId } from '../../../hooks/useSpaceId';
import { LoggedContainer } from "../../../components/LoggedContainer";

export interface SpacesIndexProps {}

export const SpacesIndex: FC<SpacesIndexProps> = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [,setCurrentSpaceId] = useSpaceId();
  const { data, isLoading } = useQuery({
    queryKey: ['spaces'],
    queryFn: () => getSpaces(),
  });
  const onSelectSpace = (spaceId: string) => {
    queryClient.clear();
    setCurrentSpaceId(spaceId);
    navigate('/app');
  };
  return (
    <LoggedContainer>
      <div className="w-screen h-screen bg-base-200 flex items-center justify-center">
        <div className="shadow-sm bg-white rounded-md max-w-xl w-full">
          <div className="text-base w-full text-center py-6 border-b text-base-content/80">Select Space</div>
          <div>
            {data?.length === 0 ? (
              <div className="text-base-content/50 w-full text-center py-8">
                No space created yet
              </div>
            ): (
              <ul className="menu menu-lg w-full px-2 py-4">
                {data?.map(space => (
                  <li>
                    <a onClick={() => onSelectSpace(space.id)}>
                      <div className="flex items-center">
                      <SpaceAvatar space={space} wrapperClassName="w-8" />
                        <div className="ml-4">
                          {space.name}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t py-4 px-2">
              <Link className="btn btn-ghost btn-block" to="/app/spaces/create">
                <PlusIcon className="h-6 w-6" />
                Create Space
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoggedContainer>
  );
};
