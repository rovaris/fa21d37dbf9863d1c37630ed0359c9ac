import Cookies from 'js-cookies';

export type Session = {
    name: string,
    screenName: string,
    profileImageUrl: string,
};

export const loadUserSession = ():Session => {
    const raw = Cookies.getItem('user');

    if (raw) {
        return JSON.parse(raw);
    }

    return null;
};

export const destroySession = () => {
    Cookies.remove('user');
    Cookies.remove('connect.sid');
};
