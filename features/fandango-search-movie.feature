Feature: Fandango Search Movies
  Scenario: Check if the Website opens
    Given the user opens the website
      Then the user waits for "2000"
      Then the user enters in element "Home-SearchText" value "black panther" 
      Then the user clicks "Home-SearchButton"
      Then the user waits for "5000"