import { LightningElement } from "lwc";

export default class LightningElementSLDS extends LightningElement {
  constructor() {
    super();
    const path = '/resources/assets/styles/salesforce-lightning-design-system.min.css';
    const styles = document.createElement('link');
    styles.href = path;
    styles.rel = 'stylesheet';
    this.template.appendChild(styles);

    const path2 = '/resources/assets/styles/core.css';
    const styles2 = document.createElement('link');
    styles2.href = path2;
    styles2.rel = 'stylesheet';
    this.template.appendChild(styles2);

    const path3 = '/resources/assets/styles/theme-default.css';
    const styles3 = document.createElement('link');
    styles3.href = path3;
    styles3.rel = 'stylesheet';
    this.template.appendChild(styles3);

    const path4 = '/resources/assets/styles/box-icons.css';
    const styles4 = document.createElement('link');
    styles4.href = path4;
    styles4.rel = 'stylesheet';
    this.template.appendChild(styles4);
  }
}