const API_KANBAN = 'http://localhost:3001/api/kanban';

export async function createTask(kanbanId, listId, { content }) {
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${listId}/task/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
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
        credentials: 'include',
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api deleteTask');
        }
    }
}

export async function modifyTask(kanbanId, listId, taskId, update) {
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${listId}/task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(update)
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api modifyTask');
        }
    }
};