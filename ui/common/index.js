import { _ as __awaiter } from '../tslib.es6-WQS2tr1v.js';
import { Y as Yo } from '../main-CFOLh0Pq.js';

const infoBanner = document.getElementById("infoBanner");
Yo.plugin.onSendToPropertyInspector((ev) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = ev.payload) === null || _a === void 0 ? void 0 : _a.method) !== 'applicationStateChanged')
        return;
    console.log("Received application state change:", ev.payload);
    if (!ev.payload.isAppInstalled)
        infoBanner.innerHTML = 'Install Elgato Wave Link. <sd-link href="https://www.elgato.com">Download here</sd-link>';
    else if (!ev.payload.isAppConnected)
        infoBanner.innerHTML = 'Open Elgato Wave Link';
    else if (!ev.payload.isAppUpToDate)
        infoBanner.innerHTML = 'Update Elgato Wave Link app to continue';
}));
