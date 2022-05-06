import * as React from 'react';
import { css } from 'aphrodite';
import {Row, Col, Container} from 'react-grid-system';
import { isEqual, chunk, map, uniq, cloneDeep, filter, debounce, sortBy } from 'lodash';
import update from 'immutability-helper';

import * as Languages from '../../../data/languages';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';

import {Text} from '../../forms/types/text';
import {PopupDropDown} from '../../popup-dropdown';
import { styles } from '../styles';
import {ProductListItem} from './item';
import Pagination from './pagination';

export class ProductAsList extends React.Component<any, any> {
    sortByList: any = null;
    headerTitles: any = null;
    filterData: any = null;
    showList: any = null;

    constructor(props: any) {
        super(props);

        this.onSearchChanged = this.onSearchChanged.bind(this);
        // this.onSearchChanged = debounce(this.onSearchChanged, 300);
        this.onFilterByFundChanged = this.onFilterByFundChanged.bind(this);
        this.onSortChanged = this.onSortChanged.bind(this);
        this.doFilter = this.doFilter.bind(this);
        this.onShowChanged = this.onShowChanged.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.doSort = this.doSort.bind(this);

        let types = [];
        if (props.appState.productList) {
            types = this.collectFundType(props.appState.productList);
        }

        this.headerTitles = [
            {
                label: Languages[props.appState.appLanguage]['FUND_NAME_HEADER_LABEL'],
                value: 'name'
            }, {
                label: Languages[props.appState.appLanguage]['FUND_TYPE_HEADER_LABEL'],
                value: 'type',
                width: '30px'
            }, {
                label: Languages[props.appState.appLanguage]['LAST_NAV_HEADER_LABEL'],
                value: 'lastNav',
                width: '70px'
            }, {
                label: Languages[props.appState.appLanguage]['1_MONTH_HEADER_LABEL'],
                value: 'oneM',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['3_MONTH_HEADER_LABEL'],
                value: 'threeM',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['YTD_HEADER_LABEL'],
                value: 'ytd',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['SI_HEADER_LABEL'],
                value: 'fromInception',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['1_TH_SR_HEADER_LABEL'],
                value: 'sharpeOneY',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['1_TH_STDEV_HEADER_LABEL'],
                value: 'stdOneY',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['BETA_HEADER_LABEL'],
                value: 'beta',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['TREYNOR_HEADER_LABEL'],
                value: 'treynor',
                width: '55px'
            }, {
                label: Languages[props.appState.appLanguage]['JA_HEADER_LABEL'],
                value: 'jenssen',
                width: '55px'
            }
        ];

        this.sortByList = cloneDeep(this.headerTitles);
        map(this.sortByList, o => {
            o.label = o.label.replace(/<(?:.|\n)*?>/gm, ' ');
            return o;
        });

        this.filterData = {
            name: null,
            type: null,
            sort: null,
        };

        this.showList = [
            {
                value: 5,
                label: 5,
            }, {
                value: 10,
                label: 10,
            }, {
                value: 15,
                label: 15,
            }, {
                value: 20,
                label: 20,
            }
        ];

        this.state = {
            formOther: {
                fieldId: 'other',
                type: 'text',
                hide: false,
                label: Languages[props.appState.appLanguage]['SEARCH_LABEL'],
                onChange: this.onSearchChanged
            },
            filterByFund: types[0],
            sortBy: 'name',
            sortDirection: 'asc',
            masterProductList: props.appState.productList,
            productList: chunk(props.appState.productList, 10),
            productDisplayedIndex: 0,
            fundTypeOptions: types,
            show: 10,
            totalPage: props.appState.productList.length,
        };
    }

    collectFundType(list: any) {
        let tmp = uniq(map(list, 'type'));
        let arr = [{label: Languages[this.props.appState.appLanguage]['ALL_LABEL'], value: ''}];
        tmp.map(i => { arr.push({ label: i, value: i }); });
        return arr;
    }

    componentWillReceiveProps(nextProps: any) {
        if (!isEqual(this.state.masterProductList, nextProps.appState.productList) && nextProps.appState.productList) {
            let types = this.collectFundType(nextProps.appState.productList);
            this.setState({
                masterProductList: nextProps.appState.productList,
                productDisplayedIndex: 0,
                productList: chunk(nextProps.appState.productList, this.state.show),
                fundTypeOptions: types,
                totalPage: nextProps.appState.productList.length
            });
        }
    }

    onPageChange(nextPage: number){
        this.setState({
            productDisplayedIndex: nextPage
        });
    }

    doFilter() {
        let sortedList = sortBy(this.state.masterProductList, this.state.sortBy);
        if (this.state.sortDirection === 'desc') sortedList = sortedList.reverse();

        let productList = chunk(sortedList, this.state.show);
        let totalPage = this.state.masterProductList.length;
        if (this.filterData && (this.filterData.name || this.filterData.type)) {
            let temporaryProductList = filter(sortedList, o => {
                let found = true;
                if (this.filterData.type) {
                    if (o.type !== this.filterData.type) found = false;
                }
                if (this.filterData.name) {
                    if (o.name.toLowerCase().indexOf(this.filterData.name.toLowerCase()) < 0) found = false;
                }
                return found;
            });
            totalPage = temporaryProductList.length;
            productList = chunk(temporaryProductList, this.state.show);
        }

        this.setState({
            totalPage,
            productList,
            productDisplayedIndex: 0
        });
    }

    onFilterByFundChanged(newFilter: any) {
        if (this.state.filterByFund !== newFilter) {
            if (this.state.masterProductList) {
                this.filterData.type = newFilter.value !== '' ? newFilter.value:null;
                this.setState({filterByFund: newFilter}, () => {
                    this.doFilter();
                });
            }
        }
    }

    onSortChanged(newSort: any) {
        if (this.state.sortBy !== newSort) {
            //TODO
            this.setState({sortBy: newSort});
        }
    }

    onShowChanged(newShow: any) {
        if (this.state.show !== newShow.value) {
            this.setState({show: newShow.value}, () => {
                this.doFilter();
            });
        }
    }

    doSort(sortBy: any) {
        let directions = {'asc': 'desc', 'desc': 'asc'};
        let sortDirection = 'asc';
        if (this.state.sortBy === sortBy) sortDirection =  directions[this.state.sortDirection];
        this.setState({sortBy, sortDirection}, () => {
            this.doFilter();
        });

    }

    onSearchChanged(fieldId: any, event: any) {
        let newFormOther = update(this.state.formOther, {
            value: {
                $set: event.target.value
            }
        });
        this.filterData.name = event.target.value !== '' ? event.target.value:null;

        this.setState({formOther: newFormOther}, () => {
            this.doFilter();
        });
    }

    render() {
        let state = this.props.appState;
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col style={{ overflow: 'inherit' }} md={12}>
                            <div className={css(styles.whitePanel, styles.searchBg)}>
                                <Row>
                                    <Col md={5}>
                                        <div style={{position: 'relative'}}>
                                            <Text
                                                appLanguage={state.appLanguage}
                                                data={this.state.formOther}
                                                visibility={true}
                                            />
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                className={css(styles.searchIcon)}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={7} style={{ overflow: 'inherit' }}>
                                        <div className={css(styles.filterBox)}>
                                            <Row>
                                                <Col md={6} style={{ overflow: 'inherit' }}>
                                                    <div className={css(styles.filterInputGroup)}>
                                                        <label className={css(styles.labelSearch)}>
                                                            {Languages[state.appLanguage]['FUND_TYPE_LABEL']}
                                                        </label>

                                                        <PopupDropDown
                                                            onChange={this.onFilterByFundChanged}
                                                            options={this.state.fundTypeOptions}
                                                            lang={state.appLanguage}
                                                        >
                                                            <div className={css(styles.selectFilter)}>
                                                                {this.state.filterByFund.label}
                                                            </div>
                                                        </PopupDropDown>
                                                    </div>
                                                </Col>
                                                <Col md={6} style={{ overflow: 'inherit' }}>
                                                    <div className={css(styles.filterInputGroup)}>
                                                        <label className={css(styles.labelSearch)}>
                                                            {Languages[state.appLanguage]['SORT_BY_LABEL']}
                                                        </label>

                                                        <PopupDropDown
                                                            onChange={this.onSortChanged}
                                                            options={this.sortByList}
                                                            lang={state.appLanguage}
                                                        >
                                                            <div className={css(styles.selectFilter)}>
                                                                {this.state.sortBy.label}
                                                            </div>
                                                        </PopupDropDown>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </Col>

                        {/*actual grid*/}
                        <Col md={12} style={{ overflow: 'inherit' }}>
                            <div className={css(styles.whitePanelProduct)}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr >
                                            {this.headerTitles.map(title => (
                                                <th
                                                    onClick={() => { this.doSort(title.value); }}
                                                    width={title.width}
                                                    key={title.label}
                                                    className={css(styles.headerItem)}>
                                                    {title.value === this.state.sortBy?<FontAwesomeIcon
                                                        className={css(styles.iconSort)}
                                                        icon={this.state.sortDirection==='asc'?faSortUp:faSortDown}/>:null}
                                                    <span
                                                        className={css(title.value === this.state.sortBy && styles.sortedLabel)}
                                                        dangerouslySetInnerHTML={{__html: title.label}} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.productList[this.state.productDisplayedIndex]&&this.state.productList[this.state.productDisplayedIndex].map(item => (
                                            <ProductListItem
                                                key={item.productId}
                                                data={item}
                                                {...this.props}
                                            />
                                        ))}
                                    </tbody>
                                </table>

                                <div>
                                    <div style={{marginTop: 24}}>
                                        <Row>
                                            <Col md={10}>
                                                <Pagination
                                                    lang={state.appLanguage}
                                                    onPageChange={this.onPageChange}
                                                    currentPage={this.state.productDisplayedIndex+1}
                                                    perPage={this.state.show}
                                                    dataLength={this.state.totalPage}
                                                />
                                            </Col>

                                            <Col md={2} style={{ overflow: 'inherit' }}>
                                                <div className={css(styles.filterInputGroup)}>
                                                    <label className={css(styles.labelSearch)}>
                                                        Show
                                                    </label>

                                                    <PopupDropDown
                                                        onChange={this.onShowChanged}
                                                        options={this.showList}
                                                        lang={state.appLanguage}
                                                    >
                                                        <div className={css(styles.selectFilter)}>
                                                            {this.state.show}
                                                        </div>
                                                    </PopupDropDown>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
