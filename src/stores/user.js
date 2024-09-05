import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { writeToDatabase} from '@/util/database'
// import { getPerformanceSingle, getPerformanceAll } from '@/util/api'
// import { db, auth } from '@/util/firebase'
// import { ref, onValue, set } from 'firebase/database'
// import {doc, updateDoc, deleteField } from 'firebase/firestore'

// export const userStateStore = defineStore('session', {
//   state: () => {
//     return {
//       user: useStorage(
//         'backtest-user-info',
//         {
//           'userData': null,
//           'accessToken': null,
//           'authenticated': false,
//         },
//         localStorage,
//         {
//           mergeDefaults: true
//         }
//       ),
//     }
//   },
//   getters: {
//     hasAuth: state => {
//       // console.log(state.user)
//       return typeof state.user.userData === 'object' && state.user.userData !== null
//     }
//   },
//   actions: {
//     // login
//     setUserData({user, token}) {
//       this.user.userData = user
//       this.user.accessToken = token
//       this.user.authenticated = true
//     },
//     // logout, destroy localstorage
//     unsetUserData() {
//       this.user.userData = null
//       this.user.accessToken = null
//       this.user.authenticated = false
//     },
//     async logout() {
//       try {
//         await signOut(auth)
//         this.unsetUserData()
//         this.$router.push('/')
//         this.menu_toggle = false;
//       } catch(e) {
//         console.log(e)
//       }

//     }
//   },
// })

