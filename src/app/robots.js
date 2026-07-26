export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/booking/", "/enroll/", "/profile/"],
      },
    ],
    sitemap: "https://eraasoft.com/sitemap.xml",
  };
}
