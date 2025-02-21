<template>
  <div class="movie-card cursor-pointer">
    <div class="movie-image">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" class="image-movie min-h-[330px]" />
    </div>
    <div class="movie-info">
      <div>
        <h3 class="movie-title text-nowrap truncate whitespace-nowrap overflow-hidden pt1">{{ movie.title }}</h3>
      </div>
      <div class="flex justify-between">
        <p class="text-gray-500">{{ movieGenres[0] }}</p>
        <p class="movie-rating" :style="{ color: ratingColor }">{{ movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object,
    required: true
  },
  data() {
    return {
      genresMap: {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        18: "Drama",
        14: "Fantasy",
        27: "Horror",
        53: "Thriller",
        10749: "Romance",
        878: "Sci-Fi",
        10402: "Music",
        9648: "Mystery",
        37: "Western",
        10751: "Family",
        878: "Science Fiction",
      }
    };
  },
  computed: {
    movieGenres() {
      if (this.movie.genres) {
        return this.movie.genres.map(genre => genre.name);
      } else if (this.movie.genre_ids) {
        return this.movie.genre_ids.map(id => this.genresMap[id] || "Desconhecido");
      }
      return [];
    },
    ratingColor() {
      const vote = this.movie.vote_average;
      if (vote >= 8.0) return "#00f2d2";
      if (vote >= 7.0) return "#2cad32";
      if (vote >= 6.0) return "#ffa015";
      return "#D32F2F";
    }
  }
};
</script>

<style scoped>
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
  flex-direction: column;
  justify-content: space-center;
  font-size: 16px;
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

.movie-title:hover,
.movie-rating:hover {
  opacity: 70%;
}
</style>
