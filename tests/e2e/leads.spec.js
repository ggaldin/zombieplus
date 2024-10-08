const { test, expect } = require('../support')
//const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

//const { LandingPage } = require('../pages/LandingPage')
//const { Toast } = require('../pages/Components')

//let landingPage
//let toast

//let leadName
//let leadEmail

//test.beforeEach(async ({ page }) => {
//  landingPage = new LandingPage(page)
 // toast = new Toast(page)
//})

//test.beforeAll(async () => {
 // leadName = faker.person.fullName()
 // leadEmail = faker.internet.email()
//})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  //await landingPage.visit()
  await page.landing.openLeadModal()
  //await landingPage.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  //await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

});

test('não deve cadastrar quando email já existe', async ({ page, request }) => {
  //const landingPage = new LandingPage(page)

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  //await landingPage.visit()
  //await landingPage.openLeadModal()
  //await landingPage.submitLeadForm(leadName, leadEmail)

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  //await landingPage.visit()
  await page.landing.openLeadModal()
  //await landingPage.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  //await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)

});


test('não deve cadastrar com e-mail incorreto', async ({ page }) => {
  //await page.goto('http://localhost:3000/');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

  //await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  //await page.locator('#name').fill('Fernando')
  //await page.locator('ELEMENTO[PROP=VALUE]').fill('Fernando')
  //await page.locator('input[name=name]').fill('Fernando')
  //await page.locator('input[placeholder="Seu nome completo"]').fill('Fernando')
  //await page.getByPlaceholder('Informe seu nome').fill('Fernando')

  //await page.getByPlaceholder('Informe seu email').fill('papito.com.br')

  //await page.getByText('Quero entrar na fila!').click()
  //await page.getByTestId('modal')
  //  .getByText('Quero entrar na fila!').click()

  //await page.getByText('seus dados conosco').click()
  //const content = await page.content()
  //console.log(content)

  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Fernando Papito', 'papito.com.br')

  await page.landing.alertHaveText('Email incorreto')

});

test('não deve cadastrar quando o nome nao é preenchido', async ({ page }) => {
  // await page.goto('http://localhost:3000/');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

  //await page.getByRole('button', { name: /Aperte o play/ }).click()

  //await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')


  //await page.locator('ELEMENTO[PROP=VALUE]').fill('Fernando')
  //await page.locator('input[name=name]').fill('Fernando')
  //await page.locator('input[placeholder="Seu nome completo"]').fill('Fernando')
  //await page.getByPlaceholder('Seu nome completo').fill('Fernando')

  // await page.getByPlaceholder('Informe seu email').fill('papito@yahoo.com.br')

  //await page.getByText('Quero entrar na fila!').click()
  //await page.getByTestId('modal')
  //    .getByText('Quero entrar na fila!').click()

  //await page.getByText('seus dados conosco').click()
  //const content = await page.content()
  //console.log(content)

  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'papito@yahoo.com')


  //await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  await page.landing.alertHaveText('Campo obrigatório')
});


test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  // await page.goto('http://localhost:3000/');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

  //await page.getByRole('button', { name: /Aperte o play/ }).click()

  //await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  //await page.locator('#name').fill('Fernando')
  //await page.locator('ELEMENTO[PROP=VALUE]').fill('Fernando')
  //await page.locator('input[name=name]').fill('Fernando')
  //await page.locator('input[placeholder="Seu nome completo"]').fill('Fernando')
  //await page.getByPlaceholder('Informe seu nome').fill('Fernando')


  //await page.getByText('Quero entrar na fila!').click()
  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  //await page.getByText('seus dados conosco').click()
  //const content = await page.content()
  //console.log(content)

  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Fernando Papito', '')


  //await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  await page.landing.alertHaveText('Campo obrigatório')
});


test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  // await page.goto('http://localhost:3000/');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

  //await page.getByRole('button', { name: /Aperte o play/ }).click()

  //await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')


  //await page.locator('ELEMENTO[PROP=VALUE]').fill('Fernando')
  //await page.locator('input[name=name]').fill('Fernando')
  //await page.locator('input[placeholder="Seu nome completo"]').fill('Fernando')
  //await page.getByPlaceholder('Seu nome completo').fill('Fernando')


  //await page.getByText('Quero entrar na fila!').click()
  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  //await page.getByText('seus dados conosco').click()
  //const content = await page.content()
  //console.log(content)

  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')


  //await expect(page.locator('.alert')).toHaveText([
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});
