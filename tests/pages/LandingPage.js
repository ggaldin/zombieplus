const { expect } = require('@playwright/test');

export class LandingPage {

    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/')
    }

    async openLeadModal() {
    //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
    //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()

        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    }

    async submitLeadForm(name, email) {
    //await page.locator('#name').fill('Fernando')
    //await page.locator('ELEMENTO[PROP=VALUE]').fill('Fernando')
    //await page.locator('input[name=name]').fill('Fernando')
    //await page.locator('input[placeholder="Seu nome completo"]').fill('Fernando')
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByText('Quero entrar na fila!').click()
    //await page.getByTestId('modal')
    //.getByText('Quero entrar na fila!').click()

    //await page.getByText('seus dados conosco').click()
    //const content = await page.content()
    //console.log(content)
    }


    //async toastHaveText(message) {

        //const toast = this.page.locator('.toast')

       // await expect(toast).toHaveText(message)   
       // await expect(toast).not.toBeVisible({timeout:5000})    
        //await expect(toast).toBeHidden({timeout:5000})
       //await expect(this.page.locator('.toast')).toHaveText(message)       
       //await expect(this.page.locator('.toast')).toBeHidden({timeout:5000})
      
        //await page.waitForTimeout(10000)
   // }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target) 
    }

}