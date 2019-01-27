import {fetchData, notify, postData} from '../util';
import {
    MESSAGE_ENVIRONMENTS,
    FEATURE_CONTROL_SAVE,
    MESSAGE_ENVIRONMENTS_UPDATE,
    FEATURE_SAVE_SUCCESS
} from '../constants';

function initialize() {
    fetchData(MESSAGE_ENVIRONMENTS, processEnvironmentsData);
}

class EnvironmentLine {
    constructor(container, nameSection, displaySection) {
        this.container = container;
        this.nameSection = nameSection;
        this.displaySection = displaySection;
    }
}

const environmentLines = [];

function processEnvironmentsData(data) {
    console.log(data);
    const environments = document.getElementsByClassName('environments');
    data.forEach(function (environment) {
        const environmentLine = createEnvironmentLine(environment);
        environmentLines.push(environmentLine);
        environments[0].appendChild(environmentLine.container);
    });
    setControlListeners();
}

function createEnvironmentLine(env) {
    const environmentSection = createEnvironmentSection();
    const environmentNameSection = createEnvironmentNameSection(env);
    const environmentDisplaySection = createEnvironmentDisplaySection(env);
    environmentSection.appendChild(environmentNameSection);
    environmentSection.appendChild(environmentDisplaySection);
    return new EnvironmentLine(environmentSection, environmentNameSection, environmentDisplaySection);
}

function createEnvironmentSection() {
    const environment = document.createElement('div');
    environment.classList.add('environment');
    return environment;
}

function createEnvironmentNameSection(env) {
    const environmentName = document.createElement('div');
    const environmentNameInput = document.createElement('input');
    environmentName.classList.add('environment__name');
    environmentNameInput.setAttribute('value', env.url);
    environmentName.appendChild(environmentNameInput);
    return environmentName;
}

function createEnvironmentDisplaySection(env) {
    const environmentDisplay = document.createElement('div');
    const environmentDisplayInput = document.createElement('input');
    environmentDisplay.classList.add('environment__display');
    environmentDisplayInput.setAttribute('type', 'color');
    environmentDisplayInput.setAttribute('value', env.color);
    environmentDisplay.appendChild(environmentDisplayInput);
    return environmentDisplay;
}

function setControlListeners() {
    setSaveFeatureControlListener();
}

function setSaveFeatureControlListener() {
    const saveButton = document.getElementById(FEATURE_CONTROL_SAVE);
    saveButton.addEventListener('click', () => saveFeature());
}

function saveFeature() {
    const result = [];
    environmentLines.forEach(function (environmentLine) {
        result.push({
            url: environmentLine.nameSection.getElementsByTagName('input')[0].value,
            color: environmentLine.displaySection.getElementsByTagName('input')[0].value
        })
    });

    postData(MESSAGE_ENVIRONMENTS_UPDATE, result, () => notify(FEATURE_SAVE_SUCCESS));
}

initialize();