export default function () {
  const apiKey = import.meta.env.VITE_API_KEY_CONTENTFUL
  const manageApiKey = import.meta.env.VITE_API_KEY_MANAGE_CONTENTFUL
  const contentUrl = `https://graphql.contentful.com/content/v1/spaces/qe1bos8jv7k6/environments/master?access_token=${apiKey}`
  const manageUrl = `https://api.contentful.com/spaces/qe1bos8jv7k6/environments/master/entries`
  const queryAllCampaign = `query campaignCollectionQuery {
    campaignCollection(limit: 20) {
      items {
        sys {
          id
        }
        name
        event
        type
        coupon
        action
        productsCollection {
          items {
            ... on Product {
              name
              picture {
                url
              }
            }
          }
        }
      }
    }
  }`

  const queryAllProduct = `query productCollectionQuery {
    productCollection {
      items {
        sys {
          id
        }
        name
        picture {
          url
        }
      }
    }
  }
  `

  function queryCampaign(id) {
    return `query campaignEntryQuery {
        campaign(id: "${id}") {
          sys {
            id
          }
          name,
          event,
          type,
          coupon,
          productsCollection {
            items {
              ... on Product {
                name,
                picture {
                  url,
                }
              }
            }
          }
        }
      }`
  }

  return {
    contentUrl,
    manageUrl,
    queryAllCampaign,
    queryCampaign,
    manageApiKey,
    queryAllProduct
  }
}
