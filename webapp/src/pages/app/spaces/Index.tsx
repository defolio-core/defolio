import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getProjects } from "../../../client/queries/spaces";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getSpaces } from "../../../client/queries/spaces";
import { SpaceAvatar } from "../../../components/SpaceAvatar";
// import { ProjectAvatar } from "../../../components/ProjectAvatar";

export interface SpacesIndexProps {}

export const SpacesIndex: FC<SpacesIndexProps> = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [,setCurrentSpaceId] = useLocalStorage<string | null>('defolio-current-space-id', null);
  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: () => getSpaces(), // TODO: Implement backend for this
  });
  const onSelectSpace = (spaceId: string) => {
    queryClient.clear();
    setCurrentSpaceId(spaceId);
    navigate('/app');
  };
  return (
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
  );
};
