import { Y as Yo } from '../main-CFOLh0Pq.js';

const multiActionStateField = document.getElementById("multiActionStateField");
Yo.onConnected((info, action) => {
    const { isInMultiAction } = action.payload;
    if (!isInMultiAction)
        multiActionStateField.hidden = true;
});
