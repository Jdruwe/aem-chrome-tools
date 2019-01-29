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

export function postData(type, data, callback) {
    chrome.runtime.sendMessage({type: type, data: data}, (response) => {
        callback(response);
    });
}

export function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}