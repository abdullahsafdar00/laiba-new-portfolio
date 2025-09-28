export default function FAQCTA() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="max-w-full flex flex-col py-16 md:pl-20 md:w-full max-md:text-center mx-2 md:mx-auto md:flex-row items-center justify-between text-left bg-gradient-to-b from-white to-pink-200 rounded-2xl p-10 text-black">
                <div>
                    <h1
                        className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-black to-pink-400 text-transparent bg-clip-text">
                          Didn’t find what you were looking for?  
                    </h1>
                   
                </div>
                <button className="px-12 py-3 text-black bg-white rounded-full text-sm mt-4">
                    Let's discuss what you need
                </button>
            </div>
        </>
    );
};