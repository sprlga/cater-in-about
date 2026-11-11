# catetin-about

Situs statis Catet.in (about, fitur, kebijakan privasi, Data Safety), dwibahasa ID/EN.
HTML/CSS/JS polos tanpa build step, siap di-deploy ke **Cloudflare Workers (static assets)**.

## Struktur
```
wrangler.jsonc          konfigurasi Worker (hanya static assets, tanpa kode Worker)
public/
  index.html            About + fitur
  privacy/index.html    Kebijakan privasi        -> URL untuk Play Console: https://<domain>/privacy/
  data-safety/index.html  Ringkasan Data Safety
  404.html
  _headers              CSP ketat + header keamanan
  assets/               style.css, i18n.js (toggle bahasa), logo.svg
```

## Konten yang sudah diisi
- Email kontak: `support.catetin@gmail.com`
- Nama pengembang: `catet-in`

Tidak ada placeholder yang tersisa. Cek dengan:
```bash
grep -rn "\[[A-Z_]*\]" public
```

## Jalankan lokal
```bash
cd catetin-about
npx wrangler dev          # atau: python3 -m http.server 8788 --directory public
```

## Deploy
```bash
cd catetin-about
npx wrangler login        # sekali saja
npx wrangler deploy --dry-run   # validasi tanpa upload
npx wrangler deploy
```
Setelah deploy, isi URL `https://<domain>/privacy/` di Play Console (App content -> Privacy policy).
Link bahasa Inggris: `https://<domain>/privacy/?lang=en`.

## Catatan
- Bahasa dipilih dari `?lang=id|en`, lalu pilihan tersimpan (localStorage), lalu bahasa browser; default Indonesia.
- CSP hanya mengizinkan aset dari domain sendiri: jangan menambah skrip/CDN/font eksternal tanpa memperbarui `public/_headers`.
- Isi privasi dan Data Safety mencerminkan app **v1.0** (izin hanya `INTERNET`, dipakai untuk tab About/WebView; `allowBackup=false`).
  **Perbarui keduanya** bila menambah Play Billing (fitur Export/Import berbayar), analitik, crash reporting, atau permission baru.
