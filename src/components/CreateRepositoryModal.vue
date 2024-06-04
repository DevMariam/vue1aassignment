<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <div class="modal-header">
          <h2>Create New Repository</h2>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createRepository">
            <div class="form-group">
              <label for="repo-name">Repository Name</label>
              <input type="text" id="repo-name" v-model="repoName" required />
            </div>
            <div class="form-group">
              <label for="repo-description">Description</label>
              <textarea id="repo-description" v-model="repoDescription"></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="create-button">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { createRepository } from './services/index.js';
  
  export default {
    name: 'CreateRepositoryModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        repoName: '',
        repoDescription: '',
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      async createRepository() {
        try {
          await createRepository(this.repoName, this.repoDescription);
          this.$emit('created');
          this.closeModal();
        } catch (error) {
          console.error('Error creating repository:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .create-button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .create-button:hover {
    background-color: #0056b3;
  }
  </style>