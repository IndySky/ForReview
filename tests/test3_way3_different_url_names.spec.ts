import { expect } from '@playwright/test'
import { test } from '../test-options'


/**
 * 
 * !!! UNCOMMENT 'baseURL: 'http://localhost:4200/',' in the 'playwright.config.ts' project in 'use' section to make working this spec file 
 * 
 * 
 * DIFFERENT URLS FOR ONE ENVIRONMENT
 * Step 1) Create 'test-options.ts' file in the project. It is a place holder for the environmental variables name.
 * Step 2) add import to the 'playwright.config.ts' file -> import type { TestOptions } from './test-options';
 * Step 3) insade of the defined config add <TestOptions> ->
 * old one:export default defineConfig({
 * new one:export default defineConfig<TestOptions>({
 * Step 4) Now  we can create environmental variable insade of the tests.
 * 4.1) add 'globalsQaURL' to the 'playwright.config.ts' file in the 'use' section
 *  use: {
 *  baseURL: 'http://localhost:4200/',
 *  globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
 *  }
 * 4.2) add to the spec file import -> import {test} from '../test-options'
 * 4.3) add 'globalsQaURL' to the test async parameters and add in the test
 * Example:
 * test('use second url', async ({ page, globalsQaURL }) => {
 *   await page.goto(globalsQaURL)
 *  }
 */

test('use first url', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

    await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true })
    const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()

    await usingTheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true })
    expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy()
    expect(await (usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked())).toBeTruthy()
})

test('use second url', async ({ page, globalsQaURL }) => {
    await page.goto(globalsQaURL)

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', { hasText: "High Tatras 2" }).dragTo(frame.locator('#trash'))


    await frame.locator('li', { hasText: "High Tatras 4" }).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})