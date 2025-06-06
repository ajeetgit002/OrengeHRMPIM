Feature: PIM Creation
    As a user
    I want to create a PIM (Product Information Management)
    So that I can manage product-related data effectively

  Background: User is on the login page
    When I enter valid username and password
    And I click on the login button
@smoke
  Scenario: Successfully create a new PIM
    And I navigate to the PIM creation page
    When I fill in the required fields with valid data
    And I click on the Save button
    Then I should see a confirmation message "Success"
    When I enter Employee Personal Information Management
    And I enter Employee Contact Information Management
    And I enter Employee Job Information
    And I enter Qualification Information
    And the new PIM should be listed in the PIM management section
# @smoke
#   Scenario: Fail to create a PIM with missing required fields
#     And I navigate to the PIM creation page
#     When I leave required fields empty
#     And I click on the "Create" button
#     Then I should see an error message "Please fill in all required fields"
#     And the PIM should not be created
