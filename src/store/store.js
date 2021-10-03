/* eslint-disable */
import { reactive } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const store = reactive({
  icons: {},
  customs: {},
  todos: {},
  token: {},
  refresh_token: {},
  todoHandler: true,
  isFirstVisit: false,
});
const instance = axios.create({
  baseURL: "https://sp-display-server.herokuapp.com/api/",
});
const actions = {
  getTodo() {
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
      });
  },
  putTodo(setTime, id, title, deadline_time, start_time, end_time) {
    let data;
    if (setTime) {
      console.log("setTime");
      data = {
        id: id,
        author: 1,
        title: title,
        deadline_time: deadline_time,
        start_time: start_time,
        end_time: end_time,
      };
    } else {
      console.log("not setTime");
      data = {
        id: id,
        author: 1,
        title: title,
        deadline_time: deadline_time,
      };
    }
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
      });
  },
  deleteTodo(id) {
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
          const sampleCustoms = [
            {
              title: "朝食",
              start_time: "07:00:00",
              end_time: "07:30:00",
              repeatFlag: "1111111",
            },
            {
              title: "昼食",
              start_time: "12:00:00",
              end_time: "13:00:00",
              repeatFlag: "1111111",
            },
            {
              title: "夕食",
              start_time: "19:00:00",
              end_time: "20:00:00",
              repeatFlag: "1111111",
            },
            {
              title: "睡眠",
              start_time: "23:00:00",
              end_time: "07:00:00",
              repeatFlag: "1111111",
            },
            {
              title: "入浴",
              start_time: "22:00:00",
              end_time: "23:30:00",
              repeatFlag: "1111111",
            },
          ];
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
          function postSampleCustom(i) {
            let data = {
              author: "1",
              title: sampleCustoms[i].title,
              start_time: sampleCustoms[i].start_time,
              end_time: sampleCustoms[i].end_time,
              repeat_flag: sampleCustoms[i].repeatFlag,
            };
            return instance.post("customs/", data, config);
          }
        }
      });
  },
  postCustom(title, start_time, end_time, flag) {
    const data = {
      author: "1",
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
        console.log(error.response);
      });
  },
  putCustom(title, flag, start_time, end_time, id) {
    const data = {
      author: "1",
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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
        console.log(error.response);
      });
  },
  deleteCustom(id) {
    let config = {
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
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

  updateToken() {
    //TODO domainオプションとhttpsオプションを追加する
    const tokenValue = Cookies.get("access_token");
    store.token = tokenValue;
    const refresh_tokenValue = Cookies.get("refresh_token");
    store.refresh_token = refresh_tokenValue;
    console.log("tokens are already updated");
  },
  signIn(response, _this) {
    const data = {
      access_token: response.$b.access_token,
      id_token: response.$b.id_token,
    };
    console.log(data);
    const url = "https://sp-display-server.herokuapp.com/social-login/google/";
    axios
      .post(url, data)
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
      })
      .then(() => {
        console.log("test");
        //isfirstvisitを取得する
        // return axios.get(url);
      })
      .then(() => {
        _this.$router.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
  refreshAccessToken(refresh_token) {
    const url =
      "https://sp-display-server.herokuapp.com/accounts/token/refresh/";
    const data = {
      refresh: refresh_token,
    };
    axios
      .post(url, data)
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
