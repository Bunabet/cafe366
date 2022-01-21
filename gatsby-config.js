require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteTitle: "café 366",
    siteTitleDefault: "café 366",
    siteUrl: "https://cafe366.com",
    hrefLang: "fr",
    siteDescription: "Cafe 366 a shop for the speciality coffee",
    siteImage: "/default-og-image.jpg",
    twitter: "@cafe366",
    instagram: "@cafe366",
  },
  flags: {
    FAST_DEV: true,
  },

  plugins: [
    // FONT
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },

    // MARKDOWN
    // https://dev.to/alexalexyang/how-to-use-markdown-in-pages-in-gatsby-5dee
    // https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/media/markdown`,
        name: `markdown`,
      },
    },
    `gatsby-transformer-remark`,

    // SHOPIFY
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    // GATSBY IMAGE
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",

    // MISC
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    // GATSBY CLOUD
    "gatsby-plugin-gatsby-cloud",
    // Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
  ].filter(Boolean),
};
