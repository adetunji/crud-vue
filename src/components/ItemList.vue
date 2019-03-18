<template>
  <div class="item-list">
    <h1 v-html="itemList" >{{itemList}} {{ countTodos }}</h1>
    <div v-for="(todo, index) in todoItems" v-bind:key="index">
      <div><b>Title</b>
      {{todo.title}}
      </div>
      <div><b>Information</b>
      {{todo.info}}
      </div>
    <vs-icon icon="edit" color="white" bg="#173F5F" round size="medium" v-on:click.native="editItem(todo, index)"></vs-icon>
    <vs-icon icon="delete" color="white" bg="#ED553B" round size="medium" v-on:click.native="removeTodo(todo)"></vs-icon>
    <hr>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import { eventBus } from '../event-bus'

  export default {
    name: "ItemList",
    props: {
      msg: {
        title: String,
        information: String
      }
    },
    data() {
      return {
        itemList: "Item List"
      }
    },
    methods: {
      ...mapActions([
        'removeItem'
      ]),
      ...mapMutations([
        'EDIT_ITEM'
      ]),
      removeTodo: function(todo) {
        this.removeItem(todo)
      },
      editItem: function(todoItem, indexInArray) {
        this.EDIT_ITEM(true);
        eventBus.$emit('updateItem', todoItem, indexInArray)
      }
    },
    computed: {
      ...mapGetters([
        "countTodos",
        "todoItems"
      ])
    }
  }
</script>

<style scoped>
  .item-list {
    float: right;
    margin-right: 500px;
  }
  .vs-icon {
    cursor: pointer;
    margin: 5px;
  }

</style>