import BannerPage from './MainPages/BannerPage';
import Footer from './MainComponents/Footer';
import MainContent from './MainPages/HomePageButtons';
import AboutUs from './MainComponents/AboutUs';
import UserTestimony from './MainComponents/UserTestimony';
import MainHeader from 'layouts/main/MainHeader';
import ScrollToTop from 'components/ScrollToTop';

export default function LandingPage() {
  return (
    <>
      <MainHeader isStaffLoginVal={true} />
      <BannerPage />
      <MainContent />
      <AboutUs />
      <UserTestimony />
      <Footer />
      <ScrollToTop />
    </>
  );
}
