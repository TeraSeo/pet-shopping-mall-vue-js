<template>
  <v-snackbar :color="color" timeout="3000">
    {{ message }}
    <v-btn color="white" text @click="close">닫기</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'success'
    },
    onClose: Function
  },
  methods: {
    close() {
      if (this.onClose) {
        this.onClose();
      }
    },
  }
};
</script>
