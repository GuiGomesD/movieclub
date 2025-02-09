<template>
    <div class="hero-container" :style="heroStyle">
      <transition name="fade">
        <div v-if="banners.length" class="hero-content">
        </div>
      </transition>
    </div>
</template>

<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        banners: [],
        currentIndex: 0
      };
    },
    computed: {
      currentBanner() {
        return this.banners[this.currentIndex] || {};
      },
      heroStyle() {
        return {
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${this.currentBanner.backdrop_path}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "70vh"
        };
      }
    },
    async created() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
  
      try {
        const response = await axios.get(url);
        this.banners = response.data.results;
        this.startBannerRotation();
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    },
    methods: {
      startBannerRotation() {
        setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.banners.length;
        }, 10000);
      }
    }
  };
</script>
  
<style>
  .hero-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: background-image 1.5s ease-in-out;
    opacity: 40%;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s ease-in-out;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
  