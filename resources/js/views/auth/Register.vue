<template>
  <div>
    <!-- settings the method setLoggedIn in this file to the component in order to emit it to App.vue -->
  <RegisterAuth v-on:login="setLoggedIn()"/>
</div>
</template>

<script>
//importing the Auth component
import RegisterAuth from '../../components/RegisterAuth'
export default {
  name: 'create',
  //reference the Auth component
  components: {
    RegisterAuth
  },
  data() {
    return {

    }
  },
  methods: {
    // this emits to its' parent which is Create which is a child of App
  setLoggedIn() {
    this.$emit('login');
  }
}
}
</script>
