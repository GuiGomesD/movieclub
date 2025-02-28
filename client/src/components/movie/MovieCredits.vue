<template>
  <div v-if="movie" class="movie-details">
    <div v-if="trailerKey" class="trailer-container">
      <iframe
        :src="'https://www.youtube.com/embed/' + trailerKey"
        frameborder="0"
        allowfullscreen
        class="trailer-video"
      ></iframe>
    </div>

    <div class="movie-info">
      <div v-if="credits" class="credits-section">
        <h2>Directors</h2>
        <p class="credits-list">
          {{ credits.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ') }}
        </p>
      </div>

      <div v-if="credits" class="credits-section">
        <h2>Producers</h2>
        <p class="credits-list">
          {{ credits.crew.filter(member => member.job === 'Producer').map(producer => producer.name).join(', ') }}
        </p>
      </div>

      <div v-if="credits" class="credits-section">
        <h2>Cast</h2>
        <p class="credits-list">
          {{ credits.cast.slice(0, 10).map(actor => `${actor.name} as ${actor.character}`).join(', ') }}
        </p>
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
const trailerKey = ref(null);
const credits = ref(null);

onMounted(async () => {
  const id = route.params.id;
  
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
  );
  movie.value = await movieResponse.json();

  const videoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
  );
  const videos = await videoResponse.json();
  const trailer = videos.results.find(video => video.type === 'Trailer');
  trailerKey.value = trailer ? trailer.key : null;

  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_APP_API_KEY}`
  );
  credits.value = await creditsResponse.json();
});
</script>


<style scoped>

.movie-details {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  align-items: center;
}

.trailer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    text-align: center;
    width: 100%;
}

.trailer-video {
    margin-top: 50px;
    width: 100%;
    height: 600px;
    max-width: 1175px;
    min-height: 300px;
    border-radius: 8px;
    object-fit: cover;
}
.movie-info {
  max-width: 1175px;
}

.movie-info p{
    text-align: justify;
}

h1 {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 20px;
  color: #01EAA8;
}

.credits-section {
  margin-bottom: 30px;
}

.credits-section h2 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
  color: #01EAA8;
}

.credits-list {
  font-size: 1em;
  line-height: 1.6;
  color: #ccc;
}

@media (max-width: 768px) {
  .movie-details {
    flex-direction: column;
    padding: 20px;
  }

  .trailer-container,
  .movie-info {
    max-width: 100%;
  }

  .trailer-video {
    height: 200px;
  }

  h1 {
    font-size: 2em;
  }
}
</style>
