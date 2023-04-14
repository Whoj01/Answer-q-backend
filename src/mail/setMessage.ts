export function setMessage(mail: string, link: string) {
  return {
    from: "c1f5b9ace1-c2f138@inbox.mailtrap.io",
    to: mail,
    subject: "Recuperação de senha AnswerQ",
    text: "Estamos enviando esse email para recuperar sua senha em nossa plataforma AnswerQ",
    html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <title>Recuperação de senha</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Roboto', sans-serif;">
        <section style="margin: 0 auto">
          <div style="background-color: #4D5E77; max-width: 100%; min-height: 150px; display: flex; align-items: center; justify-content: center">
            <h1 style="color: #FBFCFF; font-weight: 500">
              Alteração de senha
            </h1>
          </div>

          <div class="display: flex; align-items: center; justify-content: center">
            <p class="font-weight: 400; ">Olá, ${mail}</p>

            <p class="font-weight: 400; ">
              Recebemos uma solicitação para alterar sua senha na AnswerQ, e por isto você esta recebendo este email.
            </p >

            <p class="font-weight: 400; ">
              Para alterar sua senha clique no link abaixo e crie uma nova senha.
            </p>

            <p class="font-weight: 400; ">
              https://answerQ/recuperacao-senha?token=${link}&email=${mail}
            </p>

            <p>Caso você não tenha solicitado esta recuperação de senha, por favor, ignore este e-mail.</p>

            <p>
              Atenciosamente,
            </p>

            <p>AnswerQ</p>
          </div>
        </section>
      </body>
    </html>`,
  };
}
