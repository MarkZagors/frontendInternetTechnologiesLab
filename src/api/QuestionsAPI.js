export const fetchQuestions = async (maxAttempts = 10, attempt = 1) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/questions');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching data (attempt ${attempt}):`, error);

    if (attempt < maxAttempts) {
      console.log(`Retrying... (attempt ${attempt + 1})`);
      return fetchQuestions(maxAttempts, attempt + 1);
    } else {
      console.error('Max attempts reached, request failed');
      throw error;
    }
  }
};

export const addAttempt = async (username, score) => {
  try {
    const data = {
      "username": username,
      "score": score,
    };

    const response = await fetch('http://127.0.0.1:5000/add_attempt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
