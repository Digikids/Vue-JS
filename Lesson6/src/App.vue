<script setup lang="ts">
import QuestionCard from './components/QuestionCard.vue';
import { ref } from 'vue'

const index = ref(0)
const score = ref(0)
const done = ref(false)
const questions = ref([
  {text: "Capital of France", options: ["London","Berlin","Paris","Madrid"], correct: "Paris"},
  {text: "Red Planet?", options: ["Mars","Jupiter","Venus","Saturn"], correct: "Mars"},
  {text: "Mona Lisa painter?", options: ["Van Gogh","Picasso","Da Vinci","Rembrandt"], correct: "Da Vinci"},
  {text: "Largest ocean", options: ["Atlantic","Indian","Arctic","Pacific"], correct: "Pacific"},
  {text: "WWII ended?", options: ["1943","1944","1945","1946"], correct: "1945"}
])

const handleAnswer = (correct: boolean) => {
  if (correct) score.value++
}

const nextQuestion = () => {
  if (index.value < questions.value.length - 1) {
    index.value++
  } else {
    done.value = true
  }
}

const reset = () => {
  index.value = 0
  score.value = 0
  done.value = false
}
</script>

<template>
  <div class="app">
    <h1> 🧠 Quiz Game </h1>
  
    <div v-if="!done">
      <div class="score"> Score:{{ score }}/{{ questions.length }}</div>
      <QuestionCard
      :key="index"
      :q="questions[index]"
      :num="index+1"
      :total="questions.length"
      :isLast="index === questions.length-1"
      @answer="handleAnswer"
      @next="nextQuestion"
      />
    </div>

    <div v-else class="result">
      <h2>Game Over! 🎉</h2>
      <div class="big-score">{{ score }}/{{ questions.length }}</div>
      <button @click="reset" class="again">Play Again</button>
    </div>
  </div>
</template>

<style scoped>
.app{max-width:600px;margin:40px auto;padding:20px}
h1{text-align:center;color:#2c3e50}
.score{text-align:right;color:#42b883;font-weight:bold;margin-bottom:15px}
.result{text-align:center;background:white;padding: 50px; border-radius: 20px;}
.big-score{font-size: 60px; font-weight: bold; color:#42b883;margin:20px;}
.again{padding:12px 30px;background: #42b883;color: white; border:none;border-radius: 8px;cursor: pointer;}
.again:hover{background: #369c6d;}
</style>