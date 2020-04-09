<template>
  <div>
    <!-- passing boolean into compnent -->
    <MyNavbar :loggedIn="this.loggedIn" v-on:login="setLoggedIn()" v-on:logout="setLoggedOut()" />
    <b-container class="mycontainer" fluid>
      <!-- wrapping the router-view in an animation tag and referencing a third party animation library -->
      <transition name="animation" enter-active-class="animated fadeIn">
        <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn()" v-on:logout="setLoggedOut()" />    </transition>
    </b-container>
  </div>
</template>
<script>
//imports the component MyNavbar from its location
import MyNavbar from './components/MyNavbar'

export default {
  name: 'app',
  //references/uses the MyNavbar component
  components: {
    MyNavbar
  },
  data() {
    return {
      loggedIn: false
    }
  },
  created() {
    let token = localStorage.getItem('token');
    //when the page is first loaded it up it makes a check to see if it has gotten the token from storage, and if so, it sets the loggedIn boolean to be equal to true (user logged in)
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else {
      //no token, so set loggedIn boolean to be false
      this.loggedIn = false;
    }
  },
  methods: {
    setLoggedIn() {
      //if this method is accessed, the user is then logged in and the boolean is set to true
   this.loggedIn = true;
   console.log("Inside setLoggedIn")

 },
 setLoggedOut() {
   //if this method is accessed, the user is then logged out and the boolean is set to false
   this.loggedIn = false;
   console.log("Inside setLoggedOut")
   //locally remove the token from storage
   localStorage.removeItem('token');
 }

  }
}
</script>
<style>
/* Third party animation library */
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

body {
  background-color: #2a2a2a;
}

.mycontainer {
  background-color: #2a2a2a;
  padding: 0;
  position: absolute;
}



</style>
