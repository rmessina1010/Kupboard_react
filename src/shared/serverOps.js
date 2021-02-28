const SERVER_LOC = 'https://localhost:3443';


const getTokenFromCookie = () => (document.cookie.match(/^(?:.*;)?\s*kuplogged\s*=\s*([^;]+)(?:.*)?$/) || [null, null])[1];

export const handleRequest = (url, token = null, method = 'GET', body = null, hParams = {}, stringy = true) => {
    let headers = { 'Content-Type': 'application/json', ...hParams };
    if (token) { headers.Authorization = 'Bearer ' + token; }
    if (!body) { body = null; }
    else if (stringy) { body = JSON.stringify(body); }
    return fetch(url, { method, headers, body })
        .then(res => {
            if (res.status >= 200 && res.status < 300) { return res.json(); }
            return { err: { serv: res.status } }
        })
        .catch(err => ({ err: { fetch: err, method, headers, body } }))
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
    return handleRequest(SERVER_LOC + '/join', null, 'POST', joinData)
        .then(loggedUser => {
            //create session data
            //redirect
        })
        .catch(err => ({ err: { fetch: err } }))
}

export const findRequest = page => {
    page = (!page || isNaN(page)) ? '' : page;
    return handleRequest(SERVER_LOC + '/find/' + page)
        .then(loggedUser => {
            //create session data
            //redirect
        })
        .catch(err => ({ err: { fetch: err } }))
}

export const viewRequest = (kupId, seg) => {
    return handleRequest(SERVER_LOC + '/view/' + kupId + '/' + seg)
        .then(loggedUser => {
            //create session data
            //redirect
        })
        .catch(err => ({ err: { fetch: err } }))
}


export const dashRequest = (seg, method = 'GET', payload = null) => {
    let sessionToken;
    let userKupId;
    return handleRequest(SERVER_LOC + '/dash/' + userKupId + '/' + seg, sessionToken, method, payload)
        .then(loggedUser => {
            //create session data
            //redirect
        })
        .catch(err => ({ err: { fetch: err } }))
}

export const uploadRequest = (imgRole, kupId, imgData) => {
    let sessionToken;

    return handleRequest(
        SERVER_LOC + '/uploads/' + imgRole + '/' + kupId,
        sessionToken,
        'POST',
        { imageFile: imgData },
        { ['Content-Type']: 'multipart/form-data;' }
    )
        .catch(err => ({ err: { fetch: err } }))
}


