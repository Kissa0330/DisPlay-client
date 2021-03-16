/* eslint-disable */
import Vue from "vue";
import axios from "axios";

const store = Vue.observable({
  customs: {},
  todos: {},
  token: {},
  todoHandler: true,
});

const actions = {
  getTodo(token) {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const url = "http://127.0.0.1:8000/api/todo/";
    axios.get(url, config).then((response) => {
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
    });
  },
  postTodo(data, token) {
    const url = "http://127.0.0.1:8000/api/todo/";
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.post(url, data, config).then((response) => {
      console.log(response);
    });
  },
  putTodo(id, title, deadline_time, start_time, end_time, token) {
    const url = "http://127.0.0.1:8000/api/todo/" + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      id: id,
      // TODO authorを動的に取得し設定する
      author: 1,
      title: title,
      deadline_time: deadline_time,
      start_time: start_time,
      end_time: end_time,
    };
    axios.put(url, data, config).then((response) => {
      console.log(response);
      store.todoHandler = !store.todoHandler;
    });
  },
  deleteTodo(id, token) {
    const url = "http://127.0.0.1:8000/api/todo/" + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.delete(url, config).then((response) => {
      console.log(response);
    });
  },
  getCustoms(token) {
    const url = "http://127.0.0.1:8000/api/customs/";
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(url, config).then((response) => {
      store.customs = response.data;
      console.log("Customs is already update");
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
          const data = {
            author: "1",
            title: sampleCustoms[0].title,
            start_time: sampleCustoms[0].start_time,
            end_time: sampleCustoms[0].end_time,
            repeat_flag: sampleCustoms[0].repeatFlag,
          };
          Promise.resolve()
            .then(() => axios.post(url, data, config))
            .then((response) => {
              console.log(response.data);
              return axios.get(url, config);
            })
            .then((response) => {
              console.log(response.data);
              store.customs = response.data;
            });
          // .then(response => {
          //   // 2個目の通信が成功
          //   // console.log(response.data)
          // })
          // .finally(() => {
          //   // 最終的な処理を書く
          //   console.log('hoge')
          // })
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
    axios.post(url, data, config).then((response) => {
      console.log(response);
    });
  },
  putCustom(token, title, flag, start_time, end_time, id) {
    const url = "http://127.0.0.1:8000/api/customs/" + id;
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
    axios.put(url, data, config).then((response) => {
      console.log(response);
    });
  },
  deleteCustom(id, token) {
    const url = "http://127.0.0.1:8000/api/customs/" + id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.delete(url, config).then((response) => {
      console.log(response);
    });
  },
  updateCustoms(customs) {
    store.customs = customs;
  },
  postAuth(username, password, _this) {
    let data = {
      username: username,
      password: password,
    };
    const url = "http://127.0.0.1:8000/auth/";
    axios
      .post(url, data)
      .then((response) => {
        document.cookie = "token = " + response.data.token + ";max-age = 86000";
        store.token = "jwt " + response.data.token;
      })
      .then(function () {
        _this.$router.push("/");
      })
      .catch(function (error) {
        _this.err = true;
        console.log(error);
      });
  },
  updateToken() {
    //TODO domainオプションとhttpsオプションを追加する
    if (document.cookie) {
      const tokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token"))
        .split("=")[1];
      store.token = "jwt " + tokenValue;
    }
    console.log("token is already updated");
  },
};

export { store, actions };
