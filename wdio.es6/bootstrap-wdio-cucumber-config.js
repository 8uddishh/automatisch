import { wdioCucumberConfig } from './conf/wdio-cucumber-config'

// should be getting it from json
const bootstrapCucumber = function () {
    let wdioCucConf = new wdioCucumberConfig ()
    wdioCucConf.require = ['./features/step-definitions/**/*.js']
    wdioCucConf.backtrace = false
    wdioCucConf.profile = []
    wdioCucConf.tags = []
}

export const wdioCucConf = bootstrapCucumber ()