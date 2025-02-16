<template>
  <div class="hero-container" :style="heroStyle">
    <transition name="fade">
      <div v-if="banners.length" class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ currentBanner.title }}</h1>
          <p class="hero-desc">{{ currentBanner.overview }}</p>
        </div>
        <div class="steps">
          <span v-for="(banner, index) in banners" :key="index" 
                :class="['step', { active: index === currentIndex }]"
                @click="goToBanner(index)"></span>
        </div>
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
      currentIndex: 0,
      intervalId: null
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
        height: "500px"
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
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
      }, 10000);
    },
    goToBanner(index) {
      this.currentIndex = index;
      clearInterval(this.intervalId);
      this.startBannerRotation();
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
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
  text-align: center;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  max-width: 60%;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero-desc {
  font-size: 1rem;
}

.steps {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.step {
  width: 12px;
  height: 12px;
  background-color: #b3b3b3;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.step.active {
  background-color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>