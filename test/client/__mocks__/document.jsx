const init = () => {
    global.document = {};
    global.document.cookie = '';
    global.window = {};
    global.window.document = global.document;

    global.setMockCookie = (string) => {
        global.document.cookie = string;
    };

    global.removeAllCookies = () => {
        global.document.cookie = null;
    };
};

export default {
    init,
};
