import { FaPhoneAlt } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo from "../../assets/T-LOGO.svg";

const ConnectBanner = () => {
  // Array of images for the slider
  const bannerImages = [
    {
      src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: '40% off everything',
    },
    {
      src: 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Discover amazing deals!',
    },
    {
      src: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?q=80&w=2978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Shop now and save big!',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex mb-14 flex-col-reverse lg:flex-row gap-4 lg:h-[400px]">
      {/* Left Section with Carousel */}
      <div className="w-[100%] lg:w-[70%] md:w-[100%] h-[300px] md:h-auto rounded-lg lg:rounded-[30px] overflow-hidden">
        <Slider {...sliderSettings}>
          {bannerImages.map((image, index) => (
            <div key={index} className="w-full h-[400px] lg:h-[700px]">
              <div
                className="w-full h-full bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url("${image.src}")`,
                }}
              >
                <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
                  <p className="text-white text-3xl text-wrap lg:text-4xl font-bold px-4 text-center">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Section */}
      <div className="flex md:flex-row flex-row lg:flex-col w-full lg:w-[30%] gap-4">
        {/* First box */}
        <div className="bg-[#fff] rounded-lg w-full h-[140px] lg:h-[219px]">
          <ul className="pt-2 md:pt-6 px-2 md:px-6 flex flex-col gap-4 md:gap-6">
            {/* CALL TO ORDER */}
            <li className="flex items-center pt-3 gap-4">
              <FaPhoneAlt size={24} className="text-brandGreen" />
              <div className='text-xs'>
                <p className="font-bold text-sm md:text-[16px]">CALL TO ORDER</p>
                <p className="text-xs md:text-[14px] text-gray-600">
                  <a href="tel:07084934850" className="hover:underline">
                    07084934850
                  </a>,{' '}
                  <a href="tel:090839589385" className="hover:underline">
                    090839589385
                  </a>
                </p>
              </div>
            </li>


            {/* Best Deals */}
            <li className="flex items-center gap-4">
              <FaTags size={24} className="text-brandGreen" />
              <div>
                <p className="font-bold md:font-semibold text-sm md:text-[16px]">Best Deals</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Second box */}
        <div className="bg-brandGreen flex flex-col items-center justify-center rounded-lg w-full h-[140px] lg:h-[219px]">
          <div className="bg-white px-2 rounded-lg">
            <img className="w-[100px] md:w-[150px]" src={Logo} alt="Logo" />
          </div>
          <span className="text-white animate-bounceSlow font-bold text-lg md:text-2xl mt-3">JOIN NOW</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectBanner;
