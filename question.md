- what's happen about GATSBY_STOREFRONT_ACCES_TOKEN=XXX

it's present in this file `search_provider.jsx` but there is no indiction about that in the `.env`

```
const urqlClient = createClient({
  url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2021-01/graphql.json`,
  fetchOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    },
  },
})
```
