export const updateHighscore = async (username, score) => {
    try {
      const data = {
        "username": username,
        "highscore": score,
      };
  
      const response = await fetch('http://127.0.0.1:5000/update_highscore', {
        method: 'PUT',
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
  