export const loginUser = async (username, password) => {
  try {
    const data = {
      "username": username,
      "password": password,
    };

    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const data = {
      "username": username,
      "password": password,
    };

    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUser = async (username) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/user/${username}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};