<template>
  <div style="display:flex;flex-direction:column;min-height:100vh">
    <div style="display:flex;flex:1">
      <nav style="width:200px;background:#667eea;padding:1rem;display:flex;flex-direction:column;gap:1rem;position:fixed;height:100vh">
        <router-link to="/">Home</router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/contact">Contact</router-link>
        <button @click="logout" v-if="isAuth">Logout</button>
        <router-link to="/signin" v-else>Sign In</router-link>
      </nav>
      <main style="margin-left:200px;flex:1;padding:2rem"><router-view /></main>
    </div>
    <footer style="background:#2d3748;color:white;text-align:center;padding:1rem;margin-left:200px">© 2026 MyWebsite</footer>
  </div>
</template>

<script>
export default {
  data() { return { isAuth: false } },
  mounted() { this.isAuth = localStorage.getItem('auth') === 'true' },
  methods: {
    logout() { localStorage.removeItem('auth'); this.isAuth = false; this.$router.push('/') }
  }
}
</script>

<style scoped>
nav a, nav button { color: white; text-decoration: none; background: none; border: none; cursor: pointer; text-align: left; padding: 0.5rem; }
nav a:hover, nav button:hover { background: rgba(255,255,255,0.2); }
</style>
