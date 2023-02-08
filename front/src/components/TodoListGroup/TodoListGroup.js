import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { currentKanban } from '../../recoil';
import { useLocation } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import { getKanban } from '../../apis/kanban';
import { createList, removeList, modifyList } from '../../apis/list';
import { createTask, deleteTask } from '../../apis/task';



function TodoListGroup() {
    const [kb, setKb] = useRecoilState(currentKanban);
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    let location = useLocation();
    let url = location.pathname.substring(1);


    function replaceItemAtIndex(arr, index, newValue) {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }


    function onDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {

            const sourceColIndex = kb.kanban.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = kb.kanban.findIndex(e => e.id === destination.droppableId);

            const sourceCol = kb.kanban[sourceColIndex];
            const destinationCol = kb.kanban[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            let [removed] = JSON.parse(JSON.stringify(sourceTask.splice(source.index, 1)));
            removed.listId = destination.droppableId
            destinationTask.splice(destination.index, 0, removed);

            // setTodosState((oldTodosState) => {
            //     let state = JSON.parse(JSON.stringify(oldTodosState));
            //     state[kanbanIndex].kanban[sourceColIndex].tasks = sourceTask;
            //     state[kanbanIndex].kanban[destinationColIndex].tasks = destinationTask;
            //     return state;
            // });
        } else if (source.droppableId === destination.droppableId && source.index !== destination.index) {
            // setTodosState((oldTodosState) => {
            //     let state = JSON.parse(JSON.stringify(oldTodosState));
            //     state[kanbanIndex].kanban.map((el) => {
            //         if (el.id === destination.droppableId) {
            //             const [removed] = el.tasks.splice(source.index, 1);
            //             el.tasks.splice(destination.index, 0, removed);
            //         }
            //         return el;
            //     })
            //     return state;
            // });
        }
    }

    async function submit(e) {
        try {
            if (e.key === "Enter") {
                if (input.length > 0) {
                    const list = await createList({ title: input, id: url })
                    setKb((oldKanbanState) => [
                        ...oldKanbanState,
                        {
                            _id: list._id,
                            title: list.title,
                            tasks: list.tasks,
                            userId: list.userId,
                            createdAt: list.createdAt,
                            index: oldKanbanState.length,
                            edit: false,
                            menu: false,
                            kanbanId: {
                                _id: list.kanbanId,
                            }
                        },
                    ])
                    setShowInput(false);
                    setInput('');
                }
            } else if (e.key === "Escape") {
                setInput('');
                setShowInput(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function toggleEditMode(index) {
        const newList = replaceItemAtIndex(kb, index, {
            ...kb[index],
            edit: !kb[index].edit,
            menu: !kb[index].menu,
        })
        setKb(newList);
    }

    function toggleShowMenu(index) {
        const newList = replaceItemAtIndex(kb, index, {
            ...kb[index],
            menu: !kb[index].menu
        })
        setKb(newList);
    }

    async function deleteList(index) {
        try {
            await removeList(kb[index].kanbanId._id, kb[index]._id);
            const newList = removeItemAtIndex(kb, index)
            setKb(newList);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateList(index, e, inputValue) {
        try {
            if (e.key === "Enter") {
                const response = await modifyList(kb[index].kanbanId._id, kb[index]._id, { title: inputValue });
                const newList = replaceItemAtIndex(kb, index, {
                    ...kb[index],
                    title: inputValue,
                    edit: !kb[index].edit,
                })
                setKb(newList);
            } else if (e.key === "Escape") {
                const newList = replaceItemAtIndex(kb, index, {
                    ...kb[index],
                    edit: !kb[index].edit,
                })
                setKb(newList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addTask(index, inputValue) {
        try {
            const response = await createTask(kb[index].kanbanId._id, kb[index]._id, { content: inputValue });
            const taskAdded = response.list.tasks.shift();
            const newList = replaceItemAtIndex(kb, index, {
                ...kb[index],
                tasks: [{
                    _id: taskAdded._id,
                    column: index,
                    content: taskAdded.content,
                    edit: false,
                    menu: false,
                    listId: kb[index]._id,
                }, ...kb[index].tasks]
            })
            setKb(newList);
        } catch (error) {
            console.log(error);
        }
    }

    async function removeTask(index, taskId) {
        try {
            await deleteTask(kb[index].kanbanId._id, kb[index]._id, taskId);
            for (let i = 0; i < kb[index].tasks.length; i++) {
                if (kb[index].tasks[i]._id === taskId) {
                    const newList = replaceItemAtIndex(kb, index, {
                        ...kb[index],
                        tasks: removeItemAtIndex(kb[index].tasks, i)
                    })
                    setKb(newList);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getKanban(url).then(data => {
            if (data.length > 0) {
                data.map((list, i) => {
                    list.index = i;
                    list.edit = false;
                    list.menu = false;
                    return list;
                })
                setKb(data);
                console.log(data);
            }
        });
    }, [])


    return (
        <>
            {
                kb.length > 0 ?
                    (<div className='flex flex-col h-full'>
                        <h2 className='mb-5 flex justify-center'>{kb.title}</h2>
                        <div className={`mb-5 h-1/5 flex justify-center list-${kb.length} items-center`}>
                            <div className='w-[200px] m-auto flex justify-center items-center'>
                                {!showInput &&
                                    <button className={`p-[20px] py-2.5 px-5 cursor-pointer opacity-80 transition-opacity hover:opacity-100 text-sm rounded-[15px] w-[200px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)] border-none bg-secondary list-${kb.length} flex justify-between items-center flex-auto`} onClick={() => setShowInput(true)}>
                                        <span>Ajouter une liste</span>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>}
                                {showInput && <>
                                    <input className='font-[Dosis] w-[200px] h-[38px] rounded-[15px] border-none px-[5px]' type="text" placeholder="Saisissez un nom de liste" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => submit(e)} />
                                    <button className='rounded-full border-none cursor-pointer ml-2.5 bg-secondary' onClick={() => setShowInput(false)}><i className="fa-solid fa-xmark py-2 px-2.5 text-white text-sm leading-3 rounded-[5px] cursor-pointer opacity-80 hover:transition-all hover:opacity-100"></i></button>
                                </>
                                }
                            </div>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex justify-evenly items-start flex-row flex-wrap">
                                {kb.length > 0 && kb.map((list, index) => (
                                    <TodoList
                                        key={index}
                                        list={list}
                                        index={index}
                                        kanbanId={url}
                                        fToggleEdit={() => toggleEditMode(index)}
                                        fToggleMenu={() => toggleShowMenu(index)}
                                        fDeleteList={() => deleteList(index)}
                                        fUpdateList={(e, updateValue) => updateList(index, e, updateValue)}
                                        fAddTask={(inputValue) => addTask(index, inputValue)}
                                        fRemoveTask={(id) => removeTask(index, id)}
                                    />
                                ))}
                            </div>
                        </DragDropContext>
                    </div>) : (
                        <div className='flex flex-col h-full'>
                            <h2 className='mb-5 flex justify-center'>{kb.title}</h2>
                            <div className={`mb-5 h-1/5 flex justify-center list-0 items-center`}>
                                <div className='w-[200px] m-auto flex justify-center items-center'>
                                    {!showInput &&
                                        <button className={`p-[20px] py-2.5 px-5 cursor-pointer opacity-80 transition-opacity hover:opacity-100 text-sm rounded-[15px] w-[200px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)] border-none bg-secondary list-0 flex justify-between items-center flex-auto`} onClick={() => setShowInput(true)}>
                                            <span>Ajouter une liste</span>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>}
                                    {showInput && <>
                                        <input className='font-[Dosis] w-[200px] h-[38px] rounded-[15px] border-none px-[5px]' type="text" placeholder="Saisissez un nom de liste" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => submit(e)} />
                                        <button className='rounded-full border-none cursor-pointer ml-2.5 bg-secondary' onClick={() => setShowInput(false)}><i className="fa-solid fa-xmark py-2 px-2.5 text-white text-sm leading-3 rounded-[5px] cursor-pointer opacity-80 hover:transition-all hover:opacity-100"></i></button>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}


export default TodoListGroup;