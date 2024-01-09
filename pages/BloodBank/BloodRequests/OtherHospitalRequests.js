import BasicTabs from 'components/Tabs';
import ComingSoon from 'pages/ComingSoon';
import AllRequestsTab from './BLoodRequestTabs/AllRequestsTab';
import PendingTab from './BLoodRequestTabs/PendingTab';
import FulfilledTab from './BLoodRequestTabs/FulfilledTab';
// import InLabTestingTab from './DonarTabs/InLabTestingTab';
// import AddedtoStockTab from './DonarTabs/AddedtoStockTab';
// import RejectedTab from './DonarTabs/RejectedTab';

const componentMap = {
  0: <AllRequestsTab />,
  1: <PendingTab />,
  2: <FulfilledTab />
};


const OtherHospitalRequests = ({ tabs }) => {

  const TABLIST = tabs?.map((t, i) => {
    return {
      label: t,
      component: componentMap[i] || <ComingSoon height={200} />,
    };
  });

  return (
    <div>
      <BasicTabs tabList={TABLIST || undefined} />
    </div>
  );
};

export default OtherHospitalRequests;
