const API_KANBAN = '/api/kanban';

export async function createList({ title, id }) {
    const response = await fetch(`${API_KANBAN}/${id}/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, id })
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createKanban');
        }
    }
};