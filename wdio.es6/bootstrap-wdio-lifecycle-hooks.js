import { jsonFlatten, mergeJsons } from './support/json-utils'

export const wdioOnPrepare = (config, capabilities) => {
    jsonFlatten(`${__dirname}/../reservoir/ui-elements`).to(`${__dirname}/../reservoir`)
    let uniqueid = `${process.pid}${Date.now()}`
    process.argv.push(`--uniqueid=${uniqueid}`)
}

export const wdioBeforeSession = (config, capabilities, specs) => {

}

export const wdioBefore = (capabilities, specs) => {
    global.cssTags = mergeJsons(require('./../reservoir/autogenerated-fandango.json'))
    browser.windowHandleMaximize()
}

export const wdioBeforeCommand = (commandName, args) => {

}

export const wdioBeforeFeature = (feature) => {

}

export const wdioBeforeScenario = (scenario) => {

}

export const wdioBeforeStep = (step) => {
    
}

export const wdioAfterStep = (stepResult) => {
    
}

export const wdioAfterScenario = (scenario) => {
    
}

export const wdioAfterFeature = (feature) => {
    
}

export const wdioAfterCommand = (commandName, args, result, error) => {
    
}

export const wdioAfter = (result, capabilities, specs) => {

}

export const wdioAfterSession = (config, capabilities, specs) => {
    
}

export const wdioOnComplete = (exitCode, config, capabilities) => {
    
}