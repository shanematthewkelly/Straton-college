
<!-- The logic of this file is near identical to the course show file, please refer to that file -->

<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>
      <b-card
      class="createCard"
        v-else
        tag="article">

        <b-card-text>

          <h1 class="title-custom">{{ enrolment.date }}</h1>

          <b-table-simple hover responsive>
            <b-head>
              <b-tr>
                <b-th class="custom-title-colouring">Time</b-th>
                <b-th class="custom-title-colouring">Status</b-th>
                <b-th class="custom-title-colouring">Course</b-th>
                <b-th class="custom-title-colouring">Lecturer</b-th>
              </b-tr>
            </b-head>
            <b-body>
                <br>
                <b-td class="custom-colouring">{{ enrolment.time }}</b-td>
                <b-td class="custom-colouring">{{ enrolment.status }}</b-td>
                <b-td class="custom-colouring">{{ enrolment.course.title }}</b-td>
                <b-td class="custom-colouring">{{ enrolment.lecturer.name }}</b-td>

            </b-body>
          </b-table-simple>

          <b-button class="back-button" @click="onBackPressed()"><i class="fas fa-arrow-left"></i></b-button>
          <b-button style="float: right;" variant="outline-warning" @click="editEnrolment(enrolment.id)"><i class="fas fa-pencil-alt"></i></b-button>

          <b-modal ref="enrolments-toast" id="modal-1">
            <h1 class="my-modal-title"><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Confirm Deletion?</h1?
              <p class="my-4">This lecturer has multiple enrolments assigned to them, are you sure you want to delete it? All enrolments associated with this lecturers will be permanently removed.</p>
          </b-modal>

        </b-card-text>

      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    data() {
      return {
        enrolment: {},
        show: true,
        loggedIn: false
      }
    },
    created() {
      // console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }

      let app = this;
      let token = localStorage.getItem('token');
      axios.get(`/api/enrolments/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.enrolment = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    methods: {
      editEnrolment(id) {
        let app = this;
        app.$router.push("/enrolments/edit/"+id);
      },
      onBackPressed() {
        let app =this;
        app.$router.push("/enrolments");
      }
    }
  }
</script>

<style scoped>

.custom-title-colouring {
  color: #ff0055;
  font-weight: bold;
  font-size: 18px;
  border-top-width: 0px!important;
}

.custom-colouring {
  color: #fff;
  border-top-width: 0px!important;
}

body {
  background-color: #2a2a2a;
}

.createCard {
  margin-top: 60px;
  margin-bottom: 60px;
  background-color: #424242;
  margin-bottom: 350px;
}


.title-custom {
  color: #ff0055;
  font-weight: bold;
}

.back-button {
  border-color: #ff0055;
  background-color: transparent;
  color: #ff0055;
  margin-right: 6px;
}

.back-button:hover {
  background-color: #ff0055;
  color: #fff;
}

.show-delete {
  float: right;
  margin-left: 8px;
}



</style>
