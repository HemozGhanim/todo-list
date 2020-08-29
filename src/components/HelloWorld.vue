<template>
  <div class="hello">
    <div class="container">
      <h1>ToDo List</h1>
      <br />
      <div class="container">
        <form class="form-group">
          <label class="w-10">Add Your Tasks</label>
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
          <transition-group name="bounce" tag="ul">
            <div
              class="card wid-85 m-auto bg-light "
              :class="{ 'border-success': item.finishColor }"
              v-for="(item, index) in todos"
              :key="index"
              style="animation-duration: 0.5s"
            >
              <div class="card-body">
                <div class="row">
                  <div
                    class="col col-7  d-flex justify-content-center align-items-center"
                  >
                    <p
                      class="marg-bottom lead text-center"
                      :class="{ finishTask: item.completed }"
                      v-if="forEdit !== index"
                    >
                      {{ item.textTodo }}
                    </p>
                    <input
                      type="text"
                      class="form-control w-4 col-lg-6"
                      v-model="textEdited"
                      v-else-if="forEdit == index"
                      @click.prevent="forEnable"
                      :class="{ 'border-danger': error }"
                      :placeholder="item.textTodo"
                    />
                  </div>
                  <div class="col col-5">
                    <div
                      class="btn btn-primary mr-2 ml-2 mb-1"
                      v-if="item.showButton"
                      :disabled="validated == 1"
                      :class="{ disabled: disableClass }"
                      @click.prevent="done(textEdited, item)"
                    >
                      <i class="fas fa-check-square"></i>
                    </div>
                    <div
                      class="btn btn-danger mr-2 ml-2 mb-1"
                      v-if="item.showButton"
                      @click.prevent="close(item)"
                    >
                      <i class="fas fa-window-close text-white"></i>
                    </div>

                    <div
                      class="btn btn-primary mr-2 ml-2 mb-1"
                      @click.prevent="editText(item, index)"
                      :disabled="isEdit == true"
                      :class="{ disabled: isEdit }"
                      v-if="item.showEditButton"
                    >
                      <i class="fas fa-edit"></i>
                    </div>
                    <div
                      class="btn btn-danger mr-2 ml-2 mb-1"
                      @click.prevent="removeTask(index)"
                      v-if="item.showTrashButton"
                    >
                      <i class="fas fa-trash"></i>
                    </div>
                    <div
                      class="btn btn-success mr-2 ml-2 mb-1"
                      @click.prevent="finishTask(item)"
                      :disabled="isEdit"
                      :class="{ disabled: isEdit }"
                      v-if="item.doneTask"
                    >
                      finish
                    </div>
                    <div
                      class="btn btn-success mr-2 ml-2 mb-1"
                      @click.prevent="UnFinishTask(item)"
                      v-else
                    >
                      Un-Finish
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
      forEdit: "",
      textEdited: "",
      validated: 0,
      disableClass: true,
      lineFinishClass: false,
      error: false,
      currentIndex: 0,
      isEdit: false,
    };
  },
  methods: {
    addTodo(text) {
      if (text === "") {
        return;
      } else {
        this.todos.push({
          textTodo: text,
          id: Date.now().toString(),
          completed: false,
          finishColor: false,
          doneTask: true,
          showEditButton: true,
          showButton: false,
          showTrashButton: false,
        });
        this.text = "";
      }
    },
    editText(item, index) {
      if (this.isEdit) {
        return;
      } else {
        this.isEdit = true;
        this.forEdit = index;
        const indexTodo = this.todos.findIndex((todo) => todo.id === item.id);
        console.log(indexTodo);
        const el = this.todos[indexTodo];
        el.showEditButton = false;
        el.showButton = true;
        el.showTrashButton = false;
      }
    },
    forEnable() {
      this.validated = 1;
      return (this.disableClass = false);
    },
    done(textEdited, item) {
      if (this.validated == 0) {
        return;
      } else {
        if (this.textEdited == "") {
          this.error = true;
        } else {
          this.forEdit = "";
          const indexTodo = this.todos.findIndex((todo) => todo.id === item.id);
          console.log(indexTodo);
          this.todos[indexTodo].textTodo = textEdited;
          this.todos[indexTodo].showEditButton = true;
          this.todos[indexTodo].showButton = false;
          this.todos[indexTodo].showTrashButton = false;
          this.todos[indexTodo].doneTask = true;
          this.isEdit = false;
        }
      }
      this.textEdited = "";
    },
    close(item) {
      this.forEdit = "";
      const indexTodo = this.todos.findIndex((todo) => todo.id === item.id);
      this.todos[indexTodo].showEditButton = true;
      this.todos[indexTodo].showButton = false;
      this.todos[indexTodo].showTrashButton = false;
      this.textEdited = "";
      this.isEdit = false;
    },
    finishTask(item) {
      if (item.showButton == true) {
        return;
      }
      const index = this.todos.findIndex((todo) => todo.id === item.id);
      console.log(index);
      this.todos[index].completed = true;
      this.todos[index].finishColor = true;
      this.todos[index].doneTask = false;
      this.todos[index].showEditButton = false;
      this.todos[index].showTrashButton = true;
    },
    UnFinishTask(item) {
      if (item.showButton == true) {
        return;
      }
      const index = this.todos.findIndex((todo) => todo.id === item.id);
      console.log(index);

      this.todos[index].completed = false;
      this.todos[index].finishColor = false;
      this.todos[index].doneTask = true;
      this.todos[index].showEditButton = true;
      this.todos[index].showTrashButton = false;
    },
    removeTask(index) {
      var check = confirm("delete ?");
      console.log(check);
      if (check) {
        return this.todos.splice(index, 1);
      }
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
.hello {
  overflow: hidden;
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
  margin-bottom: 10px !important;
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
@media (min-width: 300px) and (max-width: 575.98px) {
  .container {
    padding-right: 3px !important;
    padding-left: 3px !important;
  }
  .w-8 {
    width: 74% !important;
  }
  .wid-85 {
    width: 95% !important;
  }
  .w-4 {
    width: 100% !important;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .w-8 {
    width: 90% !important;
  }
  .wid-85 {
    width: 100% !important;
  }
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
</style>
