// To edit json
<template>
  <div>
    <v-text-field
      label="Add item"
      dense
      v-model="newItem"
      required
      @keydown.enter="add"
    ></v-text-field>
    <v-row v-for="(item,index) in array" v-bind:key="index">
      <v-col
        ><span>{{ item }}</span></v-col
      >
      <v-spacer></v-spacer>
      <v-col>
          <v-btn x-small color="red" @click="remove(index)">Delete</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: Array
  },
  data() {
    return {
      array: [],
      newItem: ""
    };
  },
  methods: {
    update: function() {
      this.$emit("input", this.array);
    },
    add: function() {
      this.array.push(this.newItem);
      this.newItem = "";
      this.update();
    },
    remove: function(index){
        this.array.splice(index,1)
        this.update()
    }
  },
  created() {
    this.array = this.value;
  }
};
</script>

<style></style>
