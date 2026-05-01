<template>
  <div class="calculator">
    <h1>💰 Tip Calculator</h1>

    <div class="field">
      <label>Bill Amount (KSh)</label>
      <input type="number" v-model.number="bill" min="0" placeholder="0" />
    </div>

    <div class="field">
      <label>Number of People</label>
      <input type="number" v-model.number="people" min="1" placeholder="1" />
    </div>

    <div class="field">
      <label>Tip Percentage: {{ tipPercent }}%</label>
      <div class="tip-buttons">
        <button
          v-for="pct in [10, 15, 20, 25]"
          :key="pct"
          :class="{ active: tipPercent === pct }"
          @click="tipPercent = pct"
        >
          {{ pct }}%
        </button>
      </div>
    </div>

    <div class="results">
      <div class="result-row">
        <span>Tip Amount</span>
        <span>KSh {{ tipTotal.toFixed(2) }}</span>
      </div>
      <div class="result-row">
        <span>Tip Per Person</span>
        <span>KSh {{ tipPerPerson.toFixed(2) }}</span>
      </div>
      <div class="result-row total">
        <span>Total Per Person</span>
        <span>KSh {{ totalPerPerson.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bill: 0,
      people: 1,
      tipPercent: 15
    }
  },
  computed: {
    tipTotal() {
      return this.bill * (this.tipPercent / 100)
    },
    tipPerPerson() {
      if (this.people < 1) return 0
      return this.tipTotal / this.people
    },
    totalPerPerson() {
      if (this.people < 1) return 0
      return (this.bill + this.tipTotal) / this.people
    }
  }
}
</script>

<style scoped>
.calculator {
  max-width: 420px;
  margin: 40px auto;
  font-family: sans-serif;
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}
h1 { text-align: center; margin-bottom: 24px; }
.field { margin-bottom: 20px; }
label { display: block; font-weight: 600; margin-bottom: 6px; color: #555; }
input[type="number"] {
  width: 100%; padding: 10px 12px; font-size: 18px;
  border: 2px solid #ddd; border-radius: 8px; box-sizing: border-box;
}
.tip-buttons { display: flex; gap: 8px; }
.tip-buttons button {
  flex: 1; padding: 10px; border: 2px solid #ddd;
  border-radius: 8px; background: white; cursor: pointer; font-size: 15px;
}
.tip-buttons button.active { background: #42b883; color: white; border-color: #42b883; }
.results { background: #35495e; border-radius: 10px; padding: 20px; margin-top: 24px; }
.result-row { display: flex; justify-content: space-between; color: white; padding: 8px 0; font-size: 16px; }
.result-row.total { font-size: 20px; font-weight: bold; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 14px; }
</style>

