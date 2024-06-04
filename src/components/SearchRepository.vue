<!-- SearchRepository.vue -->
<template>
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search repositories..."
        @input="handleSearch"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchRepository',
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      handleSearch() {
        this.$emit('search', this.searchQuery);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>