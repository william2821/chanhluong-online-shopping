# chanhluong online shopping

### This is for DIA automation tester assessment

## To run locally

- Prerequisite: node is installed
- Clone the project from GHA
- Under root folder, add a new file: .env
- Add a line for baseUrl

to run:
- open console, run "npm run test"

to generate and open allure report:
- from console, run "npm run generate-report"
- run "npm run open-report"

### Note:

First test is checking the homepage title, which could be used for a quick smoke
testing. I have made it expecting a incorrect title so it will be fail. The
purpose is used to as a failure example to so the log and screenshot and trace
video are generated.
