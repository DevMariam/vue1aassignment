<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Delete Repository</h3>
      <p>Are you sure you want to delete this repository? This action cannot be undone.</p>
      <div class="modal-actions">
        <button type="button" @click="$emit('close')" class="primary">Cancel</button>
        <button type="button" @click="deleteRepository" class="danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteRepository } from './services/index.js';

export default {
  name: 'DeleteRepositoryModal',
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteRepository() {
      try {
        const username = this.repository.owner.login;
        const repoName = this.repository.name;

        // Log the username and repoName to verify
        console.log('Deleting repository for:', username, repoName);

        await deleteRepository(username, repoName);

        // Show confirmation message
        alert(`You have successfully deleted the repository: ${repoName}`);
        
        this.$emit('deleted'); // Emit deleted event to trigger refetch of repositories
        this.$emit('close');
      } catch (error) {
        console.error('Error deleting repository:', error);
        alert(`Failed to delete repository: ${error.response?.data?.message || error.message || error}`);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #007bff;
  color: white;
}

button[type="button"]:hover {
  background-color: #0056b3;
}

button[type="button"]:last-child {
  background-color: #dc3545;
  color: white;
}

button[type="button"]:last-child:hover {
  background-color: #c82333;
}
</style>
