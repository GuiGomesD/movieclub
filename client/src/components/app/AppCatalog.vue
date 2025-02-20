<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  
  <div v-if="loading" class="loading-container">
    <i class="fas fa-spinner fa-spin loading-icon"></i>
    <span>Loading movies...</span>
  </div>

  <div v-else-if="movies.length === 0" class="no-movies">
    No movies found.
  </div>

  <div v-else class="catalog">
    <div class="movie-row">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>

    <div class="pagination" v-if="movies.length > 0">
      <button class="nav-button" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i>
      </button>

      <button v-if="visiblePages[0] !== 1" class="page-button" @click="goToPage(1)" :class="{ active: currentPage === 1 }">
        1
      </button>

      <button v-for="page in visiblePages" :key="page" class="page-button" @click="goToPage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </button>

      <span v-if="visiblePages[visiblePages.length - 1] !== totalPages">...</span>
      <button v-if="visiblePages[visiblePages.length - 1] !== totalPages" class="page-button" @click="goToPage(totalPages)">
        {{ totalPages }}
      </button>

      <button class="nav-button" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "../struct/MovieCard.vue";

export default {
  name: "Catalog",
  components: {
    MovieCard,
  },
  props: {
    searchQuery: String,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      moviesPerPage: 40,
      totalPages: 1,
      loading: false,
    };
  },
  computed: {
    visiblePages() {
      const maxVisible = 4;
      let start = Math.max(2, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (start > 2) {
        start = Math.max(2, end - maxVisible + 1);
      }

      if (this.totalPages <= 1) {
        return [1];
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.fetchMovies();
      },
    },
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = this.searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(this.searchQuery)}&page=${this.currentPage}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${this.currentPage}`;

      try {
        const response = await axios.get(url);
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchMovies();
      }
    },
  },
};
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 50px auto;
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.no-movies {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(163, 162, 162);
  font-size: 20px;
  margin: 140px;
}

/* Estilos do loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  margin-top: 150px;
}

.loading-icon {
  font-size: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-button {
  background-color: #1a1a1a;
  color: #F1F1F1;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  font-size: 15px;
}

.nav-button:hover {
  background-color: #111111;
}

.page-button {
  background: none;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
}

.page-button:hover {
  background-color: #1a1a1a;
}

.page-button.active {
  background-color: #01eaa8;
  color: #1a1a1a;
}

.pagination span {
  color: white;
  align-self: center;
}

.nav-button:disabled {
  color: #dfdfdf;
  background-color: #1a1a1a;
  cursor: not-allowed;
}

@media (max-width: 1215px) {
  .catalog {
    width: 100%;
  }
}

@media (max-width:600px) {
  .pagination {
    justify-content: center;
    gap: 2px;
    width: 100%;
  }
  .nav-button {
    background-color: #1a1a1a;
    color: #F1F1F1;
    padding: 7px 14px;
    font-size: 13px;
  }

  .page-button {
    padding: 7px 14px;
    border-radius: 30px;
    font-size: 13px;
  }
}

</style>
