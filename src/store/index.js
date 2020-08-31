import Vue from 'vue'
import Vuex from 'vuex'
import { setTimeout } from 'core-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deletedTodos: [],
    todos: [],
    finishTodo: []
  },
  mutations: {
    addItem(state, text) {
      if (text === "") {
        return;
      } else {
        state.todos = state.todos  || [];
        state.todos.push({
          textTodo: text,
          id: Date.now().toString(),
          completed: false,
          finishColor: false,
          doneTask: false,
          showEditButton: true,
          showButton: false,
          showTrashButton: true,
          finished: false,
          unfinished: false
        });
      }
      localStorage.setItem("TodoList", JSON.stringify(state.todos));
    },
    deletedItem(state, { item, index }) {
      var check = confirm("delete ?");
      if (check) {
        state.deletedTodos.push(item);
        localStorage.setItem("DeletedList", JSON.stringify(state.deletedTodos));
        state.todos.splice(index, 1);
        localStorage.setItem("TodoList", JSON.stringify(state.todos));

      }

    },
    finishTask(state, { item, index }) {
      if (item.showButton == true) {
        return;
      }
      const indexTodo = state.todos.findIndex((todo) => todo.id === item.id);
      state.todos[indexTodo].completed = true;
      state.todos[indexTodo].finishColor = true;
      state.todos[indexTodo].showEditButton = true;
      state.todos[indexTodo].showTrashButton = true;
      state.todos[indexTodo].finished = true;
      state.todos[indexTodo].unfinished = false;
      state.todos[indexTodo].doneTask = true;


      state.todos[indexTodo].finished = false;


      state.finishTodo.push(item);
      localStorage.setItem("FinishedList", JSON.stringify(state.finishTodo));

      state.todos.splice(index, 1);
      localStorage.setItem("TodoList", JSON.stringify(state.todos));

    },

    unfinishTask(state, { item, index }) {
      if (item.showButton == true) {
        return;
      }
      const indexTodo = state.finishTodo.findIndex((todo) => todo.id === item.id);
      state.finishTodo[indexTodo].completed = false;
      state.finishTodo[indexTodo].finishColor = false;
      state.finishTodo[indexTodo].showEditButton = true;
      state.finishTodo[indexTodo].showTrashButton = true;
      state.finishTodo[indexTodo].finished = false;
      state.finishTodo[indexTodo].unfinished = true;
      state.finishTodo[indexTodo].doneTask = false;


      state.finishTodo[indexTodo].unfinished = false;

      state.todos.push(item);
      localStorage.todos = state.todos;
      localStorage.setItem("TodoList", JSON.stringify(state.todos));

      state.finishTodo.splice(index, 1);
      localStorage.setItem("FinishedList", JSON.stringify(state.finishTodo));


    },
    undelete(state, { item, index }) {
      state.todos.push(item);
      localStorage.todos = state.todos;
      setTimeout(() => {
        state.deletedTodos.splice(index, 1);
        localStorage.setItem("DeletedList", JSON.stringify(state.deletedTodos));

      }, 2000);
    },
    getMyList(state) {
      if (state.todos == null) {
        return;
      }
      var mylist = localStorage.getItem("TodoList");
      state.todos = JSON.parse(mylist);
    },
    getDeletedList(state) {
      if (state.deletedTodos == null) {
        return;
      }
      var mylist = localStorage.getItem("DeletedList");
      state.deletedTodos = JSON.parse(mylist);
    },
    getFinishedList(state) {
      if (state.finishTodo == null) {
        return;
      }
      var mylist = localStorage.getItem("FinishedList");
      state.finishTodo = JSON.parse(mylist);
    },
    DeletdeletedItem(state, index) {
      var check = confirm("delete ?");
      if (check) {
        state.deletedTodos.splice(index, 1);
        localStorage.setItem("DeletedList", JSON.stringify(state.deletedTodos));
      }
    },
    DeletFinishedItem(state, index) {
      var check = confirm("delete ?");
      if (check) {

        state.finishTodo.splice(index, 1);
        localStorage.setItem("FinishedList", JSON.stringify(state.finishTodo));

      }

    },
  },
  actions: {
    addTaskStore({ commit }, text) {
      commit('addItem', text);
    },
    removeTaskStore({ commit }, { item, index }) {
      commit('deletedItem', item, index);
    },
    undeleteTaskStore({ commit }, { item, index }) {
      commit('undelete', item, index);
    },
    finishTaskStore({ commit }, { item, index }) {
      commit('finishTask', item, index);

    },
    unfinishTaskStore({ commit }, { item, index }) {
      commit('unfinishTask', item, index);
    },
    getMyListLocal({ commit }) {
      commit('getMyList');
    },
    getDeletedListLocal({ commit }) {
      commit('getDeletedList');
    },
    getFinishedListLocal({ commit }) {
      commit('getFinishedList');
    },
    DeletdeletedItemlocal({ commit }, index) {
      commit('DeletdeletedItem', index);
    },
    DeletFinishedItemlocal({ commit }, index) {
      commit('DeletFinishedItem', index);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    DeletedTodos(state) {
      return state.deletedTodos;
    },
    FinishedTodos(state) {
      return state.finishTodo;
    },
  }
})
