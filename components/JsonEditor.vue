// To edit json
<template>
  <div>
    <v-textarea
      label="Json"
      v-model="text"
      required
    ></v-textarea>
    <v-btn @click="parse">
        Save JSON
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    json: Object
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    parse: function() {
      let json = JSON.parse(this.text);
    }
  },
  created() {
    this.text = JSON.stringify(this.json, null, 2);
  }
};
</script>

<style></style>
