import * as React from 'react';
import { css } from 'aphrodite';
import { isNumber, isEqual } from 'lodash';
import * as numberFormatter from 'number-formatter';
import { styles } from '../styles';
import * as Languages from '../../../data/languages';
import ProductDetail from '../detail';

export class ProductListItem extends React.Component<any, any> {
    listGrid: any = null;
    lang: string = '';
    format: string = '#,##0.##';

    constructor(props: any) {
        super(props);

        this.listGrid = [
            'name', 'type', 'lastNav', 'oneM', 'threeM', 'ytd', 'fromInception',
            'sharpeOneY', 'stdOneY', 'beta', 'treynor', 'jenssen'
        ];

        this.state = {
            data: props.data,
            showDetail: false
        };

        this.lang = this.props.appState.appLanguage;
        if(this.lang === 'idn') this.format = '#.##0,##';

        this.renderName = this.renderName.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextState.data, this.state.data) || this.state.showDetail !== nextState.showDetail;
    }

    displayNumberWithIcon(data: any, type: any) {
        if (isNumber(data)) {
            if (type === 'lastNav' || data === 0)
                return numberFormatter(this.format, data);
            else {
                if (data >= 0) return (
                        <React.Fragment>
                            <img
                                className={css(styles.iconArrow)}
                                src={'/assets/logos/12_icon_Up.svg'} alt={'icon-up'}
                            />
                            <span>{numberFormatter(this.format, data)}</span>
                        </React.Fragment>
                    );
                else return (
                    <React.Fragment>
                        <img className={css(styles.iconArrow)}
                             src={'/assets/logos/13_icon_Down.svg'} alt={'icon-down'}/>
                        <span>{numberFormatter(this.format, data)}</span>
                    </React.Fragment>
                );
            }
        }
        return <span style={{textAlign: 'center', display: 'block'}}>{data}</span>;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data && nextProps.data) {
            this.setState({data: nextProps.data});
        }
    }

    closeModal(showDetail: boolean) {
        this.setState({ showDetail });
    }

    renderName(item: any) {
        let state = this.props.appState;
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div
                    onClick={() => {
                        this.closeModal(true);
                    }}
                    className={css(styles.productName)}
                >
                    { this.state.data[item] }
                </div>
                <div className={css(styles.productActionBox)}>
                    <button className={css(styles.btnBuy)}>
                        <img className={css(styles.iconAction)}
                             src={'/assets/product-icon/05_icon_beli.svg'} alt={'buy-btn'}/>
                        <span>{Languages[state.appLanguage]['BUY_LABEL']}</span>
                    </button>
                    <button className={css(styles.transparentBtn, styles.tooltipBtn)}>
                        <span className={css(styles.tooltipText)}>
                            {Languages[state.appLanguage]['SELL_LABEL']}
                        </span>
                        <img className={css(styles.iconActionBtn)}
                             src={'/assets/product-icon/03_Button_jual.svg'} alt={'sell-btn'}/>
                    </button>
                    <button className={css(styles.transparentBtn, styles.tooltipBtn)}>
                        <span className={css(styles.tooltipText)}>
                            {Languages[state.appLanguage]['SWITCH_LABEL']}
                        </span>
                        <img className={css(styles.iconActionBtn)}
                             src={'/assets/product-icon/04_Button_tukar.svg'} alt={'switch-btn'}/>
                    </button>
                </div>

                <ProductDetail
                    {...this.props}
                    data={this.state.data}
                    showDetail={this.state.showDetail}
                    onCloseModal={this.closeModal}
                />
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    {this.listGrid.map(item => (
                        <td key={item} className={css(styles.dataItem)}>
                            {item === 'name'? this.renderName(item):this.displayNumberWithIcon(this.state.data[item], item)}
                        </td>
                    ))}
                </tr>
            </React.Fragment>
        );
    }
}
