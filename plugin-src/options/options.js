import {fetchData, notify, postData} from "../util";
import {MESSAGE_FEATURES_UPDATE, MESSAGE_FEATURES_GET} from "../constants";

class NavigationItem {
    constructor(container, featureName, featureTemplate) {
        this.container = container;
        this.featureName = featureName;
        this.featureTemplate = featureTemplate;
    }

    setFeatureStatus(status) {
        this.container.getElementsByTagName("input")[0].checked = status;
    }
}

let renameMeItems = [];

//TODO: remove this, we can use renameMeItems!
let navigationItems;

let features;

function initializeOptions() {
    populateNavigationItems();
    getFeatures()
}

function getFeatures() {
    fetchData(MESSAGE_FEATURES_GET, (data) => {
        features = data;
        finaliseNavigationItems();
    });
}

function populateNavigationItems() {
    navigationItems = Array.from(document.getElementsByClassName('navigation__item'));
    for (let item of navigationItems) {
        renameMeItems.push(new NavigationItem(item, item.dataset.featureName, item.dataset.featureTemplate))
    }
}

function finaliseNavigationItems() {
    renameMeItems.forEach(function (navItem) {
        setNavigationItemFeatureStatus(navItem);
        setNavigationItemClickListeners(navItem);
    });
}

function setNavigationItemFeatureStatus(navItem) {
    const status = features[navItem.featureName];
    navItem.setFeatureStatus(status);
}

function setNavigationItemClickListeners(navItem) {
    navItem.container.addEventListener('click', function (e) {
        if (isCheckbox(e.target)) {
            updateFeatureStatus(navItem, e.target.checked);
        } else {
            handleFeatureNavigation(navItem);
        }
    });
}

function isCheckbox(element) {
    return element.matches('input[type="checkbox"]');
}

function updateFeatureStatus(navItem, status) {
    features[navItem.featureName] = status;
    postData(MESSAGE_FEATURES_UPDATE, features, () => notify("Post worked!"))
}

function handleFeatureNavigation(navItem) {
    updateNavigation(navItem.container);
    loadFeature(navItem.featureTemplate);
}

function updateNavigation(item) {
    deactivateNavigationItems();
    activateNavigationItem(item)
}

function activateNavigationItem(item) {
    item.classList.add('active')
}

function deactivateNavigationItems() {
    for (let item of navigationItems) {
        item.classList.remove('active')
    }
}

function loadFeature(feature) {
    const iframe = document.getElementById('iframe');
    iframe.setAttribute('src', `feature-${feature}.html`);
}

// function showFirstFeature() {
//     if (navigationItems.length > 0) {
//         handleNavigationItemClick(navigationItems[0]);
//     }
// }

initializeOptions();
// showFirstFeature();

