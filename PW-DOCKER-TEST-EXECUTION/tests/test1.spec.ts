import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

/**
 * EXAMPLE HOW TO USE PARALLEL EXECUTION FRO THE TESTS
 * Next parameters set in the 'playwright.config.ts' file
 * Way 1)
 * fullyParallel: false,
 * workers: process.env.CI ? 1 : undefined, 
 * 
 * One workers for each spec file. 'undefined' for local execution. As we have 5 spec files then 5 workers will be run in 5 paraller browsers. 
 * Insade of workers test will be executed sequentially (workers: process.env.CI ? 1 : undefined).
 * We don't want to run test within single spec file in parallel (fullyParallel: false). Test will be executed one by one in the one worker.
 * Execution time: 21.1s
 *  
 * 
 * Way 2)
 * fullyParallel: true,
 * workers: process.env.CI ? 1 : undefined,
 * 
 * We want to run test within single spec file in parallel (fullyParallel: true) and each test will be executed in separete worker.
 * One workers for each spec file. 'undefined' for local execution. As we have 5 spec files then 5 workers will be run in 5 
 * paraller browsers (workers: process.env.CI ? 1 : undefined).
 * Execution time: 14.3s
 * 
 * 
 * Way 3)
 * fullyParallel: false,
 * workers: process.env.CI ? 1 : 1,
 * 
 * All test in one spec file executed one by one in one worker.
 * All 5 spec files executed in one worker one by one.
 * Execution time: 17.2s  
 * 
 * 
 * Way 4)
 * fullyParallel: true,
 * workers: process.env.CI ? 1 : 1,
 * 
 * All test in one spec file executed in parallel.
 * All 5 spec files executed one by one in one worker.
 * Execution time: 17.9s
 * 
 * 
 * Is the same type of workers used for parallel test insade the one spec file and worker created for each spec file? What is the difference? 
 */

/**
 * fullyParallel: false,
 * How to run tests in parallel only for one test suite in spect file and tests in the other spec files leave to run one by one in the worker. 
 * Use 'parallel' in the 'test.describe'
 * Example: test.describe.parallel('Run tests with retries', () => {})
 */

/**
 * fullyParallel: false,
 * How to run all tests for only for one spec file in parallel. 
 * Use test.describe.configure({mode:'parallel'}) 
 */

/**
 * fullyParallel: false,
 * How to configure to run test one by another in case they adependent from each other. 
 * In case first test fails the second test will not be executed.It will be skipped. 
 * Add to the test suite:
 * test.describe.configure({mode:'serial'})
 */

/**
 * How to configure to run test in parallel only for chromium.
 * In the 'playwright.config.ts'  into 'projects' add for the browser 'fullyParallel: true'
 * 
 */

test.describe.parallel('Run tests with retries', () => {
    test.describe.configure({ retries: 2 }) 

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/')
    })

    test('navigate to form page', async ({ page }) => {
        const navigateTo = new NavigationPage(page)
        await navigateTo.formLayoutsPage()
        await navigateTo.datepickerPage()
        await navigateTo.smartTablePage()
        await navigateTo.toastrPage()
        await navigateTo.tooltipPage()
    })

    test('test2', async ({ page }) => {
        const navigateTo = new NavigationPage(page)
        const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
        const emailField = basicForm.getByRole('textbox', { name: "Email" })
    
        await navigateTo.formLayoutsPage()
        await emailField.fill('test@test.com')
        const emailValue = await emailField.inputValue()
        expect(emailValue).toEqual('test@test.com')
    
    })

})