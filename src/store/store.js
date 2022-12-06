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
      }
    };
    return config;
  },
  getTodo() {
    let config = actions.getBasicConfig();
    instance
      .get("todo/", config)
      .then((response) => {
        // arrange todos data
        let data;
        for (let i = 0; i < response.data.length; i++) {
          data = response.data;
          const splitDate = data[i].d_date.split("-");
          const month = Number(splitDate[1]);
          const day = Number(splitDate[2]);

          data[i].displayDate = month + "/" + day;
        }
        store.todos = data;
        store.todoHandler = !store.todoHandler;
        console.log(data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  postTodo(data) {
    let config = actions.getBasicConfig();
    instance
      .post("todo/", data, config)
      .then((response) => {
        console.log(response);
        return instance.get("todo/", config);
      })
      .then((response) => {
        let data;
        for (let i = 0; i < response.data.length; i++) {
          data = response.data;
          const splitDate = data[i].d_date.split("-");
          const month = Number(splitDate[1]);
          const day = Number(splitDate[2]);

          data[i].displayDate = month + "/" + day;
        }
        store.todos = data;
        store.todoHandler = !store.todoHandler;
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        store.errorFlag = true;
      });
  },
  putTodo(setTime, id, title, deadline_time, start_time, end_time) {
    let data;
    if (setTime) {
      console.log("setTime");
      data = {
        id: id,
        author: store.id,
        title: title,
        deadline_time: deadline_time,
        start_time: start_time,
        end_time: end_time,
      };
    } else {
      console.log("not setTime");
      data = {
        id: id,
        author: store.id,
        title: title,
        deadline_time: deadline_time,
      };
    }
    let config = actions.getBasicConfig();
    instance
      .put("todo/" + id, data, config)
      .then((response) => {
        console.log(response);
        return instance.get("/todo/", config);
      })
      .then((response) => {
        let data;
        for (let i = 0; i < response.data.length; i++) {
          data = response.data;
          const splitDate = data[i].d_date.split("-");
          const month = Number(splitDate[1]);
          const day = Number(splitDate[2]);

          data[i].displayDate = month + "/" + day;
        }
        store.todos = data;
        store.todoHandler = !store.todoHandler;
      })
      .catch((error) => {
        console.log(error.response);
        store.errorFlag = true;
      });
  },
  deleteTodo(id) {
    let config = actions.getBasicConfig();
    instance
      .delete("todo/" + id, config)
      .then((response) => {
        console.log(response);
        return instance.get("todo/", config);
      })
      .then((response) => {
        let data;
        for (let i = 0; i < response.data.length; i++) {
          data = response.data;
          const splitDate = data[i].d_date.split("-");
          const month = Number(splitDate[1]);
          const day = Number(splitDate[2]);

          data[i].displayDate = month + "/" + day;
        }
        store.todos = data;
        store.todoHandler = !store.todoHandler;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  getCustoms() {
    let config = actions.getBasicConfig();
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
    let config = actions.getBasicConfig();
    instance
      .get("customs/", config)
      .then((response) => {
        store.customs = response.data;
        console.log("Customs is already update");
      })
      .then(() => {
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
          const postSampleCustom = function (i) {
            let data = {
              author: store.id,
              title: sampleCustoms[i].title,
              start_time: sampleCustoms[i].start_time,
              end_time: sampleCustoms[i].end_time,
              repeat_flag: sampleCustoms[i].repeatFlag,
            };
            return instance.post("customs/", data, config);
          };
        }
      });
  },
  postCustom(title, start_time, end_time, flag) {
    const data = {
      author: store.id,
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    let config = actions.getBasicConfig();
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
  putCustom(title, flag, start_time, end_time, id) {
    const data = {
      author: store.id,
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    let config = actions.getBasicConfig();
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
    let config = actions.getBasicConfig();
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
    let config = actions.getBasicConfig();
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
    let config = actions.getBasicConfig();
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
