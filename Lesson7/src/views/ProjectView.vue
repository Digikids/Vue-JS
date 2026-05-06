<template>
    <div class="projects">
        <h1>My Projects</h1>
        <div class="project-grid">
            <div v-for="project in projects" :key="project.id" class="project-card">
                <h3>{{ project.title }}</h3>
                <p class="tech">{{ project.tech }}</p>
                <RouterLink :to="'/projects/${project.id}'">View Details</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projects: [
                {id: 1,title:'Colour Mood Lamp',tech:'Vue CDN'},
                {id: 2,title:'Mad Libs Generator',tech:'Vue CDN'},
                {id: 1,title:'Recipe Book',tech:'Vue + Vite'},
            ]
        }
    }
}
</script>

<style scoped>
.project {
    padding:40px;
    text-align: center;
}
.project-grid {
    display: flex;
    gap:20px;
    justify-content: center;
    flex-wrap: wrap;
}

.project-card {
    background: #f5f5f5;
    padding:20px;
    border-radius: 8px;
    width: 250px;
}
.tech {
    color:#42b883;
    font-weight:bold;
}
</style>