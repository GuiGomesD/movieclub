<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

  <div v-if="loading" class="loading-container">
    <i class="fas fa-spinner fa-spin loading-icon"></i>
    <span>Loading movies...</span>
  </div>

  <div v-else class="catalog">
    <div class="filters" v-if="!searchQuery">
      <select v-model="selectedGenre" @change="fetchMovies">
        <option value="">All Genres</option>
        <option v-for="(name, id) in genresMap" :key="id" :value="id">{{ name }}</option>
      </select>

      <select v-model="selectedRating" @change="fetchMovies">
        <option value="">All Ratings</option>
        <option value="asc">Rating: Low to High</option>
        <option value="desc">Rating: High to Low</option>
      </select>
    </div>

    <div v-if="movies.length === 0" class="no-movies">No movies found.</div>

    <div v-else class="movie-row">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button class="nav-button" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i>
      </button>

      <button v-for="page in visiblePages" :key="page" class="page-button" @click="goToPage(page)" :class="{ active: currentPage === page }">
        {{ page }}
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
  name: "AppCatalog",
  components: {
    MovieCard,
  },
  props: {
    searchQuery: String,
    genre: String,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      selectedGenre: '',
      selectedRating: '',
      genresMap: {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        18: "Drama",
        14: "Fantasy",
        27: "Horror",
        37: "Western",
        53: "Thriller",
        878: "Sci-Fi",
        9648: "Mystery",
        10402: "Music",
        10749: "Romance",
        10751: "Family",
      },
    };
  },
  computed: {
    visiblePages() {
      const maxVisible = 4;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      return this.totalPages > 1 ? Array.from({ length: end - start + 1 }, (_, i) => start + i) : [1];
    },
  },
  watch: {
    searchQuery: "fetchMovies",
    selectedGenre: "fetchMovies",
    selectedRating: "fetchMovies",
    genre: {
      immediate: true,
      handler(newGenre) {
        this.selectedGenre = newGenre || "";
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
      let endpointType = 'discover';
      if (this.searchQuery) {
        endpointType = 'search';
      }

      let url = `https://api.themoviedb.org/3/${endpointType}/movie?api_key=${apiKey}&language=en-US`;
      
      if (this.searchQuery) {
        url += `&query=${encodeURIComponent(this.searchQuery)}`;
      }

      url += `&page=${this.currentPage}`;

      // selectedGenre : number | string
      if (this.selectedGenre && this.selectedGenre !== "") {
        let genreId = Number(this.selectedGenre);

        // If NaN, find id
        if (isNaN(genreId)) {
          genreId = Object.keys(this.genresMap).find(
            key => this.genresMap[key].toLowerCase() === this.selectedGenre.toLowerCase()
          );
        }

        if (genreId) {
          url += `&with_genres=${genreId}`;
        }
      }
      if (this.selectedRating === 'asc') {
        url += `&sort_by=vote_average.asc`;
      }
      if (this.selectedRating === 'desc') {
        url += `&sort_by=vote_average.desc`;
      }

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
  align-items: flex-start;
  width: 1200px;
  margin: 50px auto 10px auto;
  padding-left: 20px;
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
  margin: 150px 0px;
}

.loading-icon {
  font-size: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.nav-button, .page-button {
  background: none;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
}

.page-button.active {
  background-color: #01eaa8;
  color: #1a1a1a;
}
</style>
