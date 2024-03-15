import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

/**
 * 
 * !!! UNCOMMENT 'baseURL: 'http://localhost:4200/',' in the 'playwright.config.ts' project in 'use' section to make working this spec file 
 * 
 * 
 * SUPPORT SEVERAL URLS IN THE PROJECT (DYNAMICLLY SWITCH BETWEEN THE ENVIRONMENTS)
 * We can have several projects in the 'playwright.config.ts'
 * 
 */

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('test', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })

    await navigateTo.formLayoutsPage()
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

})

