import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { noteState } from '../../../../recoil'
import { Link } from 'react-router-dom';


function NoteItem({ title, id, editMode, item, noteCount, noteIndex, fUpdate, fDelete }) {
    const [showButton, setShowButton] = useState(false);
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [noteList, setNoteList] = useRecoilState(noteState);

    function replaceItemAtIndex(arr, index, newValue) {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    }

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }

    async function removeNote() {
        try {
            await fDelete();
            const newList = removeItemAtIndex(noteList, noteIndex);
            setNoteList(newList);
        } catch (error) {
            console.log(error);
        }
    }

    function toggleEditMode() {
        setInputTitleValue(title);
        const newList = replaceItemAtIndex(noteList, noteIndex, {
            ...item,
            edit: !item.edit
        });
        setNoteList(newList);
    }

    async function submit(e) {
        try {
            if (e.key === "Enter") {
                if (inputTitleValue.length > 0) {
                    await fUpdate(inputTitleValue);
                    const newList = replaceItemAtIndex(noteList, noteIndex, {
                        ...item,
                        title: inputTitleValue,
                        edit: !item.edit
                    });
                    setNoteList(newList);
                }
            } else if (e.key === "Escape") {
                toggleEditMode();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={noteCount ? 'flex flex-row justify-between flex-auto items-center mt-5' : 'flex flex-row justify-between flex-auto items-center'}>
            <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? 'min-h-[55px] w-[70%] flex items-center flex-auto p-2.5 rounded-[20px] relative cursor-default bg-[#ffffffb3] transition-all' : 'min-h-[55px] w-[70%] p-2.5 bg-white rounded-[20px] cursor-default relative flex flex-auto'}>
                <div className='text-base text-[#3a4cae] font-thin truncate w-11/12 flex items-center'>
                    {editMode ? <input type='text' className='font-[Dosis] text-base font-thin border-none rounded-[10px] outline-0 w-11/12 py-2 px-2.5' value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => submit(e)} /> : <span className='truncate'>{title}</span>}
                </div>
                {editMode ?
                    <button onClick={toggleEditMode} className='border-none bg-transparent'>
                        <i className="fa-solid fa-xmark rounded-full py-2 px-2.5 cursor-pointer bg-white hover:text-white hover:bg-secondary hover:transition-all"></i>
                    </button> :
                    showButton ?
                        <div className='flex flex-row absolute bg-white top-[5px] right-[5px] p-[5px] cursor-pointer rounded-[15px] z-10 shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                            <i onClick={toggleEditMode} className="fa-regular fa-pen-to-square text-sm rounded-[10px] bg-white p-[7.5px] text-primary hover:bg-primary hover:text-white hover:transition-all"></i>
                            <i onClick={removeNote} className="fa-solid fa-trash text-sm rounded-[10px] bg-white p-[7.5px] text-primary hover:bg-primary hover:text-white hover:transition-all"></i>
                        </div>
                        : ""
                }
            </div>
            <Link to={`/note/${id}`} state={{ title, id, item }} className='ml-[15px] p-2.5 rounded-[15px] bg-quinary text-primary cursor-pointer opacity-80 hover:opacity-100 hover:transition-all min-h-[55px] no-underline h-full flex items-center'><i className="fa-duotone fa-arrow-right-to-arc"></i></Link>
        </div>
    )
}

export default NoteItem;