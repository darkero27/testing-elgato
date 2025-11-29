import { _ as __awaiter } from '../tslib.es6-WQS2tr1v.js';
import { Y as Yo } from '../main-CFOLh0Pq.js';

const actionSubtypeField = document.getElementById("actionSubtypeField");
const multiActionStateField = document.getElementById("multiActionStateField");
const setValue = document.getElementById("setValue");
const adjustKeyField = document.getElementById("adjustKeyField");
const adjustKey = document.getElementById("adjustKey");
const adjustDialField = document.getElementById("adjustDialField");
const adjustDial = document.getElementById("adjustDial");
const actionStyleKeyField = document.getElementById("actionStyleKeyField");
const actionStyleDialField = document.getElementById("actionStyleDialField");
let unit = 'dB';
let controller = '';
Yo.onConnected((info, action) => {
    controller = action.payload.controller;
    const { isInMultiAction } = action.payload;
    if (controller === 'Encoder') {
        actionSubtypeField.hidden = true;
        adjustKeyField.hidden = true;
        actionStyleKeyField.hidden = true;
    }
    else {
        adjustDialField.hidden = true;
        actionStyleDialField.hidden = true;
    }
    if (!isInMultiAction)
        multiActionStateField.hidden = true;
    updateTooltip();
});
Yo.plugin.onSendToPropertyInspector((ev) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (((_a = ev.payload) === null || _a === void 0 ? void 0 : _a.event) === 'valueRange') {
        const minRange = (_c = (_b = ev.payload) === null || _b === void 0 ? void 0 : _b.minRange) !== null && _c !== void 0 ? _c : 0;
        const totalRange = (_e = (_d = ev.payload) === null || _d === void 0 ? void 0 : _d.totalRange) !== null && _e !== void 0 ? _e : 100;
        const maxRange = minRange + totalRange;
        setValue.min = minRange;
        setValue.max = maxRange;
        const settings = yield ev.action.getSettings();
        unit = (settings === null || settings === void 0 ? void 0 : settings.actionType) === 'Gain' ? 'dB' : '%';
        updateTooltip();
        switch (settings === null || settings === void 0 ? void 0 : settings.actionSubtype) {
            case 'Set':
                document.getElementById('minRangeLabelSet').innerHTML = `${minRange}${unit}`;
                document.getElementById('maxRangeLabelSet').innerHTML = `${maxRange}${unit}`;
                break;
            case 'Adjust':
                if (controller === 'Key') {
                    document.getElementById('minRangeLabelAdjustKey').innerHTML = `1${unit}`;
                    document.getElementById('maxRangeLabelAdjustKey').innerHTML = `10${unit}`;
                }
                else {
                    document.getElementById('minRangeLabelAdjustDial').innerHTML = `1${unit}`;
                    document.getElementById('maxRangeLabelAdjustDial').innerHTML = `5${unit}`;
                }
                break;
        }
        if (setValue.value !== undefined && (setValue.value < minRange || setValue.value > maxRange)) {
            settings.setValue = maxRange;
            ev.action.setSettings(settings);
        }
    }
}));
function updateTooltip() {
    adjustKey.tooltipFormat = function (value) {
        if (value > 0)
            return `${value}${unit}`;
        else
            return `${value - 1}${unit}`;
    };
    adjustDial.tooltipFormat = function (value) {
        if (value > 0)
            return `${value}${unit}`;
        else
            return `${value - 1}${unit}`;
    };
}
