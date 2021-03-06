import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//引入 全局样式
import '../public/css/global.css'

// axios开始
import Axios from 'axios';
// 给Vue原型挂载$axios属性
Vue.prototype.$axios = Axios;
// 定义拦截器
// 1: 请求发起前显示loading open();
Axios.interceptors.request.use(function(config) {
        // 不变配置:  可变，可以设置公共的请求头操作
        Mint.Indicator.open({
            text: `玩命加载中...`,
            spinnerType: 'fading-circle'
        });
        // console.log(config);
        return config; // config:{ headers}
    })
    // 2: 响应回来后关闭loading close()
Axios.interceptors.response.use(function(response) {
        //reponse: { config:{ },data:{} ,headers }

        // 接收响应头或者响应体中的数据，保存起来，供请求的拦截器中使用头信息操作
        Mint.Indicator.close();
        // console.log(response);
        return response;
    })
    // axios结束

// 定义全局过滤器 开始
import Moment from 'moment';
Moment.locale('zh-cn');

Vue.filter('convertTime', function(data, formatStr) {
    // 2015-04-16T03:50:28.000Z
    return Moment(data).format(formatStr);
});
Vue.filter('isNull', function(data) {
    if (data == '') {
        return '暂无数据';
    } else {
        return data;
    }
});
Vue.filter('isMusic', function(data) {
    if (data == '') {
        return '- 纯音乐 -';
    } else {
        return data;
    }
});
Vue.filter('tooLong', function(data, num = 24) {
    if (data.length > num) {
        return data.substr(0, num - 1) + '...';
    } else {
        return data;
    }
});
// 定义全局过滤器 结束

// 自定义的组件
import MyButton from './components/MyButton.vue'
Vue.component(MyButton.name, MyButton);
import MyButton1 from './components/MyButton1.vue'
import store from './store'
Vue.component(MyButton1.name, MyButton1);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')