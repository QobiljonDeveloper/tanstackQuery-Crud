import { lazy, memo } from "react";
const Home = lazy(() => import("./home"));

const MainLayout = () => {
  return (
    <div className="Index">
      <Home />
    </div>
  );
};

export default memo(MainLayout);
