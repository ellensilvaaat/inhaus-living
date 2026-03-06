import axios from "axios";

export async function verifyTurnstile(req, res, next) {
  // ✅ Modo DEV opcional (não mexe em prod)
  // Se quiser ignorar captcha localmente, coloque no backend/.env:
  // TURNSTILE_BYPASS=true
  if (process.env.TURNSTILE_BYPASS === "true") {
    return next();
  }

  const token = req.body?.turnstileToken;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Captcha token missing",
    });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: "Captcha not configured",
    });
  }

  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";

    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 5000,
      }
    );

    if (!response.data?.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    return next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Captcha verification error",
    });
  }
}