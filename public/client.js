document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chatForm');
  const responseContainer = document.getElementById('responseContainer');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const prompt = formData.get('prompt');

    if (!prompt) {
      alert('Please enter a prompt before submitting.');
      return;
    }

    const data = { prompt };

    try {
      const response = await sendToApi(data);
      displayResponse(response);
    } catch (error) {
      alert('An error occurred while processing your request.');
    }
  });

  async function sendToApi(data) {
    const apiUrl = 'http://localhost:3000/ask'; // Replace with your API endpoint

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      return responseData.response;
    } catch (e) {
      alert('An error occurred while processing your request.');
    }
  }

  function displayResponse(response) {
    responseContainer.textContent = response;
  }
});
