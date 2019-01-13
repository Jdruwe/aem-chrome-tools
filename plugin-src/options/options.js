import {MESSAGE_ENVIRONMENTS} from '../constants'
import {fetchData} from '../util'

const FEATURE_CONTENT_CLASS = "feature__content";

function initializeOptions() {
    initializeEnvironmentsFeature();
}

////////////////////
//ENVIRONMENTS
////////////////////

function initializeEnvironmentsFeature() {

    fetchData(MESSAGE_ENVIRONMENTS, function (data) {
        const environmentsFeature = getFeatureElement('environments');
        const content = environmentsFeature.getElementsByClassName(FEATURE_CONTENT_CLASS);

        data.forEach(function (environment) {
            const htmlElement = document.createElement("input");
            htmlElement.value = environment.url;
            content[0].appendChild(htmlElement);
        });

    });
}

////////////////////
//GENERAL
////////////////////

function getFeatureElement(feature) {
    return document.getElementById(`feature-${feature}`);
}

initializeOptions();

// {color: "red", url: "http://author.prd.aws.intranet"}
// {color: "orange", url: "http://author-001.acc.aws.intranet"}
// {color: "orange", url: "http://author.acc.aws.intranet"}