<template>
  <div id="app">
    <router-view />
    <Catalog :searchQuery="searchQuery" />
  </div>
</template>

<script>

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
