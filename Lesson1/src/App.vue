<template>
  <div class="lamp-app">
    <h1>💡 Colour Mood Lamp <span>✨ reactive</span></h1>
    
    <!-- Lamp with click random -->
    <div class="lamp" @click="randomColor">
      <div class="bulb" :style="{ background: bulbGradient, boxShadow: bulbShadow }"></div>
      <div class="stand"></div>
    </div>

    <!-- Quick Moods -->
    <div class="moods">
      <button v-for="m in moods" :key="m.name" @click="setColor(m.rgb)" class="mood">
        {{ m.emoji }} {{ m.name }}
      </button>
    </div>

    <!-- Color Palette -->
    <div class="palette">
      <div v-for="c in colors" :key="c.name" 
           class="swatch" 
           :style="{ background: c.hex }"
           @click="setColor(c.rgb)"></div>
    </div>

    <!-- RGB Sliders -->
    <div class="sliders">
      <label><span style="color:#ff6b6b">R</span> 
        <input type="range" min="0" max="255" v-model.number="rgb.r" @input="update">
      </label>
      <label><span style="color:#51cf66">G</span> 
        <input type="range" min="0" max="255" v-model.number="rgb.g" @input="update">
      </label>
      <label><span style="color:#339af0">B</span> 
        <input type="range" min="0" max="255" v-model.number="rgb.b" @input="update">
      </label>
    </div>

    <!-- Current Color -->
    <div class="footer">
      <span>{{ hexColor }}</span>
      <span>🎨 click lamp → random</span>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const rgb = ref({ r: 255, g: 140, b: 70 })
    
    const moods = [
      { name: 'Warm', emoji: '🔥', rgb: { r: 235, g: 95, b: 55 } },
      { name: 'Ocean', emoji: '🌊', rgb: { r: 30, g: 80, b: 180 } },
      { name: 'Forest', emoji: '🌲', rgb: { r: 70, g: 130, b: 80 } },
      { name: 'Romance', emoji: '🌸', rgb: { r: 245, g: 110, b: 155 } },
      { name: 'Neon', emoji: '💜', rgb: { r: 160, g: 50, b: 240 } }
    ]
    
    const colors = [
      { name: 'Sunset', hex: '#FF5F6D', rgb: { r: 255, g: 95, b: 109 } },
      { name: 'Ocean', hex: '#3B82F6', rgb: { r: 59, g: 130, b: 246 } },
      { name: 'Mint', hex: '#34D399', rgb: { r: 52, g: 211, b: 153 } },
      { name: 'Amber', hex: '#F59E0B', rgb: { r: 245, g: 158, b: 11 } },
      { name: 'Lavender', hex: '#A78BFA', rgb: { r: 167, g: 139, b: 250 } }
    ]
    
    const hexColor = computed(() => {
      const toHex = c => c.toString(16).padStart(2, '0')
      return `#${toHex(rgb.value.r)}${toHex(rgb.value.g)}${toHex(rgb.value.b)}`.toUpperCase()
    })
    
    const bulbGradient = computed(() => {
      const { r, g, b } = rgb.value
      return `radial-gradient(circle at 35% 35%, rgb(${r},${g},${b}), rgb(${r*0.6},${g*0.5},${b*0.4}))`
    })
    
    const bulbShadow = computed(() => {
      const { r, g, b } = rgb.value
      return `0 0 25px rgba(${r},${g},${b},0.7)`
    })
    
    const update = () => {
      rgb.value.r = Math.min(255, Math.max(0, rgb.value.r))
      rgb.value.g = Math.min(255, Math.max(0, rgb.value.g))
      rgb.value.b = Math.min(255, Math.max(0, rgb.value.b))
    }
    
    const setColor = (newRgb) => { rgb.value = { ...newRgb } }
    const randomColor = () => {
      rgb.value = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    }
    
    return { rgb, moods, colors, hexColor, bulbGradient, bulbShadow, update, setColor, randomColor }
  }
}
</script>

<style scoped>
.lamp-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1c2e, #0f1119);
  border-radius: 2rem;
  text-align: center;
  font-family: system-ui;
  color: white;
}
h1 { font-size: 1.4rem; margin-bottom: 1rem; }
h1 span { font-size: 0.8rem; color: #a9b2e3; }
.lamp { cursor: pointer; margin: 1rem 0; }
.bulb {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  transition: all 0.1s ease;
  border: 2px solid rgba(255,215,150,0.5);
}
.stand {
  width: 50px;
  height: 50px;
  background: #2a2c3a;
  margin: -8px auto 0;
  border-radius: 0 0 30px 30px;
  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);
}
.moods, .palette {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}
.mood {
  background: #25283a;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.2s;
}
.mood:hover { background: #3d4058; transform: scale(0.98); }
.swatch {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  border: 2px solid rgba(255,255,255,0.3);
}
.swatch:hover { transform: scale(1.1); }
.sliders {
  margin: 1rem 0;
  text-align: left;
}
.sliders label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0.6rem 0;
  font-weight: bold;
  font-size: 0.9rem;
}
input[type="range"] {
  flex: 1;
  height: 4px;
  border-radius: 5px;
}
input[type="range"]::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.75rem;
  font-family: monospace;
}
</style>
