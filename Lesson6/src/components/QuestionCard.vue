<template>
    <div class="card">
        <h3>Question {{ num }} of {{ total }}</h3>
        <h2>{{ q.text }}</h2>

        <button v-for="opt in q.options" :key="opt" class="opt"
        :class="{green: answered && opt === q.correct, red: answered && opt === selected}"
        :disabled="answered" @click="check(opt)">
        {{ opt }}
    </button>

    <div v-if="answered" class="feedback">
        <p :class="ok ? 'green' : 'red'">
            {{ ok ? ' ✅ Correct!' : `❌ Wrong! Answer: ${q.correct}` }}
        </p>
        <button @click="$emit('next')" class="next">
            {{ isLast ? 'Finish' : 'Next' }}
        </button>
    </div>
    </div>
</template>

<script>
export default {
    props: ['q', 'num', 'total', 'isLast'],
    data() {
        return {selected: null, answered: false, ok: false}
    },
    methods: {
        check(opt) {
            if(this.answered) return
            this.selected = opt
            this.answered = true
            this.ok = opt === this.q.correct
            this.$emit('answer', this.ok)
        }
    }
}
</script>

<style scoped>
.card {max-width: 500px;margin:auto;background: white; padding:30px;border-radius:20px;}
.opt { display:block;width: 100%;margin:10px 0; padding:12px; border: 2px solid #ddd;
 border-radius: 10px; background:white;cursor: pointer;}
 .opt:hover:not(:disabled){ border-color: #42b883;}
 .green{background:#d4f5e9;border-color: #27ae60;}
 .red{background:#fde8e8;border-color: #e74c3c;}
 .feedback {margin-top: 20px; text-align:center}
 .next{padding: 10px 30px; background:#42b883;color:white;border:none; border-radius: 8px;
 cursor: pointer;}
</style>