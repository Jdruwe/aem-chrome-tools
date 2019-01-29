import {fetchData, notify, postData, removeAllChildren} from '../util';
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

let environments;
let environmentLines;

const ENVIRONMENT_SECTION_CLASS_NAME = 'environment__name';
const ENVIRONMENT_SECTION_CLASS_DISPLAY = 'environment__display';
const ENVIRONMENT_SECTION_CLASS_REMOVAL = 'environment__removal';

function processEnvironmentsData(data) {
    environments = data;
    environmentLines = [];

    environments.forEach(function (environment) {
        environmentLines.push(createEnvironmentLine(environment));
    });

    displayEnvironmentLines();
    setEnvironmentRemovalListener();
    setControlListeners();
}

function displayEnvironmentLines() {
    const environments = document.getElementsByClassName('environments')[0];
    removeAllChildren(environments);

    environmentLines.forEach((environmentLine) => {
        environments.appendChild(environmentLine.container);
    });
}

function createEnvironmentLine(env) {
    const environmentSection = createEnvironmentSection();
    const environmentNameSection = createEnvironmentNameSection(env);
    const environmentDisplaySection = createEnvironmentDisplaySection(env);
    const environmentRemovalSection = createEnvironmentRemovalSection();
    environmentSection.appendChild(environmentNameSection);
    environmentSection.appendChild(environmentDisplaySection);
    environmentSection.appendChild(environmentRemovalSection);
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
    environmentName.classList.add(ENVIRONMENT_SECTION_CLASS_NAME);
    environmentNameInput.setAttribute('value', env.url);
    environmentName.appendChild(environmentNameInput);
    return environmentName;
}

function createEnvironmentDisplaySection(env) {
    const environmentDisplay = document.createElement('div');
    const environmentDisplayInput = document.createElement('input');
    environmentDisplay.classList.add(ENVIRONMENT_SECTION_CLASS_DISPLAY);
    environmentDisplayInput.setAttribute('type', 'color');
    environmentDisplayInput.setAttribute('value', env.color);
    environmentDisplay.appendChild(environmentDisplayInput);
    return environmentDisplay;
}

function createEnvironmentRemovalSection() {
    const environmentRemoval = document.createElement('div');
    const environmentRemovalButton = document.createElement('button');
    const text = document.createTextNode('Delete');
    environmentRemovalButton.appendChild(text);
    environmentRemoval.appendChild(environmentRemovalButton);
    environmentRemoval.classList.add(ENVIRONMENT_SECTION_CLASS_REMOVAL);
    return environmentRemoval;
}

function setControlListeners() {
    setSaveFeatureControlListener();
}

function setSaveFeatureControlListener() {
    const saveButton = document.getElementById(FEATURE_CONTROL_SAVE);
    saveButton.addEventListener('click', () => saveFeature());
}

function setEnvironmentRemovalListener() {
    const environmentRemovalSections = Array.from(document.getElementsByClassName(ENVIRONMENT_SECTION_CLASS_REMOVAL));
    for (let i = 0; i < environmentRemovalSections.length; i++) {
        const deleteButton = environmentRemovalSections[i].getElementsByTagName('button')[0];
        deleteButton.addEventListener('click', () => {
            removeEnvironment(i);
        });
    }
}

function removeEnvironment(index) {
    environments.splice(index, 1);
    processEnvironmentsData(environments);
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