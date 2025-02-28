<template>
  <div v-if="movie" class="movie-container">
    <div
      class="movie-background"
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }"
    ></div>

    <div class="movie-content">
      <button class="back-button" @click="router.back()">← Back</button>

      <div class="movie-info">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt="Movie Poster"
          class="movie-poster"
        />

        <div class="movie-details">
          <h1 class="movie-title">{{ movie.title }}</h1>
          <p class="movie-tagline">{{ movie.tagline }}</p>

          <div class="movie-metadata">
            <p><strong>Genres:</strong> {{ movie.genres.map(g => g.name).join(", ") }}</p>
            <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
            <p><strong>Rating:</strong> <span class="movie-rating">{{ movie.vote_average.toFixed(1) }}/10</span></p>
            <p><strong>Duration:</strong> {{ movie.runtime }} min</p>
          </div>

          <p class="movie-overview"><strong>Overview:</strong> {{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const movie = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
  );
  movie.value = await response.json();
});
</script>

<style scoped>
.movie-container {
  position: relative;
  height: auto;
  min-height: 50vh;
  color: #F1F1F1;
  background-color: #1a1a1a;
  overflow: hidden;
  margin-bottom: 20px;
  top: 50px;
}

.movie-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: blur(8px) brightness(50%);
  z-index: 1;
}

.movie-content {
  position: relative;
  z-index: 2;
  max-width: 1220px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.back-button {
  width: 100px;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.329);
  border: none;
  border-radius: 8px;
  color: #F1F1F1;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.719)
}

.movie-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.329);
  padding: 10px;
}

@media (min-width: 768px) {
  .movie-info {
    flex-direction: row;
    align-items: flex-start;
  }
}

.movie-poster {
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.movie-details {
  max-width: 600px;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.movie-tagline {
  font-size: 1.25rem;
  color: #ccc;
  font-style: italic;
  margin-bottom: 20px;
}

.movie-metadata {
  margin-bottom: 20px;
}

.movie-metadata p {
  margin: 5px 0;
}

.movie-rating {
  color: #fbbf24;
}

.movie-overview {
  color: #ccc;
  text-align: justify;
}

.movie-overview strong {
  color:#F1F1F1;
}
</style>
