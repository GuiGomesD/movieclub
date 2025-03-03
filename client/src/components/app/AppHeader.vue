<template>
  <header class="header">
    <div class="wrap max-w-[1180px] mx-auto">
      <router-link :to="`/`" id="logo">
        <div id="logo">
          <a href="/">
            <h1 class="font-bold">MovieClub</h1>
          </a>
        </div>
      </router-link>
      <nav class="menu" :class="{ active: menuOpen }">
        <ul>
          <li><a href="/genre/action">Action</a></li>
          <li><a href="/genre/adventure">Adventure</a></li>
          <li><a href="/genre/animation">Animation</a></li>
          <li><a href="/genre/horror">Horror</a></li>
        </ul>
        <div class="search">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="emitSearch"
            placeholder="Search..."
            class="search-bar"
          />
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEUAAAD///+6urphYWFFRUX29vb8/Pzq6urc3NzExMR3d3ezs7PS0tK3t7e9vb3j4+PKysqFhYVvb2+NjY2goKCVlZWoqKju7u4uLi7W1tahoaFaWlp+fn7k5OQ9PT0aGhpSUlIyMjImJiZnZ2dISEgPDw8/Pz8gICAXFxc3NzeSkpJVVVULCwtI+nDWAAAJ8ElEQVR4nO1dW1fySgzFD1oKVC5VCgoignf9/7/voCwVFXYuk7ngOvuFp7azmZkkk2SSRsMnHu9W09WsucFisbr2+qmgeFiuR5ed8mLQzrKTL+STouyPq+Uq9viccNM9H7Z3ae1B1h6O13exR6pBazzMMbddtHvd2AMW4X4kYfeB4nIZe+A8LC8HcnafU9mMPXwK08u2mt4WWd2KTQJgVDjS22Iwik1kP1o9xd47gLyX3kQ2SzN6WwzT2pGVzfL8jmIWm9YnKlfpcpBjGvO4vvDE7w3lbWx6jaehR35vOH2MS7D2zG+D/Cwiv4qwqo0wWEbit+oE4feGXhSCXTsFT6MdXuJc+5YwP3EZmGAzzA7cRRHUG3AenN8GWRWM36u1DcpFqJV6G36FfqAMQrAbjd8GV0/+CY5jEtxsxqVvgqdxCW6w9kswtBbcB58+jmhC9Ds8muIWJ/mymExc33Hui+CVdkTZpFOP583F9Otdi/W4LjOtaeuJomoGJxeX3cN+s2l1Xqhm1AtFhbOiHC/pmMv1rFb8dx7EjVjIDLuv7JevxuJIgLmR+k/2/Yu59AOLWmgMGvvhRIeJrNadV+ei1ZqbHornEn5neu+YyHM+4e8CEi8Cfo6RzluBQCts2G1wzVZb2dj9a2u+0DFzULG3R23jvR2xZY6RzugxP1eYRcQe+1yKJp9knnhtXdNcT1fb4FtT3iYsbgy+tQvmNP5z/xJPtnmwE0c8is4HYpbTIvcSy1ywbPLswe0r95yPDBw/chAs/d9x+wZHUTh+AoElxp1scM5eqK3o7MMZYwCZw/sfGe/3HL/kWMQOpg0jQOg9uYejjtV6f5YAwUajokdxoX03LWaCpGcxKCqFDS1mDE4SNgNRGm+kwg0WXaczPlTyjhTUQ2sih0GKPJXGoCxuC7OeDdIZrZhEagrzKf0OO6yo/1sxidQBLVxQ/R2kQBVPIiW/gufwUCaqeNMQCZUDHyQwKAeV0MlHLYoA4fSfoA5yQt8icTILpOq/45KgKLJOp/hdV75IYBA7py95F7GtX3xxwGgSkyh5F9Y+oj/LEoRpI1AYhJyJdqHuBo9LIGtwTknoPMgdECY4W9ZgEyn3SYHAK2bI9tpi34i3VA8O8CSy7RC4SLOoF3iJGAPTEFlBo9ur85AGzqtjWiJQkubWERghbiFDpksKRn08Orh5wJEi3jugfyb6fTLsP2WdWqFNGtR1sR9Q1rCOrc/oDVEOFd8BbWbWDEDjL7KcecMSjY9lUSJdYZfB4gB4iGKc9G/Q8wksUmKZMtQ1NNni3+hsEMdExipDvoIEJOkG10idTejnUcDp1P/wOYBOJHqZoT8okfojUJ+ROv8JKNTYNukH4EYkhSF62iUlwBTIrCENZyRKo1vdH0CRKPJ4gURp1NP9LtAhkZT36HyfRg2HBpGKRiVooeOXYV61G2BWNuXJQBGeIKPnAGYyLfGzd0AdRopW7ANiSCjEB/BowMwECsgsIXz76IBvkI5rBSQtiNMFCkNG9iPuAp3SCUcGYhizisoPIHcgERlDRlvg7AsEpPIdGHq+RC0BOub/DYYonYkQ+YhhQkXiEEOissT/DBOBp1WazNECHy7+hqRx0BYoef1I9CFhXP4Bm4aw2p7AownZpcgTQfhaVuDRRPzBb0Bua+KGBLrUnIyrDcfHKJEPzpZJhNa2AARJtY3mP8jgOUB76YTKsEdRjyCj52ANBjmhqqkgObwMMHgWkElD7iX0cBIR4DcghU8WrUMJUcmoCxTJJ7U2ynRgxFeD4A7FnsgY5wNQNbmvO9tCwPghnbSFVkAitjeKAU/o5FDkikzEMkX+YEboAQnTCHeB9gBtJE5iG9KmJwv/46cBtyHjZjJMFhdX8PIBmBPFSaZAokZ9LdwSaICsZAr4FyXQhwrmQbOMEpjmnUB/FHghgbeN0BsSkKbwJgHvFTBXPLpbGMp6ppyANxmjW9/wugvz9APTjONemcHOQP4Kg2nGz14JkIByhi0loL6Ie4S6hnKGnZaGb6NGtWtgaqlADMJbM1EnEU6hwN2Jb/lFjF/g6nECcwRf7o+YSItvH0rehCs0RDsI47Ulytki6n7c+6KA0bIcFV4OYRpp/AIuZSE82RFFFaJcSyAqtwnHRCyIKCEMvK7E93mIRhYR1ikxIrEOo+rtBVeKhPBTqDCq4F7ga2z3RCksxT9OTWJg442oTaOyQqhJDLoVqf42qk1D1bsJadpQjQuU7iOyim8waUPWML3SlcejdGIwxU+uJvVQ6O5VQSosMArFnijrAsFY6zv8FPL+Dm6fN5UXkK7E7J8iv5Gd6sYLo5y357iwpFOfhiKu0LCFV88Ubw9+QLNQOR2NPV4tlfZa1Mwip6m4t6RFebtTBUVaKW7Q9nONXdOKULFQWf+ja4egfbjV9aRXUOS18DC/nMjpGWA0Elzc7BMTU804VfSx01NkVH1/h2En+2ennt/yhcoVaZlRlH8mbqTnTJEt1AYGS3Vq0M1VvlD5/TnLpRu/J2EbQiuKT4LehKXD/aglu1kXBfFC5RionxgoTdXKshmveBZhkscv5D1x8GYq7WFpTpHZQusTg3OBR7U1tmg1/APihSo3Mq56Fd1KtnFX1a7a4QDEFOWW/ma5FvUcZOBMR/XASbljiBeqhuI7in7dnS1uHrZc765XN63mqNfxNHU7EFNktZk7jCxrD66uBhN1s2o5xAtVKm7iQzyLXCs8HYgpzoy1ln+IKd47d7cPDfFefPWgnP1CftLgts9NBnKK83Di3gbyI/FC5weLB0WdMpuDajgovNbrI1MbihZcD4wenilBcyyvjmoac9XFu6PSG7qaEC0H33RwKN251fEoDnX69sjfdhwaeId3oC+ZcOaH48ULN/LFhEsO/pn9Wi23hWYsfahuKU5d2yNHf/nxYku161hk9t7MksvOd6s3GBqIufPNu5HBROadn4EPQ4oGVfUcvdd5Od9TfINOsOPCJmP0aayUDvmwOpBFaTaLdtWe1z2pcC1qdLfOiqLpna1Vty5YXqus3XkmY8dWC9WS4Tta1XPn4uB0Toqyns94+b1GFM0ZbvFws6zO6l6/3++U5XDz0zs9687uV4zI1BdsFqonhjYwoRibBIbFQo3NgYABxdgUKLgv1NgMSDhTjE2AhuNCTaPrGIbbLCZUg/UwnCgm0+4IwmWhJtH8j4aeYiqVH0moF2pCjWQIaCm+xB44H7qFmlCtZxqqWUykfyMTCopHNYUNDcUj2oVbSPeiIgocG7JZnCTT+k8AEcXo1QJVECzU45KjX2DHFxMo2qkEMzJ1vAR593hTKdOtBJ1kNzlOIfOFBRHtOkI9+AtzkEdQHMmhl8L4AMfiWJXEHnSHv/bj5N/RWaIYj816+DmV7c7+e1f/AXKzj1AX8h5lAAAAAElFTkSuQmCC" alt="search" @click="emitSearch"/>
        </div>
        <router-link :to="`/login`" id="login">
          <div id="login">
            <span>Login</span>
          </div>
        </router-link>
      </nav>
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      menuOpen: false,
    };
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.searchQuery);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    checkScreenSize() {
      if (window.innerWidth > 768) {
        this.menuOpen = false;
      }
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500&display=swap");

.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #020203;
  color: #f1f1f1;
  flex-wrap: wrap;
  width: 100%;
  z-index: 1000;
}

.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex: 1;
}

#logo h1 {
  color: #01eaa8;
  font-size: 23px;
  font-family: "Gothic A1", sans-serif;
}

.menu {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.menu a {
  color: rgb(238, 238, 238);
  text-decoration: none;
  font-weight: 400;
}

.menu a:hover {
  color: rgb(163, 162, 162);
}

.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
}

.search input {
  font-size: 16px;
  border: none;
  background: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  width: 100%;
}

.search input:focus {
  outline: none;
}

.search img {
  width: 15px;
  height: 15px;
}

.search img:hover {
  opacity: 70%;
}

#login span {
  cursor: pointer;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  cursor: pointer;
}

.hamburger span {
  background: #f1f1f1;
  height: 3px;
  width: 100%;
  border-radius: 5px;
}

.hamburger:hover {
  opacity: 70%;
}

.menu.active {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #020203;
  padding: 20px;
  border-radius: 8px;
  align-items: flex-start;
  gap: 20px;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.menu.active .search {
  order: -1;
}

.menu.active ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu.active .search {
  width: 100%;
}

.menu.active + .overlay {
  display: block;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.3s ease;
}

@media (max-width: 1030px) {
  .menu {
    display: none;
  }

  .wrap {
    justify-content: space-between;
  }

  .hamburger {
    display: flex;
  }

  .menu.active {
    display: flex;
    position: fixed;
    top: 70px;
    background-color: #020203;
    padding: 20px;
    border-radius: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .overlay {
    display: block;
  }
}
</style>