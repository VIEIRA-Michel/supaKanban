import { atom } from 'recoil';

export const todosState = atom({
    key: 'todosState',
    default: [],
});

export const showInput = atom({
    key: 'showInput',
    default: false,
})