import { wdioCapabilityConfig } from './conf/wdio-capability-config'

const bootstrapCapibilities = function () {
    let capabilities = []
    let wdioCapConf = new wdioCapabilityConfig ()
    wdioCapConf.browser = "chrome"
    wdioCapConf.maxInstances = 5

    capabilities.push(wdioCapConf)

    return capabilities
}

export const wdioCapabilities = bootstrapCapibilities ()