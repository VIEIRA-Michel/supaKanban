import { atom } from 'recoil';

export const todoListsState = atom({
    key: 'todoListsState',
    default: [],
})

export const todosState = atom({
    key: 'todosState',
    default: [],
});

export const showInput = atom({
    key: 'showInput',
    default: false,
});

