import {notify} from '../../util';

chrome.runtime.onInstalled.addListener(function (details) {
    if (isNewInstallation(details)) {
        setInitialData();
        notify('Installation successful, complete the setup in the options.');
    }
});

function isNewInstallation(details) {
    return details.reason === 'install';
}

function setInitialData() {
    chrome.storage.sync.set({
        "environments": [],
        "features": {
            "environmentDisplay": false,
            "componentDetail": false
        }
    })
}

function getData(property, response) {
    chrome.storage.sync.get(property, (data) => {
        response(data[property]);
    });
}

function getAllData(response) {
    chrome.storage.sync.get(null, (data) => {
        response(data);
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

export function exportSettings(response) {
    getAllData(response);
}