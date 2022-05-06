import * as React from 'react';
import { css } from 'aphrodite';

import { styles } from './style';
import { fadeIn, fadeOut } from '../../../data/global/functions';

export default class QuotesElement extends React.Component<any, any> {
    quotesElements: Array<any> = [];
    interValInstance: any = null;
    currentActiveItem: number = 0;
    nextActiveItem: number = 1;

    componentDidMount() {
        for(let i=0; i < this.props.quotes.length; i++) {
            let el= document.getElementById(`quote-item-${i}`);
            if (el) this.quotesElements.push(el);
        }

        this.runQuote();

        const handleVisibilityChange = () => {
            if (document[hidden]) {
                if (this.interValInstance) clearInterval(this.interValInstance);
            } else {
                this.runQuote();
            }
        }

        let hidden = null;
        let visibilityChange = null;
        if (typeof document.hidden !== 'undefined') {
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        } else if (typeof document['msHidden'] !== 'undefined') {
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
        } else if (typeof document['webkitHidden'] !== 'undefined') {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }

        if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
            console.log('penasaran');
        } else {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }

    }

    runQuote() {
        if (this.quotesElements.length)
            this.quotesElements[this.currentActiveItem].style.display = 'block';

        this.interValInstance = setInterval(() => {
            fadeOut(this.quotesElements[this.currentActiveItem], () => {
                fadeIn(this.quotesElements[this.nextActiveItem], null);

                if (this.currentActiveItem  == (this.props.quotes.length - 2)) {
                    this.nextActiveItem = 0;
                    this.currentActiveItem = this.props.quotes.length - 1;
                }
                else {
                    this.nextActiveItem += 1;
                    if (this.currentActiveItem  == (this.props.quotes.length - 1)) this.currentActiveItem = 0;
                    else this.currentActiveItem += 1;
                }
            });
        }, 5000);
    }

    componentWillUnmount() {
        if (this.interValInstance) clearInterval(this.interValInstance);
    }

    render() {
        return (
            <div className={css(styles.quotesBackground)}>
                {this.props.quotes.map((item, indx) => {
                    return (
                        <div key={indx} id={`quote-item-${indx}`} style={{display: 'none'}}>
                            <h3 className={css(styles.quoteTitle)}>"{item.quote}"</h3>
                            <h5 className={css(styles.quoteAuthor)}>- {item.author}</h5>
                        </div>
                    )
                })}
            </div>
        );
    }
}
