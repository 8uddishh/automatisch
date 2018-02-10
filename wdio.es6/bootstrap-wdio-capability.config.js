import { wdioCapabilityConfig } from './conf/wdio-capability-config'

const bootstrapCapibilities = function () {
    let capabilities = []
    let wdioCapConf = new wdioCapabilityConfig (5, "chrome")

    capabilities.push(wdioCapConf)

    return capabilities
}

export const wdioCapabilities = bootstrapCapibilities ()