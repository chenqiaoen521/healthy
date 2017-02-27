// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import AwesomeSwiper from 'vue-awesome-swiper'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import config from './config/config'
import Index from './components/Index.vue'
import Search from './components/Search.vue'
//import Search_list from './components/Search_list.vue'
import Publish from './components/Publish.vue'
import Publish_xq from './components/Publish_xq.vue'
import Shopcar from './components/Shopcar.vue'
import Center from './components/Center.vue'
import Product_Detial from './components/Product_Detial.vue'
import Gonggao from './components/Gonggao.vue'
import Gonggao_xq from './components/Gonggao_xq.vue'
import CenterSetting from './components/Center/Setting.vue'
import CenterUserSetting from './components/Center/UserSetting.vue'
import Help from './components/Center/help.vue'
import Address from './components/Center/Address.vue'
import Chose_address from './components/Center/Chose_address.vue'
import Confirm_order from './components/Confirm_order.vue'
import Pay_order from './components/Pay_order.vue'
import AddAddress from './components/Center/AddAddress.vue'
import EditAddress from './components/Center/EditAddress.vue'
import SelectCity from './components/Center/SelectCity.vue'
import Lianxi from './components/Center/Lianxi.vue'
import Reply from './components/Center/Reply.vue'
import Keep from './components/Center/Keep.vue'
import Fans from './components/Center/Fans.vue'
import Income from './components/Center/income.vue'
import Order from './components/Center/Order.vue'
import Order_xq from './components/Center/Order_xq.vue'
import Order_wuliu from './components/Center/Order_wuliu.vue'
import Order_tuikuan from './components/Center/Order_tuikuan.vue'
import Order_pingjia from './components/Center/Order_pingjia.vue'
import Order_tuilist from './components/Center/Order_tuilist.vue'
import Order_fill from './components/Center/Order_fill.vue'
import IncomeHelp from './components/Center/income-help.vue'
import TixianHelp from './components/Center/TixianHelp.vue'
import Shouyi from './components/Center/Shouyi.vue'
import Xiaofei from './components/Center/Xiaofei.vue'
import Tixian from './components/Center/Tixian.vue'
import Code from './components/Center/Code.vue'
import SetPhone from './components/Center/SetPhone.vue'
import CheckPhone from './components/Center/CheckPhone.vue'
import SetPayPwd from './components/Center/SetPayPwd.vue'


// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    { path: '/', component: Index },
    { path: '/search', component: Search },
    //{ path: '/search_list', component: Search_list },
    { path: '/publish', component: Publish },
    { path: '/publish_xq/:id/:key', component: Publish_xq },
    { path: '/shopcar', component: Shopcar },
    { path: '/center', component: Center },
    { path: '/product/:id', component: Product_Detial },
    { path: '/gonggao', component: Gonggao },
    { path: '/gonggao_xq/:id', component: Gonggao_xq },
    { path: '/login', redirect: '/' },
    { path: '/center/setting', component: CenterSetting },
    { path: '/center/user-setting', component: CenterUserSetting },
    { path: '/center/help', component: Help },
    { path: '/center/address', component: Address },
    { path: '/center/chose_address/:data', component: Chose_address },
    { path: '/confirm_order/:data/:addr', component: Confirm_order },
    { path: '/pay_order/:id', component: Pay_order },
    { path: '/center/add-address/:address/:str', component: AddAddress },
    { path: '/center/edit-address/:id/:address', component: EditAddress },
    { path: '/center/select-city/:type/:id/:str', component: SelectCity },
    { path: '/center/lianxi', component: Lianxi },
    { path: '/center/reply', component: Reply },
    { path: '/center/keep', component: Keep },
    { path: '/center/fans', component: Fans },
    { path: '/center/income', component: Income },
    { path: '/center/order/:canshu', component: Order },
    { path: '/center/order_xq/:id', component: Order_xq },
    { path: '/center/order_wuliu/:id', component: Order_wuliu },
    { path: '/center/order_tuikuan/:id/:money/:num/:type', component: Order_tuikuan },
    { path: '/center/order_pingjia/:id', component: Order_pingjia },
    { path: '/center/order_tuilist', component: Order_tuilist },
    { path: '/center/order_fill/:id', component: Order_fill },
    { path: '/center/income_help', component: IncomeHelp },
    { path: '/center/tixian_help', component: TixianHelp },
    { path: '/center/shouyi', component: Shouyi },
    { path: '/center/xiaofei', component: Xiaofei },
    { path: '/center/tixian', component: Tixian },
    { path: '/center/code', component: Code },
    { path: '/center/set_phone/:code', component: SetPhone },
    { path: '/center/check_phone', component: CheckPhone },
    { path: '/center/set_pay_pwd', component: SetPayPwd },
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({mode: 'history', routes});
// const router = new VueRouter({routes});

// localStorage和sessionStorage一样都是用来存储客户端临时信息的对象。
// 他们均只能存储字符串类型的对象（虽然规范中可以存储其他原生类型的对象，但是目前为止没有浏览器对其进行实现）。
// localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。
// sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
// 不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的localStorage（页面属于相同域名和端口），
// 但是不同页面或标签页间无法共享sessionStorage的信息。
// 这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

let history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
/**
* sync router loading status
*/
const commit = store.commit || store.dispatch;

router.beforeEach((to, from, next) => {
    return_url = to.path
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);
    if (toIndex) {
        if (toIndex > fromIndex || !fromIndex) {
            commit('UPDATE_DIRECTION', 'forward')
        } else {
            commit('UPDATE_DIRECTION', 'reverse')
        }
    }else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        commit('UPDATE_DIRECTION', 'forward')
    }

    commit('UPDATE_LOADING', true)
    // //判断token失效，如果失效，则跳转授权
    $(document).ajaxError(function(event,data){
        var result = JSON.parse(data.responseText);
        var status = result.status;
        if(status == 401){
            // window.location.href=SERVICE_AUTH+'?return_url='+to.fullPath
            if (result.code == 400005){
                if (is_stop == 0){
                    is_stop = 1;
                    alert('你的账号已被禁用');
                    WeixinJSBridge.call('closeWindow');
                    exit();
                }
            }else{
                layer.open({
                    content: '登录超时！自动登录中...'
                    ,skin: 'msg'
                    ,time: 1
                    ,end: function () {
                        window.location.href=SERVICE_AUTH+'?return_url='+to.fullPath
                    }
                });

            }
        }
    });
    //next();
    setTimeout(next, 50)
})

router.afterEach(() => {
    commit('UPDATE_LOADING', false)
})

sync(store, router)
//noinspection JSAnnotator
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    beforeCreate:function(){
        var expired = window.localStorage.getItem('expired'); //过期时间
        var now_time = new Date().getTime();
        var expired_time = now_time + (60000 * 50);
        window.parent.postMessage('getInfo', HOST);
        window.addEventListener('message', function (e) {
            var data = e.data;
            localStorage.clear();
            localStorage.setItem('Authorization', 'Bearer ' + data.token);
            localStorage.setItem('expired', expired_time);
            parent.location.href=DOMAIN_NAME+data.url;
        }, false);
        if (now_time > window.localStorage.getItem('expired')){
            window.location.href=SERVICE_AUTH+'?return_url='+return_url
            exit();
        }
    }
})

Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})
