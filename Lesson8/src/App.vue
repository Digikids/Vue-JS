<template>
  <div class="wrapper">
    <div class="checker">
      <h1>Create Account</h1>

      <div class="field">
        <label>Username</label>
        <input ref="usernameInput" v-model="username" placeholder="Choose a username">
        <span class="status" :class="usernameStatus">
          {{ usernameStatus === 'checking' ? '⏳ Checking.....':
             usernameStatus === 'available' ? '✓ Available':
             usernameStatus === 'taken' ? '✗ Taken' : ''}}
        </span>
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Create a password"/>
        <div v-if="password" class="strength-bar">
          <div class="strength-fill" :style="{ width: score*25 + '%', background: color }"></div>
        </div>
        <span class="strength-label" :style="{ color }">{{ label }}</span>
        <ul class="requirements">
          <li :class="{ met: req.length }">{{ req.length ? '✓' : '○' }} 8+ chars</li>
          <li :class="{ met: req.upper }">{{ req.upper ? '✓' : '○' }} Uppercase</li>
          <li :class="{ met: req.number }">{{ req.number ? '✓' : '○' }} Number</li>
          <li :class="{ met: req.symbol }">{{ req.symbol ? '✓' : '○' }} Symbol</li>
        </ul>
      </div>
      
      <div class="field">
        <label>Confirm Password</label>
        <input v-model="confirm" type="password" placeholder="Repeat password"/>
        <p v-if="confirm" :class="match ? 'match' : 'no-match'">{{ match ? '✓ Match' : '✗ No match' }}</p>
      </div>
      
      <button :disabled="!valid" @click="submit">Create Account</button>

      <div v-if="submitted" class="success">✅ Account Created Successfully</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirm: '',
      status: 'idle',
      timer: null,
      taken: ['admin', 'root', 'digikids', 'Hiram'],
      submitted: false
    }
  },
  computed: {
    req() {
      return {
        length: this.password.length >= 8,
        upper: /[A-Z]/.test(this.password),
        number: /\d/.test(this.password),
        symbol: /[!@#$%^&*]/.test(this.password)
      }
    },
    score() {
      return Object.values(this.req).filter(Boolean).length
    },
    label() {
      return ['', 'Weak', 'Fair', 'Strong', 'Very Strong'][this.score]
    },
    color() {
      return ['', '#e74c3c', '#f39c12', '#27ae60', '#1abc9c'][this.score]
    },
    match() {
      return this.password === this.confirm
    },
    usernameStatus() {
      if (!this.username) return 'idle'
      return this.status === 'checking' ? 'checking' : this.status
    },
    valid() {
      return this.score >= 3 && this.match && this.usernameStatus === 'available'
    }
  },
  watch: {
    username(newVal) {
      clearTimeout(this.timer)
      if (!newVal.trim()) {
        this.status = 'idle'
        return
      }
      this.status = 'checking'
      this.timer = setTimeout(() => {
        this.status = this.taken.includes(newVal.toLowerCase()) ? 'taken' : 'available'
      }, 500)
    }
  },
  mounted() {
    this.$nextTick(() => this.$refs.usernameInput.focus())
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
  methods: {
    submit() {
      if (this.valid) {
        this.submitted = true
        setTimeout(() => {
          this.submitted = false
          this.resetForm()
        }, 3000)
      }
    },
    resetForm() {
      this.username = ''
      this.password = ''
      this.confirm = ''
      this.status = 'idle'
    }
  }
}
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.checker {
  max-width: 450px;
  width: 100%;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  font-family: system-ui;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 25px;
  color: #2c3e50;
}

.field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.status {
  display: inline-block;
  font-size: 13px;
  margin-top: 5px;
}

.status.checking {
  color: #f39c12;
}

.status.available {
  color: #27ae60;
}

.status.taken {
  color: #e74c3c;
}

.strength-bar {
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  margin: 10px 0 5px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-label {
  font-size: 12px;
  font-weight: 600;
}

.requirements {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  font-size: 12px;
}

.requirements li {
  display: inline-block;
  margin-right: 12px;
  color: #95a5a6;
}

.requirements li.met {
  color: #27ae60;
  font-weight: 500;
}

.match, .no-match {
  font-size: 13px;
  margin: 5px 0 0;
}

.match {
  color: #27ae60;
}

.no-match {
  color: #e74c3c;
}

button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transition: none;
}

.success {
  margin-top: 15px;
  padding: 12px;
  background: linear-gradient(135deg, #d5f4e6, #a8e6cf);
  color: #27ae60;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>