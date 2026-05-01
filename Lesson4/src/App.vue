<template>
  <div class="app">
    <!-- Profile Builder Section -->
    <div class="builder">
      <h2>🎨 Profile Builder</h2>

      <label>
        Name 
        <input v-model="form.name" placeholder="e.g., Alice Mwangi" />
      </label>
      
      <label>
        Job Title 
        <input v-model="form.jobTitle" placeholder="e.g., Software Engineer" />
      </label>
      
      <label>
        Bio 
        <textarea v-model="form.bio" rows="2" placeholder="Tell us about yourself..."></textarea>
      </label>
      
      <label>
        Skills (comma-separated) 
        <input v-model="form.skills" placeholder="e.g., Vue, JavaScript, Python" />
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

    <!-- Live Preview Section -->
    <div class="preview">
      <h2>👁 Live Preview</h2>
      <ProfileCard
        :name="form.name || 'Your Name'"
        :job-title="form.jobTitle || 'Your Title'"
        :bio="form.bio || 'Your bio will appear here...'"
        :skills="form.skills || 'Vue'"
        :colour="form.colour"
      />
    </div>

    <!-- Team Section -->
    <div class="team" v-if="team.length > 0">
      <h2>👥 Our Team ({{ team.length }} members)</h2>
      <button class="clear-btn" @click="clearTeam" v-if="team.length > 0">
        Clear Team
      </button>
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
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard.vue'

export default {
  components: { ProfileCard },
  data() {
    return {
      colours: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFA07A', '#20B2AA'],
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
        alert('Please enter a name before adding to team!')
        return
      }
      
      // Add current form data to team
      this.team.push({ ...this.form })
      
      // Reset form
      this.form = { 
        name: '', 
        jobTitle: '', 
        bio: '', 
        skills: '', 
        colour: '#FF6B6B' 
      }
    },
    clearTeam() {
      if (confirm('Are you sure you want to clear the entire team?')) {
        this.team = []
      }
    }
  }
}
</script>

<style scoped>
.app {
  max-width: 1400px;
  margin: 0 auto;
}

/* Builder Section */
.builder {
  background: white;
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.builder h2 {
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 28px;
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
  padding: 10px 12px;
  margin-top: 8px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.builder input:focus,
.builder textarea:focus {
  outline: none;
  border-color: #42b883;
}

.colour-picker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.colour-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.colour-swatch:hover {
  transform: scale(1.1);
}

.colour-swatch.selected {
  border-color: #2c3e50;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #2c3e50;
}

.add-btn {
  background: linear-gradient(135deg, #42b883 0%, #2c9e6b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 8px;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

/* Preview Section */
.preview {
  background: white;
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  text-align: center;
}

.preview h2 {
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 28px;
}

.preview > div {
  margin: 0 auto;
}

/* Team Section */
.team {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.team h2 {
  display: inline-block;
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 28px;
}

.clear-btn {
  float: right;
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #ff5252;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
  clear: both;
}

/* Responsive Design */
@media (max-width: 768px) {
  body {
    padding: 20px 15px;
  }
  
  .builder, .preview, .team {
    padding: 20px;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>