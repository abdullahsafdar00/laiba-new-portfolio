import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null)
    const faqsData = [
        {
            question: 'How do we start working together?',
            answer: 'Once you reach out through my contact form, I’ll schedule a quick discovery call or email chat to understand your project needs. From there, I’ll provide a tailored proposal.'
        },
        {
            question: 'How long does a typical project take?',
            answer: 'Timelines vary based on scope, but most design projects take between 1–3 weeks. Larger branding or web projects may take longer, and I’ll always share a clear schedule upfront.'
        },
        {
            question: 'What if I need revisions?',
            answer: 'Every package includes a set number of revisions. My goal is for you to love the final result, so I’ll make sure we refine your design until it aligns with your vision.'
        },
        {
            question: 'Do you work with clients worldwide?',
            answer: 'Yes! I collaborate with clients from different countries. Most communication happens through email or Zoom, making it easy to stay connected no matter the location.'
        },
        {
            question: 'What tools do you use for design?',
            answer: 'I mainly use Adobe Creative Suite (Photoshop, Illustrator, InDesign). This ensures professional-quality, industry-standard deliverables.'
        },
        {
            question: 'Do you offer custom packages?',
            answer: 'Absolutely. If none of the pricing plans fit your needs, I can create a custom package tailored to your project requirements and budget.'
        }
    ]
    return (
        <>
          
            <div
                
             className='flex flex-col items-center text-center mb-10 text-slate-800 px-3'>
                
                <h1 className='text-3xl md:text-4xl font-semibold my-6'>Still Wondering About Something?</h1>
               
                <div className='max-w-3xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <motion.div key={index}
                            initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }} 
                         className='flex flex-col items-start w-full'>
                            <div className='flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded' onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                <h2 className='text-base lg:text-lg font-semibold'>{faq.question}</h2>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-sm lg:text-base text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
    

            </div>
        </>
    )
}

export default FAQ