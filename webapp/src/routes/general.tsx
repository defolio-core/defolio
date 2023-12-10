import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { ConfigureContractPage } from "../pages/ConfigureContractPage.tsx";
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { SpacesIndex } from "../pages/app/spaces/Index";
import { SpacesCreate } from "../pages/app/spaces/SpacesCreate";
import { PostsCreate } from '../pages/app/posts/PostsCreate';
import { PostViewPage } from '../pages/PostViewPage';

export const general: RouteObject[] = [
  // ROUTES - START
  {
    path: PATHS.configureContract,
    element: <ConfigureContractPage />
  },
  {
    path: PATHS.index,
    element: <IndexPage />,
  },
  {
    path: PATHS.app,
    element: <AppIndexPage />,
  },
  {
    path: '/app/spaces',
    element: <SpacesIndex />,
  },
  {
    path: '/app/spaces/create',
    element: <SpacesCreate />,
  },
  {
    path: '/app/posts/create',
    element: <PostsCreate />
  },
  {
    path: '/:spaceSlug/:postSlug',
    element: <PostViewPage />
  }
  // ROUTES - END
];
