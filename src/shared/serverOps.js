require('dotenv').config();
export const SERVER_LOC = process.env.REACT_APP_REMOTE_SERVER || 'https://localhost:3443';
export const STORAGE_LOC = process.env.REACT_APP_STORAGE_LOC || SERVER_LOC;

const getTokenFromCookie = () => (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/) || [null, null])[1];
export const getKupIdFromCookie = () => (document.cookie.match(/^(?:.*;)?\s*kuplogged\s*=\s*([^;]+)(?:.*)?$/) || [null, null])[1];

export const nullFilter = (obj) => {
    let keys = Object.keys(obj);
    let res = {}
    let flag = null;
    keys.forEach(key => {
        if (obj[key] !== '' && obj[key] !== null) {
            flag = true;
            res[key] = obj[key];
        }
    });
    return flag ? res : flag;
}

export const objToBodyQuery = (obj) => { return 'bod=' + encodeURI(JSON.stringify(obj)) }

export const handleRequest = (url, token = null, method = 'GET', body = null, hParams = {}, stringy = true) => {
    let headers = hParams === null ? {} : { 'Content-Type': 'application/json', ...hParams };

    if (token) { headers.Authorization = 'Bearer ' + token; }
    if (method === 'GET' && body) {
        url += (encodeURI(url).indexOf('?') === -1 ? '?' : '&') + objToBodyQuery(body);
        body = null;
    }
    if (body && stringy && hParams !== null) { body = JSON.stringify(body); }

    return fetch(url, { method, headers, body })
        .then(res => {
            if (res.status >= 200 && res.status < 300) { return res.json(); }
            return { err: { serv: res.status, method: method, headers } }
        })
        .catch(err => ({ err: { fetchINx: err, method, headers, body, url } }));
}

export const loginRequest = (user, pass) => {
    return handleRequest(SERVER_LOC + '/signin', null, 'POST', { "username": user, "password": pass })
        .catch(err => ({ err: { fetch: err } }))
}

export const logoutRequest = () => {
    return handleRequest(SERVER_LOC + '/signout', getTokenFromCookie())
        .catch(err => ({ err: { fetch: err } }))
}

export const joinRequest = joinData => {
    delete joinData.agree
    delete joinData.passwordConfirm;
    return handleRequest(SERVER_LOC + '/join', null, 'POST', joinData)
        .catch(err => ({ err: { fetch: err } }))
}

export const findRequest = (search, page) => {
    page = (!page || isNaN(page)) ? '' : page;
    return handleRequest(SERVER_LOC + '/find/' + page, null, 'GET', { search })
        .catch(err => ({ err: { fetch: err } }))
}

export const viewRequest = (kupId, seg) => {
    return handleRequest(SERVER_LOC + '/view/' + kupId + '/' + seg)
        .catch(err => ({ err: { fetch: err } }))
}

export const uniqueNameRequest = kupname => {
    return handleRequest(SERVER_LOC + '/view/confirm/' + kupname)
        .catch(err => ({ err: { fetch: err } }))
}

export const dashRequest = (seg, method = 'GET', payload = null) => {
    return handleRequest(SERVER_LOC + '/dash/' + getKupIdFromCookie() + '/' + seg, getTokenFromCookie(), method, payload)
        .catch(err => ({ err: { fetch: err } }))
}

export const uploadRequest = (imgRole, imgData) => {
    let formdata = new FormData();
    formdata.append('imageFile', imgData);

    return handleRequest(
        SERVER_LOC + '/uploads/' + imgRole + '/' + getKupIdFromCookie(),
        getTokenFromCookie(),
        'POST',
        formdata,
        null,
        false
    )
        .catch(err => ({ err: { fetch: err } }))
}

