

<!-- The logic of this file is near identical to the course index file, please refer to that file -->


<template>
  <b-row align-h="center">
    <b-col cols="12">

      <b-container class="custom-cont" fluid>
        <div>
          <h1 class="image-text-custom">Our Lecturers</h1>
      </div>
      <div>
        <p class="image-text-custom2">Discover Straton's lecturers here today! All in one place.
          <br>Everything you need, made simple, an easy-to-use college platform</p>
      </div>
      <div>
        <img class="circle-img" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png">
        <p class="image-text-custom3">Create, Read, Update &amp; Delete</p>
      </div>
      <div>
        <img class="circle-img2" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png">
        <p class="image-text-custom4">Organised All In  One Place</p>
      </div>
      <div>
        <b-button class="my-custom-btn" @click="createCourse()"><i class="fas fa-pencil-alt"></i>&nbsp;&nbsp;Create Lecturer
        </b-button>
      </div>
      </b-container>

      <div class="row align-items-center customDiver">
        <img class="searchImage" src="../../../images/search.png">
        <input class="search" type="text" v-model="searchBar" placeholder="Search lecturer by name..."/>
      </div>

      <b-table-simple hover responsive>
          <b-body>
            <b-container>

          <b-tr v-for="(item, index) in filteredItems" :key="item.id">
          <b-card class="custom-card" @click="showCourse(item.id)">
            <b-tr>
              <b-th class="custom-title-colouring">Name</b-th>
              <b-th class="custom-title-colouring">Address</b-th>
              <b-th class="custom-title-colouring">Email</b-th>
              <b-th class="custom-title-colouring">Phone</b-th>
            </b-tr>

            <b-td class="custom-colouring">{{ item.name }}</b-td>
            <b-td class="custom-colouring">{{ item.address }}</b-td>
            <b-td class="custom-colouring">{{ item.email }}</b-td>
            <b-td class="custom-colouring">{{ item.phone }}</b-td>
            </b-card>

            <div class="custom-horizontal-div">
            <b-button class="custom-btn" variant="outline-success" @click="showCourse(item.id)"><i class="fas fa-eye"></i></b-button>
            <b-button class="custom-btn" variant="outline-warning" @click="editCourse(item.id)"><i class="fas fa-pencil-alt"></i></b-button>
            <b-button class="custom-btn" variant="outline-danger" @click="deletePrompt(item.id, index)"><i class="fas fa-trash-alt"></i></b-button>
          </div>
          </b-tr>
        </b-container>

        <b-modal hide-footer ref="enrolments-toast" id="modal-1">
          <h1 class="my-modal-title"><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Confirm Deletion?</h1?
            <p class="my-4">This lecturer has multiple enrolments assigned to them, are you sure you want to delete this lecturer? All enrolments associated with this lecturer will be permanently removed. Please revise over these enrolments.</p>
            <b-button class="btn btn-primary" @click="deleteLecturerBtn()">Delete</b-button>
            <b-button class="btn btn-secondary" @click="closeModal()">Cancel</b-button>
            <b-button style="float:right" class="btn btn-primary-infect" @click="showAffected()"><i class="fas fa-list-ul"></i></b-button>
        </b-modal>

        <b-modal hide-footer ref="enrolments-toast" id="modal-2">
          <h1 class="my-modal-title"><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Confirm Deletion?</h1?
            <p class="my-4">Are you sure you want to delete this lecturer? All their information will be permanently removed</p>
            <b-button class="btn btn-primary" @click="deleteLecturerBtn()">Delete</b-button>
            <b-button class="btn btn-secondary" @click="closeModal()">Cancel</b-button>
        </b-modal>

        <b-modal hide-footer ref="enrolments-toast" id="modal-3">
          <h1 class="my-modal-title"><i class="fas fa-list-alt"></i>&nbsp;&nbsp;Affected Enrolments</h1?
            <p class="my-4">The following list of enrolments will be deleted if you choose to continue with your deletion of this lecturer.</p>
            <b-tr v-for="item in items" :key="item.id">
              <b-tr v-for="enrolment in item.enrolments" :key="enrolment.id">
                <b-card class="custom-card2">
                  <b-tr>
                    <b-th class="custom-title-colouring px-3">ID</b-th>
                    <b-th class="custom-title-colouring px-3">DATE</b-th>
                    <b-th class="custom-title-colouring px-3">TIME</b-th>
                    <b-th class="custom-title-colouring px-3">STATUS</b-th>
                  </b-tr>

                  <b-td class="custom-colouring px-3">{{ enrolment.id }}</b-td>
                  <b-td class="custom-colouring px-3">{{ enrolment.date }}</b-td>
                  <b-td class="custom-colouring px-3">{{ enrolment.time }}</b-td>
                  <b-td class="custom-colouring px-3">{{ enrolment.status }}</b-td>

              </b-card>
            </b-tr>
            </b-tr>
        </b-modal>

        </b-body>
      </b-table-simple>

      <div class="footer">
        <p class="copyright">Copyright - Straton College 2020</p>
      </div>

    </b-col>
  </b-row>

</template>
<script>
import LoaderAnim from '../../components/LoaderAnim'
export default {
  components: {
    LoaderAnim
  },
  data() {
    return {
      items: [],
      searchBar: '',
      lecturerId:'',
      lecturerIndex:''
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    axios.get('/api/lecturers', {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.items = response.data.data;

    })
    .catch(function (error) {
       console.log(error);
    })
  },
  computed: {
    filteredItems: function() {
      return this.items.filter((item) => {
        return item.name.toLowerCase().match(this.searchBar.toLowerCase());
      });
    }
  },
  methods: {
    deletePrompt(id, index) {
      let app = this;
      let token = localStorage.getItem('token');
      app.lecturerId = id;
      app.lecturerIndex = index;

      axios.get('/api/lecturers/'+app.lecturerId, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function(response) {
      const enrolmentArray = response.data.data.enrolments

        if(enrolmentArray.length!==0) {
          app.$bvModal.show('modal-1');
        } else {
          app.$bvModal.show('modal-2');
        }
      })
    },
    deleteLecturerBtn() {
      let app = this;
      let token = localStorage.getItem('token');

      axios.get('/api/lecturers/'+app.lecturerId, {
        headers: { Authorization: "Bearer " + token}
      })

      .then(function(response) {
        const enrolmentArray = response.data.data.enrolments

        if(enrolmentArray.length!==0) {

          // first we must loop through the array of enrolments and delete the enrolments associated with the lecturer
          for (var i = 0; i < enrolmentArray.length; i++) {
            const enrolment = enrolmentArray[i]
            axios.delete("api/enrolments/"+enrolment.id, {
              headers: { Authorization: "Bearer " + token}
          })
        }
        //After, we delete the lecturer as it now has no enrolments attached
        axios.delete("api/lecturers/"+app.lecturerId, {
          headers: { Authorization: "Bearer " + token}
        })
        .then(function(response) {
          //locally delete
          app.$delete(app.items, app.lecturerIndex)
          //hide modal
          app.$bvModal.hide('modal-1');
        })

        } else {
          //there are no enrolments attached, simply run the following function responsible for deleteing single lecturers
          app.deleteLecturer(app.lecturerId, app.lecturerIndex);
        }
      })
      .catch(function(error) {
        console.log("DELETE BUTTON FAILED", error);
      })
    },
    deleteLecturer(id, index) {
      let app = this;
      let token = localStorage.getItem('token');

      axios.delete("/api/lecturers/"+id, {
          headers: { Authorization: "Bearer " + token}

      })
      .then(function(response) {
        app.$delete(app.items, index);
        app.$bvModal.hide('modal-2');
      })
      .catch(function(error) {
        console.log(error.data);
      })
    },
    showAffected() {
      let app = this;
      let token = localStorage.getItem('token');

      axios.get('/api/lecturers/'+app.lecturerId, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function(response) {
      const enrolmentArray = response.data.data.enrolments
      app.$bvModal.show('modal-3');

      for (var i = 0; i < enrolmentArray.length; i++) {
        const enrolment = enrolmentArray[i]
        axios.get("api/enrolments/"+enrolment.id, {
          headers: { Authorization: "Bearer " + token}
      })
      console.log("GETTING THE INFECTED ENROLMENTS")
    }
    })

    },
    showCourse(id) {
      let app = this;
      app.$router.push("/lecturers/show/"+id);
    },
    editCourse(id) {
      let app = this;
      app.$router.push("/lecturers/edit/"+id);
    },
    createCourse() {
      let app = this;
      app.$router.push("/lecturers/create/");
    },
    closeModal() {
      let app = this;
      app.$bvModal.hide('modal-1');
      app.$bvModal.hide('modal-2');
    }
  }
}
</script>
<style scoped>

.custom-card2 {
  margin-top: 35px;
  background-color: #2a2a2a;;
  border-radius: 8px!important;
  cursor:pointer;
}

.custom-card {
  margin-top: 35px;
  background-color: #424242;
  border-radius: 8px!important;
  cursor:pointer;
}

.custom-cont {
  width: 100%;
   height: 380px;
   background-image: url('../../../images/lecturerGraphic.png');
   background-size: cover;
   margin-bottom: 60px;
   background-repeat: no-repeat;
   background-position: 50% 50%;
}

.custom-horizontal-div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding-top: 20px;
}

.custom-btn {
  margin-right: 15px;
}

.image-text-custom {
  z-index: 100;
  position: absolute;
  color: white;
  font-size: 60px;
  font-weight: bold;
  text-align: left;
padding: 38px

}

.image-text-custom2 {
  z-index: 100;
  position: absolute;
  color: white;
  font-size: 15px;
  text-align: left;
  margin-top: 60px;
  padding: 48px
}

.image-text-custom3 {
  z-index: 100;
  color: white;
  font-size: 15px;
  text-align: left;
  margin-left: 100px;
  margin-top: -32px;
}

.text-center {
  color: #fff;
  font-size: 80px;
  font-weight: bold;
  padding: 50px;
}

.circle-img {
  width: 30px;
  height: 40px;
  margin-left: 58px;
   margin-top: 178px;
}

.circle-img2 {
  width: 30px;
  height: 40px;
  margin-left: 60px;
}

.image-text-custom4 {
  z-index: 100;
  color: white;
  font-size: 15px;
  text-align: left;
  margin-left: 100px;
  margin-top: -32px;
}

.my-custom-btn {
  background-color: #ff0055;
  z-index: 100;
  margin-left: 60px;
  margin-top: 20px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 20px;
  border-color: #ed0937;
}

.my-custom-btn:hover {
  background-color: #ff0033;
  border-color: #ff0033;
}

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

.modal-content {
  background-color: #424242!important;
  color: #fff!important;
}

.my-modal-title {
  color: #ff0055;
  font-weight: bold;
  font-size: 30px;
}

.modal-header {
  border: 0px!important;
  padding-bottom: 0px!important;
}

.modal-footer{
  border: 0px!important;
}

.modal-body {
  padding-top: 16px!important;
  margin-top: 0px!important;
}

.btn-primary {
  background-color: #ff0055!important;
  border-color: #ff0055!important;
  font-weight: bold;
}

.footer {
  margin-top: 120px;
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

.search {
  width: 380px;
  border-radius: 30px;
  background-color: transparent;
  border: solid;
  border-color: #fff;
  color: #fff;
  padding: 15px;
  margin-right: auto;
}

.search:hover {
  background-color: transparent;
  border-color: #ff0055;
  color: #fff;
}

::placeholder {
  color: #fff;
font-size: 18px;
}

.customDiver {
  margin-top: 100px;
}

.btn-primary-infect {
  background-color: #424242!important;
  border-color: #ff0055!important;
  font-weight: bold;
}

textarea:focus, input:focus{
    outline: none;
}

.searchImage {
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: 10px;
}


</style>
