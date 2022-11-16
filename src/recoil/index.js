import { atom, selector } from 'recoil';

export const todosState = atom({
    key: 'todosState',
    default: [],
});

export const filterState = atom({
    key: 'filterState',
    default: 'all',
});

export const selectFilteredTodos = selector({
    key: 'selectFilteredTodos',
    get: ({ get }) => {
        const filter = get(filterState);
        const todos = get(todosState);
        switch (filter) {
            case 'done':
                return todos.filter((todo) => todo.done);
            case 'ongoing':
                return todos.filter((todo) => !todo.done);
            default:
                return todos;
        };
    },
});

export const selectTodosData = selector({
    key: "selectTodosData",
    get: ({ get }) => {
        const todos = get(todosState);
        const total = todos.length;
        const totalDone = todos.filter(t => t.done).length;
        const totalOngoing = todos.filter(t => !t.done).length;
        const totalDonePourcentage = Math.floor((totalDone / total) * 100);
        return {
            total,
            totalDone,
            totalOngoing,
            totalDonePourcentage,
        }
    },
})