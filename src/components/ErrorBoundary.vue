<template>
    <div class="error-boundary">
      <h1 class="error-boundary__title">Something went wrong!</h1>
      <p class="error-boundary__message">{{ errorMessage }}</p>
      <button @click="reload" class="error-boundary__reload-btn">Reload</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorBoundary',
    data() {
      return {
        errorMessage: null
      }
    },
    errorCaptured(err) {
      this.error = err
      return false // Returning false will prevent the error from propagating further
    },
    methods: {
      reload() {
        window.location.reload()
      }
    }
  }
  </script>
  
  <style scoped>
  .error-boundary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f8f8;
    font-family: Arial, sans-serif;
  }
  
  .error-boundary__title {
    font-size: 2rem;
    color: #ff6347;
    margin-bottom: 1rem;
  }
  
  .error-boundary__message {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 2rem;
  }
  
  .error-boundary__reload-btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .error-boundary__reload-btn:hover {
    background-color: #45a049;
  }
  </style>
  