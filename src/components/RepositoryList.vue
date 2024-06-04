<template>
  <div class="repo-container">
    <h2>All Repositories</h2>
    <SearchRepository @search="handleSearch" />
    <button @click="showModal = true" class="create-repo-button">Create New Repository</button>
    <CreateRepositoryModal :isVisible="showModal" @close="showModal = false" @created="fetchRepositories" />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="repo-list">
        <div v-for="repo in repositories" :key="repo.id" class="repo-item">
          <h3>{{ repo.name }}</h3>
          <p>{{ repo.description }}</p>
          <p>Stars: {{ repo.stargazers_count }}</p>
          <p>Forks: {{ repo.forks_count }}</p>
          <button @click="viewRepository(repo.name)">View Repository</button>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="!hasNextPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllRepositories } from './services/index.js';
import SearchRepository from './SearchRepository.vue';
import CreateRepositoryModal from './CreateRepositoryModal.vue'; // Ensure the correct path

export default {
  name: 'RepositoryList',
  components: {
    SearchRepository,
    CreateRepositoryModal, // Register the component here
  },
  data() {
    return {
      repositories: [],
      currentPage: 1,
      hasNextPage: false,
      searchQuery: '',
      showModal: false, // Ensure this is defined
      loading: false, // Ensure this is defined
    };
  },
  async created() {
    await this.fetchRepositories();
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
      this.fetchRepositories();
    },
    async fetchRepositories() {
      this.loading = true;
      try {
        const { data, hasNextPage } = await getAllRepositories(
          this.currentPage,
          this.searchQuery
        );
        this.repositories = data;
        this.hasNextPage = hasNextPage;
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        this.loading = false;
      }
    },
    async nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
        await this.fetchRepositories();
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchRepositories();
      }
    },
    viewRepository(repoName) {
      const username = 'DevMariam'; // Replace with your actual GitHub username
      this.$router.push(`/repository/${username}/${repoName}`);
    },
  },
};
</script>

<style scoped>
.repo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.create-repo-button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.create-repo-button:hover {
  background-color: #218838;
}

.repo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.repo-item {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination button:disabled {
  background-color: #d0d0d0;
  cursor: not-allowed;
}

.pagination span {
  font-size: 18px;
  font-weight: bold;
}
</style>
