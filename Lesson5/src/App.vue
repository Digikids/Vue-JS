<template>
  <div class="app">
    <div class="builder">
      <h2>🎨 Profile Builder</h2>

      <label>Name 
        <input v-model="form.name" placeholder="e.g., Sarah Johnson" />
      </label>
      
      <label>Job Title 
        <input v-model="form.jobTitle" placeholder="e.g., Frontend Developer" />
      </label>
      
      <label>Bio 
        <textarea v-model="form.bio" rows="3" placeholder="Tell us about yourself..."></textarea>
      </label>
      
      <label>Skills (comma-separated) 
        <input v-model="form.skills" placeholder="e.g., Vue, React, Python" />
      </label>

      <label>Avatar Colour</label>
      <div class="colour-picker">
        <button
          v-for="col in colours"
          :key="col"
          :style="{ background: col }"
          :class="{ selected: form.colour === col }"
          @click="form.colour = col"
          class="colour-swatch"
        />
      </div>

      <button class="add-btn" @click="addToTeam">+ Add to Team</button>
    </div>

    <div class="preview">
      <h2>👁 Live Preview</h2>
      <ProfileCard
        :name="form.name || 'Your Name'"
        :job-title="form.jobTitle || 'Your Title'"
        :bio="form.bio || 'Your bio will appear here...'"
        :skills="form.skills"
        :colour="form.colour"
      />
    </div>

    <div class="team" v-if="team.length > 0">
      <h2>👥 Our Team ({{ team.length }} members)</h2>
      <div class="team-grid">
        <ProfileCard
          v-for="(member, i) in team"
          :key="i"
          :name="member.name"
          :job-title="member.jobTitle"
          :bio="member.bio"
          :skills="member.skills"
          :colour="member.colour"
        />
      </div>
    </div>
    <div v-else class="team-empty">
      <p>💡 No team members yet. Add some profiles above!</p>
    </div>
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard.vue'

export default {
  name: 'App',
  components: { ProfileCard },
  data() {
    return {
      colours: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFB347', '#6B5B95'],
      form: {
        name: '',
        jobTitle: '',
        bio: '',
        skills: '',
        colour: '#FF6B6B'
      },
      team: []
    }
  },
  methods: {
    addToTeam() {
      if (!this.form.name.trim()) {
        alert('Please enter a name first!')
        return
      }
      this.team.push({ ...this.form })  // spread to copy, not reference
      // Reset form but keep the default colour
      this.form = { 
        name: '', 
        jobTitle: '', 
        bio: '', 
        skills: '', 
        colour: '#FF6B6B' 
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}

/* Builder Section */
.builder {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.builder h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.builder label {
  display: block;
  margin-bottom: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.builder input, 
.builder textarea {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.builder input:focus, 
.builder textarea:focus {
  outline: none;
  border-color: #42b883;
}

/* Colour Picker */
.colour-picker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.colour-swatch {
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.colour-swatch:hover {
  transform: scale(1.1);
}

.colour-swatch.selected {
  border-color: #2c3e50;
  transform: scale(1.1);
  box-shadow: 0 0 0 2px white, 0 0 0 4px #2c3e50;
}

/* Add Button */
.add-btn {
  background: linear-gradient(135deg, #42b883 0%, #3aa876 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: transform 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

/* Preview Section */
.preview {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.preview h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Team Section */
.team {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.team h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.team-empty {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
}

/* Preview Card */
.preview :deep(.profile-card) {
  margin: 0 auto;
}
</style>
