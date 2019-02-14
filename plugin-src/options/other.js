import {notify, postData} from "../util";
import {MESSAGE_IMPORT_SETTINGS} from "../constants";

const settings = document.getElementById('settings');

function initializeImportSettings() {
    settings.addEventListener('change', (event) => {
        handleSettingsImport(event.target.files[0]);
    });
}

function handleSettingsImport(file) {
    const reader = new FileReader();
    reader.onload = updateSettings;
    reader.readAsText(file);
}

function updateSettings(event) {
    const json = JSON.parse(event.target.result);
    postData(MESSAGE_IMPORT_SETTINGS, json, () => {
        notify('Settings have been imported');
        parent.location.reload();
    });
}

initializeImportSettings();