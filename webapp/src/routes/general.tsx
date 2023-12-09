import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { ConfigureContractPage } from "../pages/ConfigureContractPage.tsx";
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { SpacesIndex } from "../pages/app/spaces/Index";
import { SpacesCreate } from "../pages/app/spaces/SpacesCreate";

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
  // ROUTES - END
];
