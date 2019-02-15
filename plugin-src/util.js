import {EXTENSION_NAME, MESSAGE_FEATURES_GET} from './constants';

export function notify(message, time = 4000) {
    chrome.notifications.create(null, {
        type: "basic",
        iconUrl: "icon128.png",
        title: EXTENSION_NAME,
        message: message
    }, (id) => {
        setTimeout(() => chrome.notifications.clear(id), time);
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

export function checkFeatureStatus(name) {
    return new Promise(resolve => {
        fetchData(MESSAGE_FEATURES_GET, (features) => {
            resolve(features[name]);
        });
    });
}

export function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}