<template>
    <section id="landing">
        <div class="container">
            <div class="row">
                <div class="col-3 centerBox border-5">
                    <h1 class="text-center display-1 text-primary">Full Scheduler</h1>
                    <h6 class="text-center align-self-center mb-5 ">built for <img src="@/assets/brightfox_logo.png" alt="Fullscheduler" style="width:200px;" /></h6>

                    <div class="container">
                        <div class="row justify-content-center my-3">
                            <div class="col-8 text-center">
                                
                                

                                <!-- who are you -->
                                <div v-if="!role" class="container">
                                    <h1 class="mb-5">Please start by selecting a role</h1>
                                    <div class="d-grid gap-2">
                                        
                                            <button type="button" class="btn btn-outline-primary btn-lg" @click="handleRoleSelection('parent')">
                                                <div>Parent</div>
                                                <div>👪</div>
                                            </button>
                                            <button type="button" class="btn btn-outline-primary btn-lg" @click="handleRoleSelection('student')">
                                                <div>Student</div>
                                                <div>🎓</div>
                                            </button>
                                        
                                            <button type="button" class="btn btn-outline-primary btn-lg" @click="handleRoleSelection('staff')">
                                                <div>Staff</div>
                                                <div>👩‍🏫</div>
                                            </button>
                                        <p>Already have an account? <a href="#" @click="routeToLogin">Log In</a></p>
                                    </div>
                                </div>
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

const myFirestore = useFirestore();


function routeToLogin() {
    myFirestore.router.push('/login');
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