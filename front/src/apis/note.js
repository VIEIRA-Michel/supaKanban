const API_NOTE = 'http://localhost:3001/api/note';

export async function createNote(title) {
    const response = await fetch(`${API_NOTE}/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(title)
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

export async function getAllNotes() {
    const response = await fetch(`${API_NOTE}/`, {
        method: 'GET',
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
            throw new Error('Error api getAllKanbans');
        }
    }
};

export async function getNote(noteId) {
    const response = await fetch(`${API_NOTE}/${noteId}`, {
        method: 'GET',
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
            throw new Error('Error api getKanban');
        }
    }
}

export async function deleteNote(noteId) {
    const response = await fetch(`${API_NOTE}/${noteId}`, {
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

export async function updateNote(noteId, update) {
    const response = await fetch(`${API_NOTE}/${noteId}`, {
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