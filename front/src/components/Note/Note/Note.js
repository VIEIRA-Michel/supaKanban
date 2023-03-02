import { useEffect, useState, componentWillUnmount } from "react";
import { getNote, updateNote } from "../../../apis/note";
import { useRecoilState } from "recoil";
import { currentNote, currentNoteTitle, currentNoteContent } from "../../../recoil";
import { useLocation, Navigate } from 'react-router-dom';

function Note() {
    const [note, setNote] = useRecoilState(currentNote);
    const [title, setTitle] = useRecoilState(currentNoteTitle);
    const [content, setContent] = useRecoilState(currentNoteContent);
    let { id } = useLocation().state;


    function resetChanges() {
        document.execCommand('undo');
    }

    async function saveChanges() {
        if (title.trim().length > 0) {
            await updateNote(id, { title, content })
        } else {
            await updateNote(id, { title: 'Sans titre', content })
        }
    }

    useEffect(() => {
        getNote(id).then((result) => {
            setNote(result);
            setTitle(result.title);
            setContent(result.content);
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    return (
        <>
            {
                note &&
                <div className="h-[90vh] w-full flex flex-col justify-center items-center m-auto" >
                    <div className="max-[450px]:w-[90%] min-[451px]:w-[350px] lg:w-[700px] h-[90%] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)] bg-quaternary">
                        <div className="w-[85%] h-full flex flex-col justify-evenly m-auto">
                            <div className="h-[5%] rounded-[15px]">
                                <input defaultValue={note.title} onChange={(e) => setTitle(e.target.value)} className="w-full h-full bg-transparent rounded-[15px] border-none p-2 outline-0 text-3xl text-white opacity-100 placeholder:text-3xl placeholder:text-white placeholder:absolute placeholder:left-1 placeholder:top-1 placeholder:opacity-80" placeholder="Sans titre" />
                            </div>
                            <div className="h-[80%] rounded-[15px]">
                                <textarea defaultValue={note.content} onChange={(e) => setContent(e.target.value)} className="w-full h-full bg-transparent rounded-[15px] border-none p-2 outline-0 text-3xl font-thin text-white opacity-100 resize-none placeholder:text-3xl placeholder:text-white placeholder:font-['Dosis'] placeholder:opacity-80 placeholder:font-thin" placeholder="Écrivez quelque chose..." />
                            </div>
                            <div className="w-full flex justify-center items-center relative">
                                {
                                    title !== note.title || content !== note.content ?
                                        (
                                            <div className="absolute bottom-0">
                                                <button onClick={resetChanges} className="w-[50px] h-[50px] rounded-[15px] bg-primary text-white font-bold text-2xl"><i className="fa-duotone fa-arrow-rotate-left"></i></button>
                                                <button onClick={saveChanges} className="w-[50px] h-[50px] ml-2 rounded-[15px] bg-quinary text-primary font-bold text-2xl"><i className="fa-duotone fa-floppy-disk"></i></button>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default Note;