<template>
  <div class="hello">
    <div class="container">
      <h1>ToDo List</h1>
      <br />
      <div class="container">
        <form class="form-group">
          <label class="w-10">Email address</label>
          <input type="text" class="form-control w-8" v-model="text" />
          <button
            type="submit"
            @click.prevent="addTodo(text)"
            class="btn btn-primary"
          >
            Add
          </button>
        </form>
        <div>
          <transition-group name="fade" tag="ul">
            <div
              class="card wid-85 m-auto bg-light"
              :class="{ 'border-success': finishColor }"
              v-for="(item, index) in todos"
              :key="index"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col col-7  d-flex justify-content-center align-items-center"
                  >
                    <p
                      class="marg-bottom lead text-center"
                      :class="{ finishTask: lineFinishClass }"
                      v-if="forEdit !== index"
                    >
                      {{ item }}
                    </p>
                    <input
                      type="text"
                      class="form-control w-4"
                      v-model="textEdited"
                      v-else-if="forEdit == index"
                      @click.prevent="forEnable"
                      :class="{ 'border-danger': error }"
                    />
                  </div>
                  <div class="col col-5">
                    <div
                      class="btn btn-warning mr-2 ml-2"
                      v-if="showButton"
                      @click.prevent="close(index)"
                    >
                      <i class="fas fa-window-close text-white"></i>
                    </div>
                    <div
                      class="btn btn-success mr-2 ml-2"
                      v-if="showButton"
                      :disabled="validated == 1"
                      :class="{ disabled: disableClass }"
                      @click.prevent="done(index)"
                    >
                      <i class="fas fa-check-square"></i>
                    </div>
                    <div
                      class="btn btn-primary mr-2 ml-2"
                      @click.prevent="editText(index)"
                      v-if="showEditButton"
                    >
                      <i class="fas fa-edit"></i>
                    </div>
                    <div
                      class="btn btn-danger mr-2 ml-2"
                      @click.prevent="removeTask(index)"
                    >
                      <i class="fas fa-trash"></i>
                    </div>
                    <div
                      class="btn btn-success mr-2 ml-2"
                      @click.prevent="finishTask"
                      v-if="doneTask"
                    >
                      Done
                    </div>
                    <div
                      class="btn btn-success mr-2 ml-2"
                      @click.prevent="UnFinishTask"
                      v-else
                    >
                      Un-Done
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("vue2-animate/dist/vue2-animate.min.css");
export default {
  name: "HelloWorld",
  data() {
    return {
      text: "",
      todos: [],
      forEdit: '',
      textEdited: "",
      showButton: false,
      validated: 0,
      disableClass: true,
      showEditButton: true,
      lineFinishClass: false,
      finishColor: false,
      doneTask: true,
      error: false,
      // editIndex: null
    };
  },
  methods: {
    addTodo(alltext) {
      if (this.text === "") {
        return;
      } else {
        alltext = this.text;
        this.todos.push(alltext);
        this.text = "";
      }
    },
    editText(index) {
      this.showButton = true;
      this.forEdit = index;
    },
    forEnable() {
      this.validated = 1;
      return (this.disableClass = false);
    },
    done(index) {
      if (this.validated == 0) {
        return;
      } else {
        if (this.textEdited == "") {
          this.error = true;
        } else {
          this.forEdit = '';
          this.showButton = false;
          this.todos.splice(index, 1, this.textEdited);
        }
      }
      this.textEdited = "";
    },
    close() {
      this.forEdit = '';
      this.showButton = false;
    },
    finishTask() {
      this.lineFinishClass = true;
      this.showEditButton = false;
      this.finishColor = true;
      this.doneTask = false;
    },
    UnFinishTask() {
      this.lineFinishClass = false;
      this.showEditButton = true;
      this.finishColor = false;
      this.doneTask = true;
    },
    // isDisabled() {
    //   return !this.validated;
    // },
    removeTask(index) {
      return this.todos.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.w-10 {
  width: 100%;
  display: block;
}
.w-8 {
  width: 80%;
  display: inline-block !important;
  margin-right: 10px;
}
.wid-85 {
  width: 85%;
  margin-bottom: 10px;
}
.marg-bottom {
  margin-bottom: 0px;
  margin-top: 0px;
}
.w-4 {
  width: 40%;
}
.finishTask {
  text-decoration: line-through;
}
</style>
