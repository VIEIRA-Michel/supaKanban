const API_KANBAN = '/api/kanban';

export async function createTask(kanbanId, listId, { content }) {
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

export async function deleteTask(kanbanId, listId, taskId) {
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${listId}/task/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api removeTask');
        }
    }
}