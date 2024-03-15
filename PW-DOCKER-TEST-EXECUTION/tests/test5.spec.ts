import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/")
})

test.describe('test suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
        await usingTheGridEmailInput.fill('test@test.com') 
        await usingTheGridEmailInput.clear() 
        await usingTheGridEmailInput.pressSequentially('test2@test.com')
        await usingTheGridEmailInput.clear()
        
        await usingTheGridEmailInput.pressSequentially('test3@test.com', { delay: 500 })
        
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test3@test.com')
        
        await expect(usingTheGridEmailInput).toHaveValue('test3@test.com')
    })
})