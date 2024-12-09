import { IconSmartHome, IconSearch, IconBell, IconUser, IconQrcode } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const BottomNav = () => {
  const router = useRouter();
  const btnLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('cart');
    localStorage.removeItem('formData');
    router.push('/home');
  }
  return (
    <div className="mobile-w fixed flex justify-center h-20 bottom-0 my-0 mx-auto w-full max-w-screen-sm ">


      <div className="kotak shadow-inner">
        <div className="menu1 icon_nav"><IconSmartHome /></div>
        <div className="menu3 icon_nav"><IconBell /></div>
        <div className="menu2 icon_nav"><IconSearch /></div>
        <button onClick={btnLogout} className="menu4 icon_nav"><IconUser /></button>
        <div className="lingkaran">
          <div className="iconQr flex items-stretch p-1"><IconQrcode width={32} height={32} /></div>
        </div>
      </div>

    </div>
  );
};

export default BottomNav;
