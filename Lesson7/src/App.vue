<template>
  <nav class="navbar">
    <RouterLink to ="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>

  <main>
    <RouterView/>
  </main>
</template>

<style>
.navbar {
  padding: 20px;
  text-align: center;
}
.navbar a {
  color:orange;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 5px;
}

.navbar a.router-link-active {
  background: #42b883;
  color:white
}
main {
  padding:20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
