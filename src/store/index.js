import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [], //posts state
    commitedActions: [], //commited actions state
  },
  getters: {
    postsList: (state) => state.posts,
    commitedActionsList: (state) => state.commitedActions,
  },

  mutations: {
    setPosts: (state, posts) => (state.posts = posts),
    setCommitedActions: (state, commitedActions) =>
      state.commitedActions.push(commitedActions),
  },

  actions: {
    //fetch posts from https://jsonplaceholder.typicode.com/posts functon
    async fetchPosts({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/?_limit=5"
      );
      commit("setPosts", response.data);
    },

    //post move function
    move({ commit, getters }, data) {
      var from = data["from"]; //from index
      var to = data["to"]; //to index
      var posts_copy = getters.postsList; //copy of original posts array
      var f = posts_copy.splice(from, 1)[0]; // remove `from` item and store it
      posts_copy.splice(to, 0, f); // insert stored item into position `to`
      commit("setPosts", posts_copy); //commit the post copy array to original posts state

      //commited action text
      var text =
        "Moved post " +
        (from + 1) +
        " from index " +
        from +
        " to " +
        "index " +
        to;

      //commit action to original commitedActions state
      commit("setCommitedActions", {
        id: Math.floor(Math.random() * 101),
        text: text,
        from_index: from,
        to_index: to,
      });

    },

    //post move up function
    moveUp({ dispatch }, index) {
      var data = { from: index, to: index - 1 };
      dispatch("move", data); //call to move function
    },

    //post move down function
    moveDown({ dispatch }, index) {
      var data = { from: index, to: index + 1 };
      dispatch("move", data); //call to move function
    },

    //time travel function
    timeTravel({ commit, getters }, data) {
      var to = data["from"]; //from index
      var from = data["to"]; //to index
      var action_list_index = data["action_list_index"]; //commitedActions list index
      var posts_copy = getters.postsList; //get a copy of original posts state

      var f = posts_copy.splice(from, 1)[0]; // remove `from` item and store it
      posts_copy.splice(to, 0, f); // insert stored item into position `to`
      commit("setPosts", posts_copy); //commit the post copy array to original posts state

      //remove time traveled action from original commitedActions array
      this.state.commitedActions.splice(action_list_index, 1);
    },
  },
  modules: {},
});
