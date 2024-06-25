<!-- ConfirmationDialog.vue -->
<template>
  <v-dialog persistent max-width="300px">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">아니요</v-btn>
        <v-btn color="red darken-1" text @click="confirm">예</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    onConfirm: Function,
    onCancel: Function
  },
  computed: {
    dialog: {
      get() { return this.value; },
      set(value) { this.$emit('input', value); }
    }
  },
  methods: {
    cancel() {
      if (this.onCancel) {
        this.onCancel();
      }
    },
    confirm() {
      if (this.onConfirm) {
        this.onConfirm();
      }
    }
  }
};
</script>
