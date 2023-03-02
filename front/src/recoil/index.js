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
});

export const noteState = atom({
    key: 'noteState',
    default: [],
});

export const currentNote = atom({
    key: 'currentNote',
    default: null,
});

export const currentNoteTitle = atom({
    key: 'currentNoteTitle',
    default: null,
});

export const currentNoteContent = atom({
    key: 'currentNoteContent',
    default: null,
});