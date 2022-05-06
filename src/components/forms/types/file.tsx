import * as React from "react";
import { css } from "aphrodite";
import { Row, Col } from "react-grid-system";
import { isEqual, pick } from 'lodash';
import Modal from 'react-responsive-modal';

import { Spinner } from '../../spinner';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilePdf from '@fortawesome/fontawesome-free-solid/faFilePdf';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import * as Languages from '../../../data/languages';
import { KycService, IKycService } from '../../../data/business/profile/kyc';

import { styles } from "../style";
import { Text } from './text';
import {IInputStates} from '../../../interfaces/form';

export class File extends Text {
    fileInput: any = null;
    previewBox: any = null;
    previewImg: any = null;
    instance: any = this;

    service: IKycService = new KycService();

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            appLanguage: props.appLanguage,
            open: false,
            thumbnail: null,
            loading: false
        };

        this.__onChange = this.__onChange.bind(this);
        this.openFileExplorer = this.openFileExplorer.bind(this);
        this.resetField = this.resetField.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

        this.doDrawImagePreview = this.doDrawImagePreview.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        let _props = pick(nextProps.data, 'md', 'value', 'hide', 'disabled', 'error', 'label');
        let _data = pick(this.state.data, 'md', 'value', 'hide', 'disabled', 'error', 'label');
        if (!isEqual(_data, _props)) {
            let { data, appLanguage } = nextProps;
            this.setState({data, appLanguage});
            if (data.value && (this.state.thumbnail !== data.value.thumbnail)) {
                this.setState({loading: true});
                this.service.GetProfileImage(data.value.thumbnail, {
                    Success: res => {
                        this.setState({loading: false}, () => {
                            this.doDrawImagePreview(res.base64, res.fileName);
                        });
                    },
                    ServerError: () => {
                        // file is not available
                        this.setState({loading: false}, () => {
                            this.doDrawImagePreview(null, null);
                        });
                    }
                });
            }
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // prevent rerender component with same data
        return !isEqual(nextProps.data, this.state.data) || this.state.open !== nextState.open || this.state.loading !== nextState.loading;
    }

    openFileExplorer() {
        if (!this.state.loading)
            this.fileInput.click();
    }

    resetField() {
        this.element.value = '';
        this.fileInput.value = '';
        this.previewImg = null;

        this.state.data.onChange(this.state.data.fieldId, { target: { value: '' } });
        this.forceUpdate();
    }

    __onChange(event: any) {
        let { name, size, type } = event.target.files[0];

        // validate file type and size
        let sizeInMb = size / 1024 / 1024;
        let isAllowedType = (type.split('/')[0] == 'image') || (type.indexOf('pdf') > -1);
        if (sizeInMb > 3 || !isAllowedType) {
            this.setState({ open: true });
            return;
        }

        event.persist();

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        this.setState({loading: true});

        reader.onload = (e) => {
            let isPdf = type && type.toLowerCase().indexOf('pdf') > -1;
            if (isPdf) {
                this.service.Upload(this.state.data.fileType, event.target.files[0], {
                    Success: (data) => {
                        this.setState({loading: false, thumbnail: data[this.state.data.fileType].thumbnail}, () => {
                            this.element.value = name;
                            this.drawPreview((e.target as any)['result'], type);
                            this.state.data.onChange(this.state.data.fieldId, {target: {value: data[this.state.data.fileType]}});
                        });
                                            },
                    NoFileDetected: () => {
                        this.setState({open: true, loading: false});
                    },
                    FileTooBig: () => {
                        this.setState({open: true, loading: false});
                    },
                    WrongContentType: () => {
                        this.setState({open: true, loading: false});
                    }
                }, '100', '100');
            } else {
                let img = new Image();
                img.onload = () => {
                    let ratio = img.width / img.height;
                    let newHeight = 100;
                    let newWidth = Math.floor(ratio * newHeight);

                    this.service.Upload(this.state.data.fileType, event.target.files[0], {
                        Success: (data) => {
                            this.setState({loading: false, thumbnail: data[this.state.data.fileType].thumbnail}, () => {
                                this.element.value = name;
                                this.drawPreview((e.target as any)['result'], type);
                                this.state.data.onChange(this.state.data.fieldId, {target: {value: data[this.state.data.fileType]}});
                            });
                                                    },
                        NoFileDetected: () => {
                            this.setState({open: true, loading: false});
                        },
                        FileTooBig: () => {
                            this.setState({open: true, loading: false});
                        },
                        WrongContentType: () => {
                            this.setState({open: true, loading: false});
                        }
                    }, String(newWidth), String(newHeight));
                };
                img.src = (e.target as any)['result'];
            }
        }
    }

    drawPreview(fileBase64: any, type?: any) {
        let isPdf = type && type.toLowerCase().indexOf('pdf') > -1;
        if (isPdf) {
            // faFilePdf
            this.previewImg = <FontAwesomeIcon icon={faFilePdf} className={css(styles.iconPdfPreview)} />;

            this.forceUpdate();
        }else {
            if (fileBase64) {
                this.previewImg = <img
                    alt="preview-image"
                    src={fileBase64}
                    className={css(styles.previewImg)}
                />

                this.forceUpdate();
            }
        }
    }

    doDrawImagePreview(src: any, filename?: any) {
        if (this.element) {
            this.element.value = filename;
            let isPdf = filename && filename.indexOf('pdf') > -1;
            if (isPdf) {
                this.previewImg = <FontAwesomeIcon icon={faFilePdf} className={css(styles.iconPdfPreview)}/>;
                this.forceUpdate();
            } else {
                this.previewImg = <img
                    alt="preview-image"
                    src={src}
                    className={css(styles.previewImg)}
                />
                this.forceUpdate();
            }
        }
    }

    switchMultiline(data: any) {
        let { value } = this.element || {value: null};
        let isEmptyClass = !value || value === "" ? "is-empty" : "";
        return (
            <React.Fragment>
                <input
                    disabled={data.disabled||data.forceDisabled}
                    readOnly={true}
                    ref={ref => {
                        this.element = ref;
                    }}
                    onFocus={e => {
                        this.openFileExplorer();
                    }}
                    className={
                        css(styles.default, data.error && styles.errorBar) +
                        " " +
                        isEmptyClass
                    }
                    type={"text"}
                    required={data.required}
                    defaultValue={""}
                />
            </React.Fragment>
        );
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    renderInfo(data: IInputStates) {
        if (data.info) return (
            <div>
                <small
                    className={css(styles.infoLabel, styles.infoGrey)}
                    dangerouslySetInnerHTML={{ __html: data.info }} />
            </div>
        );
    }

    render() {
        let appLanguage = this.props.appLanguage;
        let warning = Languages[appLanguage]['WARNING_FILE'];

        let { data } = this.state;
        let { value } = this.element || {value: null};
        return (
            <Row>
                <Col xs={9}>
                    <div className={css(styles.group, styles.fileGroup)}>
                        {this.switchMultiline(data)}
                        <span className="highlight" />
                        <span className={css(styles.bar) + " " + "bar"} />
                        {this.renderLabel(data)}

                        {this.renderInfo(data)}
                        {this.renderError(data)}

                        {this.state.loading?<Spinner />:null}
                    </div>
                </Col>
                <Col xs={3}>
                    <input
                        id={data.fieldId}
                        ref={el => {
                            this.fileInput = el;
                        }}
                        onChange={this.__onChange}
                        type={"file"}
                        className={css(styles.realInputFile)}
                    />
                    <button
                        disabled={data.disabled||data.forceDisabled}
                        type="button"
                        onClick={e => {
                            this.openFileExplorer();
                        }}
                        className={css(styles.fileBtn)}
                    >
                        {Languages[appLanguage]['SELECT_FILE']}
                    </button>
                </Col>
                <Col xs={12}>
                    <div
                        ref={el => {
                            if (el) {
                                if (value && value !== '' && !this.state.loading )
                                    el.style.setProperty("display", "inline-block", "important");
                                else el.style.setProperty("display", "none", "important");
                            }
                            this.previewBox = el;
                        }}
                        className={css(styles.previewBox, (data.disabled||data.forceDisabled) && styles.prevDisabled)}
                    >
                        {this.previewImg&&!data.disabled?<button type="button" onClick={this.resetField} className={css(styles.btnFileReset)}>x</button>:null}
                        { this.previewImg }
                    </div>
                    <Modal
                        open={this.state.open} onClose={this.onCloseModal} little
                        styles={{overlay: {background: 'rgba(3,78,161,.28)'}}}
                    >
                        <div className={css(styles.insideModal)}>
                            <FontAwesomeIcon icon={faExclamationTriangle} className={css(styles.iconWarning)} />
                            <span className={css(styles.warningText)}>{warning}</span>
                        </div>
                    </Modal>
                </Col>
            </Row>
        );
    }
}
