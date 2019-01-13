import {EXTENSION_NAME} from './constants';

export function notify(message) {
    chrome.notifications.create(null, {
        type: "basic",
        iconUrl: "icon128.png",
        title: EXTENSION_NAME,
        message: message
    });
}