<template>
    <section id="landing">
        <div class="container">
            <div class="row">
                <div class="col-3 centerBox border-5">
                    <h1 class="text-center display-1 text-primary">Full Scheduler</h1>
                    <h6 class="text-center align-self-center mb-5 ">built for <img src="@/assets/brightfox_logo.png" alt="Fullscheduler" style="width:200px;" /></h6>

                    
                    <div class="container">
                        <!-- <div class="d-grid gap-2"> -->
                        <div class="col text-center">
                                <button type="button" class="mx-2 btn btn-outline-primary btn-lg" @click="routeToLogin">
                                    <div>Login</div>
                                    <div>🔒</div>
                                </button>

                                <button type="button" class="mx-2 btn btn-outline-primary btn-lg" @click="routeToRegister">
                                    <div>Sign Up</div>
                                    <div>🎓</div>
                                </button>  

                        </div>
                                                          
                    </div>
                    
                    

                    
                    

                </div>
            </div>
        </div>


        
    </section>
</template>

<script setup>
import { useFirestore } from '../stores/firestore';

const myFirestore = useFirestore();


function routeToLogin() {
    myFirestore.router.push('/login');
}

function routeToRegister() {
    myFirestore.router.push('/register');
}

</script>

<style scoped>
.centerBox {
  min-width: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  
}
</style>