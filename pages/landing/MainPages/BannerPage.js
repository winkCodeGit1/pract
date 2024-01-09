import Banner1600 from 'assets/Images/banner/banner-1600.png';
import Banner1200 from 'assets/Images/banner/banner-1200.png';
import Banner900 from 'assets/Images/banner/banner-900.png';
import Banner600 from 'assets/Images/banner/banner-600.png';

export default function BannerPage() {
  return (
    <picture>
      <source media='(min-width:1200px)' srcSet={Banner1200} />
      <source media='(min-width:900px)' srcSet={Banner900} />
      <source media='(min-width:300px)' srcSet={Banner600} />
      <img src={Banner1600} alt='Banner' style={{ width: '100%' }} />
    </picture>
  );
}
