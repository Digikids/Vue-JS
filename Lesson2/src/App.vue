<template>
  <div class="app">
    <h1>📖 Story Maker</h1>
    
    <div class="inputs">
      <input 
        v-model="noun" 
        type="text" 
        placeholder="Enter a noun (e.g., dragon, cat, robot)"
      >
      
      <input 
        v-model="place" 
        type="text" 
        placeholder="Enter a place (e.g., castle, park, moon)"
      >
      
      <input 
        v-model="verb" 
        type="text" 
        placeholder="Enter a verb (e.g., danced, flew, sang)"
      >
      
      <input 
        v-model="adjective" 
        type="text" 
        placeholder="Enter an adjective (e.g., magical, tiny, brave)"
      >
    </div>
    
    <div class="story">
      <h2>✨ Your Story ✨</h2>
      <p>
        Once upon a time, a <strong>{{ adjective || '???' }}</strong> 
        <strong>{{ noun || '???' }}</strong> went to 
        <strong>{{ place || '???' }}</strong>. 
        There, it <strong>{{ verb || '???' }}</strong> all day long.
        Everyone said it was the best day ever!
      </p>
    </div>
    
    <div class="preview" v-if="noun || place || verb || adjective">
      <h3>📝 Preview (without ???)</h3>
      <p>
        Once upon a time, a {{ adjective }} {{ noun }} went to {{ place }}. 
        There, it {{ verb }} all day long.
      </p>
    </div>
    
    <button @click="clearStory" class="clear-btn">🗑️ Clear Story</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      noun: '',
      place: '',
      verb: '',
      adjective: ''
    }
  },
  methods: {
    clearStory() {
      this.noun = ''
      this.place = ''
      this.verb = ''
      this.adjective = ''
    }
  }
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

input {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255,255,255,0.9);
  transition: all 0.3s;
}

input:focus {
  outline: none;
  transform: scale(1.02);
  background: white;
}

.story {
  background: rgba(255,255,255,0.2);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.story p {
  font-size: 18px;
  line-height: 1.6;
}

strong {
  color: #ffd700;
  text-transform: capitalize;
}

.preview {
  background: rgba(0,0,0,0.3);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
}

.clear-btn {
  width: 100%;
  padding: 12px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.clear-btn:hover {
  transform: scale(1.02);
  background: #ff3838;
}

h2, h3 {
  margin-top: 0;
  text-align: center;
}
</style>
