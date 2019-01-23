import {EXTENSION_NAME} from './constants';

export function notify(message) {
    chrome.notifications.create(null, {
        type: "basic",
        iconUrl: "icon128.png",
        title: EXTENSION_NAME,
        message: message
    });
}

export function fetchData(type, callback) {
    chrome.runtime.sendMessage({type: type}, (response) => {
        callback(response);
    });
}

export function createElementFromString(html) {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.firstChild;
}