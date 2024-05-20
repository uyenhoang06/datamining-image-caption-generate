import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import image1 from '../assets/slide1.jpg';
import image2 from '../assets/slide2.jpg';
import image3 from '../assets/slide3.jpg';
import image4 from '../assets/slide4.jpg';
import image5 from '../assets/slide5.jpg';

function SlideImage() {
  const slides = [
    { url: image1, caption: 'Image 1 caption' },
    { url: image2, caption: 'Image 2 caption' },
    { url: image3, caption: 'Image 3 caption' },
    { url: image4, caption: 'Image 4 caption' },
    { url: image5, caption: 'Image 5 caption' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [currentIndex]); // Re-run the effect when currentIndex changes

  return (
    <div className='max-w-[1400px] h-[700px] w-full m-auto py-24 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500 relative'
      >
        {/* <div className='absolute bottom-20 left-4 bg-white/70 text-black px-4 py-2 rounded-full text-3xl font-semibold'>
          <div>Caption</div>
          <div>{slides[currentIndex].caption}</div>
        </div> */}
      </div>

      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-3xl font-semibold cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideImage;
