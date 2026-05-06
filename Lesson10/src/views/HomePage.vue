<template>
    <div class="home">
        <h1>Welcome to MyWebsite</h1>
        <p>Building amazing web experience</p>
        <router-link to ="/projects">View Projects</router-link>
        <router-link to="/contact">Contact Us</router-link>
    </div>
    </template>

    <style scoped>
    .home {text-align: center;padding: 4rem;}
    .home h1 {color: #667eea;}
    .home a {display: inline-block;margin: 1rem;padding: 0.5rem 1rem;background: #667eea;
    color:white;text-decoration: none;border-radius: 5px;}
    
</style>