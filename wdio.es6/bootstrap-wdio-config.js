import { wdioConfig } from './conf/wdio-config'
import { wdioCapabilities } from './bootstrap-wdio-capability.config'
import { wdioCucConf } from './bootstrap-wdio-cucumber-config'
import { wdioOnPrepare, 
    wdioBeforeSession, wdioBefore, wdioBeforeCommand, wdioBeforeFeature, wdioBeforeScenario, wdioBeforeStep,
    wdioAfterStep, wdioAfterScenario, wdioAfterFeature, wdioAfterCommand, wdioAfter, wdioAfterSession,
    wdioOnComplete
 } from './bootstrap-wdio-lifecycle-hooks'
 import amassReporter from './extras/wdio-amass-reporter'

const bootstrap = function () {
    let wdioConf = new wdioConfig ()
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    wdioConf.specs = ['./features/**/*.feature']
    // Patterns to exclude
    wdioConf.exclude = []
    wdioConf.maxInstances = 10
    // Level of logging verbosity: silent | verbose | command | data | result | error
    wdioConf.logLevel = 'verbose'
    // Saves a screenshot to a given path if a command fails.
    wdioConf.screenshotPath = './exhaust/screenshots/error'
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    wdioConf.baseUrl = 'https://www.fandango.com'
    // Default timeout for all waitFor* commands.
    wdioConf.waitforTimeout = 10000
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    wdioConf.connectionRetryTimeout = 9000
    // Default request retries count
    wdioConf.connectionRetryCount = 3
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    wdioConf.services = ['selenium-standalone']
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    wdioConf.reporters = ['spec', amassReporter]
    wdioConf.reporterOptions = {
        amass: {
            outputDir: './exhaust/amass',
            mode: 'combine', // default is empty induvidual files for each session
            format: 'both', //json, html, both
            templateDir: './reportTemplates',
            templateFile: './reportTemplates/report-template.hbs',
            afterReport:  (rpt) => {
                //want to something with the files you can here
            }
        }
    }
    wdioConf.capabilities = wdioCapabilities
    wdioConf.beforeSession = wdioBeforeSession
    wdioConf.cucumberOpts = wdioCucConf

    // Set up LifeCycleHooks
    wdioConf.onPrepare = wdioOnPrepare

    wdioConf.beforeSession = wdioBeforeSession
    wdioConf.before = wdioBefore
    wdioConf.beforeCommand = wdioBeforeCommand
    wdioConf.beforeFeature = wdioBeforeFeature
    wdioConf.beforeScenario = wdioBeforeScenario
    wdioConf.beforeStep = wdioBeforeStep

    wdioConf.afterStep = wdioAfterStep
    wdioConf.afterScenario = wdioAfterScenario
    wdioConf.afterFeature = wdioAfterFeature
    wdioConf.afterCommand = wdioAfterCommand
    wdioConf.after = wdioAfter
    wdioConf.afterSession = wdioAfterSession

    wdioConf.onComplete = wdioOnComplete

    console.log(JSON.stringify(wdioConf))

    return wdioConf
}

exports.config = bootstrap()