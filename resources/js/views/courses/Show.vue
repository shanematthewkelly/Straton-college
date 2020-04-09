<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>
      <b-card
        class="createCard"
        v-else
        tag="article">

        <b-card-text>

          <h1 class="title-custom">{{ course.title }}</h1>


          <b-table-simple hover responsive>
            <b-head>
              <b-tr>
                <b-th class="custom-title-colouring">Code</b-th>
                <b-th class="custom-title-colouring">Description</b-th>
                <b-th class="custom-title-colouring">Level</b-th>
                <b-th class="custom-title-colouring">Points</b-th>
              </b-tr>
            </b-head>
            <b-body>

                <b-td class="custom-colouring">{{ course.code }}</b-td>
                <b-td class="custom-colouring">{{ course.description }}</b-td>
                <b-td class="custom-colouring">{{ course.level }}</b-td>
                <b-td class="custom-colouring">{{ course.points }}</b-td>

            </b-body>
          </b-table-simple>

          <b-button class="back-button" @click="onBackPressed()"><i class="fas fa-arrow-left"></i></b-button>
          <b-button style="float: right;" variant="outline-warning" @click="editCourse(course.id)"><i class="fas fa-pencil-alt"></i></b-button>

          <!-- simple modal -->
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
        course: {},
        show: true,
        loggedIn: false
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }

      let app = this;
      let token = localStorage.getItem('token');
      //get request made to get the specific course selected, this is done when the route is first loaded
      axios.get(`/api/courses/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        //sets app.course to be the response
        app.course = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    methods: {
      //already explained
      editCourse(id) {
        let app = this;
        app.$router.push("/courses/edit/"+id);
      },
      //already explained
      onBackPressed() {
        let app =this;
        app.$router.push("/courses");
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


  </style>
