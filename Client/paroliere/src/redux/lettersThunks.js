export const fetchLetters = (letterType) => async (dispatch) => {
  const apiUrl = 'http://localhost:3000/playGame';
  
  try {
    console.log('Sending request with type:', letterType); // Debug
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ type: letterType }),
      credentials: 'include' // Se usi cookies
    });

    // Debug della risposta grezza
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
    }

    if (!responseData.status || responseData.status !== 'success') {
      throw new Error(responseData.error || 'Unknown server error');
    }

    console.log('Received valid data:', responseData.data); // Debug
    dispatch(add(responseData.data));
    
  } catch (error) {
    console.error("Fetch error details:", {
      error: error.message,
      url: apiUrl,
      type: letterType,
      timestamp: new Date().toISOString()
    });
    
    // Dispatch un'azione di errore se necessario
    dispatch({
      type: 'LETTERS_FETCH_ERROR',
      payload: error.message
    });
  }
};