const API_KANBAN = '/api/kanban';

export async function createTask(kanbanId, listId, { content }) {
    console.log(kanbanId, listId, content)
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${listId}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: listId, content })
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createTask');
        }
    }
};