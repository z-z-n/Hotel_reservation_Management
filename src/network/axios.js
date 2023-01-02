import originAxios from "axios";
import store from "../store";

export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: "http://192.168.43.232:8081", //后端运行端口 修改请改这里
      timeout: 5000,
    });

    instance.interceptors.request.use(config => {
      if (store.state.Authorization) {  
        config.headers.token = store.state.Authorization // 如有token自动带上
      }
      return config
    }, err => {
      return err
    })

    instance.interceptors.response.use(
      (response) => {
        return response.data; // 取回数据部分
      },
      (err) => {
        console.log("来到了response拦截failure中:" + err);
        return err;
      }
    );

    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
