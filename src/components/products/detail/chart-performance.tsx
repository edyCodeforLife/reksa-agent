import React from 'react';
import { GoogleCharts } from 'google-charts';
import { css } from 'aphrodite';
import {styles} from '../styles';
import { max, min, groupBy, chunk} from 'lodash';
import * as Languages from '../../../data/languages';
import {IMainHistoricalService, MainHistoricalService} from '../../../data/business/main/main';
import SingletonModuleScopedInstance from './data';
import {Spinner} from '../../spinner';
import {PopupDropDown} from '../../popup-dropdown';
import {randomChar} from '../../../data/global/functions';

interface IChartPerformanceProps {
    product: any,
    lang: string
}

interface IChartPerformanceStates {
    chartData: any,
    chartOptions: any,
    loading: boolean,
    chartRange: any
}

export class ChartPerformance extends React.Component<IChartPerformanceProps, IChartPerformanceStates> {
    service: IMainHistoricalService = new MainHistoricalService();
    id: string = randomChar();
    chartRanges = [
        {
            value: 1,
            label: Languages[this.props.lang]['oneM_LABEL'],
        }, {
            value: 5,
            label: Languages[this.props.lang]['sixM_LABEL'],
        }, {
            value: 4,
            label: Languages[this.props.lang]['YTD_LABEL'],
        }, {
            value: 2,
            label: Languages[this.props.lang]['oneY_LABEL'],
        }, {
            value: 3,
            label: Languages[this.props.lang]['SI_LABEL'],
        }
    ];

    state: IChartPerformanceStates = {
        chartData: [],
        loading: false,
        chartRange: this.chartRanges[1],
        chartOptions: {
            title: '',
            curveType: 'function',
            series: {
                0: {targetAxisIndex: 1, lineWidth: 3},
                1: {targetAxisIndex: 1, lineWidth: 3},
                2: {targetAxisIndex: 1, lineWidth: 3}
            },
            vAxis: {
                minValue: -5,
                maxValue: 20
            },
            legend: {position: 'bottom'},
            animation: { duration: 70 },
            chartArea:{ right: 60,top: 40, bottom: 80, width:"100%", height:"100"}
        },
    };

    constructor(props: IChartPerformanceProps) {
        super(props);

        this.drawChart = this.drawChart.bind(this);
        this.onSortChanged = this.onSortChanged.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let key = `chart-${this.props.product.productId}-${this.state.chartRange.value}`;
        let singletonInstance = new SingletonModuleScopedInstance();
        let data = singletonInstance.getData(key);
        if (data) {
            this.setState({chartData: data, loading: false}, () => {
                GoogleCharts.load(this.drawChart);
            });
        } else {
            this.setState({loading: true});
            this.service.GetMainChart(this.state.chartRange.value, this.props.product.productId, {
                Success: res => {
                    singletonInstance.setData(key, res);
                    this.setState({chartData: res, loading: false}, () => {
                        GoogleCharts.load(this.drawChart);
                    });
                }
            })
        }
    }

    drawChart() {
        let data = new GoogleCharts.api.visualization.DataTable();
        data.addRows(0);

        data.addColumn('date', 'Date');
        data.addColumn('number', Languages[this.props.lang]['NAV_LABEL']);
        let chart = new GoogleCharts.api.visualization.LineChart(document.getElementById(this.id));

        try {
            let length = this.state.chartData.value.length;
            data.addRows(length);

            for (let i = 0; i < length; i++) {
                let dateInstance = new Date(this.state.chartData.label[i]);
                data.setValue(i, 0, dateInstance);
            }

            let options: any = this.state.chartOptions;
            options.vAxis.minValue = min(this.state.chartData.value);
            options.vAxis.maxValue = max(this.state.chartData.value);

            let index = 0;
            let chunks = chunk(this.state.chartData.value, 30);

            if (this.state.chartRange.value === 3) {
                while (index < chunks.length) {
                    for (let x = 0; x < chunks[index].length; x++) {
                        data.setValue((30 * index) + x, 1, chunks[index][x]);
                    }
                    index++;
                }
                chart.draw(data, options);
            } else {
                let drawChart = () => {
                    if (index < chunks.length) {
                        for (let x = 0; x < chunks[index].length; x++) {
                            data.setValue((30 * index) + x, 1, chunks[index][x]);
                        }
                        index++;
                        chart.draw(data, options);
                    }
                };

                GoogleCharts.api.visualization.events.addListener(chart, 'animationfinish', drawChart);
                chart.draw(data, options);
                drawChart();
            }
        } catch (e) {
            chart.draw(data, this.state.chartOptions);
        }
    }

    onSortChanged(chartRange: any) {
        if (this.state.chartRange !== chartRange) {
            this.setState({chartRange}, () => {
                this.getData();
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className={css(styles.changeRangeBox)}>
                        <PopupDropDown
                            onChange={this.onSortChanged}
                            options={this.chartRanges}
                            lang={this.props.lang}
                        >
                            <div className={css(styles.selectFilter)}>
                                {this.state.chartRange.label}
                            </div>
                        </PopupDropDown>
                    </div>
                    {this.state.loading?<Spinner />:<div id={this.id} className={css(styles.chartBox)} />}
                </div>
            </React.Fragment>
        );
    }
}