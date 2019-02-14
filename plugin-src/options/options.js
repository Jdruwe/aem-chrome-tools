import {fetchData, notify, postData} from "../util";
import {MESSAGE_FEATURES_UPDATE, MESSAGE_FEATURES_GET} from "../constants";

class NavigationItem {
    constructor(container, template) {
        this.container = container;
        this.template = template;
    }
}

class FeatureNavigationItem extends NavigationItem {

    constructor(container, template, featureName) {
        super(container, template);
        this.featureName = featureName;
    }

    setFeatureStatus(status) {
        this.container.getElementsByTagName('input')[0].checked = status;
    }
}

const navigationItems = [];

let features;

function initializeOptions() {
    populateNavigationItems();
    getFeatures();
}

function populateNavigationItems() {
    const items = Array.from(document.getElementsByClassName('navigation__item'));
    for (let item of items) {
        if (isFeatureNavigationItem(item)) {
            navigationItems.push(new FeatureNavigationItem(item, item.dataset.template, item.dataset.featureName))
        } else {
            navigationItems.push(new NavigationItem(item, item.dataset.template))
        }
    }
}

function getFeatures() {
    fetchData(MESSAGE_FEATURES_GET, (data) => {
        features = data;
        finalizeNavigationItems();
    });
}

function isFeatureNavigationItem(item) {
    return !!item.dataset.featureName;
}

function finalizeNavigationItems() {
    navigationItems.forEach(function (navItem) {
        setNavigationItemClickListeners(navItem);
        if (navItem instanceof FeatureNavigationItem) {
            setNavigationItemFeatureStatus(navItem);
        }
    });
    showFirstNavigationItem();
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
            handleNavigation(navItem);
        }
    });
}

function isCheckbox(element) {
    return element.matches('input[type="checkbox"]');
}

function updateFeatureStatus(navItem, status) {
    const message = `Feature has been ${status ? 'enabled' : 'disabled'}`;
    features[navItem.featureName] = status;
    postData(MESSAGE_FEATURES_UPDATE, features, () => notify(message, 2000))
}

function handleNavigation(navItem) {
    deactivateNavigationItems();
    activateNavigationItem(navItem.container);
    loadItem(navItem.template);
}

function activateNavigationItem(item) {
    item.classList.add('active')
}

function deactivateNavigationItems() {
    for (let item of navigationItems) {
        item.container.classList.remove('active')
    }
}

function loadItem(template) {
    console.log('>>> loadItem', template);
    const iframe = document.getElementById('iframe');
    iframe.setAttribute('src', `${template}.html`);
}

function showFirstNavigationItem() {
    if (navigationItems.length > 0) {
        handleNavigation(navigationItems[0]);
    }
}

initializeOptions();