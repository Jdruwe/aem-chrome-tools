import {checkFeatureStatus} from "../../util";
import {FEATURE_COMPONENT_DETAIL} from "../../constants";

const ID_BUTTON_REDIRECT = "aem-chrome-tools-crx-redirect";
let toolbar;

function initializeFeature() {
    checkFeatureStatus(FEATURE_COMPONENT_DETAIL).then((status) => {
        if (status) {
            findToolbar();
            setupToolbarObserver();
        }
    });
}

function findToolbar() {
    toolbar = document.getElementById("EditableToolbar");
}

function setupToolbarObserver() {
    const observer = new MutationObserver(handleMutations);
    observer.observe(toolbar, {
        attributes: true
    });
}

function handleMutations() {
    if (!redirectButtonExists()) {
        addRedirectButtonToToolbar();
    }
}

function addRedirectButtonToToolbar() {
    const lastButton = getLastToolbarButton();
    if (lastButton) {
        const path = getNodePathFromToolbarButton(lastButton);
        const componentDetailButton = createComponentDetailButton();
        setDetailListener(componentDetailButton, path);
        toolbar.appendChild(componentDetailButton);
    }
}

function getNodePathFromToolbarButton(toolbarButton) {
    const dataPath = toolbarButton.getAttribute("data-path");
    return dataPath.replace(":", "%3A");
}

function getLastToolbarButton() {
    return toolbar.lastElementChild;
}

function redirectButtonExists() {
    return document.getElementById(ID_BUTTON_REDIRECT);
}

function createComponentDetailButton() {
    const actionButton = document.createElement("button");
    actionButton.className = "coral-Button coral-Button--quiet cq-editable-action";
    actionButton.setAttribute("id", ID_BUTTON_REDIRECT);
    actionButton.setAttribute("title", "CRX");
    actionButton.setAttribute("type", "button");
    actionButton.appendChild(createRedirectButtonIcon());
    return actionButton;
}

function createRedirectButtonIcon() {
    const icon = document.createElement("coral-icon");
    icon.className = "coral-Icon--actions coral-Icon coral-Icon--sizeS";
    icon.setAttribute("aria-label", "actions");
    return icon;
}

function setDetailListener(detailButton, path) {
    detailButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.open(`${location.protocol + '//' + location.host}/crx/de/index.jsp#${path}`);
    });
}

initializeFeature();
