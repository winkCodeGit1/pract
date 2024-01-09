import BasicTabs from 'components/Tabs';
import ComingSoon from 'pages/ComingSoon';

const Tab1 = () => {
  return <div>TAB1 content</div>;
};
const Tab2 = () => {
  return <div>TAB2 content</div>;
};
const Tab3 = () => {
  return <div>TAB3 content</div>;
};

const componentMap = {
  tab1: <Tab1 />,
  tab5: <Tab2 />, //if fails to map then fall back to coming soon
  tab3: <Tab3 />,
};

const SampleTabLayout = ({ tabs }) => {
  console.log(tabs);

  const TABLIST = tabs?.map((t) => {
    return {
      label: t,
      component: componentMap[t] || <ComingSoon height={200} />,
    };
  });

  return (
    <div>
      <BasicTabs tabList={TABLIST || undefined} />
    </div>
  );
};

export default SampleTabLayout;
