import {MESSAGE_ENVIRONMENTS_GET, FEATURE_ENVIRONMENT_DISPLAY} from '../../constants'
import {fetchData, checkFeatureStatus} from '../../util'

function initializeEnvironmentDisplay() {
    checkFeatureStatus(FEATURE_ENVIRONMENT_DISPLAY).then((status) => {
        if (status) {
            fetchData(MESSAGE_ENVIRONMENTS_GET, (data) => {
                handleAuthoringInformation(data);
            });
        }
    });
}

function handleAuthoringInformation(data) {
    const location = window.location.toString();
    const authoringInfo = data
        .filter(isValidEnvironment)
        .find((env) => location.startsWith(env.url));

    if (authoringInfo) {
        displayEnvironmentInfo(authoringInfo.color);
    }
}

function isValidEnvironment(env) {
    return env.url != null && env.url !== '';
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