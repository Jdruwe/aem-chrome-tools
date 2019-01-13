import {MESSAGE_ENVIRONMENTS} from '../../constants'

function initializeEnvironmentDisplay() {
    fetchData(MESSAGE_ENVIRONMENTS, function (data) {
        handleAuthoringInformation(data);
    });
}

function fetchData(type, callback) {
    chrome.runtime.sendMessage({type: type}, (response) => {
        callback(response);
    });
}

function handleAuthoringInformation(data) {
    const location = window.location.toString();
    const authoringInfo = data.find(info => location.startsWith(info.url));
    if (authoringInfo) {
        displayEnvironmentInfo(authoringInfo.color);
    }
}

function displayEnvironmentInfo(color) {
    displayAemEnvironmentInfo(color);
    displayCrxEnvironmentInfo(color);
    displayEditorEnvironmentInfo(color);
}

function displayAemEnvironmentInfo(color) {
    addStyleString(`
        .coral-Shell-header {
            background-color: ${color};
        }
    `);
}

function displayCrxEnvironmentInfo(color) {
    addStyleString(
        `.crx-switcher.crx-delite, .crx-switcher.crx-packmgr  {
            background-color: ${color};
            background-blend-mode: multiply;
        }
    `);
}

function displayEditorEnvironmentInfo(color) {
    addStyleString(
        `.editor-GlobalBar {
            background-color: ${color};
        }
    `);
}

function addStyleString(styling) {
    const node = document.createElement('style');
    node.innerHTML = styling;
    document.body.appendChild(node);
}

initializeEnvironmentDisplay();