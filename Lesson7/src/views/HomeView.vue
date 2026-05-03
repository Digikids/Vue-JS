<template>
    <div class="home">
        <div class="hero">
            <h1>Hi, I'm <span class="highlight">YAKUB</span></h1>
            <p class="tagline">Creating awesome web experiences with Vue</p>
            <RouterLink to="Projects" class="btn">Explore My Work</RouterLink>
        </div>
        <div class="features">
            <div class="feature">
                <h3>🎯 Vue Developer</h3>
                <p>Building reactive, fast applications</p>
            </div>
            <div class="feature">
                <h3>💡 Creative Problem Solver</h3>
                <p>Turning ideas into reality</p>
            </div>
            <div class="feature">
                <h3>✨ Detail Oriented</h3>
                <p>Clean code, smooth experience</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    text-align: center;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.hero {
    margin-bottom: 60px;
    text-align: center;
}

.highlight {
    color: #42b883;
}

.tagline {
    font-size: 1.2rem;
    color: #666;
    margin: 20px 0;
}

.btn {
    display: inline-block;
    background: #42b883;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 20px;
    transition: transform 0.2s, background 0.2s;
}

.btn:hover {
    background: #369e6d;
    transform: translateY(-2px);
}

.features {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.feature {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 12px;
    width: 250px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>