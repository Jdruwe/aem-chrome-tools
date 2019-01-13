import {MESSAGE_ENVIRONMENTS} from '../../constants';
import {getEnvironments} from './data';

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case MESSAGE_ENVIRONMENTS:
            getEnvironments(response);
            break;
    }
    return true;
});