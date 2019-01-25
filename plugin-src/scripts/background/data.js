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

export function getEnvironments(response) {
    chrome.storage.sync.get("environments", (data) => {
        response(data.environments);
    });
}
