<template>
    <ccv-line-chart
        :data="chartData"
        :options="options"
    />
</template>

<script>
    import { measures } from '../db.json';

    export default {
        name: 'app',

        computed: {
            chartData() {
                return [
                    ...this.systolicData,
                    ...this.diastolicData,
                    ...this.pulse
                ];
            }
        },

        data: () => ({
            systolicData: measures.map(m => {
                const month = new Date(m.date).getMonth();

                return {
                    group: `Systolic pressure - ${ month }`,
                    key: m.date,
                    value: m.systolic
                }
            }),
            diastolicData: measures.map(m => {
                const month = new Date(m.date).getMonth();

                return {
                    group: `Diastolic pressure - ${ month }`,
                    key: m.date,
                    value: m.diastolic
                }
            }),
            pulse: measures.map(m => {
                const month = new Date(m.date).getMonth();

                return {
                    group: `Pulse - ${ month }`,
                    key: m.date,
                    value: m.pulse
                }
            }),
            options: {
                title: 'Blood pressure',
                axes: {
                    left: {
                        mapsTo: 'value',
                        scaleType: 'linear',
                        includeZero: false
                    },
                    bottom: {
                        mapsTo: 'key',
                        scaleType: 'time'
                    }
                },
                curve: 'curveMonotoneX',
                height: '90vh'
            }
        }),

        methods: {
            calculateColor(measure) {
                const isNormal = ({ systolic, diastolic }) => {
                    return systolic <= 120 && diastolic <= 80;
                };
                const isElevated = ({ systolic, diastolic }) => {
                    return (systolic >= 120 && systolic <= 129)
                        && diastolic <= 80;
                };
                const isHighStage1 = ({ systolic, diastolic }) => {
                    return (systolic >= 130 && systolic <= 139)
                        || (diastolic >= 80 && diastolic <= 89);
                };
                const isHighStage2 = ({ systolic, diastolic }) => {
                    return systolic >= 140 || diastolic >= 90;
                };
                const isCrisis = ({ systolic, diastolic }) => {
                    return systolic >= 180 || diastolic >= 120;
                }

                if (isCrisis(measure)) {
                    return '#990711';
                }

                if (isHighStage2(measure)) {
                    return '#ba3a02';
                }

                if (isHighStage1(measure)) {
                    return '#ffb600';
                }

                if (isElevated(measure)) {
                    return '#ffec00';
                }

                if (isNormal(measure)) {
                    return '#a6ce39';
                }
            }
        }
    };
</script>

<style lang="scss">
    body {
        margin: 10px;
    }
</style>
