export class wdioCucumberConfig {
    constructor () {

    }

    get require () {
        return this._require 
    }
    set require (require) {
        this._require = require
    }

    get backtrace () {
        return this._backtrace
    }
    set backtrace (backtrace) {
        this._backtrace = backtrace
    }

    get compiler () {
        return ['js:babel-register']
    }

    get dryRun () {
        return false
    }

    get failFast () {
        return false
    }

    get format () {
        return ['pretty']
    }

    get colors () {
        return true
    }

    get snippets () {
        return true
    }

    get source () {
        return true
    }

    get profile () {
        return this._profile
    }
    set profile (profile) {
        this._profile = profile
    }

    get strict () {
        return false
    }

    get tags () {
        return this._tags
    }
    set tags (tags) {
        this._tags = tags
    }

    get timeout () {
        return 20000
    }

    get ignoreUndefinedDefinitions () {
        return false
    }
}