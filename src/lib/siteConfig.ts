export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim() !== "") {
    const formattedVercel = vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
    return formattedVercel.replace(/\/+$/, "");
  }

  return "https://daily-desk-app.vercel.app";
}
