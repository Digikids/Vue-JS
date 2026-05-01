<template>
    <div>
        <h1>Our Project</h1>
        <div class="projects">
            <div v-for="p in project" :key="p.id" class="card">
                <h3>{{ p.title }}</h3>
                <p>{{ p.desc }}</p>
                <button @click="() => alert(p.title)">View</button>
            </div>
        </div>
    </div>
    </template>

    <script>
export default {
    data() {
        return{
            projects:[
                {id:1,title:'E-Commerce',desc:'Online Store platform'},
                {id:2,title:'Task App',desc:'Task management tool'},
                {id:3,title:'Portfolio',desc:'Modern portfolio site'}
            ]
        }
    }
}
</script>

<style scoped>
.project{display: grid;grid-template-columns: repeat(auto-fit,minmax(250px,1fr));gap:1rem;
padding: 1rem;}
.card{border: 1px solid #ddd; padding:1rem;border-radius: 5px;}
button {background: #667eea;color:white;border:none;padding: 0.5rem 1rem; cursor: pointer;}
</style>