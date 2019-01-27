import {MESSAGE_ENVIRONMENTS, MESSAGE_ENVIRONMENTS_UPDATE} from '../../constants';
import {getEnvironments, updateEnvironments} from './data';

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case MESSAGE_ENVIRONMENTS:
            getEnvironments(response);
            break;
        case MESSAGE_ENVIRONMENTS_UPDATE:
            updateEnvironments(response, msg.data);
            break;
    }
    return true;
});