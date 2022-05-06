import { map, isArray } from 'lodash';
import * as Languages from '../languages';

export const getOffset = ( el: any ) => {
    var el2 = el || {};
    var curtop = 0;
    var curleft = 0;
    if ((document.getElementById || document.all) && el) {
        do  {
            curleft += el.offsetLeft-el.scrollLeft;
            curtop += el.offsetTop-el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el && el.offsetParent);
    }
    // else if (document.layers) {
    //     curtop += el.y;
    //     curleft += el.x;
    // }
    return { top: curtop-70, left: curleft };
}

export const scrollTo = (element:any, to: any, duration: any) => {
    try {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 25;

        let easeInOutQuad =  (t: any, b: any, c: any, d: any) => {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }

        let animateScroll = () => {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    } catch(err) {
        console.log(err);
    }
}

export const validateEmail = (email: any) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isMobile = () => {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
}


export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

export const QrsToObj = (str: any) => {
    var search = str.substring(1);
    return search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
        function(key, value) { return key===""?value:decodeURIComponent(value) }):{}
}

export const strongPassword = (str: any) => (
    str && /[A-Z]/.test(str) && /[0-9]/.test(str) && str.length >= 6
)


export const fadeOut = (el: any, cb?: any) => {
    el.style.opacity = 1;

    let fade = () => {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    }
    let _fadeOut: any = null;
    ( _fadeOut = () =>{
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
            if (cb) cb();
        } else {
            requestAnimationFrame(_fadeOut);
        }
    })();
}

export const fadeIn = (el: any, display: any, cb?: any) => {
    el.style.opacity = 0;
    el.style.display = display || "block";
    let _fadeIn: any = null;
    (_fadeIn = () =>{
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(_fadeIn);
        }
        if (val >= 1) {
            if (cb) cb();
        }
    })();
}

export const ValidateField = (field: any, value: any, lang: any) => {
    let error = null;
    if (!field) return;
    if (field.type === 'email') {
        if (!validateEmail(value)) {
            return Languages[lang]['EMAIL_ERROR'];
        }
    }

    if (field.required) {
        if (!value || value === '') {
            return Languages[lang]['REQUIRED_ERROR'];
        }
    }

    return error;
};

export const goTo = (history: any, path: any, lang: any) => {
    let destination = `/${lang}/${path}`;
    if (history.location.pathname !== destination) {
        history.push(destination);
    }
};

export const randomChar = () => (Math.random().toString(36)+'00000000000000000').slice(2, 10);

export const formattedDate = (_date: any) => {
    const date = new Date(_date);
    const lang = window.location.pathname.split('/')[1];

    const months = {
        idn: [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
            'September', 'Oktober', 'November', 'Desember'
        ],
        en: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December '
        ]
    }

    if (!isNaN(date.getTime())) {
        const year = date.getFullYear()
            , month = date.getMonth()
            , day = date.getDate();

        let monthName = months[lang][month];
        if (lang === 'idn')
            return `${day < 10 ? '0' + day : day} ${monthName} ${year}`;
        else
            return ` ${monthName} ${day < 10 ? '0' + day : day}, ${year}`;
    }
    return '';
}

export const translateValidateMessage = (errorMessages: any, lang: string) => {
    const errorDictionary = {
        1: 'ERR_CANNOT_EMPTY',
        2: 'ERR_LENGTH_NOT_VALID',
        3: 'ERR_NUMERIC_ONLY',
        4: 'ERR_EMAIL_NOT_VALID',
        5: 'ERR_FIELD_NOT_MATCH',
        6: 'ERR_DATE_NOT_VALID',
        7: 'ERR_AGE_NOT_VALID',
        8: 'ERR_CANNOT_EQUAL',
        9: 'ERR_NUMERIC_VALUE',
        gt: 'ERR_GT',
        lt: 'ERR_LT',
        eq: 'ERR_EQ',
        lte: 'ERR_LTE',
        gte: 'ERR_GTE'
    };

    let displayMessage = `${Languages[lang]['ERR_NOT_VALID']} (`;
    for (let j = 0; j < errorMessages.length; j++) {
        let messageArr = errorMessages[j].split('~');

        if (parseInt(messageArr[0]) === 2 && messageArr.length === 3) {
            displayMessage += `${Languages[lang][errorDictionary[messageArr[0]]]} ${messageArr[1]} - ${messageArr[2]}`;
        } else if (parseInt(messageArr[0]) === 3 && messageArr.length === 3) {
            displayMessage += `${Languages[lang][errorDictionary[messageArr[0]]]} ${messageArr[1]} - ${messageArr[2]}`;
        } else {
            for (let k = 0; k < messageArr.length; k++) {
                if (errorDictionary[messageArr[k]])
                    displayMessage += Languages[lang][errorDictionary[messageArr[k]]];
                else
                    displayMessage += ` ${messageArr[k]}`;
            }
        }
        displayMessage += ')';
    }

    return displayMessage;
}

const isArray = o => Object.prototype.toString.call(o) == "[object Array]";

// Assumes that target and source are either objects (Object or Array) or undefined
// Since will be used to convert to JSON, just reference objects where possible
export const mergeObjects = (target, source) => {

    var item, tItem, o, idx;

    // If either argument is undefined, return the other.
    // If both are undefined, return undefined.
    if (typeof source == 'undefined') {
        return source;
    } else if (typeof target == 'undefined') {
        return target;
    }

    // Assume both are objects and don't care about inherited properties
    for (var prop in source) {
        item = source[prop];

        if (typeof item == 'object' && item !== null) {

            if (isArray(item) && item.length) {

                // deal with arrays, will be either array of primitives or array of objects
                // If primitives
                if (typeof item[0] != 'object') {

                    // if target doesn't have a similar property, just reference it
                    tItem = target[prop];
                    if (!tItem) {
                        target[prop] = item;

                        // Otherwise, copy only those members that don't exist on target
                    } else {

                        // Create an index of items on target
                        o = {};
                        for (var i=0, iLen=tItem.length; i<iLen; i++) {
                            o[tItem[i]] = true
                        }

                        // Do check, push missing
                        for (var j=0, jLen=item.length; j<jLen; j++) {

                            if ( !(item[j] in o) ) {
                                tItem.push(item[j]);
                            }
                        }
                    }
                } else {
                    // Deal with array of objects
                    // Create index of objects in target object using ID property
                    // Assume if target has same named property then it will be similar array
                    idx = {};
                    tItem = target[prop]

                    for (var k=0, kLen=tItem.length; k<kLen; k++) {
                        idx[tItem[k].id] = tItem[k];
                    }

                    // Do updates
                    for (var l=0, ll=item.length; l<ll; l++) {
                        // If target doesn't have an equivalent, just add it
                        if (!(item[l].id in idx)) {
                            tItem.push(item[l]);
                        } else {
                            mergeObjects(idx[item[l].id], item[l]);
                        }
                    }
                }
            } else {
                // deal with object
                mergeObjects(target[prop],item);
            }

        } else {
            // item is a primitive, just copy it over
            target[prop] = item;
        }
    }

    return target;
}
