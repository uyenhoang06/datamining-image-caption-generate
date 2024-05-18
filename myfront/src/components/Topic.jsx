
import img_1 from '../assets/img1.png'
import img_2 from '../assets/img2.png'
import img_3 from '../assets/img3.png'

import {motion} from 'framer-motion'
import {fadeIn} from '../variants.js'
import { Link } from 'react-scroll';


const Topic = () => {

    const path = 'about';
    return(
        <div className="my-20 md:px-14 px-4 max-w-screen-2xl mx-auto" id = 'topic'>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">

                <motion.div
                variants={fadeIn("right", 0.3)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.7}} 
                
                className="lg:w-1/4 space-y-6">
                    <h2 className="text-5xl text-primary font-bold "> Image captioning </h2>
                    <p className='text-base text-tartiary'> Giải thích về cái này giải thích về cái này giải thích về cái này</p>

                    <Link
                        spy={true}
                        smooth={true}
                        offset={-100}
                        to={path}
                        href={path} 
                        className='block hover:text-secondary'>
                        <button className='button'> Next... </button>
                    </Link>
                </motion.div>

                <div className="w-full lg:w-3/4">
                    <div  className='grid md:grid-cols-3 sm-grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once:false, amount:0.7}} 
                 className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'>
                            <div>
                                <img src={img_2} alt=""  style={{ width: '150px', height: 'auto' }} />
                                <h5 className='text-xl font-semibold text-primary px-5 text-center mt-5'> Có ý nghĩa</h5>
                            </div>
                        </motion.div>

                        <motion.div
                        variants={fadeIn("down", 0.3)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once:false, amount:0.7}} 
                        className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer mt-16'>
                            <div>
                                <img src={img_1} alt="" style={{ width: '150px', height: 'auto' }} />
                                <h5 className='text-xl font-semibold text-primary px-5 text-center mt-5'> Có ý nghĩa</h5>
                            </div>
                        </motion.div>

                        <motion.div 
                        variants={fadeIn("up", 0.3)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once:false, amount:0.7}} 
                        className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'>
                            <div>
                                <img src={img_3} alt=""  style={{ width: '150px', height: 'auto' }} />
                                <h5 className='text-xl font-semibold text-primary px-5 text-center mt-5'> Có ý nghĩa</h5>


                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            
        </div>
    );

}


export default Topic;