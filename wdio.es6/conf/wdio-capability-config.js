export class wdioCapabilityConfig {
    constructor (maxInstances, browser) {
        this.maxInstances = maxInstances
        this.browserName = browser
    }
}