export class wdioCucumberConfig {
    constructor () {
        this.require = []
        this.backtrace = false
        this.compiler = ['js:babel-register']
        this.dryRun = false
        this.failFast = false
        this.format = ['pretty']
        this.colors = true
        this.snippets = true
        this.source = true
        this.profile = []
        this.strict = false
        this.tags = []
        this.timeout = 20000
        this.ignoreUndefinedDefinitions = false
    }
}