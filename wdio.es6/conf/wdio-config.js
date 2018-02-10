
export class wdioConfig {
    constructor () {
        this.specs = []
        this.exclude = []
        this.screenshotPath = null
        this.baseUrl = null
        this.maxInstances = 0
        this.logLevel = null
        this.waitforTimeout = 0
        this.connectionRetryTimeout = 0
        this.connectionRetryCount = 0
        this.services = []
        this.sync = true
        this.coloredLogs = true
        this.deprecationWarnings = true
        this.bail = 0
        this.framework = 'cucumber'
        this.reporters = []
        this.reporterOptions = {}
        this.capabilities = []
        this.cucumberOpts = {}

        this.onPrepare = () => {}

        this.beforeSession = () => {}
        this.before = () => {}
        this.beforeCommand = () => {}
        this.beforeFeature = () => {}
        this.beforeScenario = () => {}
        this.beforeStep = () => {}

        this.afterStep = () => {}
        this.afterScenario = () => {}
        this.afterFeature = () => {}
        this.afterCommand = () => {}
        this.after = () => {}
        this.afterSession = () => {}
        this.onComplete = () => {}
    }
}