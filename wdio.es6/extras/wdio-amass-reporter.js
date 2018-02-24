import util from 'util'
import events from 'events'
import _ from 'lodash'
import hbs from 'handlebars'
import fs from 'fs'
import mkdirp from 'mkdirp'
import { processArgs } from './../support/process-utils'

class runSpec {
    constructor (host, port, capabilities) {
        this.host = host
        this.port = port
        this.capabilities = capabilities
        this.startTime = null
        this.endTime = null
        this.selectedFeatures = []
        this.success = 0
        this.failed = 0
        this.notrun = 0
        this.rptId = ''
    }
}

class testcase {
    constructor (uid, title, parent) {
        this.uid = uid
        this.title = title
        this.status = 'PENDING'
        this.startTime = Date.now()
        this.endTime = null
        this.error = null
        this.parent = parent
    }
}
class suite {
    constructor (uid, title, file, parent) {
        this.uid = uid
        this.title = title
        this.file = file
        this.startTime = Date.now()
        this.endTime = null
        this.suites = []
        this.testcases = []
        this.parent = parent
        this.success = 0
        this.failed = 0
        this.notrun = 0
    }
}
class amassReport {
    constructor (spec) {
        this.spec = spec
        this.suites = [] 
    }
}

let amassReporter = function ( baseReporter, config, options) {
    this.tempSuiteList = []
    this.tempTestList = []
    this.reports = []

    this.writeFile = (filename) => {
        if(options.format == 'both' || options.format == 'json') {
            let jsonFile = `${options.outputDir}/${filename}.json`
            this.reports.push(jsonFile)
            fs.writeFileSync(jsonFile, JSON.stringify(this.report, null, "    "))
        }
        if(options.format == 'both' || options.format == 'html') {
            let htmlTemplateContent = fs.readFileSync(options.templateFile, 'utf8')
            let outcontent = hbs.compile(htmlTemplateContent)(this.report)
            fs.writeFileSync(`${options.outputDir}/${filename}.html`, outcontent, { encoding: 'utf8' })
        }
    }

    this.registerHelpers = () => {
        // Equality
        hbs.registerHelper('if-eq', function(a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        })

        // js number to date
        hbs.registerHelper('as-date', function(value) {
            return new Date(value)
        })

        // count
        hbs.registerHelper('count', function(value) {
            return value.length
        })

        // time difference
        hbs.registerHelper('time-diff', function(start, end) {
            let startDate = new Date(start)
            let endDate = new Date(end)
            let diffInSecs = Math.abs((endDate.getTime() - startDate.getTime()) / 1000)
            return diffInSecs < 1 ? '< 1s' : 
                    diffInSecs < 60 ? `${diffInSecs}s` :
                    diffInSecs < 3600 ? `${Math.floor(diffInSecs/60)}min${Math.floor(diffInSecs%60) > 0 ? ` ${Math.floor(diffInSecs%60)}s` : ''}` :
                    `${Math.floor(diffInSecs/3600)}hrs${Math.floor(diffInSecs%3600) > 0 ? ` ${Math.floor(diffInSecs%3600)}min` : ''}`
        })
    }

    this.on('start', (payload) => {
        if(!fs.existsSync(options.outputDir))
            mkdirp.sync(options.outputDir)

        this.registerHelpers()
        fs.readdirSync(options.templateDir).forEach(file => {
            if(file.endsWith(".hbs") && file.startsWith("-")) {
                let hbsContent = fs.readFileSync(`${options.templateDir}/${file}`, 'utf8')
                let partials = file.substring(1).replace(".hbs", "").split("-")
                for(var i = 1; i< partials.length; i++) {
                    partials[i] = `${partials[i].charAt(0).toUpperCase()}${partials[i].slice(1)}`
                }
                hbs.registerPartial(partials.join(""), hbsContent)
            }
        })

        if(options.mode == 'combine') {
            this.report = new amassReport()
            this.report.spec = new runSpec(payload.config.host, payload.config.port, payload.config.capabilities)
            this.report.spec.startTime = Date.now()
        }
    })

    this.on('runner:start', (payload) => {
        if(options.mode != 'combine') {
            this.report = new amassReport()
            this.report.spec = new runSpec(payload.config.host, payload.config.port, payload.config.capabilities)
            this.report.spec.startTime = Date.now()
            this.report.spec.selectedFeatures = payload.specs
        }
        else {
            this.report.spec.selectedFeatures = this.report.spec.selectedFeatures.concat(payload.specs)
        }
        
    })

    // Don't think there will be a situation where there will be multi level suites 
    this.on('suite:start', (payload) => {
        let ste = new suite(payload.uid, payload.title, payload.file, payload.parent)
        this.tempSuiteList.push(ste)
    })

    this.on('hook:start', (payload) => {

    })

    this.on('hook:end', (payload) => {

    })

    this.on('test:start', (payload) => {
        let tstcse = new testcase(payload.uid, payload.title, payload.parent)
        this.tempTestList.push(tstcse)
    })

    this.on('test:end', (payload) => {

    })

    this.on('test:pass', (payload) => {
        let tstcse = _.find(this.tempTestList, x => x.uid == payload.uid && x.parent == payload.parent)
        tstcse.endTime = Date.now()
        tstcse.status = 'PASSED'
    })

    this.on('test:fail', (payload) => {
        let tstcse = _.find(this.tempTestList, x => x.uid == payload.uid && x.parent == payload.parent)
        tstcse.endTime = Date.now()
        tstcse.status = 'FAILED'
        tstcse.error = payload.err
    })

    this.on('test:pending', (payload) => {
        let tstcse = _.find(this.tempTestList, x => x.uid == payload.uid && x.parent == payload.parent)
        tstcse.endTime = Date.now()
    })

    this.on('suite:end', (payload) => {
        let ste = _.find(this.tempSuiteList, x => x.uid == payload.uid)
        ste.endTime = Date.now()
    })

    this.on('runner:end', (payload) => {
        let cid = payload.cid
        let stats = baseReporter.stats
        this.report.spec.rptId = options.mode == 'combine' ? processArgs().uniqueid 
        : `${processArgs().uniqueid}-${stats.runners[cid].sessionID}` 

        // merge induvidual to this.report
        // map tests to induvidual suites
        // we handle only two levels if there are more it has to build 
        this.tempSuiteList.forEach(x => {
            x.testcases = _.filter(this.tempTestList, y => y.parent == x.uid)
            let countby = _.countBy(x.testcases, y=> y.status)
            x.success = countby['PASSED'] || 0
            x.failed = countby['FAILED'] || 0
            x.notrun = countby['PENDING'] || 0
        })

        let suitesWithNoParents = _.filter(this.tempSuiteList, x => !x.parent)
        let suitesWithParents = _.reject(this.tempSuiteList, x => !x.parent)
        suitesWithNoParents.forEach(x => {
            x.suites = _.filter(suitesWithParents, y => y.parent == x.uid)
            x.success = _.sumBy(x.suites, y => y.success)
            x.failed = _.sumBy(x.suites, y => y.failed)
            x.notrun = _.sumBy(x.suites, y => y.notrun)
        })
        

        if(options.mode != 'combine') {
            this.report.suites = suitesWithNoParents
            this.report.spec.success = _.sumBy(this.report.suites, y => y.success)
            this.report.spec.failed = _.sumBy(this.report.suites, y => y.failed)
            this.report.spec.notrun = _.sumBy(this.report.suites, y => y.notrun)
            this.report.spec.endTime = Date.now()

            this.writeFile(this.report.spec.rptId)
        }
        else {
            this.report.suites = this.report.suites.concat(suitesWithNoParents)
        }

        this.tempSuiteList = []
        this.tempTestList = []
    })

    this.on('end', (payload) => {
        if(options.mode == 'combine') {
            this.report.spec.success = _.sumBy(this.report.suites, y => y.success)
            this.report.spec.failed = _.sumBy(this.report.suites, y => y.failed)
            this.report.spec.notrun = _.sumBy(this.report.suites, y => y.notrun)
            this.report.spec.endTime = Date.now()

            this.writeFile(this.report.spec.rptId)
        }
        options.afterReport({
            files: this.reports
        })
    })
}
amassReporter.reporterName = 'amass'
util.inherits(amassReporter, events.EventEmitter)

exports = module.exports = amassReporter