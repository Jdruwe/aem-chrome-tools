import {notify} from '../../util';

chrome.runtime.onInstalled.addListener(function (details) {
    setInitialData();
    if (isNewInstallation(details)) {
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
                color: "red"
            },
            {
                url: "http://author.prd.aws.intranet",
                color: "red"
            },
            {
                url: "http://author-001.acc.aws.intranet",
                color: "orange"
            },
            {
                url: "http://author.acc.aws.intranet",
                color: "orange"
            },
            {
                url: "http://author-001.tst.aws.intranet",
                color: "blue"
            },
            {
                url: "http://author.tst.aws.intranet",
                color: "blue"
            },
            {
                url: "http://localhost:4502",
                color: "green"
            }
        ]
    })
}

export function getEnvironments(response) {
    chrome.storage.sync.get("environments", (data) => {
        response(data.environments);
    });
}
