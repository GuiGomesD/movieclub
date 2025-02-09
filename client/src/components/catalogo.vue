<template>
  <div class="catalogo">
    <div class="linha-filmes">
      <div class="filme-card" v-for="(filme, index) in filmes" :key="index">
        <div class="image-filme"><img :src="`https://image.tmdb.org/t/p/w500/${filme.poster_path}`" :alt="filme.title" class="imagem-filme" /></div>
        <div class="filme-info">
          <h3 class="titulo-filme">{{ filme.title }}</h3>
          <h3 class="rate-filme">{{ filme.vote_average.toFixed(1) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    name: "Catalogo",
    data() {
      return {
        filmes: [],
      };
    },
    created() {
      this.buscarFilmes();
    },
    methods: {
      async buscarFilmes() {
        const apiKey = '348aa5fbb58b540a2619bafec8e8e1d5';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  
        try {
          const response = await axios.get(url);
          this.filmes = response.data.results;
        } catch (error) {
          console.error('Erro ao buscar filmes:', error);
        }
      },
    },
  };
</script>
  
<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500&display=swap");

  .catalogo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1200px;
    margin: 50px auto;
  }
  
  .linha-filmes {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .filme-card {
    display: flex;
    flex-direction: column;
    width: 220px;
    background-color: #111111;
    border-radius: 8px;
    color: white;
    font-family: "Gothic A1", sans-serif;
  }

  .filme-card:hover {
    opacity: 80%;
  }

  .filme-info {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
    padding: 10px 8px;
  }
  
  .imagem-filme {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
  }

  .rate-filme {
    background-color: #252525;
    padding: 3px;
    border-radius: 5px;
  }
  
  .titulo-filme:hover, .rate-filme:hover {
    color: rgb(163, 162, 162);
  }

  @media (max-width: 1215px) {
  .catalogo {
    width: 100%;
  }
}

</style>
  