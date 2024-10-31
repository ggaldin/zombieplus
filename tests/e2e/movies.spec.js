const { test, expect } = require('../support')
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

test.beforeAll(async () => {
    await executeSQL(`Delete from movies`)
})

test('deve poder cadastrar um novo filme', async ({ page }) => {

    //await play.goto('https://qaxperience.com')

    // é importante estar logado
    //admin@zombieplus.com
    //pwd123

    const movie = data.create
    //await executeSQL(`Delete from movies where title = '${movie.title}';`)



    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    //await loginPage.visit()
    //await loginPage.submit('admin@zombieplus.com', 'pwd123')
    // await moviesPage.isLoggedIn()

    //await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    //await page.movies.create(movie)
    //await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.movies.create(movie)
    //await page.toast.containText('Cadastro realizado com sucesso!')
    //await toast.containText('Cadastro realizado com sucesso!')
    //await page.popup.haveText("O filme 'Guerra Mundial Z' foi adicionado ao catálogo.")
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    //td[text()="A Noite dos Mortos-Vivos"]/..//button
    //await page.click('.request-removal')
    //await page.getByRole('row', {name: movie.title}).getByRole('button').click()
    //await page.click('.confirm-removal')

    await page.movies.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')

})

test('não deve cadastrar título duplicado', async ({ page, request }) => {

    const movie = data.duplicate
    //await executeSQL(`Delete from movies where title = '${movie.title}';`)

    //await request.api.setToken()
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    //await page.movies.create(movie)    
    // await page.toast.containText('Cadastro realizado com sucesso!')


    await page.movies.create(movie)
    //await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
    await page.popup.haveText(
        `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    )
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        //  'Por favor, informe o título.',
        //  'Por favor, informe a sinopse.',
        //  'Por favor, informe a empresa distribuidora.',
        //  'Por favor, informe o ano de lançamento.'

        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])

})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {

    const movies = data.search

    movies.data.forEach(async (m) =>{
        //console.log(m.title)
        await request.api.postMovie(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.search(movies.input)

    //const rows = this.page.getByRole('row')
    //await expect(rows).toContainText(movies.outputs)
    await page.movies.tableHave(movies.outputs)


})