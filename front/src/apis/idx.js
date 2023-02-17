const API_INDEX = 'http://localhost:3001/api/index';

export async function updateIndex(taskId, obj) {
    const response = await fetch(`${API_INDEX}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
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