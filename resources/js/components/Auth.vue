<template>
  <b-row align-h="center">
    <b-col cols="8">
      <b-card
      class="createCard">

      <h1 class="title-custom">Login With Us</h1>

        <!-- Vuelidate uses $v as a computed property which means it is cached until something updates, it also makes a call to 'validateState method' to check for any errors in the validation-->
        <!-- It also uses a v-model which is used for two-way data binding -->
            <b-form-group class="custom-input"
              id="input-group-2"
              label-for="input-2"
              label="Email">
              <b-form-input class="input-coloring"
                id="input-2"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                aria-describedby="input-1-live-feedback"
                type="email"
                required>
              </b-form-input>
              <b-form-invalid-feedback
            id="input-1-live-feedback">This is a required field and must be unique</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group class="custom-input"
              id="input-group-2"
              label-for="input-2"
              label="Password">
              <b-form-input class="input-coloring"
                id="input-2"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                aria-describedby="input-2-live-feedback"
                type="password"
                required>
              </b-form-input>
              <b-form-invalid-feedback
            id="input-2-live-feedback">This is a required field and must be at least 6 characters</b-form-invalid-feedback>
              </b-form-input>
            </b-form-group>

            <br>
            <!-- Button with an on click listener set to prevent, which prevents form submission until validation is correct -->
            <b-button class="my-custom-btn" variant="primary" type="submit" @click.prevent="login()"><i class="fas fa-lock"></i>&nbsp;&nbsp;LOGIN</b-button>
            <br>
          </b-form>
        </b-card>
    </div>
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
import axios from "axios";
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';
import { validationMixin } from "vuelidate";

    export default {
      name:'Auth',
      mixins: [validationMixin],
         data () {
           // returns the form with its' fields,which is referenced by the v-model (data-binding)
            return {
              form: {
                email: '',
                password:''
              },
            courses: [],
              name: ""
          }
        },
        //form validation and attributes associated
        validations: {
          form: {
            email: {
              required,
              email,
              maxLength: maxLength(50)
            },
            password: {
              required,
              minLength: minLength(6)
            }

          }
        },
          methods: {
            //passes in the email
            validateState(email) {
              //setting a constant which passes in vuelidate's dirty and error variables
            const { $dirty, $error } = this.$v.form[email];
            return $dirty ? !$error : null;
          },
            login() {
              console.log("RUNING LOGIN FUNCTION");
              //setting the context to be equal to app as using 'this' within axios requests references its' context (file that it is stored in)
                let app = this;

                //check made to see if the form has been touched or left empty and user has attempted to submit it
                app.$v.form.$touch();

                //check amde to see if there is any errors with the form and if there is, display a modal to the user
                if (app.$v.form.$anyError) {
                  app.$bvModal.show('modal-1');
                } else {
                  //if the form is okay, make a post request to the API, and in the request body send over the inputted email and password
                axios.post('/api/login', {
                  email: app.form.email,
                  password: app.form.password
                })
                .then(function(response) {
                  //then in the response body set the user's name, email and password
                  app.name = response.data.name;
                  app.email = response.data.email;
                  app.password = response.data.password;
                  //set the token to the logged in user
                  localStorage.setItem('token', response.data.token);
                  //emit to login within App.vue
                  app.$emit('login');

                  console.log("TESTING");
                  //retreive the token from local storage and check to see if it is not equal to null
                  if (localStorage.getItem('token') !== null) {
                    //redirect the user here to a new page if they do infact have a valid token
                    app.$router.push('/')
                    console.log("USER LOGGED IN")
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          //simple method that hides the modal
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
