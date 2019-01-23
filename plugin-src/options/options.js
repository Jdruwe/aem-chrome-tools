function setFeatureOptionListeners() {
    const navigationItems = document.getElementsByClassName("navigation__item");
    for (let i = 0; i < navigationItems.length; i++) {
        navigationItems[i].addEventListener("click", function (e) {
            const target = e.target;
            const feature = target.dataset.feature;
            showFeatureOption(feature);
            e.preventDefault();
        })
    }
}

function showFeatureOption(feature) {
    const iframe = document.getElementById("iframe");
    iframe.setAttribute("src", `feature-${feature}.html`);
}

setFeatureOptionListeners();


// import {MESSAGE_ENVIRONMENTS} from '../constants'
// import {fetchData, createElementFromString} from '../util'
// import * as featureEnvironmentDisplay from './features/environment-display/environment-display';

// const FEATURE_CONTENT_CLASS = "feature__content";
// const features = [];

// function initializeFeatures() {
//     features.push(featureEnvironmentDisplay.getFeature());
// }
//
// function showOptions() {
//     const featuresContainer = document.getElementById("features");
//     features.forEach(function (feature) {
//         showFeatureOption(featuresContainer, feature);
//     });
// }

//
// function showFeatureOption(container, feature) {
//
//     const html = `<div class="feature" id="feature-${feature.name}">
//         <div class="feature__header">
//             <label>
//                 <input type="checkbox" name="checkbox" value="value">
//                 <span>${feature.title}</span>
//             </label>
//         </div>
//         <div class="feature__description">
//             ${feature.description}
//         </div>
//         <div class="feature__content">
//
//         </div>
//     </div>`;
//
//     container.appendChild(createElementFromString(html));
// }
//
// ////////////////////
// //ENVIRONMENTS
// ////////////////////
//
// function initializeEnvironmentsFeature() {
//
//
//     fetchData(MESSAGE_ENVIRONMENTS, function (data) {
//         const environmentsFeature = getFeatureElement('environments');
//         const content = environmentsFeature.getElementsByClassName(FEATURE_CONTENT_CLASS);
//
//         data.forEach(function (environment) {
//             const htmlElement = document.createElement("input");
//             htmlElement.value = environment.url;
//             content[0].appendChild(htmlElement);
//         });
//
//     });
// }
//
// ////////////////////
// //GENERAL
// ////////////////////
//
// function getFeatureElement(feature) {
//     return document.getElementById(`feature-${feature}`);
// }

// initializeFeatures();
// showOptions();

// {color: "red", url: "http://author.prd.aws.intranet"}
// {color: "orange", url: "http://author-001.acc.aws.intranet"}
// {color: "orange", url: "http://author.acc.aws.intranet"}