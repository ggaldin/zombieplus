import { features } from 'process';

const { expect } = require('@playwright/test');

export class TvShows {

    constructor(page) {
        this.page = page
    }


    //async isLoggedIn() {
    //    await this.page.waitForLoadState('networkidle')
    //     await expect(this.page).toHaveURL(/.*movies/)
    // }

    async goTvshows() {
        await this.page.locator('a[href$="/admin/tvshows"]').click()     
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()

    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    //async create(title, overview, company, release_year, cover, featured) {
    async create(tvshow) {

        await this.goTvshows()
        await this.goForm()
        //await this.page.locator('a[href$="register"]').click()

        //await this.page.locator('#title').fill(title)
        //await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Titulo da série').fill(tvshow.title)
        //await this.page.getByLabel('Sinopse').fill(overview)
        await this.page.getByLabel('Sinopse').fill(tvshow.overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        //const html = await this.page.content()
        //console.log(html)
        await this.page.locator('.react-select__option')
            // .filter({ hasText: company })
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        //const html = await this.page.content()
        //console.log(html)
        await this.page.locator('.react-select__option')
            //.filter({ hasText: release_year })
            .filter({ hasText: tvshow.release_year })
            .click()

        await this.page.getByLabel('Temporadas').fill(tvshow.seasons)     

        await this.page.locator('input[name=cover]')
            //.setInputFiles('tests/support/fixtures' + cover)
            .setInputFiles('tests/support/fixtures' + tvshow.cover)

        //if (featured) {
        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
        //    await this.page.getByRole('button', { name: 'Cadastrar' }).click()

    }

    async search(target) {
        await this.goTvshows()

        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')

    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)

    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
        //await expect(this.page.locator('.alert')).toContainText(target)
    }

    async remove(title) {
        await this.goTvshows()
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')

    }

}