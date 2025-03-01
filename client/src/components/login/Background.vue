<template>
  <div class="Background">
    <div class="header">
      <router-link :to="`/`" id="logo">
        <div class="logo"><h1>MovieClub</h1></div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .Background {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.589) 10%, rgba(0, 0, 0, 0.589)), url('https://wallpapercave.com/wp/wp1945909.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .Background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .header {
    display: flex;
    justify-content: flex-start;
    padding: 20px 12%;
    position: relative;
    z-index: 2;
  }

  .logo {
    z-index: 3;
  }

  .logo h1 {
    color: #01eaa8;
    font-size: 28px;
    font-family: "Gothic A1", sans-serif;
  }

  @media(max-width: 600px) {
    .Background {
      background-image: none;
    }
  }

  @media(max-width: 1280px) {
    .header {
      padding: 20px 24px;
    }

    .logo h1 {
      font-size: 25px;
    }
  }
</style>
