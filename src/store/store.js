/* eslint-disable */
import Vue from "vue";
import axios from "axios";

const store = Vue.observable({
  customs: {},
  todos: {},
  token: {},
  refresh_token: {},
  todoHandler: true,
});

const actions = {
  getTodo(token) {
    const url = "http://127.0.0.1:8000/api/todo/";
    axios
      .get(url)
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
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  postTodo(data, token) {
    const url = "http://127.0.0.1:8000/api/todo/";
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(url, data, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
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
      });
  },
  putTodo(setTime, id, title, deadline_time, start_time, end_time, token) {
    const url = "http://127.0.0.1:8000/api/todo/";
    const puturl = url + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
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

    axios
      .put(puturl, data, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
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
      });
  },
  deleteTodo(id, token) {
    const url = "http://127.0.0.1:8000/api/todo/";
    const delurl = url + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete(delurl, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
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
      });
  },
  getCustoms(token) {
    const url = "http://127.0.0.1:8000/api/customs/";
    axios
      .get(url)
      .then((response) => {
        store.customs = response.data;
        console.log("Customs is already update");
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  initialCustomSetting(token) {
    const url = "http://127.0.0.1:8000/api/customs/";
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(url, config)
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
              return axios.get(url, config);
            })
            .then((response) => {
              console.log(response.data);
              store.customs = response.data;
            });
          function postSampleCustom(i) {
            let data = {
              author: "1",
              title: sampleCustoms[i].title,
              start_time: sampleCustoms[i].start_time,
              end_time: sampleCustoms[i].end_time,
              repeat_flag: sampleCustoms[i].repeatFlag,
            };
            return axios.post(url, data, config);
          }
        }
      });
  },
  postCustom(token, title, start_time, end_time, flag) {
    const url = "http://127.0.0.1:8000/api/customs/";
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      author: "1",
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    axios
      .post(url, data, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      });
  },
  putCustom(token, title, flag, start_time, end_time, id) {
    const url = "http://127.0.0.1:8000/api/customs/";
    const puturl = url + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      author: "1",
      title: title,
      start_time: start_time,
      end_time: end_time,
      repeat_flag: flag,
    };
    axios
      .put(puturl, data, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      });
  },
  deleteCustom(id, token) {
    const url = "http://127.0.0.1:8000/api/customs/";
    const deleteurl = url + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .delete(deleteurl, config)
      .then((response) => {
        console.log(response);
        return axios.get(url, config);
      })
      .then((response) => {
        console.log(response.data);
        store.customs = response.data;
      });
  },
  updateCustoms(customs) {
    store.customs = customs;
  },
  // postAuth(username, password, _this) {
  //   let data = {
  //     username: username,
  //     password: password,
  //   };
  //   const url = "http://127.0.0.1:8000/auth/";
  //   axios
  //     .post(url, data)
  //     .then((response) => {
  //       document.cookie = "token = " + response.data.token + ";max-age = 86000";
  //       store.token = "jwt " + response.data.token;
  //     })
  //     .then(function () {
  //       _this.$router.push("/");
  //     })
  //     .catch(function (error) {
  //       _this.err = true;
  //       console.log(error);
  //     });
  // },
  updateToken() {
    //TODO domainオプションとhttpsオプションを追加する
    const tokenValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      .split("=")[1];
    store.token = tokenValue;
    const refresh_tokenValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh_token"))
      .split("=")[1];
    store.refresh_token = refresh_tokenValue;
    console.log("tokens are already updated");
  },
  signIn(response, _this) {
    const data = {
      access_token: response.qc.access_token,
      id_token: response.qc.id_token,
    };
    console.log(data);
    const url = "http://127.0.0.1:8000/social-login/google/";
    axios
      .post(url, data)
      .then((res) => {
        document.cookie =
          "access_token = " + res.data.access_token + ";max-age = 86400";
        document.cookie =
          "refresh_token = " + res.data.refresh_token + ";max-age = 604800";
        store.token = res.data.access_token;
        store.refresh_token = res.data.refresh_token;
        console.log(res);
      })
      .then(() => {
        _this.$router.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
  refreshAccessToken(refresh_token) {
    const url = "http://127.0.0.1:8000/accounts/token/refresh/";
    const data = {
      refresh_token: refresh_token,
    };
    axios
      .post(url)
      .then((res) => {
        document.cookie =
          "access_token = " + res.data.access_token + ";max-age = 86400";
        store.token = res.data.access_token;
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
};

export { store, actions };
