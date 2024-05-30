import { config as dotenvConfig } from 'dotenv';
dotenvConfig({
  path: '.env.development',
});

function sendActivationMailCoworkEmployee(
  employeeCoworking: string,
  email: string,
  password: string,
) {
  const url =process.env.NODEMAILER_FRONT_URL
  const html = `<html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0;" />
    
        <style>
          /* Reset styles */
          body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
          }
          body,
          table,
          td,
          div,
          p,
          a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
          }
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse !important;
            border-spacing: 0;
          }
          img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
    
          /* Rounded corners for advanced mail clients only */
          @media all and (min-width: 560px) {
            .container {
              border-radius: 8px;
              -webkit-border-radius: 8px;
              -moz-border-radius: 8px;
              -khtml-border-radius: 8px;
            }
          }
    
          /* Set color for auto links (addresses, dates, etc.) */
          a,
          a:hover {
            color: #127db3;
          }
          .footer a,
          .footer a:hover {
            color: #999999;
          }
        </style>
    
        <!-- MESSAGE SUBJECT -->
        <title>Email template</title>
      </head>
    
      <!-- BODY -->
      <!-- Set message background color (twice) and text color (twice) -->
      <body
        topmargin="0"
        rightmargin="0"
        bottommargin="0"
        leftmargin="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        style="
          border-collapse: collapse;
          border-spacing: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          -webkit-font-smoothing: antialiased;
          text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          line-height: 100%;
          background-color: #f0f0f0;
          color: #000000;
        "
        bgcolor="#F0F0F0"
        text="#000000"
      >
        <!-- SECTION / BACKGROUND -->
        <!-- Set message background color one again -->
        <table
          width="100%"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0;
            padding: 0;
            width: 100%;
          "
          class="background"
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                margin: 0;
                padding: 0;
              "
              bgcolor="#F0F0F0"
            >
              <!-- WRAPPER / CONTEINER -->
              <!-- Set conteiner background color -->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                bgcolor="#FFFFFF"
                width="560"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  padding: 0;
                  width: inherit;
                  max-width: 560px;
                "
                class="container"
              >
                <!-- HERO IMAGE -->
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                    "
                    class="hero"
                  >
                    <a target="_blank" style="text-decoration: none"
                      ><img
                        border="0"
                        vspace="0"
                        hspace="0"
                        src="https://res.cloudinary.com/drwhxgsfu/image/upload/v1715217443/coworkings_coco%2B/coco_images/Coco_Lima_IG_kmjcrb_cocotransformbanner_yo9l8f.png"
                        alt="Please enable images to view this content"
                        width="560px"
                        height="100px"
                        style="
                          width: 100%;
                          max-width: 560px;
                          object-fit: cover;
                          color: #000000;
                          font-size: 13px;
                          transform: scale(1);
                          margin: 0;
                          padding: 0;
                          outline: none;
                          text-decoration: none;
                          -ms-interpolation-mode: bicubic;
                          border: none;
                          display: block;
                        "
                    /></a>
                  </td>
                </tr>
    
                <!-- HEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 24px;
                      font-weight: bold;
                      line-height: 130%;
                      padding-top: 25px;
                      color: #000000;
                      font-family: sans-serif;
                    "
                    class="header"
                  >
                    ¡Bienvenid@ ${employeeCoworking} a la familia Coco+!
                  </td>
                </tr>
    
                <!-- SUBHEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-bottom: 3px;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 18px;
                      font-weight: 300;
                      line-height: 150%;
                      padding-top: 5px;
                      color: #000000;
                      font-family: sans-serif;
                    "
                    class="subheader"
                  >
                    Tu cuenta ahora se encuentra activa
                  </td>
                </tr>
    
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 17px;
                      font-weight: 400;
                      line-height: 160%;
                      padding-top: 25px;
                      color: #000000;
                      font-family: sans-serif;
                    "
                    class="paragraph"
                  >
                    Para tu primer ingreso a la plataforma, haz click en el
                    siguiente link:
                  </td>
                </tr>
    
                <!-- BUTTON -->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                      padding-bottom: 5px;
                    "
                    class="button"
                  >
                    <a href="#" target="_blank" style="text-decoration: none">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="
                          max-width: 240px;
                          min-width: 120px;
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                        "
                      >
                        <tr>
                          <td
                            align="center"
                            valign="middle"
                            style="
                              padding: 12px 24px;
                              margin: 0;
                              text-decoration: none;
                              border-collapse: collapse;
                              border-spacing: 0;
                              border-radius: 4px;
                              -webkit-border-radius: 4px;
                              -moz-border-radius: 4px;
                              -khtml-border-radius: 4px;
                            "
                            bgcolor="#222b2d"
                          >
                            <a
                              target="_blank"
                              style="
                                color: #ffffff;
                                font-family: sans-serif;
                                font-size: 17px;
                                font-weight: 400;
                                line-height: 120%;
    
                                text-decoration: none;
                              "
                              href= '${url}/login'
                            >
                              Iniciar sesión
                            </a>
                          </td>
                        </tr>
                      </table></a
                    >
                  </td>
                </tr>
    
                <!-- LINE -->
                <!-- Set line color -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                    "
                    class="line"
                  >
                    <hr
                      color="#E0E0E0"
                      align="center"
                      width="100%"
                      size="1"
                      noshade
                      style="margin: 0; padding: 0"
                    />
                  </td>
                </tr>
    
                <!-- LIST -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                    "
                    class="list-item"
                  >
                    <table
                      align="center"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        width: inherit;
                        margin: 0;
                        padding: 0;
                        border-collapse: collapse;
                        border-spacing: 0;
                      "
                    >
                      <!-- LIST ITEM -->
                      <tr>
                        <!-- LIST ITEM IMAGE -->
                        <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                        <td
                          align="left"
                          valign="top"
                          style="
                            border-collapse: collapse;
                            border-spacing: 0;
                            padding-top: 30px;
                            padding-right: 20px;
                          "
                        >
                          <img
                            border="0"
                            vspace="0"
                            hspace="0"
                            style="
                              padding: 0;
                              margin: 0;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                              border: none;
                              display: block;
                              color: #000000;
                            "
                            src="https://res.cloudinary.com/drwhxgsfu/image/upload/v1715224257/coworkings_coco%2B/coco_images/user_ieeze5.png"
                            alt="H"
                            width="50"
                            height="50"
                          />
                        </td>
    
                        <!-- LIST ITEM TEXT -->
                        <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                        <td
                          align="left"
                          valign="top"
                          style="
                            font-size: 15px;
                            font-weight: 400;
                            line-height: 160%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            margin: 0;
                            padding: 0;
                            padding-top: 25px;
                            color: #000000;
                            font-family: sans-serif;
                          "
                          class="paragraph"
                        >
                          <b style="color: #333333">Usuario</b><br />
                          ${email}
                        </td>
                      </tr>
    
                      <!-- LIST ITEM -->
                      <tr>
                        <!-- LIST ITEM IMAGE -->
                        <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                        <td
                          align="left"
                          valign="top"
                          style="
                            border-collapse: collapse;
                            border-spacing: 0;
                            padding-top: 30px;
                            padding-right: 20px;
                          "
                        >
                          <img
                            border="0"
                            vspace="0"
                            hspace="0"
                            style="
                              padding: 0;
                              margin: 0;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                              border: none;
                              display: block;
                              color: #000000;
                            "
                            src="https://res.cloudinary.com/drwhxgsfu/image/upload/v1715224257/coworkings_coco%2B/coco_images/padlock_wfoear.png"
                            alt="D"
                            width="50"
                            height="50"
                          />
                        </td>
    
                        <!-- LIST ITEM TEXT -->
                        <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                        <td
                          align="left"
                          valign="top"
                          style="
                            font-size: 15px;
                            font-weight: 400;
                            line-height: 160%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            margin: 0;
                            padding: 0;
                            padding-top: 25px;
                            color: #000000;
                            font-family: sans-serif;
                          "
                          class="paragraph"
                        >
                          <b style="color: #333333">Contraseña</b><br />
                          ${password}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
                <!-- LINE -->
                <!-- Set line color -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                    "
                    class="line"
                  >
                    <hr
                      color="#E0E0E0"
                      align="center"
                      width="100%"
                      size="1"
                      noshade
                      style="margin: 0; padding: 0"
                    />
                  </td>
                </tr>
    
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 17px;
                      font-weight: 400;
                      line-height: 160%;
                      padding-top: 20px;
                      padding-bottom: 25px;
                      color: #000000;
                      font-family: sans-serif;
                    "
                    class="paragraph"
                  >
                    ¿Tienes alguna pregunta?
                    <a
                      href="mailto:cocoplus2024@gmail.com"
                      target="_blank"
                      style="
                        color: #127db3;
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: 400;
                        line-height: 160%;
                      "
                      >cocoplus2024@gmail.com</a
                    >
                  </td>
                </tr>
    
                <!-- End of WRAPPER -->
              </table>
    
              <!-- WRAPPER -->
              <!-- Set wrapper width (twice) -->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="560"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  padding: 0;
                  width: inherit;
                  max-width: 560px;
                "
                class="wrapper"
              >
                <!-- SOCIAL NETWORKS -->
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                    "
                    class="social-icons"
                  >
                    <table
                      width="256"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="center"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        padding: 0;
                      "
                    >
                      <tr>
                        <!-- ICON 1 -->
                        <td
                          align="center"
                          valign="middle"
                          style="
                            margin: 0;
                            padding: 0;
                            padding-left: 10px;
                            padding-right: 10px;
                            border-collapse: collapse;
                            border-spacing: 0;
                          "
                        >
                          <a target="_blank" href="#" style="text-decoration: none"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="
                                padding: 0;
                                margin: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                border: none;
                                display: inline-block;
                                color: #000000;
                              "
                              alt="F"
                              title="Facebook"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png"
                          /></a>
                        </td>
    
                        <!-- ICON 2 -->
                        <td
                          align="center"
                          valign="middle"
                          style="
                            margin: 0;
                            padding: 0;
                            padding-left: 10px;
                            padding-right: 10px;
                            border-collapse: collapse;
                            border-spacing: 0;
                          "
                        >
                          <a target="_blank" href="#" style="text-decoration: none"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="
                                padding: 0;
                                margin: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                border: none;
                                display: inline-block;
                                color: #000000;
                              "
                              alt="T"
                              title="Twitter"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png"
                          /></a>
                        </td>
    
                        <!-- ICON 3 -->
                        <td
                          align="center"
                          valign="middle"
                          style="
                            margin: 0;
                            padding: 0;
                            padding-left: 10px;
                            padding-right: 10px;
                            border-collapse: collapse;
                            border-spacing: 0;
                          "
                        >
                          <a target="_blank" href="#" style="text-decoration: none"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="
                                padding: 0;
                                margin: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                border: none;
                                display: inline-block;
                                color: #000000;
                              "
                              alt="G"
                              title="Google Plus"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png"
                          /></a>
                        </td>
    
                        <!-- ICON 4 -->
                        <td
                          align="center"
                          valign="middle"
                          style="
                            margin: 0;
                            padding: 0;
                            padding-left: 10px;
                            padding-right: 10px;
                            border-collapse: collapse;
                            border-spacing: 0;
                          "
                        >
                          <a target="_blank" href="#" style="text-decoration: none"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="
                                padding: 0;
                                margin: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                border: none;
                                display: inline-block;
                                color: #000000;
                              "
                              alt="I"
                              title="Instagram"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/instagram.png"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
                <!-- FOOTER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 13px;
                      font-weight: 400;
                      line-height: 150%;
                      padding-top: 20px;
                      padding-bottom: 20px;
                      color: #999999;
                      font-family: sans-serif;
                    "
                    class="footer"
                  >
                    Este es un correo electrónico de Coco+ •
                    <a
                      href="#"
                      target="_blank"
                      style="
                        text-decoration: underline;
                        color: #999999;
                        font-family: sans-serif;
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 150%;
                      "
                      >Política de Privacidad</a
                    >
                  </td>
                </tr>
    
                <!-- End of WRAPPER -->
              </table>
    
              <!-- End of SECTION / BACKGROUND -->
            </td>
          </tr>
        </table>
      </body>
    </html>`;

  return html;
}

export default sendActivationMailCoworkEmployee;
