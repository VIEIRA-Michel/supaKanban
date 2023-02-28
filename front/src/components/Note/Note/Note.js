function Note() {
    return (
        <div className="h-[90vh] w-full flex flex-col justify-center items-center m-auto">
            <div className="max-[450px]:w-[90%] min-[451px]:w-[350px] lg:w-[700px] h-[90%] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)] bg-quaternary">
                <div className="w-[85%] h-full flex flex-col justify-evenly m-auto">
                    <div className="h-[5%] rounded-[15px]">
                        <input className="w-full h-full bg-transparent rounded-[15px] border-none p-2 outline-0 text-3xl text-white opacity-100 placeholder:text-3xl placeholder:text-white placeholder:absolute placeholder:left-1 placeholder:top-1 placeholder:opacity-80" placeholder="Sans titre" />
                    </div>
                    <div className="h-[80%] rounded-[15px]">
                        <textarea className="w-full h-full bg-transparent rounded-[15px] border-none p-2 outline-0 text-3xl font-thin text-white opacity-100 resize-none placeholder:text-3xl placeholder:text-white placeholder:font-['Dosis'] placeholder:opacity-80 placeholder:font-thin" placeholder="Écrivez quelque chose..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;