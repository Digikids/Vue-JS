<template>
  <div class="profile-card">
    <div
      class="avatar"
      :style="{ background: colour }"
    >
      {{ initials }}
    </div>
    <h3>{{ name }}</h3>
    <p class="title">{{ jobTitle }}</p>
    <p class="bio">{{ bio || 'No bio provided' }}</p>
    <div class="skills">
      <span v-for="skill in skillsArray" :key="skill" class="skill-tag">
        {{ skill }}
      </span>
      <span v-if="skillsArray.length === 0" class="skill-tag empty">
        No skills added
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    name: {
      type: String,
      default: 'Anonymous'
    },
    jobTitle: {
      type: String,
      default: 'Team Member'
    },
    bio: {
      type: String,
      default: ''
    },
    skills: {
      type: String,
      default: ''
    },
    colour: {
      type: String,
      default: '#42b883'
    }
  },
  computed: {
    initials() {
      return this.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    skillsArray() {
      return this.skills.split(',').map(s => s.trim()).filter(s => s.length > 0)
    }
  }
}
</script>

<style scoped>
.profile-card {
  border-radius: 16px;
  padding: 24px;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 280px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.avatar {
  width: 72px; 
  height: 72px;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: white; 
  font-size: 28px; 
  font-weight: bold;
  transition: transform 0.2s;
}

.profile-card:hover .avatar {
  transform: scale(1.05);
}

h3 { 
  margin: 0 0 4px; 
  font-size: 18px; 
  color: #2c3e50;
}

.title { 
  color: #666; 
  font-size: 14px; 
  margin: 0 0 12px; 
  font-weight: 500;
}

.bio { 
  font-size: 13px; 
  color: #444; 
  margin: 0 0 16px; 
  line-height: 1.5;
}

.skills { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 6px; 
  justify-content: center; 
}

.skill-tag {
  background: #f0f9f4; 
  color: #42b883;
  border: 1px solid #42b883;
  padding: 4px 12px; 
  border-radius: 20px; 
  font-size: 12px;
  font-weight: 500;
}

.skill-tag.empty {
  background: #f5f5f5;
  color: #999;
  border-color: #ddd;
}
</style>