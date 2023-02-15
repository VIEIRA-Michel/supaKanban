const API_AUTH = 'http://localhost:3000/api/auth';

export async function signIn(credentials) {
    const response = await fetch(API_AUTH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    });
    const body = await response.json();
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

export async function getCurrentUser() {
    const response = await fetch(`${API_AUTH}/current`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();

}

export async function signOut() {
    await fetch(API_AUTH, {
        method: 'DELETE',
        credentials: 'include'
    });
}