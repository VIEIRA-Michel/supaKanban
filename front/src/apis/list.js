const API_KANBAN = 'http://localhost:3001/api/kanban';

export async function createList({ title, id }) {
    const response = await fetch(`${API_KANBAN}/${id}/list/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, id })
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createList');
        }
    }
};

export async function removeList(kanbanId, id) {
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${id}`, {
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
            throw new Error('Error api removeList');
        }
    }
}

export async function modifyList(kanbanId, id, update) {
    const response = await fetch(`${API_KANBAN}/${kanbanId}/list/${id}`, {
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
            throw new Error('Error api modifyList');
        }
    }
};