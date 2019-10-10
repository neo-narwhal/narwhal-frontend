export default async function ({ app }) {
  let valid = false
  if (app.api.isTokenValid) { valid = await app.api.isTokenValid() }
  if (!valid) {
    app.store.dispatch('setToken', null)
    app.router.replace('/auth')
  }
}
