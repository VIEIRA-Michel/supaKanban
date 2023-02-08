import { useState } from 'react';

function TodoItem({ todo, fRemoveTask, fUpdateTask, fToggleEditTask }) {
    const [showButton, setShowButton] = useState(false);
    const [inputTaskTitle, setInputTaskTitle] = useState(todo.content);

    function autoResize(e) {
        setInputTaskTitle(e.target.value)
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    function cancelEditMode() {
        setInputTaskTitle(todo.content);
        fToggleEditTask();
    }

    return (
        <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? "min-h-[60px] p-[10px] rounded-[20px] text-secondary text-[22px] mt-[15px] break-words flex flex-row justify-around relative items-center bg-[#ffffffb3] transition-all" : "min-h-[60px] p-[10px] rounded-[20px] text-secondary text-[22px] mt-[15px] break-words flex flex-row justify-around relative items-center bg-white"}>
            <div className="w-[90%] text-base">
                {todo.edit ? <textarea value={inputTaskTitle} onChange={(e) => autoResize(e)} type="text" onKeyDown={(e) => e.key === "Enter" ? fUpdateTask(inputTaskTitle) : e.key === "Escape" ? cancelEditMode() : null} className="flex flex-auto w-[95%] text-base resize-none px-[5px] focus:outline-none rounded-[10px]" /> : todo.content}
            </div>
            {showButton && !todo.edit ?
                <div className='flex flex-row absolute bg-white right-[5px] top-[5px] z-[2] p-[5px] cursor-pointer rounded-[15px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                    <i onClick={fToggleEditTask} className="fa-regular fa-pen-to-square text-sm rounded-[10px] bg-white p-[10px] hover:bg-primary hover:text-white hover:transition-all"></i>
                    <i onClick={fRemoveTask} className="fa-solid fa-trash text-sm rounded-[10px] bg-white p-[10px] hover:bg-primary hover:text-white hover:transition-all"></i>
                </div>
                : !showButton && !todo.edit ? '' :
                    <button onClick={fToggleEditTask} className='cursor-pointer border-none bg-transparent'>
                        <i className="fa-solid fa-xmark bg-white text-sm leading-3 py-2 px-2.5 rounded-full hover:bg-primary hover:text-white hover:transition-all"></i>
                    </button>
            }
        </div>
    )
}

export default TodoItem;