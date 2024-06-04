<template>
    <div class="not-found">
      <div class="not-found__container">
        <div class="not-found__image">
          <img src="@/assets/404-error.svg" alt="404 Not Found" />
        </div>
        <h1 class="not-found__title">Oops! Page Not Found</h1>
        <p class="not-found__message">
          The page you are looking for doesn't exist or has been moved.
        </p>
  
        <router-link to="/" class="not-found__link">
          <button class="not-found__button">Go to Home</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f8f8;
    font-family: 'Roboto', sans-serif;
  }
  
  .not-found__container {
    text-align: center;
    max-width: 600px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .not-found__image {
    margin-bottom: 2rem;
  }
  
  .not-found__image img {
    max-width: 200px;
  }
  
  .not-found__title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .not-found__message {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .not-found__button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .not-found__button:hover {
    background-color: #45a049;
  }
  </style>
  