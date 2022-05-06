import React from 'react';
import { css } from 'aphrodite';

import { styles } from '../styles';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';
import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft';

import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';

class Pagination extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            dataLength: props.dataLength,
            currentPage: props.currentPage,
            perPage: props.perPage,
            pager: this.getPager(props.dataLength, props.currentPage, props.perPage)
        };
    }

    componentWillReceiveProps(nexProps) {
        if (
            this.state.currentPage !== nexProps.currentPage ||
            this.state.dataLength !== nexProps.dataLength ||
            this.state.perPage !== nexProps.perPage
        ) {
            this.setState({
                dataLength: nexProps.dataLength,
                currentPage: nexProps.currentPage,
                perPage: nexProps.perPage,
                pager: this.getPager(nexProps.dataLength, nexProps.currentPage, nexProps.perPage)
            });
        }
    }

    setPage(page) {
        let pager = this.state.pager;
        if (page < 1 || page > pager.totalPages || page === this.state.currentPage) {
            return;
        }

        this.props.onPageChange(page-1);
    }

    getPager(totalItems, currentPage, pageSize?) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 10;
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className={css(styles.pagination)}>
                <div onClick={() => this.setPage(1)}
                    className={css(styles.itemPagination, pager.currentPage === 1 && styles.disabledPagination)}>
                    <FontAwesomeIcon icon={faStepBackward} className={css(styles.paginationIconLastLeft)} />
                </div>
                <div onClick={() => this.setPage(pager.currentPage - 1)}
                     className={css(styles.itemPagination, pager.currentPage === 1 && styles.disabledPagination)}>
                    <FontAwesomeIcon icon={faCaretLeft} className={css(styles.paginationIconLeft)} />
                </div>
                {pager.pages.map((page, index) =>
                    <div onClick={() => this.setPage(page)} key={index} className={css(styles.itemPagination, pager.currentPage === page && styles.activePagination)}>
                        {page}
                    </div>
                )}
                <div onClick={() => this.setPage(pager.currentPage + 1)} className={css(styles.itemPagination, pager.currentPage === pager.totalPages && styles.disabledPagination)}>
                    <FontAwesomeIcon icon={faCaretRight} className={css(styles.paginationIcon)} />
                </div>
                <div onClick={() => this.setPage(pager.totalPages)}
                    className={css(styles.itemPagination, pager.currentPage === pager.totalPages && styles.disabledPagination)}>
                    <FontAwesomeIcon icon={faStepForward} className={css(styles.paginationIconLast)} />
                </div>
            </div>
        );
    }
}

export default Pagination;