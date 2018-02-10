Feature: Hello World
  Scenario: Check if the Website opens
    Given I open up the webdriverio
    When I click on API
    Then I should be seeing API page with text "WEBDRIVERIO API DOCS"