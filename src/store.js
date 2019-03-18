import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    edit: false
  },
  getters: {
    countTodos: state => {
      return state.todos.length;
    },
    todoItems: state => {
      return state.todos;
    },
    editStatus: state => {
      return state.edit;
    }
  },
  mutations: {
    ADD_ITEM: (state, todo) => {
      state.todos.push(todo);
    },
    REMOVE_ITEM: (state, link) => {
      state.todos.splice(link, 1)
    },
    EDIT_ITEM: (state, status) => {
      state.edit = status;
    },
    UPDATE_ITEM: (state, newData) => {
      state.todos.find( (todo) => {
        let foundObjectIndex = state.todos.indexOf(todo);
        if (foundObjectIndex === newData.index) {
          state.todos[foundObjectIndex].title = newData.title;
          state.todos[foundObjectIndex].info = newData.info;
        }
      });
    }
  },
  actions: {
    addItem: (context, todo) => {
      context.commit("ADD_ITEM", todo);
    },
    removeItem: (context, todo) => {
      context.commit('REMOVE_ITEM', todo)
    },
    updateItem:(context, newData) => {
      context.commit('UPDATE_ITEM', newData)
      context.commit('EDIT_ITEM', false);
    }
  }
})