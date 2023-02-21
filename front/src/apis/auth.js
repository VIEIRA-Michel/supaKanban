const API_AUTH = 'http://localhost:3001/api/auth';

export async function signIn(credentials) {
    const response = await fetch(`${API_AUTH}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    });
    const body = await response.json();
    console.log(body);
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Oops une erreur est survenue')
        }
    }
}

export async function signOut() {
    await fetch(`${API_AUTH}/signout`, {
        method: 'DELETE',
        credentials: 'include'
    });
}

export async function checkIsAuth() {
    const response = await fetch(`${API_AUTH}/current`, {
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
            throw new Error('Error api checkIsAuth');
        }
    }
}