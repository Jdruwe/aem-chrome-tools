let navigationItems;

function initializeOptions() {
    navigationItems = Array.from(document.getElementsByClassName('navigation__item'));
    for (let item of navigationItems) {
        setNavigationItemClickListener(item);
    }
}

function setNavigationItemClickListener(navItem) {
    navItem.addEventListener('click', function (e) {
        handleNavigationItemClick(e.target);
    })
}

function handleNavigationItemClick(item) {
    const feature = item.dataset.feature;
    updateNavigation(item);
    loadFeature(feature);
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

function showFirstFeature() {
    if (navigationItems.length > 0) {
        handleNavigationItemClick(navigationItems[0]);
    }
}

initializeOptions();
showFirstFeature();