import { services } from "./ serviceConfig";

export function parseServiceSlug(slug: string) {
  for (const key of Object.keys(services)) {
    if (slug.startsWith(key + "-")) {
      const suburb = slug.replace(key + "-", "");
      const config = services[key as keyof typeof services];

      if (!config.suburbs.includes(suburb)) {
        return null;
      }

      return {
        serviceKey: key,
        suburb,
        config,
      };
    }
  }

  return null;
}