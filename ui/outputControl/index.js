import { Y as Yo } from '../main-CFOLh0Pq.js';

const actionSubtypeField = document.getElementById("actionSubtypeField");
const multiActionStateField = document.getElementById("multiActionStateField");
const adjustKeyField = document.getElementById("adjustKeyField");
const adjustKey = document.getElementById("adjustKey");
const adjustDialField = document.getElementById("adjustDialField");
const adjustDial = document.getElementById("adjustDial");
const actionStyleKeyField = document.getElementById("actionStyleKeyField");
const actionStyleDialField = document.getElementById("actionStyleDialField");
Yo.onConnected((info, action) => {
    const { controller, isInMultiAction } = action.payload;
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
function updateTooltip() {
    adjustKey.tooltipFormat = function (value) {
        if (value > 0)
            return `${value}%`;
        else
            return `${value - 1}%`;
    };
    adjustDial.tooltipFormat = function (value) {
        if (value > 0)
            return `${value}%`;
        else
            return `${value - 1}%`;
    };
}
