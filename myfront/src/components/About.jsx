import img1 from    '../assets/about2.png'
import img2 from '../assets/about3.png'

import {motion} from 'framer-motion'
import {fadeIn} from '../variants.js'
import { Link } from 'react-scroll';

const About = () => {
    const path = 'pricing'
    return(
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto space-y-10" id = 'about'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-8 '>
                <motion.div 

                variants={fadeIn("right", 0.2)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.7}} 
                
                className='md:w-1/2'>   
                    <img src={img1}  alt="" className='md:max-w-full' />
                </motion.div>

                <motion.div
                variants={fadeIn("left", 0.2)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.7}} 

                className='w-full lg:w-2/5 md:mt-1'> 
                    <h2 className='md:text-4xl text-3xl font-bold text-primary mb-5 leading-normal'> Our project for  <span className='text-secondary'> Dataming course.</span></h2>
                    <p className='text-tartiary text-lg mb-7'>We use algorithm</p>

                     <Link
                        spy={true}
                        smooth={true}
                        offset={-100}
                        to={path}
                        href={path} 
                        className='block hover:text-secondary'>
                        <button className='button'> Next! </button>
                    </Link>
                </motion.div>
            </div>


            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
                <motion.div
                variants={fadeIn("up", 0.3)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.7}} 
                className='md:w-1/2'>   
                    <img src={img2} alt="" className='md:max-w-full' />
                </motion.div>

                <motion.div
                variants={fadeIn("right", 0.3)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.7}} 

                className='w-full lg:w-2/5 md:order-1'> 
                    <h2 className='md:text-4xl text-3xl font-bold text-primary mb-5 leading-normal'> Our project Image Captioning for  <span className='text-secondary'> Dataming course.</span></h2>
                    <p className='text-tartiary text-lg mb-7'>We use algorithm</p>
                    <button className='button'>Try it!</button>

                </motion.div>
            </div>
        </div>
        
    );
}


export default About;