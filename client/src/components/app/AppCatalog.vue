<template>
  <div class="catalog">
    <div class="movie-row">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
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
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const response = await axios.get(url);
        this.movies = response.data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500&display=swap");

.catalog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 1200px;
  margin: 50px auto;
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 1215px) {
  .catalog {
    width: 100%;
  }
}
</style>
