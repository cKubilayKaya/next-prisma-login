export function createSlug(title) {
  // Türkçe karakterleri değiştir
  const turkishChars = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };

  // Başlığı küçük harfe çevir
  let slug = title.toLowerCase();

  // Türkçe karakterleri değiştir
  slug = slug.replace(/[çğıöşüİÇĞÖŞÜ]/g, (match) => turkishChars[match]);

  // Alfanumerik olmayan karakterleri tire ile değiştir
  slug = slug.replace(/[^a-z0-9]+/g, "-");

  // Baştaki ve sondaki tireleri kaldır
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}
