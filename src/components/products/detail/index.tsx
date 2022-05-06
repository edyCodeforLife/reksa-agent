import React from 'react';
import { css } from 'aphrodite';
import Modal from 'react-responsive-modal';
import {Row, Col} from 'react-grid-system';
import * as numberFormatter from 'number-formatter';

import * as Languages from '../../../data/languages';
import {styles} from '../styles';
import {globalColorDefault} from '../../../data/global/variables';
import {myStyles} from '../../authentication/header/styles';
import {formattedDate} from '../../../data/global/functions';
import SingletonModuleScopedInstance from './data';
import {IProductService, ProductService} from '../../../data/business/product/product';
import {ChartPerformance} from './chart-performance';

export default class ProductDetail extends React.Component<any, any> {
    format: string = '#,##0.##';
    formatLonger: string = '#,##0.####';
    service: IProductService = new ProductService();

    constructor(props) {
        super(props);

        this.state = {
            openModal: props.showDetail,
            activeTab: 0,
            detail: {}
        };

        let lang = this.props.appState.appLanguage;
        if( lang === 'idn') {
            this.format = '#.##0,##';
        }

        this.changeTab = this.changeTab.bind(this);
        this.changeTabContent = this.changeTabContent.bind(this);

        if (props.showDetail) this.getData(props.data.productId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.openModal !== nextProps.showDetail) {
            this.setState({openModal: nextProps.showDetail});
            if (nextProps.showDetail) this.getData(nextProps.data.productId);
        }
    }

    getData(id: any) {
        let singletonInstance = new SingletonModuleScopedInstance();
        let data = singletonInstance.getData(id);

        if (data) {
            this.setState({detail: data});
        } else {
            this.service.GetProductDetail(id, {
                Success: res => {
                    if (res) {
                        singletonInstance.setData(id, res);
                        this.setState({detail: res});
                    }
                }
            })
        }
    }

    changeTab(activeTab) {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab});
        }
    }

    changeTabContent() {
        if (this.state.activeTab === 1) {
            return this.renderHistories();
        } else if (this.state.activeTab === 2) {
            return this.renderChart();
        } else {
            return this.renderProfile();
        }
    }

    renderProfile() {
        let state = this.props.appState;
        return <Row>
            <Col md={12}>
                <h2 className={css(styles.tabTitleText)}>
                    {Languages[state.appLanguage]['PROFILE_LABEL']}
                </h2>
            </Col>
            <Col md={4}>
                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['FUND_NAME_LABEL']}
                    </div>
                    <div>{this.props.data.name}</div>
                </div>

                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['FUND_TYPES_LABEL']}
                    </div>
                    <div>{this.props.data.type}</div>
                </div>

                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['FUND_MANAGER_LABEL']}
                    </div>
                    <div>{this.props.data.mi}</div>
                </div>
            </Col>
            <Col md={4}>
                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['INCEPTION_DATE_LABEL']}
                    </div>
                    <div>{formattedDate(this.props.data.inceptionDate)}</div>
                </div>

                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['CUSTODIAN_BANK_LABEL']}
                    </div>
                    {this.props.data.productBanks&&this.props.data.productBanks.map((bank, index) => (
                        <div key={index}>{bank.bankName}</div>
                    ))}
                    {!this.props.data.productBanks&&'-'}
                </div>

                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['BLOOMBERG_TICKER_LABEL']}
                    </div>
                    <div>{this.props.data.bloombergTicker}</div>
                </div>
            </Col>
            <Col md={4}>
                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['NAV_LABEL']}
                    </div>
                    <div
                        className={css(styles.moneyBg)}
                    >
                        IDR {numberFormatter(this.format, this.props.data.lastNav)}
                    </div>
                </div>

                <div className={css(styles.groupedText)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['AUM_LABEL']}
                    </div>
                    <div
                        className={css(styles.moneyBg)}
                    >
                        IDR {numberFormatter(this.format, this.props.data.aum)}
                    </div>
                </div>

            </Col>
        </Row>;
    }

    renderHistories() {
        let state = this.props.appState;
        return <Row>
            <Col md={12}>
                <h2 className={css(styles.tabTitleText)}>
                    {Languages[state.appLanguage]['PERFORMANCE_LABEL']}
                </h2>
            </Col>

            <Col md={12}>
                <table className={css(styles.tablePerformance)}>
                    <thead>
                        <tr className={css(styles.tableTr)}>
                            <th className={css(styles.tableHeaderPerformance)} />
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['1_MONTH_LABEL']}
                             </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['3_MONTH_LABEL']}
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['6_MONTH_LABEL']}
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>YTD</th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['1_YEAR_LABEL']}
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['3_YEAR_LABEL']}
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['AUM_LABEL']}
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                Sharpe Ratio
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                {Languages[state.appLanguage]['NAV_LABEL']} Std Dev
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                Treynor Ratio
                            </th>
                            <th className={css(styles.tableHeaderPerformance)}>
                                Jenssen Alpha
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={css(styles.tableHeaderPerformance, styles.titleTableRow, styles.noBorderBottom)}>
                                {Languages[state.appLanguage]['NAV_LABEL']}
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.oneM<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.oneM)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.threeM<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.threeM)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.sixM<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.sixM)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.ytd<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.ytd)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.oneY<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.oneY)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.threeY<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.threeY)}
                                </span>
                            </td>

                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.aum<0&&styles.redText)}>
                                    {numberFormatter(this.format, this.props.data.aum)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.sharpeOneY<0&&styles.redText)}>
                                    {numberFormatter(this.formatLonger, this.props.data.sharpeOneY)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.stdOneY<0&&styles.redText)}>
                                    {numberFormatter(this.formatLonger, this.props.data.stdOneY)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.treynor<0&&styles.redText)}>
                                    {numberFormatter(this.formatLonger, this.props.data.treynor)}
                                </span>
                            </td>
                            <td className={css(styles.tableHeaderPerformance, styles.noBorderBottom)}>
                                <span className={css(this.props.data.jenssen<0&&styles.redText)}>
                                    {numberFormatter(this.formatLonger, this.props.data.jenssen)}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Col>

            {/*<Col md={4}>*/}
                {/*<table className={css(styles.tablePerformance)}>*/}
                    {/*<tbody>*/}
                        {/*<tr>*/}
                            {/*<td colSpan={2} className={css(styles.tableHeaderPerformance, styles.borderTableRow)}>*/}
                                {/*<div className={css(styles.smallBlueText)}>*/}
                                    {/*{Languages[state.appLanguage]['AUM_LABEL']}*/}
                                {/*</div>*/}
                                {/*<div className={css(styles.largerText)}>*/}
                                    {/*IDR {numberFormatter(this.format, this.props.data.aum)}*/}
                                {/*</div>*/}
                            {/*</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                            {/*<td className={css(styles.tableHeaderPerformance, styles.borderLeft)}>*/}
                                {/*<div className={css(styles.smallBlueText)}>*/}
                                    {/*{Languages[state.appLanguage]['NAV_LABEL']} Sharpe Ratio*/}
                                {/*</div>*/}
                                {/*<div className={css(styles.largerText)}>*/}
                                    {/*{numberFormatter(this.formatLonger, this.props.data.sharpeOneY)}*/}
                                {/*</div>*/}
                            {/*</td>*/}
                            {/*<td className={css(styles.tableHeaderPerformance)}>*/}
                                {/*<div className={css(styles.smallBlueText)}>*/}
                                    {/*{Languages[state.appLanguage]['NAV_LABEL']} Std Dev*/}
                                {/*</div>*/}
                                {/*<div className={css(styles.largerText)}>*/}
                                    {/*{numberFormatter(this.formatLonger, this.props.data.stdOneY)}*/}
                                {/*</div>*/}
                            {/*</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                            {/*<td className={css(styles.tableHeaderPerformance, styles.borderLeft)}>*/}
                                {/*<div className={css(styles.smallBlueText)}>*/}
                                    {/*Treynor Ratio*/}
                                {/*</div>*/}
                                {/*<div className={css(styles.largerText)}>*/}
                                    {/*{numberFormatter(this.formatLonger, this.props.data.treynor)}*/}
                                {/*</div>*/}
                            {/*</td>*/}
                            {/*<td className={css(styles.tableHeaderPerformance)}>*/}
                                {/*<div className={css(styles.smallBlueText)}>*/}
                                    {/*Jenssen Alpha*/}
                                {/*</div>*/}
                                {/*<div className={css(styles.largerText)}>*/}
                                    {/*{numberFormatter(this.formatLonger, this.props.data.jenssen)}*/}
                                {/*</div>*/}
                            {/*</td>*/}
                        {/*</tr>*/}
                    {/*</tbody>*/}
                {/*</table>*/}
            {/*</Col>*/}

            <Col md={12}>
                {this.state.detail.productFundFact&&<div className={css(styles.downloadContainer)}>
                    <div style={{flex: 1}}>
                        <div className={css(styles.smallBlueText)}>Fund Fact Sheet</div>
                        <div>Lorem ipsum sir dolor amet ting dos teron.</div>
                    </div>
                    <a download={true} target={'_blank'} href={this.state.detail.productFundFact} className={css(styles.lineBtn, styles.smallerLineBtn)}>
                        {Languages[state.appLanguage]['DOWNLOAD_LABEL']}
                    </a>
                </div>}
                {this.state.detail.productProspectus&&<div className={css(styles.horizontalLine, styles.insideLine)} />}
                {this.state.detail.productProspectus&&<div className={css(styles.downloadContainer)}>
                    <div style={{flex: 1}}>
                        <div className={css(styles.smallBlueText)}>Fund Prospectus</div>
                        <div>Lorem ipsum sir dolor amet ting dos teron.</div>
                    </div>
                    <a download={true} href={this.state.detail.productProspectus} className={css(styles.lineBtn, styles.smallerLineBtn)}>
                        {Languages[state.appLanguage]['DOWNLOAD_LABEL']}
                    </a>
                </div>}
            </Col>
        </Row>;
    }

    renderChart() {
        let state = this.props.appState;
        return <Row>
            <Col md={12}>
                <h2 className={css(styles.tabTitleText)}>
                    {Languages[state.appLanguage]['PERFORMANCE_CHART_LABEL']}
                </h2>
                <ChartPerformance product={this.props.data} lang={state.appLanguage}/>
            </Col>
        </Row>;
    }

    render() {
        let state = this.props.appState;

        return (
            <Modal
                open={this.state.openModal}
                onClose={() => { this.props.onCloseModal(false); }}

                closeIconSize={18}
                styles={{
                    overlay: {
                        paddingTop: 100,
                        background: 'rgba(3,78,161,.28)'
                    },
                    closeIcon: {
                        fill: globalColorDefault,
                        borderRadius: 30,
                        padding: 6,
                        border: `1px solid rgba(0,0,0,.12)`
                    }
                }}
            >
                <div className={css(myStyles.insideModal, styles.insideModalLarge)}>
                    <div className={css(styles.greyedText)}>
                        {Languages[state.appLanguage]['FUND_INFO_LABEL']}
                    </div>
                    <div className={css(styles.blueText)}>
                        {this.props.data.name}
                    </div>
                    <div className={css(styles.horizontalLine)} />
                    <div className={css(styles.tabTitleContainer)} >
                        <div
                            onClick={() => { this.changeTab( 0 )}}
                            className={css(styles.tabTitle, this.state.activeTab === 0 && styles.activeTab)}
                        >
                            {Languages[state.appLanguage]['PROFILE_LABEL']}
                        </div>
                        <div
                            onClick={() => { this.changeTab(1)}}
                            className={css(styles.tabTitle, this.state.activeTab === 1 && styles.activeTab)}
                        >
                            {Languages[state.appLanguage]['PERFORMANCE_HISTORIES_LABEL']}
                        </div>
                        <div
                            onClick={() => { this.changeTab(2)}}
                            className={css(styles.tabTitle, this.state.activeTab === 2 && styles.activeTab)}
                        >
                            {Languages[state.appLanguage]['PERFORMANCE_CHART_LABEL']}
                        </div>
                    </div>
                    <div className={css(styles.horizontalLine)} />

                    <div className={css(styles.tabContentContainer)}>
                        { this.changeTabContent() }
                    </div>

                    <div className={css(styles.horizontalLine)} />
                    <div style={{textAlign: 'right'}}>
                        <button
                            onClick={() => { this.props.onCloseModal(false); }}
                            className={css(styles.blueBtn)}
                        >
                            {Languages[state.appLanguage]['CLOSE_LABEL']}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}