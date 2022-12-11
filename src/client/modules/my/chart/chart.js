import LightningElementWithSLDS from '../../../lib/lightningElementWithSLDS.js';
import { api, track } from 'lwc';

export default class Chart extends LightningElementWithSLDS {
    @api sobject = '';
    @api socket;
    @api chartType = 'doughnut';

    @track events = 0;
    @track socketInitialized = false;
    @track chartInitialized = false;

    chart;

    fieldData = {};

    connectedCallback() {}

    async renderedCallback() {
        if (!this.chartInitialized) {
            await this.initializeChart();
        }
    }

    async initializeChart() {
        console.log('initializing chart');
        await require('chart.js');
        const ctx = this.template
            .querySelector('canvas.donut')
            .getContext('2d');
        if (this.chartType == 'guage') {
            this.chart = new window.Chart(
                ctx,
                this.getInitialChartConfigForGuage()
            );
        } else {
            this.chart = new window.Chart(ctx, this.getInitialChartConfig());
        }
        this.chartInitialized = true;
    }

    numbers(config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 100;
        var from = cfg.from || [];
        var count = cfg.count || 8;
        var decimals = cfg.decimals || 8;
        var continuity = cfg.continuit || 1;
        var dfactor = Math.pow(10, decimals) || 0;
        var data = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + this.rand(min, max);
            if (this.rand() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    }

    rand(min, max) {
        var _seed = Math.floor(Math.random() * 101000); // Date.now();
        min = min || 0;
        max = max || 0;
        _seed = (_seed * 9301 + 49297) % 233280;
        return min + (_seed / 233280) * (max - min);
    }

    months(config) {
        const MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var cfg = config || {};
        var count = cfg.count || 12;
        var section = cfg.section;
        var values = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = MONTHS[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
        }

        return values;
    }

    getDataForCharts() {
        const DATA_COUNT = 5;
        const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
        const CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        const barData = {
            labels: this.months({ count: 7 }),
            datasets: [
                {
                    label: 'Dataset 1',
                    data: this.numbers(NUMBER_CFG),
                    backgroundColor: CHART_COLORS.red
                },
                {
                    label: 'Dataset 2',
                    data: this.numbers(NUMBER_CFG),
                    backgroundColor: CHART_COLORS.blue
                },
                {
                    label: 'Dataset 3',
                    data: this.numbers(NUMBER_CFG),
                    backgroundColor: CHART_COLORS.green
                }
            ]
        };
        if (this.chartType == 'bar') {
            return barData;
        } else if (this.chartType == 'doughnut') {
            return {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: this.numbers(NUMBER_CFG),
                        backgroundColor: [
                            '#003f5c',
                            '#2f4b7c',
                            '#665191',
                            '#a05195',
                            '#d45087',
                            '#f95d6a',
                            '#ff7c43',
                            '#ffa600'
                        ]
                    }
                ]
            };
        } else if (this.chartType == 'line') {
            return {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
                datasets: [
                    {
                        label: 'Dataset',
                        data: this.numbers({ count: 6, min: -100, max: 100 }),
                        borderColor: CHART_COLORS.red,
                        backgroundColor: 'rgb(255,255,0,0.5)',
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    },
                    {
                        label: 'Dataset',
                        data: this.numbers({ count: 6, min: -100, max: 100 }),
                        borderColor: CHART_COLORS.red,
                        backgroundColor: 'rgb(0,255,0,0.5)',
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    }
                ]
            };
        }
    }

    getInitialChartConfig() {
        const DATA_COUNT = 5;
        const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

        const data = this.getDataForCharts();
        let chartData = {
            type: this.chartType,
            data: data,
            options: {
                title: {
                    display: true,
                    text: ``,
                    fontSize: 24
                },
                responsive: true,
                legend: {
                    position: 'right'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
        if (this.chartType == 'bar') {
            chartData.scales = {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            };
        }
        return chartData;
    }

    getInitialChartConfigForGuage() {
       let randomNum = Math.floor(Math.random()*180);
        return {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Blue'],
                datasets: [
                    {
                        label: 'Gauge',
                        data: [randomNum, 180-randomNum],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ]
                    }
                ]
            },
            options: {
                circumference: Math.PI,
                rotation: Math.PI,
                cutoutPercentage: 90, // precent
                plugins: {
                    datalabels: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderColor: '#ffffff',
                        color: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        font: function (context) {
                            var w = context.chart.width;
                            return {
                                size: w < 512 ? 18 : 20
                            };
                        },
                        align: 'start',
                        anchor: 'start',
                        offset: 10,
                        borderRadius: 4,
                        borderWidth: 1,
                        formatter: function (value, context) {
                            var i = context.dataIndex;
                            var len = context.dataset.data.length - 1;
                            if (i == len) {
                                return null;
                            }
                            return value + ' mph';
                        }
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        };
    }
}
