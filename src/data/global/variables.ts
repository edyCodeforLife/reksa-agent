export const globalColorDefault = '#1832AB';
export const globalTextColorDefault = '#3672B4';
export const globalBorderColorSecondary = '#C1DFFF';
export const globalSecondaryBtnBg = '#F6FBFF';
export const globalGreenColor = '#29CB97';
export const globalYellowColor = '#FEC400';
export const globalRedColor = '#F44336';
export const globalGreenBackgroundColor = '#71d456';
export const globalBrownColor = '#FBC02D';

export const font100 = {
    fontFamily: "Gotham",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('/assets/fonts/GOTHAM-THIN.TTF') format('truetype')"
}

export const font300 = {
    fontFamily: "Gotham",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('/assets/fonts/GOTHAM-LIGHT.TTF') format('truetype')"
}

export const font500 = {
    fontFamily: "Gotham",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('/assets/fonts/GOTHAM-MEDIUM.TTF') format('truetype')"
}

export const font700 = {
    fontFamily: "Gotham",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('/assets/fonts/GOTHAM-BOLD.TTF') format('truetype')"
}

export const globalButton = {
    backgroundColor: globalColorDefault,
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    padding: '0 54px',
    borderRadius: 30,
    lineHeight: '45px',
    height: 45,
    marginTop: 12,
    marginLeft: 6,
    marginRight: 6,
    minWidth: 150,
    ':disabled': {
        cursor: 'default',
        opacity: .5
    }
};

export const globalInnerSection = {
    paddingTop: 105,
    background: '#E5EFF9',
    backgroundImage: 'url("/assets/images/Base.svg")',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    minHeight: 'calc(100vh - 205px)'
};

export const globalPanelHead = {
    background: '#fff',
    margin: '24px 0',
    padding: '100px 0',
    paddingTop: 0,
    boxShadow: '0px 0px 11px #eee',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
};

export const globalPanelHeadTitle = {
    background: '#F6F9FE',
    backgroundImage: 'url("/assets/images/kyc/09_Base_Profil_Saya.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: '12px 24px',
    position: 'relative'
};

export const globalPanelHeadTitleText = {
    color: '#fff',
    marginBottom: 6,
    fontSize: 24,
};

export const lineBtn = {
    color: globalTextColorDefault,
    textDecoration: 'none',
    border: `1px solid ${globalTextColorDefault}`,
    display: 'inline-block',
    padding: '0 54px',
    borderRadius: 30,
    lineHeight: '45px',
    height: 45,
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: 6,
    marginRight: 6,
    background: '#fff'
};

export const lineSeparator = {
    content: '""',
    display: 'block',
    width: '100%',
    height: 1,
    background: 'rgba(0,0,0,.06)',
    marginTop: 48,
    marginBottom: 12
};

export const goalUrlAlias = {
    'step1': 'step1',
    'step2': 'step2',
    'step3': 'step3'
};

export const insideModal =  {
    padding: '24px 48px',
    width: 350,
    textAlign: 'center'
};

export const logoBox =  {
    background: globalGreenBackgroundColor,
    width: 80,
    height: 80,
    lineHeight: '80px',
    color: '#fff',
    borderRadius: 50,
    margin: '0 auto',
    textAlign: 'center'
};

export const warningLogoBox = {
    background: globalBrownColor
};

export const logoIcon = {
    fontSize: 30,
    verticalAlign: 'middle',
};

const colorEnd = '#005099';
const colorStart = '#0B8FDE';

export const blueBtnGradient = {
    margin: '12px auto',
    // width: '70%',
    position: 'relative',
    boxShadow: '6px 6px 3px rgba(0,0,0,.07)',
    color: '#fff',
    padding: '0 24px',
    borderRadius: 30,
    textAlign: 'left',
    lineHeight: '45px',
    cursor: 'pointer',
    outline: 'none',
    display: 'block',
    textDecoration: 'none',
    backgroundColor: colorEnd,
    background: `linear-gradient(135deg, ${colorStart} 0%,${colorEnd} 100%)`,
    filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr="${colorStart}", endColorstr="${colorEnd}",GradientType=1)`
};

export const blueBtnGradientRightCircleBox = {
    display: 'inline-block',
    position: 'absolute',
    right: 6,
    border: '1px solid #fff',
    width: 26,
    height: 26,
    top: 8,
    textAlign: 'center',
    borderRadius: 41
};

export const blueBtnGradientRightCircleIcon = {
    color: '#fff',
    verticalAlign: 'top',
    marginTop: 5
};

export const cookiesName = 'qefdfdsfad2424sdfsdf3';
export const cookiesDetailName = 'TGHJKHLGFJ23232323GHGH';
export const cookiesNewName = 'md-token-new';
export const lsProductName = 'sfgdsfsfgsdfggdf';
export const SECRET_KEY = '23452fdsgdfgdgdfdsdg';

export const internationalizeDate = {
    idn: {
        previousMonth: 'Sebelumnya',
        nextMonth: 'Selanjutnya',
        months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
            'September', 'Oktober', 'November', 'Desember'],
        monthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agus',
            'Sept', 'Okt', 'Nov', 'Des'],
        weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        weekdaysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    },
    en: {
        previousMonth: 'Previous Month',
        nextMonth: 'Next Month',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'],
        monthShort: ['Janu', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
            'Sept', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
};