import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
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

