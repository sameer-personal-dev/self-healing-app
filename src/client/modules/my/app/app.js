import { LightningElement } from 'lwc';
import LightningElementWithSLDS from '../../../lib/lightningElementWithSLDS.js';

export default class App extends LightningElementWithSLDS {
    showSpeedDialDetails = false;
    openSpeedDialDetails() {
        this.showSpeedDialDetails = true;
    }
    showHome() {
        this.showSpeedDialDetails = false;
    }
}
