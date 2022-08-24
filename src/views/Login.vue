<template>
    <section id="landing">
        <div class="container">
            <div class="row">
                <div class="col-3 centerBox border-5">
                    <h1 class="text-center display-1 text-primary">Full Scheduler</h1>
                    <h6 class="text-center align-self-center mb-5 ">built for <img src="@/assets/brightfox_logo.png" alt="Fullscheduler" style="width:200px;" /></h6>

                    <div class="container">
                        <div class="row justify-content-center my-3">
                            <div class="col-8">
                                <form @submit.prevent="login">
                                    <label for="email" class="form-label">Email address:</label>
                                    <div class="mb-4 input-group">
                                        <input type="email" class="form-control" id="email" v-model="email" required placeholder="e.g mario@bowser.com">
                                    </div>

                                    <label for="password" class="form-label">Password</label>
                                    <div class="input-group mb-4">
                                        
                                        <input type="password" class="form-control" id="name" v-model="password" required>
                                        
                                    </div>
                                    
                                    <div class="d-grid gap-2">
                                    <button class="btn btn-primary">Log In</button>
                                    <div  v-if ="error" class="error">{{ error }}</div>
                                    </div>
                                </form>
                                <p class="text-center">Don't have an account? <a href="#" @click="routeToRegister">Register</a></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useFirestore } from '../stores/firestore';
import { ref } from 'vue';

const myFirestore = useFirestore();

function routeToRegister() {
    myFirestore.router.push('/register');
}


const email = ref('');
const password = ref('');
const error = ref('');


// login function calls the login method in the firestore store
const login = () => {
    let payload = {
        email: email.value,
        password: password.value
    }
    myFirestore.login(payload)
}

</script>

<style>
.centerBox {
  min-width: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  
}
</style>