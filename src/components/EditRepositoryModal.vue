<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Edit Repository</h3>
      <form @submit.prevent="updateRepository">
        <label>
          Name:
          <input v-model="editedRepository.name" type="text" required />
        </label>
        <label>
          Description:
          <textarea v-model="editedRepository.description"></textarea>
        </label>
        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="primary">Cancel</button>
          <button type="submit" class="primary">Save Changes</button>
        </div>
      </form>
      <div v-if="showSuccessMessage" class="success-message">Repository updated successfully!</div>
    </div>
  </div>
</template>

<script>
import { updateRepository } from './services/index.js';

export default {
  name: 'EditRepositoryModal',
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedRepository: { ...this.repository },
      showSuccessMessage: false,
    };
  },
  methods: {
    async updateRepository() {
      try {
        const username = this.repository.owner.login;
        const repoName = this.repository.name;
        const updatedFields = {
          name: this.editedRepository.name,
          description: this.editedRepository.description,
        };

        await updateRepository(username, repoName, updatedFields);
        this.$emit('updated');
        this.$emit('close');
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error updating repository:', error);
        alert(`Failed to update repository: ${error.response?.data?.message || error.message || error}`);
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
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

button[type="submit"] {
  background-color: #28a745;
}

button[type="submit"]:hover {
  background-color: #218838;
}



.success-message {
  color: green;
  margin-top: 10px;
}
</style>
