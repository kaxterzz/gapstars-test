import Vuetify from "vuetify";
import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import flushPromises from "flush-promises";

let localVue = createLocalVue();

describe("App", () => {
  let store;
  let actions;
  let state;
  let getters;

  beforeEach(() => {
    localVue.use(Vuex);
    localVue.use(Vuetify);
    state = { posts: [] };

    getters = {
      postsList: state => state.posts
    };

    actions = {
      fetchPosts: jest.fn(() => Promise.resolve())
    };

    store = new Vuex.Store({
      state,
      getters,
      actions
    });
  });

  it("dispatches an getAsync action", async () => {
    const wrapper = shallowMount(App, {
      localVue,
      store
    });

    await flushPromises();

    expect(actions.fetchPosts.mock.calls).toHaveLength(1);
  });
});
