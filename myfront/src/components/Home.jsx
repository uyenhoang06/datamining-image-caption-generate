import banner from "../assets/person.png"

import {motion} from 'framer-motion'
import {fadeIn} from '../variants.js'
import { Link } from 'react-scroll';


const Home = () => {
    const path = 'topic'
    return (
        <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-20" id = 'home'>
            <div className="gradientBg rounded-xl rounded-br-[80px] md:p-9 px-4 py-9 " >
                <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
                    <motion.div 
                    variants={fadeIn("down", 0.3)}
                    initial='hidden'
                    whileInView={"show"}
                    viewport={{once:false, amount:0.7}} >
                        <img src={banner} alt="" className="lg:h-[386px]" /> 
                    </motion.div>

                    <motion.div
                    variants={fadeIn("up", 0.3)}
                    initial='hidden'
                    whileInView={"show"}
                    viewport={{once:false, amount:0.7}}
                    
                    className="md:w-3/5">
                        <h2 className="md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed"> Sport Image Caption Generator</h2>
                        <p className="text-[#EBEBEB] text-2xl mb-8"> Image captioning refers to the process of automatically generating descriptive textual captions for images.</p>
                        
                        <div className="space-x-5 space-y-4">
                            <Link
                                spy={true}
                                smooth={true}
                                offset={-100}
                                to={path}
                                href={path} 
                                className='block hover:text-secondary'>
                                <button className='button'> Get Started! </button>
                            </Link>
                        </div>
                    </motion.div>
   
                </div>
            </div>
        </div>
    );
}

export default Home;