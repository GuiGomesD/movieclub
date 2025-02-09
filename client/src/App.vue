<template>
  <div id="app">
    <Cabecalho />
    <banner />
    <router-view />
    <catalogo />
    <rodape />
  </div>
</template>

<script>
  import Cabecalho from './components/Cabecalho.vue';
  import banner from './components/banner.vue';
  import catalogo from './components/catalogo.vue';
  import rodape from './components/rodape.vue'

  export default {
    components: {
      Cabecalho,
      banner,
      catalogo,
      rodape
    }
  };;
</script>

<style>

  * {
    margin: 0px;
    padding: 0px;
  }

  body {
    background-color: #020203;
  }
</style>
