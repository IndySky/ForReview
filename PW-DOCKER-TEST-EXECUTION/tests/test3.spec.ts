import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

    await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true })
    const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()

    await usingTheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true })
    expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy()
    expect(await (usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked())).toBeTruthy()

})