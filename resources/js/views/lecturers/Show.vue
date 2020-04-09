
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

          <h1 class="title-custom">{{ lecturer.name }}</h1>

          <b-table-simple hover responsive>
            <b-head>
              <b-tr>
                <b-th class="custom-title-colouring">Address</b-th>
                <b-th class="custom-title-colouring">Email</b-th>
                <b-th class="custom-title-colouring">Phone</b-th>
              </b-tr>
            </b-head>
            <b-body>
                <br>
                <b-td class="custom-colouring">{{ lecturer.address }}</b-td>
                <b-td class="custom-colouring">{{ lecturer.email }}</b-td>
                <b-td class="custom-colouring">{{ lecturer.phone }}</b-td>

            </b-body>
          </b-table-simple>

          <b-button class="back-button" @click="onBackPressed()"><i class="fas fa-arrow-left"></i></b-button>
          <b-button style="float: right;" variant="outline-warning" @click="editLecturer(lecturer.id)"><i class="fas fa-pencil-alt"></i></b-button>

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
        lecturer: {},
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
      axios.get(`/api/lecturers/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.lecturer = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    methods: {
      editLecturer(id) {
        let app = this;
        app.$router.push("/lecturers/edit/"+id);
      },
      onBackPressed() {
        let app =this;
        app.$router.push("/lecturers");
      }
    }
  }
</script>

<style>

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
