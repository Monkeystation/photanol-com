module.exports = {
  siteMetadata: {
    title: 'Photanol',
    description: 'We are a Circular Carbon Chemicals production platform company that utilises proprietary engineered cyanobacteria to process carbon dioxide (CO2) and sunlight into valuable chemicals.',
  },
  // flags: {
  //   QUERY_ON_DEMAND: false,
  //   DEV_SSR: false
  // },
  plugins: [
    'gatsby-plugin-react-helmet',
    { resolve: `gatsby-plugin-sass`, options: { indentedSyntax: true } },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1920,
              quality: 80,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
        printRejected: false,
        whitelist: ['small'],
        whitelistPatternsChildren: [/modal$/]
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/img/logo-ani-web.svg": [
            "X-Frame-Options: SAMEORIGIN",
          ],
        },
      }
    }
  ],
}
