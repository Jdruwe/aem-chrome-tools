import {notify} from '../../util';

chrome.runtime.onInstalled.addListener(function (details) {
    if (isNewInstallation(details)) {
        setInitialData();
        notify('Installation successful');
    }
});

function isNewInstallation(details) {
    return details.reason === 'install';
}

function setInitialData() {
    chrome.storage.sync.set({
        "environments": [
            {
                "url": "http://author-001.prd.aws.intranet",
                "color": "#FF0000"
            },
            {
                "url": "http://author.prd.aws.intranet",
                "color": "#FF0000"
            },
            {
                "url": "http://author-001.acc.aws.intranet",
                "color": "#FFA500"
            },
            {
                "url": "http://author.acc.aws.intranet",
                "color": "#FFA500"
            },
            {
                "url": "http://author-001.tst.aws.intranet",
                "color": "#0000FF"
            },
            {
                "url": "http://author.tst.aws.intranet",
                "color": "#0000FF"
            },
            {
                "url": "http://localhost:4502",
                "color": "#008000"
            }
        ],
        "features": {
            "environmentDisplay": true,
            "componentDetail": false
        }
    })
}

function getData(property, response) {
    chrome.storage.sync.get(property, (data) => {
        response(data[property]);
    });
}

function setData(data, response) {
    chrome.storage.sync.set(data, () => {
        response();
    });
}

function updateData(property, data, response) {
    const update = {};
    update[property] = data;
    setData(update, response);
}

export function getFeatures(response) {
    getData('features', response);
}

export function updateFeatures(response, feature) {
    updateData('features', feature, response);
}

export function getEnvironments(response) {
    getData('environments', response);
}

export function updateEnvironments(response, environments) {
    updateData('environments', environments, response);
}

export function importSettings(response, settings) {
    setData(settings, response);
}
