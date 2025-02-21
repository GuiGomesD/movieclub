<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

  <div v-if="loading" class="loading-container">
    <i class="fas fa-spinner fa-spin loading-icon"></i>
    <span>Loading movies...</span>
  </div>

  <div v-else class="catalog">
    <div class="filters">
      <select v-model="selectedGenre" @change="fetchMovies">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>

      <select v-model="selectedRating" @change="fetchMovies">
        <option value="">All Ratings</option>
        <option value="asc">Rating: Low to High</option>
        <option value="desc">Rating: High to Low</option>
      </select>
    </div>

    <div v-if="movies.length === 0" class="no-movies">
      No movies found.
    </div>

    <div v-else class="movie-row">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>

    <div class="pagination" v-if="totalPages > 1">
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
      moviesPerPage: 20,
      totalPages: 1,
      loading: false,
      genres: [],
      selectedGenre: '',
      selectedRating: '',
      allMovies: [],
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
    selectedGenre: {
      handler() {
        this.currentPage = 1;
        this.fetchMovies();
      },
    },
    selectedRating: {
      handler() {
        this.currentPage = 1;
        this.fetchMovies();
      },
    },
  },
  created() {
    this.fetchMovies();
    this.fetchGenres();
  },
  methods: {
    updateSearch(query) {
      this.searchQuery = query;
    },

    async fetchAllMovies() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      let allMovies = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        while (currentPage <= totalPages) {
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(this.searchQuery)}&page=${currentPage}`;
          const response = await axios.get(url);
          allMovies = allMovies.concat(response.data.results);
          totalPages = response.data.total_pages;
          currentPage++;
        }
      } catch (error) {
        console.error("Error fetching all movies:", error);
      }

      return allMovies;
    },

    async fetchMovies() {
      this.loading = true;
      const apiKey = import.meta.env.VITE_APP_API_KEY;

      try {
        if (this.searchQuery) {
          this.allMovies = await this.fetchAllMovies();
        } else {
          let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${this.currentPage}`;

          if (this.selectedGenre) {
            url += `&with_genres=${this.selectedGenre}`;
          }

          if (this.selectedRating === 'asc') {
            url += `&sort_by=vote_average.asc`;
          } else if (this.selectedRating === 'desc') {
            url += `&sort_by=vote_average.desc`;
          }

          const response = await axios.get(url);
          this.movies = response.data.results;
          this.totalPages = response.data.total_pages;
          return;
        }

        let filteredMovies = this.allMovies;

        if (this.selectedGenre) {
          filteredMovies = filteredMovies.filter(movie => movie.genre_ids && movie.genre_ids.includes(Number(this.selectedGenre)));
        }

        if (this.selectedRating === 'asc') {
          filteredMovies.sort((a, b) => a.vote_average - b.vote_average);
        } else if (this.selectedRating === 'desc') {
          filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
        }

        const startIndex = (this.currentPage - 1) * this.moviesPerPage;
        const endIndex = startIndex + this.moviesPerPage;
        this.movies = filteredMovies.slice(startIndex, endIndex);

        this.totalPages = Math.ceil(filteredMovies.length / this.moviesPerPage);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGenres() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

      try {
        const response = await axios.get(url);
        this.genres = response.data.genres;
      } catch (error) {
        console.error("Error fetching genres:", error);
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
  align-items: flex-start;
  width: 1200px;
  margin: 50px auto;
  padding-left: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #1a1a1a;
  color: #F1F1F1;
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}

.no-movies {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(163, 162, 162);
  font-size: 20px;
  margin: 140px 0px;
  width: 100%;
}

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
  width: 100%;
  justify-content: center;
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
    padding-left: 10px;
  }

  .filters {
    position: relative;
    left: 12px;
  }
}

@media (max-width: 600px) {
  .pagination {
    justify-content: center;
    gap: 2px;
    width: 100%;
  }
  .nav-button {
    padding: 7px 14px;
    font-size: 13px;
  }

  .page-button {
    padding: 7px 14px;
    font-size: 13px;
  }
}
</style>