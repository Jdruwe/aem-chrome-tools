import {
    MESSAGE_ENVIRONMENTS_GET,
    MESSAGE_ENVIRONMENTS_UPDATE,
    MESSAGE_FEATURES_GET,
    MESSAGE_FEATURES_UPDATE
} from '../../constants';
import {getEnvironments, getFeatures, updateEnvironments, updateFeatures} from './data';

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case MESSAGE_FEATURES_GET:
            getFeatures(response);
            break;
        case MESSAGE_FEATURES_UPDATE:
            updateFeatures(response, msg.data);
            break;
        case MESSAGE_ENVIRONMENTS_GET:
            getEnvironments(response);
            break;
        case MESSAGE_ENVIRONMENTS_UPDATE:
            updateEnvironments(response, msg.data);
            break;
    }
    return true;
});