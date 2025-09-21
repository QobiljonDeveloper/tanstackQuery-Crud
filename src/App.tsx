import { lazy, memo } from "react";
const MainLayout = lazy(() => import("./page/"));

const App = () => {
  return <MainLayout />;
};

export default memo(App);
