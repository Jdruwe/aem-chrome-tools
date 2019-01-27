import {notify} from '../../util';

chrome.runtime.onInstalled.addListener(function (details) {
    if (isNewInstallation(details)) {
        setInitialData();
        notify("Installation successful");
    }
});

function isNewInstallation(details) {
    return details.reason === "install";
}

function setInitialData() {
    chrome.storage.sync.set({
        environments: [
            {
                url: "http://author-001.prd.aws.intranet",
                color: "#FF0000"
            },
            {
                url: "http://author.prd.aws.intranet",
                color: "#FF0000"
            },
            {
                url: "http://author-001.acc.aws.intranet",
                color: "#FFA500"
            },
            {
                url: "http://author.acc.aws.intranet",
                color: "#FFA500"
            },
            {
                url: "http://author-001.tst.aws.intranet",
                color: "#0000FF"
            },
            {
                url: "http://author.tst.aws.intranet",
                color: "#0000FF"
            },
            {
                url: "http://localhost:4502",
                color: "#008000"
            }
        ]
    })
}

function getData(property, response) {
    chrome.storage.sync.get(property, (data) => {
        response(data[property]);
    });
}

function updateData(property, data, response) {
    const update = {};
    update[property] = data;

    chrome.storage.sync.set(update, () => {
        response();
    });
}

export function getEnvironments(response) {
    getData("environments", response);
}

export function updateEnvironments(response, environments) {
    updateData("environments", environments, response);
}
