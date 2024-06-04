<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="repo-detail">
    <div class="repo-header">
      <h2>{{ repository.name }}</h2>
      <a :href="repository.html_url" target="_blank" rel="noopener noreferrer" class="primary">Go to GitHub</a>
    </div>
    <p class="repo-description">{{ repository.description }}</p>
    <div class="repo-stats">
      <div class="stat">
        <span class="stat-count">{{ repository.stargazers_count }}</span>
        <span class="stat-label">Stars</span>
      </div>
      <div class="stat">
        <span class="stat-count">{{ repository.forks_count }}</span>
        <span class="stat-label">Forks</span>
      </div>
      <div class="stat">
        <span class="stat-count">{{ repository.open_issues_count }}</span>
        <span class="stat-label">Open Issues</span>
      </div>
      <div class="stat">
        <span class="stat-count">{{ repository.language }}</span>
        <span class="stat-label">Language</span>
      </div>
    </div>
    <div class="repo-actions">
      <button @click="showEditModal = true" class="primary">Edit Repository</button>
      <button @click="showDeleteModal = true" class="danger">Delete Repository</button>
      <EditRepositoryModal
        v-if="showEditModal"
        :repository="repository"
        @close="showEditModal = false"
        @updated="fetchRepository"
      />
      <DeleteRepositoryModal
        v-if="showDeleteModal"
        :repository="repository"
        @close="showDeleteModal = false"
        @deleted="goToRepositories"
      />
    </div>
  </div>
</template>

<script>
import { getSingleRepository } from './services/index.js';
import EditRepositoryModal from './EditRepositoryModal.vue';
import DeleteRepositoryModal from './DeleteRepositoryModal.vue';

export default {
  name: 'RepositoryDetail',
  components: {
    EditRepositoryModal,
    DeleteRepositoryModal,
  },
  data() {
    return {
      repository: {},
      loading: true,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  async created() {
    await this.fetchRepository();
  },
  methods: {
    async fetchRepository() {
      this.loading = true;
      try {
        const { username, repoName } = this.$route.params;
        console.log('Fetching repository for:', username, repoName);
        const response = await getSingleRepository(username, repoName);
        this.repository = response;
      } catch (error) {
        console.error('Error fetching repository:', error);
      } finally {
        this.loading = false;
      }
    },
    goToRepositories() {
      this.$router.push({ name: 'RepositoriesList' });
    }
  },
};
</script>

<style scoped>
.repo-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.repo-description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.repo-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-count {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.stat-label {
  font-size: 14px;
  color: #777777;
}

.repo-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.repo-actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.primary {
  background-color: #007bff;
  color: white;
}

button.primary:hover {
  background-color: #0056b3;
}

button.danger {
  background-color: #dc3545;
  color: white;
}

button.danger:hover {
  background-color: #c82333;
}
</style>
