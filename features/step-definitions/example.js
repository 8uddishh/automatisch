import { Given, When, Then } from 'cucumber'
import { expect } from 'chai'

Given(/^I open up the webdriverio$/, function () {
    browser
      .url('/')
})

When(/^I click on API$/, function () {
    let apiLink = $('.mainnav ul:not(.dropdown-menu) [href="/api.html"]')
    browser.waitForExist('.mainnav ul:not(.dropdown-menu) [href="/api.html"]', 1000)
    apiLink.click()
})

Then(/^I should be seeing API page with text "([^"]*)"$/, function (welcomeText) {
    browser.waitForExist('#WebdriverIO-API-Docs', 1000)
    let text = browser.getText('#WebdriverIO-API-Docs')
    expect(welcomeText).to.eql(text)
})