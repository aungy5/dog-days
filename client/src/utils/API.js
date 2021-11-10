// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save dog data for a logged in user
  export const saveDog = (dogData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dogData),
    });
  };
  
  // remove saved dog data for a logged in user
  export const deleteDog = (dogId, token) => {
    return fetch(`/api/users/dogs/${dogId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

export const searchAPI = (query) => {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${query}`, {
    method: "GET",
    headers: {"x-api-key":"5881783a-3c1c-4a92-951e-f1166c1b84dc"}
    });
}



//https://api.TheDogAPI.com/v1/images/search?breed_id=149