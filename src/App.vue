
<template>

  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!myStore.isLoggedIn" to="/login">Login</router-link> |
    <router-link v-if="!myStore.isLoggedIn" to="/register">Register</router-link> ||
    <button v-if="myStore.isLoggedIn" @click="handleSignOut">Sign Out</button>
  </nav> -->
  <router-view/>


</template>


<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {useFirestore} from '@/stores/firestore.js';
const myStore = useFirestore();
import { onMounted, ref } from 'vue';
const router = useRouter();

onMounted(() => {
  // myStore.pullUsers();
})


const handleSignOut = () => {
  myStore.signout();
}

</script>



<style>

</style>
