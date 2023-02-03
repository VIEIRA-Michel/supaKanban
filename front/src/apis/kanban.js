const API_KANBAN = '/api/kanban';

export async function createKanban(title) {
    const response = await fetch(API_KANBAN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
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


export async function getAllKanbans() {
    const response = await fetch(API_KANBAN, {
        method: 'GET',
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
            throw new Error('Error api getAllKanbans');
        }
    }
};

export async function updateKanban(id, update) {
    console.log(update);
    const response = await fetch(`${API_KANBAN}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api updateKanban');
        }
    }
};

export async function deleteKanban(id) {
    const response = await fetch(`${API_KANBAN}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api deleteKanban');
        }
    }
}
