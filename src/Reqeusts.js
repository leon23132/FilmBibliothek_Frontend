

export async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        // Handle the error appropriately, e.g., show a user-friendly message
    }
    return null;
};

export async function postData(url, data) {
    try {
        let response;
        if (data) {
            response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
        }
        else {
            response = await fetch(url,
                {
                    method: 'POST'
                }
            );
        }
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        console.log('POST request successful:', result);
        return result;
    } catch (error) {
        console.error('Error during POST request:', error);
    }
    return null;
}

export async function putData(url, data) {
    console.log("data", data);
    console.log(JSON.stringify(data));
    try {
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        console.log('PUT request successful:', result);
        return result;
    } catch (error) {
        console.error('Error during PUT request:', error);
    }
    return null;
}

export async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        console.log('DELETE request successful:', result);
        return result;
    } catch (error) {
        console.error('Error during DELETE request:', error);
    }
    return null;
}
