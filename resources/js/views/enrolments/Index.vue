
<!-- The logic of this file is near identical to the course index file, please refer to that file-->


<template>
  <b-row align-h="center">
    <b-col cols="12">

      <b-container class="custom-cont" fluid>
        <div>
          <h1 class="image-text-custom">Our Enrolments</h1>
      </div>
      <div>
        <p class="image-text-custom2">Discover Straton's enrolments here today! All in one place.
          <br>Everything you need, made simple, an easy-to-use college platform</p>
      </div>
      <div>
        <img class="circle-img" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png">
        <p class="image-text-custom3">Create, Read, Update &amp; Delete</p>
      </div>
      <div>
        <img class="circle-img2" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png">
        <p class="image-text-custom4">Organised All In One Place</p>
      </div>
      <div>
        <b-button class="my-custom-btn" @click="createCourse()"><i class="fas fa-pencil-alt"></i>&nbsp;&nbsp;Create Enrolment
        </b-button>
      </div>
      </b-container>

      <div class="row align-items-center customDiver">
        <img class="searchImage" src="../../../images/search.png">
        <input class="search" type="text" v-model="searchBar" placeholder="Search enrolments by course title..."/>
      </div>

      <b-table-simple hover responsive>
        <b-body>
          <b-container>

          <b-tr class="custom-enrolment-body" v-for="(item,index) in filteredItems" :key="item.id">
            <b-card class="custom-card" @click="showCourse(item.id)">
              <b-tr>
                <b-th class="custom-title-colouring">Date</b-th>
                <b-th class="custom-title-colouring">Time</b-th>
                <b-th class="custom-title-colouring">Status</b-th>
                <b-th class="custom-title-colouring">Course</b-th>
                <b-th class="custom-title-colouring">Lecturer</b-th>
              </b-tr>

            <b-td class="custom-colouring">{{ item.date }}</b-td>
            <b-td class="custom-colouring">{{ item.time }}</b-td>
            <b-td class="custom-colouring">{{ item.status }}</b-td>
            <b-td class="custom-colouring">{{ item.course.title }}</b-td>
            <b-td class="custom-colouring">{{ item.lecturer.name }}</b-td>
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
            <p class="my-4">Are you sure you want to delete this enrolment? This may affect lecturers &amp; courses assoicated with this enrolment</p>
            <b-button class="btn btn-primary" @click="deleteEnrolmentBtn()">Delete</b-button>
            <b-button class="btn btn-secondary" @click="closeModal()">Cancel</b-button>
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


export default {
  data() {
    return {
      items: [],
      searchBar: '',
      enrolmentId:'',
      enrolmentIndex:''
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    axios.get('/api/enrolments', {
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
        return item.course.title.toLowerCase().match(this.searchBar.toLowerCase());
      });
    }
  },
  methods: {
      deletePrompt(id, index) {
        let app = this;
        let token = localStorage.getItem('token');
        app.enrolmentId = id;
        app.enrolmentIndex = index;

        axios.get('/api/enrolments/'+app.enrolmentId, {
          headers: { Authorization: "Bearer " + token}
        })
        .then(function(response) {
        app.$bvModal.show('modal-1');
        })
      },
      deleteEnrolmentBtn() {
        let app = this;
        let token = localStorage.getItem('token');
        //there are no enrolments attached, simply run the following function responsible for deleteing single courses
        app.deleteEnrolment(app.enrolmentId, app.enrolmentIndex);
      },
    deleteEnrolment(id, index) {
      let app = this;
      let token = localStorage.getItem('token');

      axios.delete("/api/enrolments/"+app.enrolmentId, {
          headers: { Authorization: "Bearer " + token}

      })
      .then(function(response) {
        app.$delete(app.items, app.enrolmentIndex);
        app.$bvModal.hide('modal-1');
      })
      .catch(function(error) {
        console.log(error.data);
      })
    },
    showCourse(id) {
      let app = this;
      app.$router.push("/enrolments/show/"+id);
    },
    editCourse(id) {
      let app = this;
      app.$router.push("/enrolments/edit/"+id);
    },
    createCourse() {
      let app = this;
      app.$router.push("/enrolments/create");
    },
    closeModal() {
      let app = this;
      app.$bvModal.hide('modal-1');
    }
  }
}
</script>

<style>

.custom-card {
  margin-top: 35px;
  background-color: #424242;
  border-radius: 8px!important;
  cursor:pointer;
}

.custom-cont {
   width: 100%;
   height: 380px;
   background-image: url('../../../images/enrolmentGraphic.png');
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
