import Vue from 'vue';
import CarbonComponentsVue from '@carbon/vue';
import chartsVue from '@carbon/charts-vue';
import './styles/styles.scss';

import App from './App';

Vue.use(CarbonComponentsVue);
Vue.use(chartsVue);

new Vue({
    el: '#app',
    render: h => h(App)
});
