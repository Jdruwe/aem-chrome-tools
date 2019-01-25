import {fetchData} from "../util";
import {MESSAGE_ENVIRONMENTS} from "../constants";

function initialize() {
    fetchData(MESSAGE_ENVIRONMENTS, processEnvironmentsData);
}

function processEnvironmentsData(data) {
    const environments = document.getElementsByClassName('environments');
    data.forEach(function (environment) {
        const line = createEnvironmentLine(environment);
        environments[0].appendChild(line);
    });
}

//TODO: this is not a good name, is it?
function createEnvironmentLine(env) {
    const environmentSection = createEnvironmentSection();
    const environmentNameSection = createEnvironmentNameSection(env);
    const environmentDisplaySection = createEnvironmentDisplaySection(env);
    environmentSection.appendChild(environmentNameSection);
    environmentSection.appendChild(environmentDisplaySection);
    return environmentSection;
}

function createEnvironmentSection() {
    const environment = document.createElement("div");
    environment.classList.add('environment');
    return environment;
}

function createEnvironmentNameSection(env) {
    const environmentName = document.createElement("div");
    const environmentNameInput = document.createElement("input");
    environmentName.classList.add('environment__name');
    environmentNameInput.setAttribute('value', env.url);
    environmentName.appendChild(environmentNameInput);
    return environmentName;
}

function createEnvironmentDisplaySection(env) {
    const environmentDisplay = document.createElement("div");
    const environmentDisplayInput = document.createElement("input");
    environmentDisplay.classList.add('environment__display');
    environmentDisplayInput.setAttribute('type', 'color');
    environmentDisplayInput.setAttribute('value', env.color);
    environmentDisplay.appendChild(environmentDisplayInput);
    return environmentDisplay;
}

initialize();