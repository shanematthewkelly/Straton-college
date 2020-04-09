
<!-- The logic of this file is near identical to the course create file, please refer to that file -->
<!-- The only differences that can be seen here are for the drop down menus, which are commented appropriately -->

<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>

      <b-card
        class="createCard"
        v-else
        tag="article">

        <h1 class="title-custom">Create Enrolment</h1>

        <b-form class="createForm" @submit="submitForm">
          <b-form-group class="custom-input"
            id="input-group-1"
            label-for="input-1"
            label="Enter Date">
            <b-form-input class="input-coloring"
              id="input-1"
              v-model="$v.form.date.$model"
              :state="validateState('date')"
              aria-describedby="input-1-live-feedback"
              type="date"
              required>
            </b-form-input>
            <b-form-invalid-feedback
          id="input-1-live-feedback">This is a required field</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-2"
            label-for="input-2"
            label="Enter Time">
            <b-form-input class="input-coloring"
              id="input-2"
              v-model="$v.form.time.$model"
              :state="validateState('time')"
              aria-describedby="input-2-live-feedback"
              type="time"
              required>
            </b-form-input>
            <b-form-invalid-feedback
          id="input-2-live-feedback">This is a required field</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-3"
            label-for="input-3"
            label="Status">

            <b-form-select
            name='courses'
            v-model="$v.form.status.$model"
            :state="validateState('status')"
            aria-describedby="input-3-live-feedback"
            class='form-control'>

            <option
            placeholder="Select A Status"
            v-for="option in options"
            v-bind:value='option.value'>

            {{ option.text }}

          </option>
          </b-form-select>
          <b-form-invalid-feedback
        id="input-3-live-feedback">This is a required field</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-4"
            label-for="input-4"
            label="Course">

            <b-form-select
            name='courses'
            v-model="$v.form.course_id.$model"
            :state="validateState('course_id')"
            aria-describedby="input-4-live-feedback"
            class='form-control'>

            <!--loops through the array of courses and binds the id -->
            <option
            placeholder="Select A Course"
            v-for="course in courses"
            v-bind:value='course.id'>
            <!-- sets it to the coures's title-->
            {{ course.title }}

          </option>
          </b-form-select>
          <b-form-invalid-feedback
        id="input-4-live-feedback">This is a required field</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-5"
            label-for="input-5"
            label="Lecturer">

            <b-form-select
            name='courses'
            v-model="$v.form.lecturer_id.$model"
            :state="validateState('lecturer_id')"
            aria-describedby="input-5-live-feedback"
            class='form-control'>

            <option
            placeholder="Select A Lecturer"
            v-for="lecturer in lecturers"
            v-bind:value='lecturer.id'>

            {{ lecturer.name }}

          </option>
          </b-form-select>
          <b-form-invalid-feedback
        id="input-5-live-feedback">This is a required field</b-form-invalid-feedback>
          </b-form-group>

          <b-button class="my-custom-btn" @click.prevent="submitForm" variant="primary"><i class="fas fa-share-square"></i>&nbsp;&nbsp;SUBMIT</b-button>
        </b-form>
      </b-card>

      <b-modal hide-footer ref="enrolments-toast" id="modal-1">
        <h1 class="my-modal-title"><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Validation Error!</h1?
          <p class="my-4">There are validation errors within your form, please fix them if possible.</p>
          <b-button class="btn btn-secondary" @click="closeModal()" right>Close</b-button>
      </b-modal>

    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';
import { validationMixin } from "vuelidate";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        enrolment: {},
        show: true,
        loggedIn: false,
        courses:'',
        lecturers:'',
        options: [
          { text: 'Interested', value: 'interested'},
          { text: 'Assigned', value: 'interested'},
          { text: 'Associate', value: 'associate'},
          { text: 'Career Break', value: 'career_break'}

        ],
        form: {
          date: '',
          time:'',
          status: '',
          course_id: '',
          lecturer_id:''
        }
      }
    },
    validations: {
      form: {
        date: {
          required,
        },
        time: {
          required,
        },
        status: {
          required
        },
        course_id: {
          required,
        },
        lecturer_id: {
          required,
        }
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

      //Now we retrieve the courses in order to populate the dropdown list
      axios.get('/api/courses', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response) {
        app.courses = response.data.data;
      })
      .catch(function(response) {
        console.log(error);
      });

      //Now we retrieve the lecturers in order to populate the dropdown list
      axios.get('/api/lecturers', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response) {
        app.lecturers = response.data.data;
      })
      .catch(function(response) {
        console.log(error);
      });

    },
    methods: {
      validateState(date) {
      const { $dirty, $error } = this.$v.form[date];
      return $dirty ? !$error : null;
    },
      submitForm() {
        let app = this;
        let token = localStorage.getItem('token');

        app.$v.form.$touch();
        if (app.$v.form.$anyError) {
          app.$bvModal.show('modal-1');
        } else {

        axios.post(`/api/enrolments`, {
            date: app.form.date,
            time: app.form.time,
            status: app.form.status,
            course_id: app.form.course_id,
            lecturer_id: app.form.lecturer_id,

        },
        {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function (response) {
          app.$router.push('/enrolments');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    closeModal() {
      let app = this;
      app.$bvModal.hide('modal-1');
    }
    }
  }
</script>

<style scoped>

body {
  background-color: #2a2a2a;
}

.createCard {
  margin-top: 60px;
  margin-bottom: 60px;
  background-color: #424242;
}

.createForm {
  background-color: #424242;
}

.title-custom {
  color: #ff0055;
  font-weight: bold;
}

.custom-input {
  color: #fff;
  font-weight: bold;
  background-color:
}

.input-coloring {
  background-color: #424242;
  border-color: #fff;
  color: #fff;
}

.input-coloring:hover {
  background-color: #424242;
  border-color: #ff0055;
  color: #fff;
}

.my-custom-btn {
  background-color: #ff0055;
  margin-top: 10px;
  margin-left: 0px!important;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  border-color: #ff0055;
  align-content: center;
}

.my-custom-btn:hover {
  background-color: #ff0033;
  border-color: #ff0033;
}

.custom-select {
  background-color: #424242;
  border-color: #fff;
  color: #fff;
}

.custom-select:hover {
  background-color: #424242;
  border-color: #ff0055;
  color: #fff;
}

</style>
