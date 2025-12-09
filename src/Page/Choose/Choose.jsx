import React from 'react';
import svg1 from '../../assets/svg/01.png'
import svg2 from '../../assets/svg/02.png'
import svg3 from '../../assets/svg/03.png'
import svg4 from '../../assets/svg/04.png'
import svg5 from '../../assets/svg/05.png'
import svg6 from '../../assets/svg/06.png'

const Choose = () => {
    return (
        <div className='border-gray-700 bg-secondary  p-10'>
          
          <div className='text-center mb-5'>
            <h2>Why Choose US</h2>
            <p className='text-2xl'>Where craftsmanship meets conscience</p>
          </div>

              <div className='grid md:grid-cols-2 gap-5 '>
                {/* Left Card */}
            <div className="card card-border bg-base-100">
  <div className="card-body">
    {/* component 1 */}
    <div className='flex gap-3  my-5'>
      <figure className=''>
                        <img src={svg1} alt="banner" className='w-20'/>
                    </figure>
    
   <div>
     <h2 className="card-title">Collaborative Approach</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
   <hr className='text-gray-400' />
   {/* component 2 */}
    <div className='flex gap-3   my-5'>
      <figure className=''>
                        <img src={svg2} alt="banner" className='w-20'/>
                    </figure>
    
   <div className=''>
     <h2 className="card-title">Refined Quality</h2>
    <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
   <hr className='text-gray-400' />
   {/* component 3 */}
    <div className='flex gap-3   my-5'>
      <figure className=''>
                        <img src={svg3} alt="banner" className='w-20'/>
                    </figure>
    
   <div>
     <h2 className="card-title">Sustainable Process</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
  </div>

</div>
              {/* right Card */}
            <div className="card card-border bg-base-100">
  <div className="card-body">
    {/* component 1 */}
    <div className='flex gap-3  my-5'>
      <figure className=''>
                        <img src={svg6} alt="banner" className='w-20'/>
                    </figure>
    
   <div>
     <h2 className="card-title">
Artisanal Craft</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
   <hr className='text-gray-400' />
   {/* component 2 */}
    <div className='flex gap-3  my-5'>
      <figure className=''>
                        <img src={svg4} alt="banner" className='h-20 ml-4 mr-4'/>
                    </figure>
    
   <div>
     <h2 className="card-title">Timeless Design</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
   <hr className='text-gray-400' />
   {/* component 3 */}
    <div className='flex gap-3   my-5'>
      <figure className=''>
                        <img src={svg5} alt="banner" className='w-20'/>
                    </figure>
    
   <div>
     <h2 className="card-title">Innovative Touch</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   </div>
  </div>

</div>
              </div>
        </div>
    );
};

export default Choose;