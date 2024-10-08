const { test } = require('../support')
//const { test } = require('@playwright/test')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

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
//})

test('deve poder cadastrar um novo filme', async ({ page }) => {

    //await play.goto('https://qaxperience.com')

    // é importante estar logado
    //admin@zombieplus.com
    //pwd123

    const movie = data.create
    await executeSQL(`Delete from movies where title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    //await loginPage.visit()
    //await loginPage.submit('admin@zombieplus.com', 'pwd123')
   // await moviesPage.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    //await page.movies.create(movie)
    //await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
    //await toast.containText('Cadastro realizado com sucesso!')
})