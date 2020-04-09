<!-- simple styling - refer to Navbar file as logic is similar -->


<template>
  <b-row align-h="center">
    <b-col cols="12">

<b-container class="home-cont" fluid>
        <!--Grid row-->
<div class="row d-flex justify-content-center">
  <!--Grid column-->
  <div class="col-md-12">
      <div class="text-center3">
    <img src="/images/straton.png" class="text-center"></img>
  </div>
    <p style="color:white;" class="text-center2">Welcome to Straton College, we hope you enjoy your stay with us!<br> Feel free to navigate through our application in order to customise courses, lecturers and enrolments within the college.</p>

<!-- displays buttons whether the user is logged in or not -->
    <div class="text-center3">
      <b-button v-if="!loggedIn" class="my-custom-btn2" variant="primary" type="submit" @click="goToLogin()"><i class="fas fa-lock"></i>&nbsp;&nbsp;LOGIN</b-button>
      <b-button v-if="!loggedIn" class="my-custom-btn3" variant="primary" type="submit" @click="goToRegister()"><i class="fas fa-user-circle"></i>&nbsp;&nbsp;Register</b-button>
      <b-button v-if="loggedIn" class="my-custom-btn2" variant="primary" type="submit" @click="goToCourses()"><i class="fas fa-check-circle"></i>&nbsp;&nbsp;Enter Application</b-button>
    </div>


  </div>
  <!--Grid column-->

</div>
<!--Grid row-->

</b-container>

<b-container class="home-cont2" fluid>
  <div class="row d-flex justify-content-center">
    <div class="col-md-12">
      <h1 class="text-center">DISCOVER A WIDE RANGE OF OUR CATEGORIES</h1>
    </div>
    <div class="row d-flex justify-content-center">
</div>
</div>

  <div class="row">
    <!--Card 1 -->
    <div class="col-sm">
      <div class="card-custom" style="width: 18rem;">
        <img class="card-img-top" src="../../images/lecturers.gif"  alt="Card image cap"></img>
        <div class="card-body">
          <h1 class="card-head-cust">Lecturers</h1>
          <p class="card-text-cust">Create, read, update and delete Straton's list of lecturers, customise and modify how you like, an all-in-one platform.</p>
        </div>
      </div>
    </div>

    <!--Card 2 -->
    <div class="col-sm">
      <div class="card-custom" style="width: 18rem;">
        <img class="card-img-top" src="../../images/courses.gif"  alt="Card image cap"></img>
        <div class="card-body">
          <h1 class="card-head-cust">Courses</h1>
          <p class="card-text-cust">Create, read, update and delete Straton's list of courses, customise and modify how you like, an all-in-one platform.</p>
        </div>
      </div>
    </div>

    <!--Card 3 -->
    <div class="col-sm">
      <div class="card-custom" style="width: 18rem;">
        <img class="card-img-top" src="../../images/enrolment.gif"  alt="Card image cap"></img>
        <div class="card-body">
          <h1 class="card-head-cust">Enrolments</h1>
          <p class="card-text-cust">Create, read, update and delete Straton's list of enrolments, customise and modify how you like, an all-in-one platform.</p>
        </div>
      </div>
    </div>



</div>
</b-container>

<div class="footer">
  <p class="copyright">Copyright - Straton College 2020</p>
</div>

</b-col>
</b-row>
</template>

<script>
export default {
  name: "index",
  props: {
   loggedIn: Boolean
  },
  components: {},

  methods: {
    goToLogin() {
      let app = this;
      app.$router.push('/login');
    },
    goToRegister() {
      let app = this;
      app.$router.push('/register');
    },
    goToCourses() {
      let app = this;
      app.$router.push('/courses');
    }
  }
};
</script>

<style scoped>

.home-cont {
  height: 400px;
  background-image: url('../../images/landing.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}


.home-cont2 {
  height: 500px;
  /* padding: 100px; */
}

.text-center2 {
    text-align: center!important;
}

.text-center {
  text-align: center!important;
  padding: 35px!important;
  font-size: 45px;
  margin-top: 60px;
}

.text-center3 {
  text-align: center!important;
}

.my-custom-btn2 {
  margin-top: 25px;
  background-color: #ff0055;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  border-color: #ff0055;
  align-content: center;
  margin-right: 4px;
}

.my-custom-btn3 {
  margin-top: 25px;
  margin-left: 4px;
  background-color: #ff0055;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  border-color: #ff0055;
  align-content: center;
}

.my-custom-btn2:hover {
  background-color: #f01b0c!important;
  border-color: #f01b0c!important;
}

.my-custom-btn3:hover {
  background-color: #f01b0c!important;
  border-color: #f01b0c!important;
}

.card-custom {
  background-color: white;
  margin: 40px;
  border-radius: 25px;
  background-color: #424242;
}

.card-img-top {
  border-top-right-radius: 25px!important;
  border-top-left-radius: 25px!important;
}

.card-head-cust {
  font-weight: bold;
  color: #ff0055;
}

.card-text-cust {
  color: #fff;
}

.footer {
  margin-top: 420px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  background-color: #212121;
  color: #fff;
  text-align: center;
}

.copyright {
  padding-top: 60px;
  padding-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

</style>
