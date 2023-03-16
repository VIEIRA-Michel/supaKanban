const API_USERS = 'http://localhost:3001/api/users';

export async function createUser(newUser) {
    const response = await fetch(`${API_USERS}/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createUser');
        }
    }
}

export async function changePassword(pwd) {
    const response = await fetch(`${API_USERS}/changePassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(pwd)
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api changePassword');
        }
    }
};