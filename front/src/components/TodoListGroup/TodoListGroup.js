import { useState, useLayoutEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentKanban, userState } from '../../recoil';
import { useLocation, Navigate } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import { getKanban } from '../../apis/kanban';
import { createList, removeList, modifyList } from '../../apis/list';
import { createTask, deleteTask, modifyTask } from '../../apis/task';
import { updateIndex } from '../../apis/idx';



function TodoListGroup() {
    const [kb, setKb] = useRecoilState(currentKanban);
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    const userData = useRecoilValue(userState);
    let location = useLocation();
    let url = location.pathname.substring(1);


    function replaceItemAtIndex(arr, index, newValue) {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }


    async function onDragEnd(result) {
        try {
            if (!result.destination) return
            const { source, destination } = result
            if (source.droppableId !== destination.droppableId) {
                await updateIndex(result.draggableId, result);
                const sourceColIndex = kb.findIndex(e => e._id === source.droppableId);
                const destinationColIndex = kb.findIndex(e => e._id === destination.droppableId);

                const sourceCol = kb[sourceColIndex];
                const destinationCol = kb[destinationColIndex];

                let sourceTask = [...sourceCol.tasks];
                let destinationTask = [...destinationCol.tasks];

                let removed = sourceTask.splice(source.index, 1);

                removed.listId = destination.droppableId;
                removed = replaceItemAtIndex(removed, 0, {
                    ...removed[0],
                    listId: destination.droppableId,
                })

                destinationTask.splice(destination.index, 0, removed[0]);

                let newList = replaceItemAtIndex(kb, sourceColIndex, {
                    ...kb[sourceColIndex],
                    tasks: sourceTask,
                })
                newList = replaceItemAtIndex(newList, destinationColIndex, {
                    ...kb[destinationColIndex],
                    tasks: destinationTask,
                })
                setKb(newList);
            } else if (source.droppableId === destination.droppableId && source.index !== destination.index) {
                await updateIndex(result.draggableId, result);
                const sourceColIndex = kb.findIndex(e => e._id === source.droppableId);
                const sourceCol = kb[sourceColIndex];
                let sourceTask = [...sourceCol.tasks];
                let removed = sourceTask.splice(source.index, 1);
                sourceTask.splice(destination.index, 0, removed[0]);

                let newList = replaceItemAtIndex(kb, sourceColIndex, {
                    ...kb[sourceColIndex],
                    tasks: sourceTask,
                });
                setKb(newList);
            }
        } catch (error) {
            console.log(error);
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

    function toggleEditTask(index, taskIndex) {
        const newList = replaceItemAtIndex(kb, index, {
            ...kb[index],
            tasks: replaceItemAtIndex(kb[index].tasks, taskIndex, {
                ...kb[index].tasks[taskIndex],
                edit: !kb[index].tasks[taskIndex].edit,
            }),
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
                await modifyList(kb[index].kanbanId._id, kb[index]._id, { title: inputValue });
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

    async function updateTask(index, taskId, inputValue) {
        await modifyTask(kb[index].kanbanId._id, kb[index]._id, taskId, { content: inputValue });
        for (let i = 0; i < kb[index].tasks.length; i++) {
            if (kb[index].tasks[i]._id === taskId) {
                const newList = replaceItemAtIndex(kb, index, {
                    ...kb[index],
                    tasks: replaceItemAtIndex(kb[index].tasks, i, {
                        ...kb[index].tasks[i],
                        content: inputValue,
                        edit: !kb[index].tasks[i].edit,
                    }),
                })
                setKb(newList);
            }
        }
    }

    useLayoutEffect(() => {
        if (kb.length > 0) {
            setKb([]);
        } else {
            async function fetchData() {
                const response = await getKanban(url)
                if (response.length > 0) {
                    response.map((list, i) => {
                        list.index = i;
                        list.edit = false;
                        list.menu = false;
                        list.tasks.map((task, j) => {
                            task.column = i;
                            task.edit = false;
                            task.listId = list._id;
                            task.index = j;
                            return task;
                        });
                        return list;
                    })
                    setKb(response);
                }
            }
            fetchData()
        }
    }, [url])

    return (
        <>
            {userData ? (
                <>
                    {
                        kb.length > 0 ?
                            (<div className='flex flex-col h-full'>
                                <div className={`m-6 h-1/5 flex justify-center list-${kb.length} items-center`}>
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
                                                kanbanId={url}
                                                fToggleEdit={() => toggleEditMode(index)}
                                                fToggleMenu={() => toggleShowMenu(index)}
                                                fDeleteList={() => deleteList(index)}
                                                fUpdateList={(e, updateValue) => updateList(index, e, updateValue)}
                                                fAddTask={(inputValue) => addTask(index, inputValue)}
                                                fRemoveTask={(id) => removeTask(index, id)}
                                                fUpdateTask={(id, inputValue) => updateTask(index, id, inputValue)}
                                                fToggleEditTask={(taskIndex) => toggleEditTask(index, taskIndex)}
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
            ) : (
                <Navigate to="/signin" />
            )}
        </>
    )
}


export default TodoListGroup;