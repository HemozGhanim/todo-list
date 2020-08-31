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
            @click.prevent="addTodoFunction(text)"
            class="btn btn-primary"
          >
            Add
          </button>
          <!-- <button
            type="submit"
            @click.prevent="getMyListLocalFunction"
            class="btn btn-primary"
          >
            get data
          </button> -->
        </form>
        <div>
          <transition-group name="bounce" tag="ul">
            <div
              class="card wid-85 m-auto bg-light "
              :class="{ 'border-success': item.finishColor }"
              v-for="(item, index) in todos"
              :key="item.id"
              style="animation-duration: 0.5s"
            >
              <div
                class="alert alert-success"
                role="alert"
                v-if="item.finished"
              >
                Your Task has been finished - goto Finished Tab
              </div>
              <todoItem
                :forEnable="forEnable"
                :close="close"
                :done="done"
                :text="text"
                :editText="editText"
                :item="item"
                :index="index"
                :forEdit="forEdit"
                :textEdited="textEdited"
                :validated="validated"
                :disableClass="disableClass"
                :lineFinishClass="lineFinishClass"
                :error="error"
                :isEdit="isEdit"
                :removeTaskStoreFunction="removeTaskStoreFunction"
                :finishTaskStoreFunction="finishTaskStoreFunction"
              />
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import todoItem from "./item";
require("vue2-animate/dist/vue2-animate.min.css");
export default {
  name: "CreateItem",
  components: {
    todoItem,
  },
  data() {
    return {
      text: "",
      textEdited: "",
      forEdit: -2,
      validated: 0,
      disableClass: true,
      lineFinishClass: false,
      error: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters(["todos"]),
  },
  created() {
    this.$store.dispatch("getMyListLocal");
  },
  methods: {
    addTodoFunction(text) {
      this.$store.dispatch("addTaskStore", text);
      this.text = "";
    },
    removeTaskStoreFunction(item, index) {
      this.$store.dispatch("removeTaskStore", { item, index });
    },
    finishTaskStoreFunction(item, index) {
      this.$store.dispatch("finishTaskStore", { item, index });
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
        el.doneTask = true;
      }
    },
    forEnable() {
      this.validated = 1;
      return (this.disableClass = false);
    },
    done(textEdited, item) {
      this.textEdited = textEdited;
      if (this.validated == 0) {
        return;
      } else {
        if (this.textEdited == "") {
          this.error = true;
        } else {
          this.forEdit = -2;
          const indexTodo = this.todos.findIndex((todo) => todo.id === item.id);
          console.log(indexTodo);
          this.todos[indexTodo].textTodo = textEdited;
          this.todos[indexTodo].showEditButton = true;
          this.todos[indexTodo].showButton = false;
          this.todos[indexTodo].doneTask = false;
          this.todos[indexTodo].showTrashButton = true;
          this.isEdit = false;
        }
      }
      this.textEdited = "";
    },
    close(item) {
      this.forEdit = -2;
      const indexTodo = this.todos.findIndex((todo) => todo.id === item.id);
      this.todos[indexTodo].showEditButton = true;
      this.todos[indexTodo].showButton = false;
      this.todos[indexTodo].showTrashButton = true;
      this.textEdited = "";
      this.isEdit = false;
    },
  },
};
</script>

<!-- addTodo(text) {
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
          showTrashButton: true,
        });
        this.text = "";
      }
    },-->
<!--removeTask(item, index) {
  var check = confirm("delete ?");
  if (check) {
 this.deletedTodos.push(item);
  this.todos.splice(index, 1);}as
   }, -->

<!-- UnFinishTask(item) {
      if (item.showButton == true) {
        return;
      }
      const index = this.todos.findIndex((todo) => todo.id === item.id);
      console.log(index);

      this.todos[index].completed = false;
      this.todos[index].finishColor = false;
      this.todos[index].doneTask = true;
      this.todos[index].showEditButton = true;
      this.todos[index].showTrashButton = true;
    }, -->

<!-- finishTask(item) {
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
    }, -->

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
