import { memo, useState } from "react";
import Cards from "../../components/cards/Cards";
import Header from "../../components/header/Header";

const Home = () => {
  const [selectedPhone, setSelectedPhone] = useState<any | null>(null);


  return (
    <div className="Index">
      <Header
        selectedPhone={selectedPhone}
        setSelectedPhone={setSelectedPhone}
      />
      <Cards
        setSelectedPhone={setSelectedPhone}
      />
    </div>
  );
};

export default memo(Home);
