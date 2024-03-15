import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'


/**
 * !!! COMMENT OUT 'baseURL: 'http://localhost:4200/',' in the 'playwright.config.ts' project in 'use' section to make working this spec file 
 */

/**
 * USE PROCESS ENVIRONMENTAL VARIABLES
 * Step 1) create file '.env' insade of the root of the project to keep all process environmental variables
 * Step 2) add to the file '.env' variable with url. Name could be any.
 * Example:
 * URL=http://uitestingplayground.com/ajax
 * Step 3) replace in the test real url with the 'process.env.URL' without '' quotes
 * Step 4) download library 'dorenv' -> execute command 'npm i dotenv' (Note: in course was used 'npm i dotenv --save-dev --force')
 * Step 5) in the 'playwright.config.ts' file uncomment code 'require('dotenv').config();' -> we gonna enable reading env file  
 * Also there is an option use environmental variable in the VSCode Terminal:
 * comment out the URL in the '.env' file
 * Execute:
 * set URL=http://uitestingplayground.com/ajax && npx playwright test test4_way4_use_env_variable.spec.ts --project=chromium
 */

/**
 * MANAGE THE ENVIRONMNT BASED ON THE TERNARY OPERATORS - manage base URL without manage the projects in the 'playwright.config.ts'
 * comment out option 'baseURL: 'http://localhost:4200/' in the 'playwright.config.ts'
 * add to the 'playwright.config.ts':
 * baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
 *    : process.env.STAGING == '1' ? 'http://localhost:4202/'
 *       : 'http://localhost:4201/',
 *
 * Execute:
 * set DEV=1 && npx playwright test test4_way4_use_env_variable.spec.ts --project=chromium                                   
 */

/**
 * 
 * USE PROCESS ENVIRONMENTAL VARIABLES TO KEEP TEST CREDENTIALS AS USERNAME AND PASSWORD IN THE '.env' FILE
 * URL=http://uitestingplayground.com/ajax
 * URL_FOR_LOGIN=https://conduit.bondaracademy.com/
 * USER='pwinna88@test.com'
 * PASSWORD='123456789'
 * 
 */

test('login', async ({ page }) => {
    await page.goto(process.env.URL_FOR_LOGIN);
    await page.getByText('Sign in').click()
    console.log('URL_FOR_LOGIN: ' + process.env.URL_FOR_LOGIN)
    await page.getByRole('textbox', { name: "Email" }).fill(process.env.USER)
    console.log('USERNAME: ' + process.env.USERNAME)
    await page.getByRole('textbox', { name: "Password" }).fill(process.env.PASSWORD)
    console.log('PASSWORD: ' + process.env.PASSWORD)
    await page.getByRole('button').click()
})

test('test', async ({ page }) => {
    await page.goto(process.env.URL)
    const navigateTo = new NavigationPage(page)
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })

    await navigateTo.formLayoutsPage()
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')
})

test('use third url', async ({ page }, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

