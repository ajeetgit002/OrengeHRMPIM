Feature: Dashboard should be displayed
  In order to see the dashboard
  As a user
  I want to see the dashboard
Background: User is on the login page
    When I emter valid username and password
    And I click on the login button



  Scenario: User sees the dashboard
    Given I am on the dashboard page
    Then I should see the dashboard title
    And I should see the dashboard content  
