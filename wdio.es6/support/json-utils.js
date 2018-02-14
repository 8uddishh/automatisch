import fs from 'fs'
import _ from 'lodash'
import { dataUtil } from './data-utils'

// has to be converted to sync to make it work
export function jsonFlatten (path) {

    function* jsongenerator(obj, separator= '', prefix=null) {
        for (let key of Object.keys(obj)) {
            let cumKey = prefix ? `${prefix}${separator}${key}` : key
            if (typeof (obj[key]) == 'string')
                yield [cumKey, obj[key]];
            else
                yield* jsongenerator(obj[key], separator, cumKey)
        }
    }

    return {
        to: (outputPath) => {
            let files = fs.readdirSync(path)
            _.each(files, file => {
                console.log(`Starting to process file: ${file}`)

                let sourceStat = fs.statSync(`${path}/${file}`)
                let shouldGenerate = false
              
                if (!fs.existsSync(`${outputPath}/autogenerated-${file}`)) {
                    shouldGenerate = true
                } else {
                    let targetStat = fs.statSync(`${outputPath}/autogenerated-${file}`)
                    if (new Date(sourceStat.mtime) > new Date(targetStat.mtime)) {
                        shouldGenerate = true;
                    }
                }

                if (shouldGenerate) {
                    let config = require(`${path}/${file}`)
                    let generatedJson = {}
                    let jgenerator = jsongenerator(config, "-")
    
                    let nextjson = jgenerator.next()
                    while (!nextjson.done) {
                        let [key, value] = nextjson.value
                        key = dataUtil.replaceAll(key, " ", "")
                        generatedJson[key] = value
                        nextjson = jgenerator.next()
                    }
                    fs.writeFileSync(`${outputPath}/autogenerated-${file}`, JSON.stringify(generatedJson, null, "    "))
    
                    console.log(`File generated: autogenerated-${file}`)
                } else {
                    console.log(`No change for: autogenerated-${file}`)
                }
            })           
        }
    } 
}

export function mergeJsons (...jsons) {
    let cssTags = {}
    _.each(jsons, function (json) {
        cssTags = _.extend(cssTags, json);
    })

    return cssTags
}