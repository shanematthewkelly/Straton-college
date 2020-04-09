
<!-- The logic of this file is near identical to the course create file, please refer to that file -->
<!-- The only differences that can be seen here are for get requests, which are commented appropriately -->

<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>
      <b-card
        v-else
        class="createCard"
        tag="article">

        <h1 class="title-custom">Edit Course</h1>

        <b-form class="createForm" @submit="submitForm">
          <b-form-group class="custom-input"
            id="input-group-1"
            label-for="input-1"
            label="Enter Title">
            <b-form-input class="input-coloring"
              id="input-1"
              placeholder="Enter title"
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
            label="Code">
            <b-form-input class="input-coloring"
              id="input-2"
                placeholder="Enter code"
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
              placeholder="Enter description"
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
            label="Points">
            <b-form-input class="input-coloring"
              id="input-4"
              placeholder="Enter points"
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
              placeholder="Enter level"
              v-model="$v.form.level.$model"
              :state="validateState('level')"
              aria-describedby="input-5-live-feedback"
              type="number"
              required
            ></b-form-input>
            <b-form-invalid-feedback
            id="input-5-live-feedback">This is a required field and must be between 7 and 10.</b-form-invalid-feedback>
          </b-form-group>

          <b-button class="my-custom-btn" @click.prevent="submitForm" variant="primary"><i class="fas fa-share-square"></i>&nbsp;&nbsp;UPDATE</b-button>
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
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';
import { validationMixin } from "vuelidate";

  export default {
    mixins: [validationMixin],
    data() {
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

      //get request made to the ID of the selected course
      axios.get(`/api/courses/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        //sets app.form as the response
        app.form = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    methods: {
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

        //put request made in order to update the values 
        axios.put(`/api/courses/${app.$route.params.id}`, {
            title: app.form.title,
            code: app.form.code,
            description: app.form.description,
            points: app.form.points,
            level: app.form.level,
        },
        {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function (response) {
          app.$router.push('/courses');
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



</style>
