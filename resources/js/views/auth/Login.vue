<template>
  <div>
    <!-- settings the method setLoggedIn in this file to the component in order to emit it to App.vue -->
  <Auth v-on:login="setLoggedIn()"/>
</div>
</template>

<script>
//importing the Auth component
import Auth from '../../components/Auth'
export default {
  name: 'create',
  //reference the Auth component
  components: {
    Auth
  },
  data() {
    return {

    }
  },
  methods: {
    // this emits to its' parent which is Create which is a child of App (this was observed using Vue Devtools), in order to fix an emit issue i was having
  setLoggedIn() {
    this.$emit('login');
  }
}
}
</script>


<style>



</style>
