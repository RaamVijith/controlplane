import Header from "../../components/common/Header";
import TabNavigationLeads from "./TabNavigationLeads";

const LeadsMainPage = () => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />
      {/* <TabNavigationCompany /> */}
      <TabNavigationLeads/>
    </div>
  );
};

export default LeadsMainPage;