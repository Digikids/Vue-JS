<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Sign In</button>
      <p v-if="error">Invalid credentials</p>
      <small>Demo: any email/password</small>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({ email: '', password: '', error: false }),
  methods: {
    login() {
      if (this.email && this.password) {
        localStorage.setItem('auth', 'true')
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.error = true
        setTimeout(() => this.error = false, 2000)
      }
    }
  },
  mounted() { if (localStorage.getItem('auth') === 'true') this.$router.push('/') }
}
</script>

<style scoped>
form { max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
input { padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px; }
button { background: #667eea; color: white; border: none; padding: 0.5rem; cursor: pointer; }
p { color: red; }
</style>