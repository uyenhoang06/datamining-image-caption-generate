import { useState } from "react";
import {motion} from 'framer-motion'
import {fadeIn} from '../variants.js'


const Princing = () => {

    const [isYearly, setIsYearly] = useState(false);

    const packages = [
        {name: 'Guess', monthlyPrice: 0, yearlyPrice: 0, description: "You can upload image and recive your caption."},
        {name: 'Member', monthlyPrice: 0, yearlyPrice: 0, description: "You can join the project and complete it with us."}
    ]

    return (
        <div className="contenair bg-cover min-h-screen w-full flex justify-center items-center" >

            <div className="my-20 md:px-14 px-4 max-w-screen-2xl mx-auto py-10" id = "pricing">
            <div className="circle"></div>
            <div className="text-center">
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Here are your plane</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Some diffirence between our options</p>

                <div
                
                
                className='mt-16'>
                    <label htmlFor="toggle" className="inline-flex items-center cursor-pointer" id = 'pricing'>
                        <span className="mr-8 text-2xl font-semibold">Monthly</span>
                        <div className="w-14 h-6 bg-gray-300 rounded-full transition duaration ease-in-out"> 
                            <div className={`w-6 h-6 bg-primary rounded-full transition duration-200 ease-in-out ${isYearly ? "bg-primary ml-8" : "bg-pink"}`}></div>
                        </div>
                        <span className="ml-8 text-2xl font-semibold">Yearly</span>
                    </label>

                    <input type="checkbox"  id = 'toggle' className="hidden" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                    
                </div>
            </div>

            <motion.div
                variants={fadeIn("up", 0.2)}
                initial='hidden'
                whileInView={"show"}
                viewport={{once:false, amount:0.5}} 

            className="grid sm:grid-cols-2 gap-10 mt-20 md:w-11/12 mx-auto">
                {
                packages.map((pkg, index) => 
                    <div key={index} className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl ">
                        <h3 className="text-3xl font-bold text-center text-primary">{pkg.name}</h3>
                        <p className="text-tartiary text-center my-5">{pkg.description}</p>
                        <p className="mt-5 text-center text-secondary text-4xl font-bold">
                            {isYearly? `$${pkg.yearlyPrice}`: `$${pkg.monthlyPrice}`}
                            <span className="text-base text-tartiary font-medium"> {isYearly? 'year': 'month'}</span>
                        </p>

                        <div className="w-full mx-auto mt-8 flex items-center justify-center">
                            <button className="button">Get start</button>
                        </div>
                    </div>)
                }
            </motion.div>
        </div>

        </div>
        
    );
};

export default Princing;