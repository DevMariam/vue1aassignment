import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';
console.log(import.meta.env);
// Read the token from the .env file
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create an instance of axios with the token included in the headers
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});


export const getAllRepositories = async (page = 1, searchQuery = '', perPage = 5) => {
  try {
    const response = await axiosInstance.get(`${GITHUB_API_BASE_URL}/users/DevMariam/repos`, {
      params: {
        page,
        per_page: perPage,
        q: searchQuery,
      },
    });

    const linkHeader = response.headers.link;
    const hasNextPage = linkHeader && linkHeader.includes('rel="next"');

    return {
      data: response.data,
      hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getSingleRepository = async (username, repoName) => {
  try {
    const response = await axiosInstance.get(`${GITHUB_API_BASE_URL}/repos/DevMariam/${repoName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createRepository = async (name, description) => {
  try {
    const response = await axiosInstance.post(`${GITHUB_API_BASE_URL}/user/repos`, {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating repository:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateRepository = async (username, repoName, updatedFields) => {
    try {
      const response = await axiosInstance.patch(
        `${GITHUB_API_BASE_URL}/repos/DevMariam/${repoName}`,
        updatedFields
      );
      return response.data;
    } catch (error) {
      console.error('Error updating repository:', error);
      throw error;
    }
  };

export const deleteRepository = async (username, repoName) => {
  try {
    const response = await axiosInstance.delete(`${GITHUB_API_BASE_URL}/repos/DevMariam/${repoName}`);
    return response.status;
  } catch (error) {
    console.error('Error deleting repository:', error.response ? error.response.data : error.message);
    throw error;
  }
};