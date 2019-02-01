import {fetchData, notify, postData, removeAllChildren} from '../util';
import {
    MESSAGE_ENVIRONMENTS_GET,
    FEATURE_CONTROL_SAVE,
    MESSAGE_ENVIRONMENTS_UPDATE,
    FEATURE_SAVE_SUCCESS
} from '../constants';

class EnvironmentLine {
    constructor(container, nameSection, displaySection) {
        this.container = container;
        this.nameSection = nameSection;
        this.displaySection = displaySection;
    }
}

let environmentLines;

const environmentsElement = document.getElementsByClassName('environments')[0];
const ENVIRONMENT_SECTION_CLASS_NAME = 'environment__name';
const ENVIRONMENT_SECTION_CLASS_DISPLAY = 'environment__display';
const ENVIRONMENT_SECTION_CLASS_REMOVAL = 'environment__removal';

function initialize() {
    fetchData(MESSAGE_ENVIRONMENTS_GET, (data) => {
        handleData(data);
        setControlListeners();
    });
}

function handleData(data) {
    resetAllEnvironments();
    populateEnvironmentLines(data);
    displayEnvironmentLines();
    setEnvironmentRemovalListener();
}

function resetAllEnvironments() {
    environmentLines = [];
    removeAllChildren(environmentsElement);
}

function populateEnvironmentLines(environments) {
    environments.forEach(function (environment) {
        environmentLines.push(createEnvironmentLine(environment));
    });
}

function displayEnvironmentLines() {
    environmentLines.forEach((environmentLine) => {
        environmentsElement.appendChild(environmentLine.container);
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
    environmentNameInput.setAttribute('placeholder', 'http://www.environment.com');
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
    setNewEnvironmentControlListener();
    setSaveFeatureControlListener();
}

function setNewEnvironmentControlListener() {
    const saveButton = document.getElementById('newEnvironment');
    saveButton.addEventListener('click', () => {
        addNewEnvironment();
    });
}

function addNewEnvironment() {
    const data = getCurrentData();
    data.push({url: '', color: '#FFFFFF'});
    handleData(data);
}

function setSaveFeatureControlListener() {
    const saveButton = document.getElementById(FEATURE_CONTROL_SAVE);
    saveButton.addEventListener('click', () => saveFeature());
}

function saveFeature() {
    postData(MESSAGE_ENVIRONMENTS_UPDATE, getCurrentData(), () => notify(FEATURE_SAVE_SUCCESS));
}

function getCurrentData() {
    return environmentLines.map((environmentLine) => {
        return {
            url: getEnvironmentName(environmentLine),
            color: getEnvironmentColor(environmentLine)
        }
    });
}

function getEnvironmentName(environmentLine) {
    return environmentLine.nameSection.getElementsByTagName('input')[0].value;
}

function getEnvironmentColor(environmentLine) {
    return environmentLine.displaySection.getElementsByTagName('input')[0].value;
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
    const data = getCurrentData();
    data.splice(index, 1);
    handleData(data);
}

initialize();