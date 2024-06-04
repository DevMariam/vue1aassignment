# repoinitiate

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```




Repository Manager
Repository Manager is a Vue 3 application that allows users to fetch, create, edit, and delete GitHub repositories. This application is built using Vue.js, and it interacts with a backend service to manage the repository data.

Features
Fetch a list of all repositories
View details of a single repository
Create a new repository
Edit an existing repository
Delete a repository
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm are installed on your machine.
You have a GitHub account and a valid access token to interact with the GitHub API.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/repository-manager.git
cd repository-manager
Install the dependencies:

bash
Copy code
npm install
Usage
Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

Components
RepositoryList.vue
This component fetches and displays a list of all repositories. It includes a pagination component for navigating through multiple pages of repositories.

Template
html
Copy code
<template>
  <div>
    <div class="all-repo-container">
      <h2 class="text-center">All Repositories</h2>
      <div class="inner flex ai-center jc-center flex-col">
        <div
          v-for="repo in allRepos"
          :key="repo.id"
          class="flex single-repo jc-between ai-center sm-gap"
        >
          <div>
            <p class="repo-name">{{ repo.name }}</p>
            <div class="flex ai-center md-gap">
              <p class="repo-description">{{ repo.visibility }}</p>
              <p>Stars: {{ repo.stargazers_count }}</p>
              <p>Forks: {{ repo.forks_count }}</p>
            </div>
            <a :href="repo.html_url" target="_blank">View on GitHub</a>
          </div>
          <button class="view-repo" @click="handleClick(repo.id)">View Repo</button>
        </div>
      </div>
      <ThePagination
        :setAllRepos="setAllRepos"
        :setLoading="setLoading"
        :allRepos="allRepos"
      />
    </div>
  </div>
</template>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { allRepositories } from './services/index.js'; // Adjust the path as needed
import ThePagination from './ThePagination.vue';

export default {
  name: 'RepositoryList',
  components: {
    ThePagination,
  },
  setup() {
    const allRepos = ref([]);
    const loading = ref(true);
    const router = useRouter();

    const getAllRepositories = async () => {
      try {
        const response = await allRepositories();
        allRepos.value = response.data;
        loading.value = false;
      } catch (error) {
        console.error('Error fetching repositories:', error);
        loading.value = false;
      }
    };

    onMounted(() => {
      getAllRepositories();
    });

    const handleClick = (id) => {
      router.push(`/single/${id}`);
    };

    return {
      allRepos,
      loading,
      handleClick,
      setAllRepos: (repos) => (allRepos.value = repos),
      setLoading: (isLoading) => (loading.value = isLoading),
    };
  },
};
ThePagination.vue
This component provides pagination functionality for navigating through pages of repositories.

Template
html
Copy code
<template>
  <div class="pagination-container">
    <button @click="handlePrevPage" :disabled="page === 1">Previous</button>
    <span>Page {{ page }}</span>
    <button @click="handleNextPage">Next</button>
  </div>
</template>
Script
javascript
Copy code
import { ref, watch } from 'vue';
import { allRepositories } from './services/index.js'; // Adjust the path as needed

export default {
  name: 'ThePagination',
  props: {
    setAllRepos: Function,
    setLoading: Function,
    allRepos: Array,
  },
  setup(props) {
    const page = ref(1);

    watch(page, async (newPage) => {
      try {
        props.setLoading(true);
        const response = await allRepositories(newPage);
        props.setAllRepos(response.data);
        props.setLoading(false);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        props.setLoading(false);
      }
    });

    const handleNextPage = () => {
      page.value += 1;
    };

    const handlePrevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
      }
    };

    return {
      page,
      handleNextPage,
      handlePrevPage,
    };
  },
};
Services
index.js
This file contains the functions for interacting with the backend API.

javascript
Copy code
import axios from 'axios';

const API_URL = 'https://api.github.com';

export const allRepositories = async (page = 1) => {
  const response = await axios.get(`${API_URL}/user/repos`, {
    params: {
      page,
      per_page: 10,
    },
    headers: {
      Authorization: `token YOUR_GITHUB_TOKEN`,
    },
  });
  return response;
};

// Add other service functions for creating, editing, and deleting repositories
Contributing
To contribute to this project, follow these steps:

Fork this repository.
Create a branch: git checkout -b <branch_name>.
Make your changes and commit them: git commit -m '<commit_message>'.
Push to the original branch: git push origin <project_name>/<location>.
Create the pull request.
Alternatively, see the GitHub documentation on creating a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
If you want to contact me you can reach me at [your-email@example.com].
