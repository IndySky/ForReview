import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

/**
 * ENVIRONMENTAL VARIABLES 
 * 
 * 
 * !!! UNCOMMENT 'baseURL: 'http://localhost:4200/',' in the 'playwright.config.ts' project in 'use' section to make working this spec file 
 *
 * 
 * Way 1) Move URL to the 'playwright.config.ts' file to 'use' section 'baseURL' option and replace URL in the test with '/'.
 * Playwright will be automatically understand it have to look in the playwright.config.ts 'baseURL' option.
 * 
 * 
 * */

test.describe.parallel('Run tests with retries', () => {
    test.describe.configure({ retries: 2 }) 

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
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