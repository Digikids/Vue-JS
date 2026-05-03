<template>
    <div>
        <h1>Contact Us</h1>
        <form @submit.prevent="submit">
            <input v-model="form.name" placeholder="Name" required>
            <input v-model="form.email" placeholder="Email" required>
            <textarea v-model="form.message" placeholder="Message" require></textarea>
            <button type ="submit">{{ sending ? 'Sending' :'Send'}}</button>
            <p v-if="sent">Message sent</p>
        </form>
    </div>
    </template>

    <script>
    export default {
        data: () => ({form:{name:'',email:'',message:''},sending:false,sent:false}),
        method: {
            submit() {
                this.sending = true
                setTimeout(() => {
                    console.log(this.form)
                    this.sent = true
                    this.sending = false
                    this.form = {name:'',email:'',message:''}
                    setTimeout(() => this.sent =false,2000)
                },500)
            }
        }
    }
</script>

<style scope>
form {max-width: 500px;margin:0 auto;display: flex;flex-direction: column;gap:1rem;}
input,textarea {padding:0.5rem;border:1px solid #ddd;border-radius: 5px;}
button{background: #667eea; color:white;border:none;padding:0.5rem;cursor:pointer;}
</style>