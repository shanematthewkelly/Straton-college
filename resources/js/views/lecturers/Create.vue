
<!-- The logic of this file is near identical to the course create file, please refer to that file -->

<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">Please login to view this page.</h3>

      <b-card
        class="createCard"
        v-else
        tag="article">

        <h1 class="title-custom">Create Lecturer</h1>

        <b-form class="createForm" @submit="submitForm">
          <b-form-group class="custom-input"
            id="input-group-1"
            label-for="input-1"
            label="Full Name">
            <b-form-input class="input-coloring"
              id="input-1"
              v-model="$v.form.name.$model"
              :state="validateState('name')"
              aria-describedby="input-1-live-feedback"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback
          id="input-1-live-feedback">This is a required field and must be under 50.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-2"
            label-for="input-2"
            label="Full Address">
            <b-form-input class="input-coloring"
              id="input-2"
              v-model="$v.form.address.$model"
              :state="validateState('address')"
              aria-describedby="input-2-live-feedback"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback
          id="input-2-live-feedback">This is a required field and must be under 100.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-3"
            label-for="input-3"
            label="Email">
            <b-form-input class="input-coloring"
              id="input-3"
              v-model="$v.form.email.$model"
              :state="validateState('email')"
              aria-describedby="input-3-live-feedback"
              type="email"
              required
            ></b-form-input>
            <b-form-invalid-feedback
          id="input-3-live-feedback">This is a required field which must be unique and under 50 characters.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group class="custom-input"
            id="input-group-4"
            label-for="input-4"
            label="Phone Number">
            <b-form-input class="input-coloring"
              id="input-4"
              v-model="$v.form.phone.$model"
              :state="validateState('phone')"
              aria-describedby="input-4-live-feedback"
              type="number"
              required
            ></b-form-input>
            <b-form-invalid-feedback
          id="input-4-live-feedback">This is a required field and must be under 20.</b-form-invalid-feedback>
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
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';
import { validationMixin } from "vuelidate";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        lecturer: {},
        show: true,
        loggedIn: false,

        form: {
          name: '',
          address:'',
          email: '',
          phone: '',
        }
      }
    },

    validations: {
      form: {
        name: {
          required,
          maxLength: maxLength(50)
        },
        address: {
          required,
          maxLength: maxLength(100),
        },
        email: {
          required,
          maxLength: maxLength(50),
          email,

        },
        phone: {
          required,
          maxLength: maxLength(20)
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

    },
    methods: {
      validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
      submitForm() {

        let app = this;
        let token = localStorage.getItem('token');

        app.$v.form.$touch();
        if (app.$v.form.$anyError) {
          app.$bvModal.show('modal-1');

        } else {

        axios.post(`/api/lecturers`, {
            name: app.form.name,
            address: app.form.address,
            email: app.form.email,
            phone: app.form.phone,
        },
        {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function (response) {
          app.$router.push('/lecturers');
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
