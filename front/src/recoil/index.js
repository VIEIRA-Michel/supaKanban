import { atom } from 'recoil';

export const todosState = atom({
    key: 'todosState',
    default: [],
});

export const currentKanban = atom({
    key: 'currentKanban',
    default: [],
})

export const currentWk = atom({
    key: 'currentWk',
    default: [],
});

export const showInput = atom({
    key: 'showInput',
    default: false,
});

export const userState = atom({
    key: 'userState',
    default: null,
})
