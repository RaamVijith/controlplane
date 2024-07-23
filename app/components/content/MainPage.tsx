import Header from "./comps/Header";
import TabNavigation from "./comps/TabNavigation";

const MainPage = () => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />
      <TabNavigation />
    </div>
  );
};

export default MainPage;
