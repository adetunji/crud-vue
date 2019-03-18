<template>
  <div>
  <form class="item-component">
    <div>
      <h1 v-html="itemName">{{itemName}}</h1>
      <vs-input class="input-box" type="text" name="item-title" placeholder="Enter Title" v-model="itemTitle"/>
    </div>
    <div>
      <vs-textarea class="input-textarea" name="item-info" v-model="itemInfo" placeholder="Enter Information"></vs-textarea>
    </div>
    <vs-button color="primary" type="filled" v-on:click="addTodo" v-show="!editStatus">Add Item</vs-button>
    <vs-button color="dark" type="border" v-show="editStatus" v-on:click="updateListOfItems($event)">Update Item</vs-button>
    <vs-button color="dark" type="border" v-on:click="cancelUpdate" v-show="editStatus">Cancel</vs-button>
  </form>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';
  import { eventBus } from '../event-bus'

  export default {
    name: "ItemInput",
    data() {
      return {
        itemName: 'Add Your Items!',
        itemTitle: '',
        itemInfo: '',
        itemIndex: Number
      }
    },
    props: ['msg'],
    computed: {
      ...mapGetters([
        "editStatus"
      ])
    },
    methods: {
      ...mapActions([
        'addItem',
        'updateItem'
      ]),
      ...mapMutations([
        'EDIT_ITEM'
      ]),
      addTodo: function(event) {
        event.preventDefault();
        this.addItem({title: this.itemTitle, info: this.itemInfo})
        this.itemTitle = '';
        this.itemInfo = '';
      },
      updateListOfItems: function($event){
        $event.preventDefault();
        let updateData = {index: this.itemIndex, title: this.itemTitle, info: this.itemInfo};
        this.updateItem(updateData);
        this.itemTitle = '';
        this.itemInfo = '';
      },
      cancelUpdate: function(event) {
        event.preventDefault();
        this.EDIT_ITEM(false)
      }
    },
    updated(){
      eventBus.$on('updateItem', (data, index)=> {
        this.itemIndex = index;
        this.itemTitle = data.title;
        this.itemInfo = data.info;
      })
    }
  }
</script>

<style scoped>
  .item-component {
    float: left;
    margin-left: 100px;
  }
  .input-box {
    margin-bottom: 20px;
    width: 300px;
    height: 25px;
  }
  .input-textarea {
    height: 100px;
    width: 300px;
  }
  .vs-button {
    margin: 5px;
  }
</style>