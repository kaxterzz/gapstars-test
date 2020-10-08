import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";

let localVue = createLocalVue();

const actions = {
  timeTravel: (data, object) => {
    var from = object["from"];
    var to = object["to"];

    var action_list_index = object["action_list_index"];
    var posts_copy = data.state.posts;

    var f = posts_copy.splice(from, 1)[0];
    posts_copy.splice(to, 0, f);
    data.state.action_list.splice(action_list_index, 1);
    return posts_copy;
  }
};

describe("store actions timeTravel", () => {
  let store;
  let setPostsMock;

  beforeEach(() => {
    localVue.use(Vuex);
    setPostsMock = jest.fn();
    store = new Vuex.Store({
      state: {
        posts: [
          {
            title: "Post 1"
          },
          {
            title: "Post 2"
          },
          {
            title: "Post 3"
          },
          {
            title: "Post 4"
          },
          {
            title: "Post 5"
          }
        ],
        action_list: [
          {
            title: "Action 1"
          },
          {
            title: "Action 2"
          },
          {
            title: "Action 3"
          }
        ]
      },
      mutations: {
        setPosts: setPostsMock
      },
      actions: {
        timeTravel: actions.timeTravel
      }
    });
  });

  it("testing timeTravel function", () => {
    store.hotUpdate({
      mutations: { setPosts: setPostsMock }
    });
    return store
      .dispatch("timeTravel", { from: 2, to: 1, action_list_index: 2 })
      .then(res => {
        expect(store.state.action_list).toEqual([
          {
            title: "Action 1"
          },
          {
            title: "Action 2"
          }
        ]);
        expect(res).toEqual([
          {
            title: "Post 1"
          },
          {
            title: "Post 3"
          },
          {
            title: "Post 2"
          },
          {
            title: "Post 4"
          },
          {
            title: "Post 5"
          }
        ]);
      });
  });
});
