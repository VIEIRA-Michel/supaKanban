import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userState } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import NoteItem from './NoteItem/NoteItem';

function NoteList() {
    const [createMode, setCreateMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const userData = useRecoilValue(userState);
    const fakeData = [{
        _id: 1,
        title: "Ma première note",
        content: "Lorem ipsum",
        date: "2021-10-10",
        userId: 1,
        edit: false,
    },
    {
        _id: 2,
        title: "Ma deuxième note",
        content: "Lorem ipsum",
        date: "2021-10-10",
        userId: 1,
        edit: false,
    },
    {
        _id: 3,
        title: "Ma troisième note",
        content: "Lorem ipsum",
        date: "2021-10-10",
        userId: 1,
        edit: false,
    }];
    const [noteList, setNoteList] = useState(fakeData);

    async function submit(e) {
        if (e.key === "Enter") {
            if (inputValue.length > 0) {
                try {
                    setCreateMode(false);
                    setNoteList([{ _id: noteList.length + 1, title: inputValue, content: "", date: "2021-10-10", userId: 1, edit: false }, ...noteList]);
                    setInputValue('');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    return (
        <>
            {userData ? (
                <div className="max-[450px]:w-[90%] min-[451px]:w-[350px] mx-auto mt-10 bg-quaternary rounded-[40px] flex flex-col justify-center items-center p-5 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]">
                    <div className='flex flex-col flex-auto w-full'>
                        <div className="flex justify-center text-white">
                            <button className='w-full text-white flex justify-between items-center cursor-pointer rounded-[15px] py-2.5 px-5 bg-[#130f40] border-none opacity-80 hover:opacity-100 transition-all' onClick={() => setCreateMode(true)}><span className='mr-1.5'>Créer une note</span><i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    {createMode && <div className='flex items-center w-full'>
                        <div className='flex flex-row w-full mt-5'>
                            <input type="text" className='flex flex-auto font-[Dosis] text-base rounded-[15px] border-none p-2.5 text-black' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => submit(e)} />
                            <button className='border-none bg-transparent ml-2.5' onClick={() => setCreateMode(false)}><i className="fa-solid fa-xmark py-2 px-2.5 bg-[#130f40] text-white text-sm leading-3 rounded-full cursor-pointer opacity-80 hover:opacity-100 transition-all"></i></button>
                        </div>
                    </div>}
                    {
                        noteList.length > 0 ?
                            <div className='flex flex-auto flex-col w-full'>
                                {noteList.map((element, index) =>
                                    <NoteItem key={index} title={element.title} id={element._id} editMode={element.edit} item={element} noteCount={noteList.length} />
                                )}
                            </div>
                            :
                            <div className="flex justify-center text-white m-2.5">
                                Vous n’avez aucune note pour le moment
                            </div>
                    }

                </div>
            ) : (
                <Navigate to="/signin" />
            )}
        </>
    )
}

export default NoteList;