import nopt from 'nopt'

export function processArgs () {
    return nopt({}, {}, process.argv)
}