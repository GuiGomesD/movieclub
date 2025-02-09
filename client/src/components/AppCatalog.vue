<template>
  <div class="catalog">
    <div class="movie-row">
      <div class="movie-card" v-for="(movie, index) in movies" :key="index">
        <div class="movie-image">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" class="image-movie" />
        </div>
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <h3 class="movie-rating">{{ movie.vote_average.toFixed(1) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Catalog",
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
          console.error('Error fetching movies:', error);
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

  .movie-card {
    display: flex;
    flex-direction: column;
    width: 220px;
    background-color: #111111;
    border-radius: 8px;
    color: white;
    font-family: "Gothic A1", sans-serif;
  }

  .movie-card:hover {
    opacity: 80%;
  }

  .movie-info {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
    padding: 10px 8px;
  }

  .image-movie {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
  }

  .movie-rating {
    background-color: #252525;
    padding: 3px;
    border-radius: 5px;
  }

  .movie-title:hover, .movie-rating:hover {
    color: rgb(163, 162, 162);
  }

  @media (max-width: 1215px) {
    .catalog {
      width: 100%;
    }
  }
</style>
