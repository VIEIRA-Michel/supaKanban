import { getKanban } from '../apis/kanban';

export async function kanbanLoader({ params }) {
    return getKanban(params.idKanban);
}