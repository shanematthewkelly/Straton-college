<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>
      <b-card
      class="createCard"
        v-else
        tag="article">

        <h1 class="title-custom">Create Course</h1>

        <b-form class="createForm" @submit="submitForm">

          <!-- Vuelidate uses $v as a computed property which means it is cached until something updates, it also makes a call to 'validateState method' to check for any errors in the validation-->
          <!-- It also uses a v-model which is used for two-way data binding -->
          <b-form-group class="custom-input"
            id="input-group-1"
            label-for="input-1"
            label="Enter Title">
            <b-form-input class="input-coloring"
              id="input-1"
              v-model="$v.form.title.$model"
              :state="validateState('title')"
              aria-describedby="input-1-live-feedback"
              type="text"
              required>
            </b-form-input>
            <b-form-invalid-feedback
          id="input-1-live-feedback">This is a required field and must be under 50.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-2"
            label-for="input-2"
            label="Enter Code">
            <b-form-input class="input-coloring"
              id="input-2"
              v-model="$v.form.code.$model"
              :state="validateState('code')"
              aria-describedby="input-2-live-feedback"
              type="text"
              required>
            </b-form-input>
            <b-form-invalid-feedback
            id="input-2-live-feedback">This is a required field and must be exactly 5 characters.</b-form-invalid-feedback>
            </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-3"
            label-for="input-3"
            label="Enter Description">
            <b-form-input class="input-coloring"
              id="input-3"
              v-model="$v.form.description.$model"
              :state="validateState('description')"
              aria-describedby="input-3-live-feedback"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback
            id="input-3-live-feedback">This is a required field.</b-form-invalid-feedback>
            </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-4"
            label-for="input-4"
            label="Enter Points">
            <b-form-input class="input-coloring"
              id="input-4"
              v-model="$v.form.points.$model"
              :state="validateState('points')"
              aria-describedby="input-4-live-feedback"
              type="number"
              required
            ></b-form-input>
            <b-form-invalid-feedback
            id="input-4-live-feedback">This is a required field and must be between 100 and 600.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-5"
            label-for="input-5"
            label="Level">
            <b-form-input class="input-coloring"
              id="input-5"
              v-model="$v.form.level.$model"
              :state="validateState('level')"
              aria-describedby="input-5-live-feedback"
              type="number"
              required
            ></b-form-input>
            <b-form-invalid-feedback
            id="input-5-live-feedback">This is a required field and must be between 7 and 10.</b-form-invalid-feedback>
          </b-form-group>

          <b-button class="my-custom-btn" @click.prevent="submitForm" variant="primary"><i class="fas fa-share-square"></i>&nbsp;&nbsp;SUBMIT</b-button>
        </b-form>
      </b-card>

      <!-- Modal used for displaying a message to let the user know of validation erros in the form-->
      <b-modal hide-footer ref="enrolments-toast" id="modal-1">
        <h1 class="my-modal-title"><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Validation Error!</h1?
          <p class="my-4">There are validation errors within your form, please fix them if possible.</p>
          <b-button class="btn btn-secondary" @click="closeModal()" right>Close</b-button>
      </b-modal>

    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';
import { validationMixin } from "vuelidate";

  export default {
    mixins: [validationMixin],
    data() {
      // returns the form with its' fields,which is referenced by the v-model (data-binding), amongst other things such as courses
      return {
        course: {},
        show: true,
        loggedIn: false,

        form: {
          title: '',
          code:'',
          description: '',
          points: '',
          level:''
        }
      }
    },
    //form validation and attributes associated
    validations: {
      form: {
        title: {
          required,
          maxLength: maxLength(50)
        },
        code: {
          required,
          maxLength: maxLength(5),
          minLength: minLength(5)
        },
        description: {
          required
        },
        points: {
          required,
          between: between(100,600),
          maxLength: maxLength(3)
        },
        level: {
          required,
          between: between(7, 10)
        }
      }
    },
    //when the page is first loaded
    created() {
      //icheck made to see if the token is retreived from local storage, if so set the loggedIn boolean to be true (user logged in)
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
      else {
        //else the user does not have the token, so set the loggedIn boolean to be false
        this.loggedIn = false;
      }

    },
    methods: {
      //already explained in courses index
      validateState(title) {
      const { $dirty, $error } = this.$v.form[title];
      return $dirty ? !$error : null;
    },
      submitForm() {
        let app = this;
        let token = localStorage.getItem('token');

        app.$v.form.$touch();
        if (app.$v.form.$anyError) {
          app.$bvModal.show('modal-1');
        } else {

          //post request to api/courses with the data in the request body
          axios.post(`/api/courses`, {
              title: app.form.title,
              code: app.form.code,
              description: app.form.description,
              points: app.form.points,
              level: app.form.level,
          },
          {
            //already explained
            headers: { Authorization: "Bearer " + token }
          })
          //already explained
          .then(function (response) {
            app.$router.push('/courses');
          })
        }
      },
      //already explained
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

.error {
  margin-top: 5px;
  color: #ff0055;
}



</style>
