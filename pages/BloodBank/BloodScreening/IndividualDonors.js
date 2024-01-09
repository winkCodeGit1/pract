import BasicTabs from 'components/Tabs';
import ComingSoon from 'pages/ComingSoon';
import AllDonorsTab from './DonarTabs/AllDonorsTab';
import InLabTestingTab from './DonarTabs/InLabTestingTab';
import AddedtoStockTab from './DonarTabs/AddedtoStockTab';
import RejectedTab from './DonarTabs/RejectedTab';

const componentMap = {
  0: <AllDonorsTab />,
  1: <InLabTestingTab />, //if fails to map then fall back to coming soon
  2: <AddedtoStockTab />,
  3: <RejectedTab />
};

const IndividualDonors = ({ tabs }) => {

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

export default IndividualDonors;
