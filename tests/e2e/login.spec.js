const { test, expect } = require('../support')
//const { test, expect } = require('@playwright/test')

//const { LoginPage } = require('../pages/LoginPage')
//const { MoviesPage } = require('../pages/MoviesPage')
//const { Toast } = require('../pages/Components')


//let loginPage
//let moviesPage
//let toast

//test.beforeEach(async ({ page }) => {
    
//    loginPage = new LoginPage(page)
//    moviesPage = new MoviesPage(page)
//    toast = new Toast(page)
//  })

test('deve logar como administrador', async ({ page }) => {
        await page.login.visit()
        //await loginPage.visit()
        await page.login.submit('admin@zombieplus.com', 'pwd123')
        //await loginPage.submit('admin@zombieplus.com', 'pwd123')
        await page.movies.isLoggedIn()
        //await moviesPage.isLoggedIn()

    //await page.goto('http://localhost:3000/admin/login')

    //const loginForm = page.locator('.login-form')
    //await expect(loginForm).toBeVisible()

})    

test('não deve logar com senha incorreta', async ({ page }) => {
         await page.login.visit()
         await page.login.submit('admin@zombieplus.com', 'abc123')

         const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
         await page.toast.containText(message)

})    

test('não deve logar quando o email é inválido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('www.papito.com.br', 'abc123')
  await page.login.alertHaveText('Email incorreto')
}) 

test('não deve logar quando o email não é preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', 'abc123')
  await page.login.alertHaveText('Campo obrigatório')
})   

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', '')
  await page.login.alertHaveText('Campo obrigatório')
})  

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', '')
  await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
}) 

