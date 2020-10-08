<template>
  <v-card
    elevation="2"
    class="d-flex flex-column overflow-y-auto"
    max-height="700px"
  >
    <v-card-title>
      List of Actions Commited
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <template v-if="commitedActionsList.length > 0">
        <v-list-item
          v-for="(action, index) in commitedActionsList.slice().reverse()"
          v-bind:key="action.id"
        >
          <v-card elevation="4" width="100%" class="mb-2">
            <v-card-text class="d-flex flex-sm-row flex-column text-left">
              <v-row>
                <v-col cols="12" md="6" class="py-0">
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-1 text-sm-subtitle-1 custom-title text-center text-sm-left"
                      >{{ action.text }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-col>
                <v-col cols="12" md="6" class="py-0 text-center text-sm-right">
                  <v-btn
                    color="primary"
                    dark
                    @click="
                      timeTravel({
                        from: action.from_index,
                        to: action.to_index,
                        action_list_index: index
                      })
                    "
                  >
                    <v-icon left dark>
                      mdi-clock-outline
                    </v-icon>
                    Time Travel
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-list-item>
      </template>
      <template v-else>
        <p class="text-body-1 text-sm-subtitle-1">
          No commited actions available..
        </p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ActionsList",
  computed: mapGetters(["commitedActionsList"]), //get commited actions list from store
  methods: {
    //time travel functions
    ...mapActions(["timeTravel"])
  }
};
</script>

<style scoped lang="scss">
.custom-title {
  white-space: initial;
}
</style>
