import { Given, When, Then } from 'cucumber'
import { expect, assert } from 'chai'
import decode from 'decode-html'

Given(/^the user opens the website$/, function () {
    browser.url('/')
})

Given(/^the user is in the page containing element "([^"]*)" text as "([^"]*)"$/, function (elementIdentifier, value) {
    let headerText = $(cssTags[elementIdentifier]).getText()
    assert.equal(headerText, decode(value), `Wrong page`)
})

Then(/^the user checks if the page contains an element "([^"]*)" with text as "([^"]*)"$/, function (elementIdentifier, value) {
    let headerText = $(cssTags[elementIdentifier]).getText()
    assert.equal(headerText, value, `Element not found`)
})

Then(/^the user waits for "([^"]*)"$/, function (timeout) {
    browser.pause(timeout)
})

Then(/^the user enters in element "([^"]*)" value "([^"]*)"$/, function(elementIdentifier, value) {
    $(cssTags[elementIdentifier]).setValue(value)
})

Then(/^the user clicks "([^"]*)"$/, function(elementIdentifier){
    $(cssTags[elementIdentifier]).click()
})

// When(/^I click on API$/, function () {
//     let apiLink = $('.mainnav ul:not(.dropdown-menu) [href="/api.html"]')
//     browser.waitForExist('.mainnav ul:not(.dropdown-menu) [href="/api.html"]', 1000)
//     apiLink.click()
// })

// Then(/^I should be seeing API page with text "([^"]*)"$/, function (welcomeText) {
//     browser.waitForExist('#WebdriverIO-API-Docs', 1000)
//     let text = browser.getText('#WebdriverIO-API-Docs')
//     expect(welcomeText).to.eql(text)
// })