const api_url = 'https://5.ilovebot.ru/api'
// const api_url = 'https://pn.ilovebot.ru'
import {URLSearchParams} from "core-js"

const front_url = 'https://vk-billion.gamesmm.ru'
const params = window.location.search;

async function getUserInfo(url = '', data) {
    let tail = (Object.keys(params).length === 0) ? '' : (new URLSearchParams(params)).toString()
    let request = api_url + url + '?'+ data;

    let response = await fetch(request,
        {
            method: 'GET',
        });
    if (!response.ok) {
        throw new Error(`Неполучилось отправить GET запрос ${url}, статус ${response.status}`)
    }
    return await response.json();
}

async function postQuestion(url = '', id ,data = {}) {
    let tail = (Object.keys(params).length === 0) ? '' : (new URLSearchParams(params)).toString()
    let request = api_url + url + '?'+ id;

    let response = await fetch(request,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    // if (!response.ok) {
    //     throw new Error(`Неполучилось отправить POST запрос ${url}, статус ${response.status}`)
    // }
    return await response.json()
}

async function postHeal(url = '', id, data = {}) {
    let tail = (Object.keys(params).length === 0) ? '' : (new URLSearchParams(params)).toString()
    let request = api_url + url + '?'+ id;

    let response = await fetch(request,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    if (!response.ok) {
        throw new Error(`Неполучилось отправить POST запрос ${url}, статус ${response.status}`)
    }
    return await response.json()
}

async function postFinish(url = '', id, data = {}) {
    let tail = (Object.keys(params).length === 0) ? '' : (new URLSearchParams(params)).toString()
    let request = api_url + url + '?'+ id;

    let response = await fetch(request,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    if (!response.ok) {
        throw new Error(`Неполучилось отправить POST запрос ${url}, статус ${response.status}`)
    }
    return await response.json()
}

async function postClick(url = '', id, data = {}) {
    let tail = (Object.keys(params).length === 0) ? '' : (new URLSearchParams(params)).toString()
    let request = api_url + url + '?'+ id;

    let response = await fetch(request,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    if (!response.ok) {
        throw new Error(`Неполучилось отправить POST запрос ${url}, статус ${response.status}`)
    }
    return await response.json()
}

const ServerConnect = {
    postQuestion: postQuestion,
    getUser: getUserInfo,
    postClick: postClick,
    postHeal: postHeal,
    postFinish: postFinish,
    api_url: api_url,
    front_url: front_url
}

export default ServerConnect;
