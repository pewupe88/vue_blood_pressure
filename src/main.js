import Vue from 'vue';

import { measures } from '../db.json';

new Vue({
    data: () => ({
        measures
    }),

    methods: {
        generateColor({ systolic, diastolic }) {
            const normal = (systolic, diastolic) => {
                return systolic < 120 && diastolic < 80;
            };
            const elevated = (systolic, diastolic) => {
                return (systolic >= 120 && systolic <= 129) && diastolic < 80;
            };
            const hypertensionStage1 = (systolic, diastolic) => {
                return (systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89);
            };
            const hypertensionStage2 = (systolic, diastolic) => {
                return systolic >= 140 || diastolic >= 90;
            };
            const crisis = (systolic, diastolic) => {
                return systolic >= 180 || diastolic >= 120;
            };
            let color;

            if (normal(systolic, diastolic)) {
                color = '#a6ce39';
            }

            if (elevated(systolic, diastolic)) {
                color = '#ffec00';
            }

            if (hypertensionStage1(systolic, diastolic)) {
                color = '#ffb600';
            }

            if (hypertensionStage2(systolic, diastolic)) {
                color = '#ba3a02';
            }

            if (crisis(systolic, diastolic)) {
                color = '#990711';
            }

            return color;
        }
    }
}).$mount('#app');