import Header from "../../../components/common/Header";
import TabNavigationCompany from "./companyInfoPanel/TabNavigationCompany";

const CompanyMainPage = () => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />
      <TabNavigationCompany />
    </div>
  );
};

export default CompanyMainPage;
