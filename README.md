# API Manajemen Produk

REST API untuk pengelolaan data produk menggunakan Express.js, Prisma ORM, dan PostgreSQL. Aplikasi ini menyediakan operasi CRUD (Create, Read, Update, Delete) dengan validasi input pada setiap permintaan.

## Teknologi yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Postman
- Docker

## Sumber dan Atribusi

Proyek ini dikembangkan berdasarkan starter project [Express Product API](https://github.com/catursetyo/express_product_api). Struktur dasar dan implementasi CRUD digunakan sebagai referensi pengembangan. Konfigurasi repository, dokumentasi, serta proses pengujian pada repository ini dikelola secara terpisah.

## Persyaratan Instalasi

Pastikan perangkat sudah memiliki:

- Node.js versi 18.18 atau lebih baru.
- npm.
- Docker Desktop.
- Postman (untuk pengujian API).

## Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/R4hzafr/api-produk-tugas-9.git
cd api-produk-tugas-9
```

### 2. Instal Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` berdasarkan template:

```bash
cp .env.example .env
```

Sesuaikan `DATABASE_URL` jika konfigurasi PostgreSQL berbeda.

### 4. Menjalankan PostgreSQL

Pastikan Docker Desktop sudah berjalan, kemudian:

```bash
npm run db:up
```

### 5. Menjalankan Database Migration

```bash
npm run db:migrate
```

### 6. Memasukkan Data Awal

```bash
npm run db:seed
```

### 7. Menjalankan Server

```bash
npm start
```

Server berjalan pada:

`http://localhost:3001`

Endpoint utama API:

`http://localhost:3001/products`

## Struktur Proyek

```text
api-produk-tugas-9/
│
├── controllers/
│   ├── getAllProducts.js
│   ├── getProductById.js
│   ├── createProduct.js
│   ├── updateProduct.js
│   └── deleteProduct.js
│
├── middlewares/
│   └── productMiddleware.js
│
├── routes/
│   └── productRoutes.js
│
├── lib/
│   └── prisma.js
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── postman/
│   └── Product-API.postman_collection.json
│
├── assets/
├── app.js
├── package.json
├── package-lock.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/products` | Menampilkan semua produk |
| GET | `/products/:id` | Menampilkan produk berdasarkan ID |
| POST | `/products` | Menambahkan produk |
| PUT | `/products` | Memperbarui produk berdasarkan ID |
| DELETE | `/products/:id` | Menghapus produk berdasarkan ID |


## API Health Check

API menyediakan endpoint Health Check untuk mengetahui apakah server Express sedang berjalan.

### Endpoint

```http
GET /health
```

### Contoh Response

```json
{
  "status": "ok",
  "service": "api-produk-tugas-9",
  "uptimeSeconds": 120,
  "timestamp": "2026-11-09T00:00:00.000Z"
}
```

### Keterangan Response

- `status`: Status server.
- `service`: Nama layanan API.
- `uptimeSeconds`: Lama server berjalan dalam detik.
- `timestamp`: Waktu ketika respons dibuat.

Endpoint ini digunakan untuk memeriksa status proses server Express dan tidak melakukan pemeriksaan koneksi database.

## Format Request

### POST — Menambahkan Produk

Endpoint:

```http
POST /products
```

Body JSON:

```json
{
  "name": "Pensil",
  "price": 3000
}
```

### PUT — Memperbarui Produk

Endpoint:

```http
PUT /products
```

Body JSON:

```json
{
  "id": 1,
  "name": "Buku Tulis",
  "price": 20000
}
```

### DELETE — Menghapus Produk

Endpoint:

```http
DELETE /products/1
```

## Validasi Input

API menyediakan validasi terhadap data yang dikirimkan pengguna.

| Kondisi | HTTP Status | Pesan |
|---|---|---|
| Nama kosong | 400 | name wajib diisi |
| Harga bukan bilangan bulat atau negatif | 400 | price wajib berupa bilangan bulat minimal 0 |
| ID tidak valid | 400 | id tidak valid |
| Produk tidak ditemukan | 404 | produk tidak ditemukan |

## Pengujian Menggunakan Postman

Pengujian dilakukan menggunakan koleksi Postman yang tersedia pada:

`postman/Product-API.postman_collection.json`

Langkah pengujian:

1. Jalankan PostgreSQL dan server Express.
2. Buka aplikasi Postman.
3. Pilih menu Import.
4. Masukkan file `Product-API.postman_collection.json`.
5. Jalankan request GET, POST, PUT, dan DELETE.
6. Periksa status HTTP dan respons JSON.
7. Jalankan skenario validasi untuk memastikan input yang tidak sesuai ditolak.

## Pemeriksaan Database

Prisma Studio dapat digunakan untuk melihat data produk yang tersimpan.

Jalankan:

```bash
npx prisma studio
```

Untuk memeriksa data melalui PostgreSQL:

```bash
docker exec express_product_db psql -U postgres -d product_api -c 'SELECT * FROM "Product" ORDER BY id;'
```

## Pengujian Persistensi Data

Untuk memastikan data tersimpan secara permanen:

1. Tambahkan produk melalui Postman.
2. Hentikan server Express dengan `Ctrl + C`.
3. Jalankan kembali menggunakan `npm start`.
4. Lakukan GET `/products`.
5. Pastikan produk yang sebelumnya ditambahkan masih tersedia.

Data disimpan pada PostgreSQL, bukan hanya pada memori aplikasi.

**Catatan:** Jangan gunakan `docker compose down -v` ketika menguji persistensi karena perintah tersebut menghapus volume database.

## Keamanan Repository

File `.env` tidak disertakan dalam repository karena mengandung konfigurasi koneksi database.

File `.gitignore` digunakan untuk mengecualikan file environment dan folder `node_modules`.

## Repository

GitHub: https://github.com/R4hzafr/api-produk-tugas-9
