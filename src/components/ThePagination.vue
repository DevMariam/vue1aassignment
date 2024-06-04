<template>
    <div class="md-gap flex ai-center jc-center">
      <div :class="{ faint: page === 1, 'flex ai-center': true }">
        <MdArrowLeft color="#8a8aef" size="23" />
        <button
          @click="handlePrevPage"
          :disabled="page === 1"
          :class="{ faint: page === 1 }"
        >
          Previous Page
        </button>
      </div>
      <div class="flex ai-center">
        <button @click="handleNextPage">Next Page</button>
        <MdArrowRight color="#8a8aef" size="23" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import { allRepositories } from './services/index.js'; // Adjust the path as needed
  import MdArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
  import MdArrowRight from 'vue-material-design-icons/ArrowRight.vue';
  
  export default {
    name: 'ThePagination',
    props: {
      setAllRepos: {
        type: Function,
        required: true
      },
      setLoading: {
        type: Function,
        required: true
      },
      allRepos: {
        type: Array,
        required: true
      }
    },
    components: {
      MdArrowLeft,
      MdArrowRight
    },
    setup(props) {
      const page = ref(1);
      const totalRepositories = ref(0);
  
      const getAllRepositories = async () => {
        try {
          props.setLoading(true);
          const response = await allRepositories(page.value);
          props.setAllRepos(response.data);
          const calculatedTotalPages = Math.ceil(response.data.length / 10);
          totalRepositories.value = calculatedTotalPages;
        } catch (error) {
          console.error('Error fetching repositories:', error);
        } finally {
          props.setLoading(false);
        }
      };
  
      watch(page, () => {
        getAllRepositories();
      });
  
      onMounted(() => {
        getAllRepositories();
      });
  
      const handleNextPage = () => {
        page.value++;
      };
  
      const handlePrevPage = () => {
        page.value--;
      };
  
      return {
        page,
        totalRepositories,
        handleNextPage,
        handlePrevPage
      };
    }
  };
  </script>
  
  <style scoped>
  @import 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap';
  
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
  }
  
  .faint {
    opacity: 0.5;
  }
  
  .flex {
    display: flex;
  }
  
  .ai-center {
    align-items: center;
  }
  
  .jc-center {
    justify-content: center;
  }
  
  .md-gap {
    gap: 10px;
  }
  </style>
  