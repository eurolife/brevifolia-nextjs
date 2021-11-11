// module.exports = {
//   webpack: function(config) {
//     config.module.rules.push({
//       test: /\.md$/,
//       use: 'raw-loader',
//     })
//     return config
//   },
// }

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [
    optimizedImages, {
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        speed: 3,
        strip: true,
        verbose: true,
      },
      imagesPublicPath: '/brevifolia-nextjs/_next/static/images/',
    }
  ],
  {
  assetPrefix: '/brevifolia-nextjs/',
  basePath: '/brevifolia-nextjs',
  pageExtensions: ["tsx", 'js'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
}
]);