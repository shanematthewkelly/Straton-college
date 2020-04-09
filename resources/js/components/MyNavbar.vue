<template>
  <div>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav>
      <img src="../../images/straton.png" class="nav-image"></img>
      <b-nav-item to="/">Home</b-nav-item>

      <!-- if statments in these drop downs reference the loggedIn Boolean, these dropdowns are only displayed to logged in users -->
      <b-nav-item-dropdown v-if="loggedIn" text="Courses" left>
        <b-dropdown-item to="/courses">All Courses</b-dropdown-item>
        <b-dropdown-item to="/courses/create">Create Course</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown v-if="loggedIn" text="Lecturers" left>
        <b-dropdown-item to="/lecturers">All Lecturers</b-dropdown-item>
        <b-dropdown-item to="/lecturers/create">Create Lecturer</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown v-if="loggedIn" text="Enrolments" left>
        <b-dropdown-item to="/enrolments">All Enrolments</b-dropdown-item>
        <b-dropdown-item to="/enrolments/create">Create Enrolment</b-dropdown-item>
      </b-nav-item-dropdown>

    </b-navbar-nav>


    <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>Account</em>
          </template>
          <!-- logged in and logged out checks for diaplying dropdown items -->
          <b-dropdown-item v-if="!loggedIn" to="/login">Login</b-dropdown-item>
          <b-dropdown-item v-if="!loggedIn" to="/register">Register</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn" @click="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  name: "myNavbar",
  //this is a prop being passed in/referenced from App.vue
 props: {
  loggedIn: Boolean
 },
  methods: {
      logout() {
        let app = this;
        //gets the token from local storage
        let token = localStorage.getItem('token');
        //get request made to api/logout and sends the Bearer Authorization token in its' body
        axios.get('/api/logout', {
          headers: { Authorization: "Bearer " + token}
        })
        .then(function(response){
          console.log(response);
          //This lets App.vue know to update loggedIn
          app.$emit('logout');
          //redirect to root directory
          app.$router.push('/');
         })
        .catch(function(error){
          console.log(error);
        });

      }
  }
};
</script>
<style>
.navbar {
}

.dropdown-menu {
  background-color: #575757;
}

.dropdown-item {
  color: #fff;
  font-weight: bold;
}

.dropdown-item:hover {
  background-color: #ff0055;
  color: #fff;
}

.nav-item {
  color: #fff;
  font-weight: bold;
}

.nav-image {
  max-height: 40px;

}

</style>
