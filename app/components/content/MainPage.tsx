import Header from "../common/Header";
import TabNavigation from "../common/TabNavigation";

const MainPage = () => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />
      <TabNavigation />
    </div>
  );
};

export default MainPage;
