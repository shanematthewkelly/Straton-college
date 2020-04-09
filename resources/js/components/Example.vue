<template>
    <div class="card">
        <div class="card-header">Login With Us</div>

        <div class="card-body">
          <br>
          <button @click="login()">Login</button>
          <br>
          <br>
          <button @click="logout()">Logout</button>
          <br>
          <br>
          <button @click="getCourses()">Get Courses</button>
          <br>

        </div>

    </div>
</template>

<script>

    export default {
      name:'Auth',
      components: {
},
         data () {
            return {
            // items: null
            name: "",
            email: "",
            courses: []
            }
        },
        mounted() {
          if (localStorage.getItem('token') !== null) {
            //redirect the user here to a new page if they do infact have a valid token
            // this.router.replace({name: 'home'});
            console.log("USER LOGGED IN")
          }
        },
          methods: {
            //Logic for the login method, please change the hard coded logic to actual form data
            login() {
                let app = this;
                axios.post('/api/login', {
                  email:"shane.kelly2408@gmail.com",
                  password:"secret"
                })
                .then(function(response) {
                  console.log(response.data);
                  app.name = response.data.name;
                  app.email = response.data.email;
                  localStorage.setItem('token', response.data.token);
                })
                .catch(function(error) {
                  console.log(error);
                });
            },

            //Logic for the getCourses method
          getCourses() {
            let app = this;
            let token = localStorage.getItem('token');
            axios.get('/api/courses', {
              headers: { Authorization: "Bearer " + token}
            })
            .then(function(response) {
              console.log(response);
              app.courses = response.data.data;
            })
            .catch(function(error) {
              console.log(error);

            });
          },
          logout() {
            let token = localStorage.getItem('token');
            axios.get('/api/logout', {
              headers: { Authorization: "Bearer " + token}
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });

            console.log("USER LOGGED OUT")
            //now that Axios had ran, I remove the token when the user logs out
            localhost.removeItem('token');
          }
        }

    }
</script>

<style>
</style>
