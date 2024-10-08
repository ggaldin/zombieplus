const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {
        this.page = page

    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()

    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
        //await this.page.locator('//button[text()="Entrar"]').click()
    }

    //async isLoggedIn () {
    //    await this.page.waitForLoadState('networkidle')
    //    await expect(this.page).toHaveURL(/.*movies/)
        //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')
        
        //const logoutLink = this.page.locator('a[href="/logou"]')
        //await expect(logoutLink).toBeVisible()
   // }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
    
   // async alertEmailHaveText(text) {
   //     const alert = this.page.locator('.email-alert')
  //      await expect(alert).toHaveText(text)
  //  }

    //async alertPasswordHaveText(text) {
    //    const alert = this.page.locator('.password-alert')
   //     await expect(alert).toHaveText(text)
    //}

}















