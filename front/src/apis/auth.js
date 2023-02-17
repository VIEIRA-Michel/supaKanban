const API_AUTH = 'http://localhost:3001/api/auth';

export async function signIn(credentials) {
    const response = await fetch(`${API_AUTH}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
    });
}