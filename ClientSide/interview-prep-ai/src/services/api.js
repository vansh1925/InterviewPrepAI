import { API_PATHS } from '../config/apiPaths';

class ApiService {
  static async signup(userData) {
    try {
      console.log('Attempting to connect to:', API_PATHS.AUTH.SIGNUP);
      const response = await fetch(API_PATHS.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.SIGNUP);
      }
      throw error;
    }
  }

  static async login(credentials) {
    try {
      console.log('Attempting to connect to:', API_PATHS.AUTH.LOGIN);
      const response = await fetch(API_PATHS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.LOGIN);
      }
      throw error;
    }
  }

  static async uploadAvatar(formData) {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.USER.UPLOAD_AVATAR);
      const response = await fetch(API_PATHS.USER.UPLOAD_AVATAR, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload avatar error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.USER.UPLOAD_AVATAR);
      }
      throw error;
    }
  }

  static async getProfile() {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.AUTH.PROFILE);
      const response = await fetch(API_PATHS.AUTH.PROFILE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.PROFILE);
      }
      throw error;
    }
  }

  static async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.USER.UPDATE_PROFILE);
      const response = await fetch(API_PATHS.USER.UPDATE_PROFILE, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.USER.UPDATE_PROFILE);
      }
      throw error;
    }
  }

  static async getAllSessions() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_PATHS.SESSION.GET_ALL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json(); // Get the full response object

      console.log('Response status:', response.status);
      console.log('Response data:', responseData); // Log the full response object

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch sessions');
      }

      // Check if the response data object has a 'data' property that is an array
      if (!responseData || typeof responseData !== 'object' || !Array.isArray(responseData.data)) {
        console.error('API response for sessions is not in the expected format:', responseData);
        throw new Error('Invalid data format from server: Expected an object with a data array.');
      }

      // Return the array inside the 'data' property
      return responseData.data;
    } catch (error) {
      console.error('Get all sessions error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.SESSION.GET_ALL);
      }
      throw error;
    }
  }

  static async deleteSession(sessionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.SESSION.DELETE(sessionId);
      console.log('Attempting to connect to:', url);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const data = await response.json().catch(() => ({})); // Attempt to parse error body
        throw new Error(data.message || 'Failed to delete session');
      }

      return true;
    } catch (error) {
      console.error('Delete session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async getOneSession(sessionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.SESSION.GET_ONE(sessionId);
      console.log('Attempting to connect to:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json(); // Get the full response object
      console.log('Response status:', response.status);
      console.log('Response data:', responseData); // Log the full response object

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch session details');
      }

      // Check if the response data object has a 'data' property that is an object (and not an array)
      if (!responseData || typeof responseData !== 'object' || !responseData.data || typeof responseData.data !== 'object' || Array.isArray(responseData.data)) {
         console.error('API response for single session is not in the expected format:', responseData);
         throw new Error('Invalid data format from server: Expected an object with a single session object in the data property.');
      }

      // Return the single session object inside the 'data' property
      return responseData.data;
    } catch (error) {
      console.error('Get one session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async pinQuestion(questionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.QUESTION.PIN(questionId);
      console.log('Attempting to pin question:', url);
      const response = await fetch(url, {
        method: 'PUT', // Assuming PUT for toggling pin status
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Pin question response status:', response.status);
      console.log('Pin question response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to pin/unpin question');
      }

      // Assuming the backend returns the updated question or a success message
      return responseData;
    } catch (error) {
      console.error('Pin question error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async generateQuestions(sessionDetails, numberOfQuestions) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.AI.GENERATE_QUESTIONS;
      console.log('Attempting to generate questions:', url);
      
      // Log the data being sent
      const requestBody = { ...sessionDetails, numberOfQuestions };
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Generate questions response status:', response.status);
      console.log('Generate questions response data:', responseData);

      if (!response.ok) {
        const errorData = responseData || {};
        throw new Error(errorData.error || errorData.message || `Failed to generate questions: Server responded with status ${response.status}`);
      }

      if (!Array.isArray(responseData)) {
        console.error('API response for generating questions is not a direct array as expected:', responseData);
        throw new Error('Invalid data format from server: Expected a direct array of questions.');
      }

      return responseData;
    } catch (error) {
      console.error('Generate questions error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async createSession(sessionData) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.SESSION.CREATE;
      console.log('Attempting to create session:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(sessionData),
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Create session response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create session');
      }

      if (!responseData.success || !responseData.data) {
        throw new Error('Invalid response format from server');
      }

      return responseData.data;
    } catch (error) {
      console.error('Create session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async generateConceptExplanation(questionData) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.AI.GENERATE_EXPLANATION;
      console.log('Attempting to generate concept explanation:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(questionData),
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Generate explanation response status:', response.status);
      console.log('Generate explanation response data:', responseData);

      if (!response.ok) {
        const errorData = responseData || {};
        throw new Error(errorData.error || errorData.message || `Failed to generate explanation: Server responded with status ${response.status}`);
      }

      // Expecting an object with title and explanation properties
      if (!responseData || typeof responseData !== 'object' || !responseData.title || !responseData.explanation) {
         console.error('API response for concept explanation is not in the expected format:', responseData);
         throw new Error('Invalid data format from server: Expected an object with title and explanation properties.');
      }

      return responseData;

    } catch (error) {
      console.error('Generate concept explanation error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async addQuestionsToSession(sessionId, questions) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.QUESTION.ADD_TO_SESSION;
      console.log('Attempting to add questions to session:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ sessionId, questions }),
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Add questions to session response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add questions to session');
      }

      if (!responseData.success || !responseData.data) {
        throw new Error('Invalid response format from server');
      }

      return responseData.data;
    } catch (error) {
      console.error('Add questions to session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }
}

export default ApiService; 