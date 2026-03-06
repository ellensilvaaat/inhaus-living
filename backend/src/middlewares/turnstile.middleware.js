// import axios from "axios";

// // Middleware para verificar o captcha Cloudflare Turnstile
// export async function verifyTurnstile(req, res, next) {

//   // ✅ MODO DESENVOLVIMENTO
//   // Se a variável TURNSTILE_BYPASS=true estiver no .env
//   // o captcha é ignorado (útil para desenvolvimento local)
//   if (process.env.TURNSTILE_BYPASS === "true") {
//     return next();
//   }

//   // Pega o token enviado pelo frontend
//   const token = req.body?.turnstileToken;

//   // Se não existir token, retorna erro
//   if (!token) {
//     return res.status(400).json({
//       success: false,
//       message: "Captcha token missing",
//     });
//   }

//   // Verifica se a chave secreta do Turnstile está configurada no backend
//   if (!process.env.TURNSTILE_SECRET_KEY) {
//     return res.status(500).json({
//       success: false,
//       message: "Captcha not configured",
//     });
//   }

//   try {

//     // Tenta obter o IP real do usuário
//     const ip =
//       req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//       req.socket?.remoteAddress ||
//       "";

//     // Faz request para a API do Cloudflare Turnstile
//     const response = await axios.post(
//       "https://challenges.cloudflare.com/turnstile/v0/siteverify",
//       new URLSearchParams({
//         secret: process.env.TURNSTILE_SECRET_KEY,
//         response: token,
//         remoteip: ip,
//       }),
//       {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         timeout: 5000,
//       }
//     );

//     // Se a verificação falhar no Cloudflare
//     if (!response.data?.success) {
//       return res.status(400).json({
//         success: false,
//         message: "Captcha verification failed",
//       });
//     }

//     // Se tudo estiver OK, segue para o próximo middleware/controller
//     return next();

//   } catch (err) {

//     // Caso aconteça algum erro na comunicação com Cloudflare
//     return res.status(500).json({
//       success: false,
//       message: "Captcha verification error",
//     });

//   }
// }