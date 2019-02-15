import {notify, postData, fetchData, download} from "../util";
import {MESSAGE_IMPORT_SETTINGS, MESSAGE_EXPORT_SETTINGS} from "../constants";

const importSettings = document.getElementById('importSettings');
const exportSettings = document.getElementById('exportSettings');

function initializeImportSettings() {
    importSettings.addEventListener('change', (event) => {
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

function initializeExportSettings() {
    exportSettings.addEventListener('click', () => {
        handleSettingsExport();
    });
}

function handleSettingsExport() {
    fetchData(MESSAGE_EXPORT_SETTINGS, (settings) => {
        download(formatJSON(settings), 'settings.json', 'application/json');
    });
}

function formatJSON(json) {
    return JSON.stringify(json, null, 4);
}

initializeImportSettings();
initializeExportSettings();