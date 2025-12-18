import React from 'react';
import svg1 from '../../../assets/svg/01.png'
import svg3 from '../../../assets/svg/03.png'
import svg2 from '../../../assets/svg/02.png'
import svg4 from '../../../assets/svg/04.png'
import svg5 from '../../../assets/svg/05.png'
import svg6 from '../../../assets/svg/06.png'

const Choose = () => {
  return (
    <div className='bg-secondary py-12 sm:py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3' style={{ color: '#4c4452' }}>
            Why Choose Us
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
            Where craftsmanship meets conscience
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-4'></div>
        </div>

        {/* Cards Grid */}
        <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
          {/* Left Card */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 border border-gray-100'>
            {/* component 1 */}
            <div className='flex gap-4 mb-6'>
              <div className='shrink-0'>
                <img src={svg1} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Collaborative Approach
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  We work closely with you at every step — from design choices to final fittings — ensuring the finished garment reflects your vision and measurements.
                </p>
              </div>
            </div>
            <hr className='border-gray-200 my-6' />

            {/* component 2 */}
            <div className='flex gap-4 mb-6'>
              <div className='shrink-0'>
                <img src={svg2} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Refined Quality
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  We source premium fabrics and apply rigorous quality checks so every stitch, seam, and finish meets professional standards and lasts.
                </p>
              </div>
            </div>
            <hr className='border-gray-200 my-6' />

            {/* component 3 */}
            <div className='flex gap-4'>
              <div className='shrink-0'>
                <img src={svg3} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Sustainable Process
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  We minimize waste and prioritize eco-friendly materials and local production, so your garment is beautiful and responsibly made.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 border border-gray-100'>
            {/* component 1 */}
            <div className='flex gap-4 mb-6'>
              <div className='shrink-0'>
                <img src={svg6} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Artisanal Craft
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  Skilled artisans bring decades of experience to each piece, combining traditional techniques with modern precision for exceptional results.
                </p>
              </div>
            </div>
            <hr className='border-gray-200 my-6' />

            {/* component 2 */}
            <div className='flex gap-4 mb-6'>
              <div className='shrink-0'>
                <img src={svg4} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Timeless Design
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  Our designs focus on enduring style and fit rather than fleeting trends, so your wardrobe investments remain relevant season after season.
                </p>
              </div>
            </div>
            <hr className='border-gray-200 my-6' />

            {/* component 3 */}
            <div className='flex gap-4'>
              <div className='shrink-0'>
                <img src={svg5} alt="icon" className='w-16 h-16 sm:w-20 sm:h-20' />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: '#4c4452' }}>
                  Innovative Touch
                </h3>
                <p className='text-sm sm:text-base text-gray-600'>
                  We blend craftsmanship with thoughtful innovation — from smart fabric choices to precision tailoring — to deliver superior comfort and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
