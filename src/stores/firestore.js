

import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
// import { getFirestore,collection,getDocs, onSnapshot, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMlHqC2zzguyDyli7og39LySUrTnTRj2s",
    authDomain: "fir-crud-15c93.firebaseapp.com",
    projectId: "fir-crud-15c93",
    storageBucket: "fir-crud-15c93.appspot.com",
    messagingSenderId: "887033961395",
    appId: "1:887033961395:web:12d49216a62524dd5409c6"
};

const app = initializeApp(firebaseConfig)

import { defineStore  } from 'pinia'
import { toHandlers,markRaw } from "vue";
import { useRouter } from "vue-router";

import { doc, 
    collection,
    getDocs,
    onSnapshot,
    setDoc,
    deleteDoc,
    getFirestore, 
    getDoc} from "firebase/firestore";




export const useFirestore = defineStore({

  id: 'counter',
  state: () => ({
    userAuth: null,
    user: null,
    isLoggedIn: false,
    users: null,
    auth: getAuth(app),
    db: getFirestore(app),
    router: useRouter(),
  }),
  getters: {
        // 
    },
  actions: {
        async updateUser() {
            // if userAuth is null, return null
            if (!this.userAuth) this.user=null;
            // otherwise return the user by getting the document from the users collection
            else{
                let userRef = doc(this.db, 'users', this.userAuth.uid)
                let userSnapshot = await getDoc(userRef)
                this.user = userSnapshot.data()
                console.log(this.user)
                this.isLoggedIn = true
            }            
        },

        async pullUsers() {
            try {
                onSnapshot(
                    collection(this.db, 'users'), querySnap => {

                        this.users = querySnap.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    }
                )
            } catch (error) {
                console.log(error)
            }
        },

        login(payload) {
            signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
                .then(
                    userCredential => {
                        this.userAuth = userCredential.user
                        this.updateUser().then(
                            () => {
                                console.log(this.userAuth.email + " logged in")


                            // redirect to the page for their role
                            if (this.user.role === 'admin') {
                                this.router.push('/admin')
                            }
                            else if (this.user.role === 'student') {
                                this.router.push('/student')
                            }
                            else if (this.user.role === 'teacher') {
                                this.router.push('/teacher')
                            }
                            else if (this.user.role === 'parent') {
                                this.router.push('/parent')
                            }
                            else {
                                this.router.push('/')
                            }
                            }
                        )
                    }
                ).catch(error => {
                    if(error !== undefined) {
                        console.log(error)
                    }
                }
            )
        },

        register(payload) {
            createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
                .then(userCredential => {
                    // create a new user document in the users collection
                    let newUserDoc = doc(this.db, 'users', userCredential.user.uid)
                    let newUserData = {
                        email: payload.email,
                        role: 'student'
                    }
                    setDoc(newUserDoc, newUserData)
                    this.userAuth = userCredential.user
                    this.updateUser().then(
                        this.router.push('/')
                    )                    
                }).catch(error => {
                    if(error !== undefined) {
                        console.log(error)
                    }
                })

        },

        signout() {
            signOut(getAuth())
                .then(() => {
                    this.user = null
                    this.isLoggedIn = false
                    this.router.push('/')
                }).catch(error => {
                    console.log(error)
                }
            )
        },

        reRouteToRoleHome() {
            if(this.user.role === 'admin') {
                this.router.push('/admin')
            } else {
                this.router.push('/')
            }
        }

    }

})
