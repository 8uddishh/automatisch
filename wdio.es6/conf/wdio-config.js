
export class wdioConfig {
    constructor () {
    }

    get specs () {
        return this._specs
    }
    set specs (specs) {
        this._specs = specs
    }

    get exclude () {
        return this._exclude
    }
    set exclude (exclude) {
        this._exclude = exclude
    }

    get screenshotPath () {
        return this._screenshotPath
    }
    set screenshotPath (screenshotPath) {
        this._screenshotPath = screenshotPath
    }

    get baseUrl () {
        return this._baseUrl
    }
    set baseUrl (baseUrl) {
        this._baseUrl = baseUrl
    }

    get maxInstances () {
        return this._exclude
    }
    set maxInstances (maxInstances) {
        this._maxInstances = maxInstances
    }

    get logLevel () {
        return this._logLevel 
    }
    set logLevel (logLevel) {
        this._logLevel = logLevel
    }

    get waitforTimeout () {
        return this._waitforTimeout
    }
    set waitforTimeout (waitforTimeout) {
        this._waitforTimeout = waitforTimeout
    }

    get connectionRetryTimeout () {
        return this._connectionRetryTimeout = connectionRetryTimeout
    }
    set connectionRetryTimeout (connectionRetryTimeout) {
        this._connectionRetryTimeout = connectionRetryTimeout
    }

    get connectionRetryCount () {
        return this._connectionRetryCount
    }
    set connectionRetryCount (connectionRetryCount) {
        this._connectionRetryCount = connectionRetryCount
    }

    get services () {
        return this._services
    }
    set services (services) {
        this._services = services
    }

    get sync () {
        return true
    }

    get coloredLogs () {
        return true
    }

    get deprecationWarnings () {
        return true
    }

    get bail () {
        return 0
    }

    get framework () {
        return 'cucumber'
    }

    get reporters () {
        return this._reporters
    }
    set reporters (reporters) {
        this._reporters = reporters
    }

    get reporterOptions () {
        return this._reporterOptions
    }
    set reporterOptions (reporterOptions) {
        this._reporterOptions = reporterOptions
    }

    get capabilities () {
        return this._capabilities
    }
    set capabilities (capabilities) {
        this._capabilities = capabilities
    }

    get cucumberOpts () {
        return this._cucumberOpts
    }
    set cucumberOpts (cucumberOpts) {
        this._cucumberOpts = cucumberOpts
    }

    get onPrepare () {
        return this._onPrepare
    }
    set onPrepare (onPrepare) {
        this._onPrepare = onPrepare
    }

    get beforeSession () {
        return this._beforeSession
    }
    set beforeSession (beforeSession) {
        this._beforeSession = beforeSession
    }

    get before () {
        return this._before
    }
    set before (before) {
        this._before = before
    }

    get beforeCommand () {
        return this._beforeCommand
    }
    set beforeCommand (beforeCommand) {
        this._beforeCommand = beforeCommand
    }

    get beforeFeature () {
        return this._beforeFeature
    }
    set beforeFeature (beforeFeature) {
        this._beforeFeature = beforeFeature
    }

    get beforeScenario () {
        return this._beforeScenario
    }
    set beforeScenario (beforeScenario) {
        this._beforeScenario = beforeScenario
    }

    get beforeStep () {
        return this._beforeStep
    }
    set beforeStep (beforeStep) {
        this._beforeStep = beforeStep
    }

    get afterStep () {
        return this._afterStep
    }
    set afterStep (afterStep) {
        this._afterStep = afterStep
    }

    get afterScenario () {
        return this._afterScenario
    }
    set afterScenario (afterScenario) {
        this._afterScenario = afterScenario
    }

    get afterFeature () {
        return this._afterFeature
    }
    set afterFeature (afterFeature) {
        this._afterFeature = afterFeature
    }

    get afterCommand () {
        return this._afterCommand
    }
    set afterCommand (afterCommand) {
        this._afterCommand = afterCommand
    }

    get after () {
        return this._after
    }
    set after (after) {
        this._after = after
    }

    get afterSession () {
        return this._afterSession
    }
    set afterSession (afterSession) {
        this._afterSession = afterSession
    }

    get onComplete () {
        return this._onComplete
    }
    set onComplete (onComplete) {
        this._onComplete = onComplete
    }
    
}