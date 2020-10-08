<template>
  <v-card elevation="2" class="d-flex flex-row mb-6 custom-card">
    <v-card-title
      class="text-left mb-2 text-body-1 text-sm-subtitle-1 overflow-x-auto"
    >
      {{ postTitle }}
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-actions class="flex-column justify-center">
      <template v-if="index == 0">
        <v-btn icon class="ml-0" @click="shiftDown(index)">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <template v-else-if="index == 4">
        <v-btn icon @click="shiftUp(index)">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="shiftUp(index)">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn icon class="ml-0" @click="shiftDown(index)">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostsCard",
  props: {
    postTitle: String,
    index: Number
  },
  methods: {
    //functions for move post up and down
    ...mapActions(["moveUp", "moveDown"]),
    shiftUp(index) {
      this.moveUp(index);
    },
    shiftDown(index) {
      this.moveDown(index);
    }
  }
};
</script>

<style lang="scss">
.custom-card {
  height: 80px;
}
</style>
