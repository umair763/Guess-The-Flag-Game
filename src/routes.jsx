import { createBrowserRouter } from "react-router-dom";
import { MainScreen, GameBoardPage, FinalResultsPage } from "./pages";
import { MainLayout } from "./components/layout/main.layout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainScreen />,
      },
      {
        path: "/game",
        element: <GameBoardPage />,
      },
      {
        path: "/results",
        element: <FinalResultsPage />,
      },
    ],
  },
]);
