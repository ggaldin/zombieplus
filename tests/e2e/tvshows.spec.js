const { test, expect } = require('../support')
//const { test } = require('@playwright/test')

const data = require('../support/fixtures/tvshows.json')

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
    await executeSQL(`Delete from tvshows`)
})

test('deve poder cadastrar um nova serie', async ({ page }) => {

    const tvshow = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    //await page.tvshows.goTvshows()    

    await page.tvshows.create(tvshow)
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)

})

test('deve poder remover uma serie', async ({ page, request }) => {
    const tvshow = data.to_remove
    await request.api.postTvShow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.goTvshows()

    //td[text()="A Noite dos Mortos-Vivos"]/..//button
    //await page.click('.request-removal')
    //await page.getByRole('row', {name: movie.title}).getByRole('button').click()
    //await page.click('.confirm-removal')

    await page.tvshows.remove(tvshow.title)
    await page.popup.haveText('Série removida com sucesso.')

})

test('não deve cadastrar título duplicado', async ({ page, request }) => {

    const tvshow = data.duplicate
    //await executeSQL(`Delete from movies where title = '${movie.title}';`)

    //await request.api.setToken()
    await request.api.postTvShow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    //await page.movies.create(movie)    
    // await page.toast.containText('Cadastro realizado com sucesso!')


    await page.tvshows.create(tvshow)
    //await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
    await page.popup.haveText(
        `O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    )
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goTvshows()
    await page.tvshows.goForm()
    await page.tvshows.submit()

    await page.tvshows.alertHaveText([  
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])

})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {

    const tvshows = data.search

    tvshows.data.forEach(async (m) => {
        //console.log(m.title)
        await request.api.postTvShow(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.goTvshows()
    await page.tvshows.search(tvshows.input)

    await page.tvshows.tableHave(tvshows.outputs)


})