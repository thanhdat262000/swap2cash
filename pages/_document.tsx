import { DEFAULT_COLOR } from 'constants/config';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const getThemeString = (themeData: any) => {
  const themeArray = Object.entries(themeData);
  let themeString = '';

  for (const [themeKey, themeValue] of themeArray) {
    themeString += `${themeKey}: ${themeValue}; \n`;
  }

  return themeString;
};

// export default function Document(props: any) {
//   const cookies = parseCookies();
//   console.log('data document', { cookies });

//   const themeColorCSS = {
//     '--color_button_main_bg': '#1bb6c1',
//     '--color-primary': '#1bb6c1',
//     '--swiper-pagination-color': '#1bb6c1',
//   };

//   const theme = `
//   body {
//       ${getThemeString(themeColorCSS)}
//   }

//   body.dark {
//       ${getThemeString(themeColorCSS)}
//   }
// `;
//   return (
//     <Html>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
//           rel="stylesheet"
//         />
//         <script src="https://app.debridge.finance/assets/scripts/widget.js" />
//       </Head>
//       <body className=" bg-neutral">
//         <Main />
//         <NextScript />
//         <style id="theme-color">{theme}</style>
//       </body>
//     </Html>
//   );
// }

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    // Access cookies using parseCookies
    const cookies = parseCookies(ctx);

    return {
      ...initialProps,
      cookies,
    };
  }

  render() {
    const { cookies }: any = this.props;
    const dataConfig = cookies?.dataConfig || {};
    console.log('dataConfig 200---', dataConfig);
    console.log('typeof dataConfig', typeof dataConfig);
    let primaryColor;
    let backgroundColor;
    let headerColor;
    let footerColor;
    try {
      const dataParsed = JSON.parse(dataConfig);
      primaryColor = dataParsed?.primaryColor;
      backgroundColor = dataParsed?.backgroundColor;
      headerColor = dataParsed?.headerColor;
      footerColor = dataParsed?.footerColor;
    } catch (e) {
      console.log('error here', e);
    }
    console.log('primaryColor', primaryColor);
    const currentPrimaryColor = primaryColor || DEFAULT_COLOR.PRIMARY_COLOR;

    const themeColorCSS = {
      '--color_button_main_bg': currentPrimaryColor,
      '--color-primary': currentPrimaryColor,
      '--color-bg-primary': backgroundColor || DEFAULT_COLOR.BACKGROUND_COLOR,
      '--color-bg-header': headerColor || DEFAULT_COLOR.BACKGROUND_COLOR,
      '--color-bg-footer': footerColor || DEFAULT_COLOR.BACKGROUND_COLOR,

      '--swiper-pagination-color': currentPrimaryColor,
    };
    console.log('currentPrimaryColor', currentPrimaryColor);
    const theme = `
      body {
          ${getThemeString(themeColorCSS)}
      }

      body.dark {
          ${getThemeString(themeColorCSS)}
      }
    `;
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://embed.tawk.to/6477089774285f0ec46eaba6/1h1ofj4kt"
            charSet="UTF-8"
            crossOrigin="*"
          ></script>
          <script src="https://quantifycrypto.com/widgets/marquee/js/qc-price-ticker-widget.js"></script>
          <script src="https://api.rango.exchange/widget/iframe.bundle.min.js"></script>
        </Head>
        <body className=" bg-neutral">
          <Main />
          <NextScript />
          <style id="theme-color">{theme}</style>
        </body>
      </Html>
    );
  }
}

// Document.getInitialProps = async (ctx: any) => {
//   const initialProps = await Document.getInitialProps(ctx);

//   // Access cookies using parseCookies
//   const cookies = parseCookies(ctx);

//   return {
//     ...initialProps,
//     cookies,
//   };
// };

export default MyDocument;
