Feature: Login to OrangeHRM
As a user
I want to log in to the OrangeHRM application
So thar I can access the dashboard 

  Background: User is on the login page
    When I emter valid username and password
    And I click on the login button
@regression
  Scenario: User successfully logs in to OrangeHRM
    Then I should be logged in and see the dashboard
    And I should see the welcome message
@skip
  Scenario: User fails to log in with invalid credentials
    When I enter invalid username and password
    And I click on the login button
    Then I should see an error message
