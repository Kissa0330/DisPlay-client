import { reactive } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import sampleCustoms from "../assets/sampleCustoms.json";

const store = reactive({
  icons: {},
  id: "",
  customs: {},
  todos: {},
  token: {},
  refresh_token: {},
  todoHandler: true,
  isFirstVisit: false,
  errorFlag: false,
});
const BASEURL = "https://display-api.onrender.com/";
const instance = axios.create({
  baseURL: BASEURL + "api/",
});
const actions = {
  getBasicConfig() {
    const config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
    return config;
  },
  getTodoData(setTime, id, title, deadline, start, end) {
    if (setTime) {
      const data = {
        id: id,
        author: store.id,
        title: title,
        deadline_time: deadline,
        start_time: start,
        end_time: end,
      };
      return data;
    } else {
      const data = {
        id: id,
        author: store.id,
        title: title,
        deadline_time: deadline,
      };
      return data;
    }
  },
  getCustomData(id, title, start, end, repeatFlag) {
    const data = {
      author: id,
      title: title,
      start_time: start,
      end_time: end,
      repeat_flag: repeatFlag,
    };
    return data;
  },
  arrangeTodoData(response) {
    let data;
    for (let i = 0; i < response.data.length; i++) {
      data = response.data;
      const splitDate = data[i].d_date.split("-");
      const month = Number(splitDate[1]);
      const day = Number(splitDate[2]);

      data[i].displayDate = month + "/" + day;
    }
    return data;
  },
  getTodo() {
    const config = actions.getBasicConfig();
    instance
      .get("todo/", config)
      .then((response) => {
        // arrange todos data
        store.todos = this.arrangeTodoData(response);
        store.todoHandler = !store.todoHandler;
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  postTodo(data) {
    const config = actions.getBasicConfig();
    instance
      .post("todo/", data, config)
      .then((response) => {
        console.log(response);
        return instance.get("todo/", config);
      })
      .then((response) => {
        store.todos = this.arrangeTodoData(response);
        store.todoHandler = !store.todoHandler;
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        store.errorFlag = true;
      });
  },
  putTodo(setTime, id, title, deadline, start, end) {
    const data = this.getTodoData(setTime, id, title, deadline, start, end);
    const config = actions.getBasicConfig();
    instance
      .put("todo/" + id, data, config)
      .then((response) => {
        console.log(response);
        return instance.get("/todo/", config);
      })
      .then((response) => {
        store.todos = this.arrangeTodoData(response);
        store.todoHandler = !store.todoHandler;
      })
      .catch((error) => {
        console.log(error.response);
        store.errorFlag = true;
      });
  },
  deleteTodo(id) {
    const config = actions.getBasicConfig();
    instance
      .delete("todo/" + id, config)
      .then((response) => {
        console.log(response);
        return instance.get("todo/", config);
      })
      .then((response) => {
        store.todos = this.arrangeTodoData(response);
        store.todoHandler = !store.todoHandler;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  getCustoms() {
    const config = actions.getBasicConfig();
    instance
      .get("customs/", config)
      .then((response) => {
        store.customs = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  initialCustomSetting() {
    const config = actions.getBasicConfig();
    instance
      .get("customs/", config)
      .then((response) => {
        store.customs = response.data;
        console.log("Customs is already update");
      })
      .then(() => {
        const postSampleCustom = function (i) {
          const data = this.getCustomData(
            store.id,
            sampleCustoms[i].title,
            sampleCustoms[i].start_time,
            sampleCustoms[i].end_time,
            sampleCustoms[i].repeatFlag
          );
          return instance.post("customs/", data, config);
        };
        console.log("store Boolean is " + Boolean(store.customs.length));
        if (store.customs.length) {
          console.log("custom is set.");
        } else {
          console.log("custom is not set.");
          let myPromise = Promise.resolve();
          for (let i = 0; i < sampleCustoms.length; i++) {
            myPromise = myPromise
              .then(postSampleCustom.bind(this, i))
              .then((response) => {
                console.log(response);
              });
          }
          myPromise
            .then(function () {
              return instance.get("customs/", config);
            })
            .then((response) => {
              console.log(response.data);
              store.customs = response.data;
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      });
  },
  postCustom(title, start, end, flag) {
    const data = this.getCustomData(store.id, title, start, end, flag);
    const config = actions.getBasicConfig();
    instance
      .post("customs/", data, config)
      .then((response) => {
        console.log(response);
        return instance.get("customs", config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      })
      .catch((error) => {
        store.errorFlag = true;
        console.log(error.response);
      });
  },
  putCustom(title, flag, start, end, id) {
    const data = this.getCustomData(store.id, title, start, end, flag);
    const config = actions.getBasicConfig();
    instance
      .put("customs/" + id, data, config)
      .then((response) => {
        console.log(response);
        return instance.get("customs/", config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      })
      .catch((error) => {
        store.errorFlag = true;
        console.log(error.response);
      });
  },
  deleteCustom(id) {
    const config = actions.getBasicConfig();
    instance
      .delete("customs/" + id, config)
      .then((response) => {
        console.log(response);
        return instance.get("customs/", config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  updateCustoms(customs) {
    store.customs = customs;
  },
  getMypage() {
    const config = actions.getBasicConfig();
    return instance.get("/mypage", config).then((res) => {
      store.id = res.data[0].id;
      store.isFirstVisit = res.data[0].isFirstVisit;
      console.log("mypage is", res.data[0]);
      console.log(
        "store.id is " + store.id,
        "\nstore.isFirstVisit is " + store.isFirstVisit
      );
    });
  },
  patchMypage(data) {
    const config = actions.getBasicConfig();
    instance
      .patch("users/" + store.id, data, config)
      .then((res) => {
        store.isFirstVisit = res.data[0].isFirstVisit;
        console.log("mypage is", res.data[0]);
        console.log(
          "store.id is " + store.id,
          "\nstore.isFirstVisit is " + store.isFirstVisit
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateToken() {
    //TODO domainオプションとhttpsオプションを追加する
    return new Promise((resolve) => {
      const tokenValue = Cookies.get("access_token");
      store.token = tokenValue;
      const refresh_tokenValue = Cookies.get("refresh_token");
      store.refresh_token = refresh_tokenValue;
      console.log("tokens are already updated");
      return resolve();
    });
  },
  signIn(response, _this) {
    const tokens = Object.values(response)[1];
    const data = {
      access_token: tokens.access_token,
      id_token: tokens.id_token,
    };
    console.log(data);
    const URL = BASEURL + "social-login/google/";
    axios
      .post(URL, data)
      .then((res) => {
        Cookies.set("access_token", res.data.access_token, {
          expires: 0.0034,
        });
        Cookies.set("refresh_token", res.data.refresh_token, {
          expires: 7,
        });
        store.token = res.data.access_token;
        store.refresh_token = res.data.refresh_token;
        console.log(res);
        let config = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        return instance.get("/mypage", config);
      })
      .then((res) => {
        if (res.data[0].isFirstVisit) {
          console.log("Welcome!!");
          _this.$router.push("/initial");
        } else {
          console.log("Welcome back!!");
          _this.$router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  refreshAccessToken(refresh_token) {
    const URL = BASEURL + "accounts/token/refresh/";
    const data = {
      refresh: refresh_token,
    };
    axios
      .post(URL, data)
      .then((res) => {
        Cookies.set("access_token", res.data.access, {
          expires: 0.0034,
        });
        store.token = res.data.access;
        console.log("token is refreshed", res);
      })
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
};

export { store, actions };
