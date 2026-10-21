/* TRAVELUX script.js — data tiket, pencarian + urutan otomatis, booking + payment simulasi (100% tanpa database) */
"use strict";
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const rupiah = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

/* ---------- DATA: array of objects = "struct" Tiket ---------- */
const CITIES = ["Surabaya","Yogyakarta","Jakarta","Bandung","Bali","Malang","Lombok","Labuan Bajo","Semarang","Solo","Medan","Makassar"];
const CITY_IMG = {
  "Bali":"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
  "Yogyakarta":"https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80",
  "Jakarta":"https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=600&q=80",
  "Bandung":"https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
  "Surabaya":"https://commons.wikimedia.org/wiki/Special:FilePath/Tugu_Pahlawan_Surabaya_Jawa_Timur.jpg?width=800",
  "Malang":"https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80",
  "Lombok":"https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=600&q=80",
  "Labuan Bajo":"https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80",
  "Semarang":"https://commons.wikimedia.org/wiki/Special:FilePath/Lawang%20Sewu%20Semarang%20Indonesia%201.jpg?width=800",
  "Solo":"https://commons.wikimedia.org/wiki/Special:FilePath/Keraton%20Kasunanan%20Surakarta%20Hadiningrat.jpg?width=800",
  "Medan":"https://commons.wikimedia.org/wiki/Special:FilePath/Istana%20Maimun%20Kota%20Medan%2017.jpg?width=800",
  "Makassar":"https://commons.wikimedia.org/wiki/Special:FilePath/Losari%20Beach%2C%20Makassar%2C%20Indonesia.jpg?width=800"
};
const CITY_DESC = {"Bali":"Pulau Dewata, pantai & budaya.","Yogyakarta":"Candi, kuliner, dan seni.","Jakarta":"Ibukota penuh energi.","Bandung":"Kota kembang yang sejuk.","Surabaya":"Kota Pahlawan.","Malang":"Bromo & wisata sejuk.","Lombok":"Pantai eksotis & Rinjani.","Labuan Bajo":"Gerbang Komodo.","Semarang":"Lawang Sewu & kota lama.","Solo":"Keraton & batik legendaris.","Medan":"Istana Maimun & kuliner.","Makassar":"Pantai Losari & Fort Rotterdam."};
const DEFAULT_TICKETS = [
  {id:1, operator:"Lion Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"06:45", kedatangan:"08:10", durasiMenit:85, harga:620000, kelas:"Ekonomi", kode:"JT-512"},
  {id:2, operator:"Batik Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"09:20", kedatangan:"10:55", durasiMenit:95, harga:720000, kelas:"Ekonomi", kode:"ID-6230"},
  {id:3, operator:"Garuda Indonesia", transportasi:"pesawat", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"12:30", kedatangan:"14:10", durasiMenit:100, harga:980000, kelas:"Ekonomi", kode:"GA-412"},
  {id:4, operator:"Citilink", transportasi:"pesawat", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"16:15", kedatangan:"17:40", durasiMenit:85, harga:660000, kelas:"Ekonomi", kode:"QG-771"},
  {id:5, operator:"AirAsia", transportasi:"pesawat", asal:"Jakarta", tujuan:"Bali", tanggal:"2026-10-16", keberangkatan:"07:00", kedatangan:"09:50", durasiMenit:170, harga:890000, kelas:"Ekonomi", kode:"QZ-7530"},
  {id:6, operator:"Garuda Indonesia", transportasi:"pesawat", asal:"Jakarta", tujuan:"Bali", tanggal:"2026-10-16", keberangkatan:"10:00", kedatangan:"12:50", durasiMenit:170, harga:1450000, kelas:"Bisnis", kode:"GA-401"},
  {id:7, operator:"Lion Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Jakarta", tanggal:"2026-10-15", keberangkatan:"16:40", kedatangan:"18:20", durasiMenit:100, harga:680000, kelas:"Ekonomi", kode:"JT-690"},
  {id:8, operator:"KAI Argo Wilis", transportasi:"kereta", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"08:00", kedatangan:"12:30", durasiMenit:270, harga:320000, kelas:"Eksekutif", kode:"KA-12"},
  {id:9, operator:"KAI Gajayana", transportasi:"kereta", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"14:00", kedatangan:"18:45", durasiMenit:285, harga:290000, kelas:"Eksekutif", kode:"KA-44"},
  {id:10, operator:"KAI Sancaka", transportasi:"kereta", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"19:00", kedatangan:"23:10", durasiMenit:250, harga:180000, kelas:"Ekonomi", kode:"KA-88"},
  {id:11, operator:"KAI Argo Bromo", transportasi:"kereta", asal:"Surabaya", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"09:00", kedatangan:"17:30", durasiMenit:510, harga:520000, kelas:"Eksekutif", kode:"KA-02"},
  {id:12, operator:"Sinar Jaya", transportasi:"bus", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"20:00", kedatangan:"03:30", durasiMenit:450, harga:210000, kelas:"Eksekutif", kode:"SJ-101"},
  {id:13, operator:"Rosalia Indah", transportasi:"bus", asal:"Surabaya", tujuan:"Malang", tanggal:"2026-10-15", keberangkatan:"09:00", kedatangan:"11:30", durasiMenit:150, harga:120000, kelas:"Eksekutif", kode:"RI-55"},
  {id:14, operator:"Pahala Kencana", transportasi:"bus", asal:"Yogyakarta", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"18:00", kedatangan:"02:00", durasiMenit:480, harga:260000, kelas:"Eksekutif", kode:"PK-77"},
  {id:15, operator:"Citilink", transportasi:"pesawat", asal:"Surabaya", tujuan:"Lombok", tanggal:"2026-10-17", keberangkatan:"11:00", kedatangan:"13:10", durasiMenit:130, harga:910000, kelas:"Ekonomi", kode:"QG-882"},
  {id:16, operator:"Batik Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Labuan Bajo", tanggal:"2026-10-18", keberangkatan:"06:10", kedatangan:"09:40", durasiMenit:210, harga:1650000, kelas:"Ekonomi", kode:"ID-6540"},
  {id:17, operator:"Wings Air", transportasi:"pesawat", asal:"Bali", tujuan:"Labuan Bajo", tanggal:"2026-10-18", keberangkatan:"13:00", kedatangan:"14:20", durasiMenit:80, harga:780000, kelas:"Ekonomi", kode:"IW-1890"},
  {id:18, operator:"KAI Taksaka", transportasi:"kereta", asal:"Yogyakarta", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"10:00", kedatangan:"16:00", durasiMenit:360, harga:410000, kelas:"Eksekutif", kode:"KA-67"},
  {id:19, operator:"Lion Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Bali", tanggal:"2026-10-16", keberangkatan:"07:10", kedatangan:"09:00", durasiMenit:110, harga:750000, kelas:"Ekonomi", kode:"JT-881"},
  {id:20, operator:"Citilink", transportasi:"pesawat", asal:"Surabaya", tujuan:"Bali", tanggal:"2026-10-16", keberangkatan:"13:20", kedatangan:"15:10", durasiMenit:110, harga:820000, kelas:"Ekonomi", kode:"QG-665"},
  {id:21, operator:"Batik Air", transportasi:"pesawat", asal:"Bali", tujuan:"Surabaya", tanggal:"2026-10-17", keberangkatan:"10:00", kedatangan:"11:00", durasiMenit:60, harga:790000, kelas:"Ekonomi", kode:"ID-6541"},
  {id:22, operator:"Garuda Indonesia", transportasi:"pesawat", asal:"Jakarta", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"06:30", kedatangan:"08:00", durasiMenit:90, harga:950000, kelas:"Ekonomi", kode:"GA-308"},
  {id:23, operator:"Lion Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"18:00", kedatangan:"19:30", durasiMenit:90, harga:690000, kelas:"Ekonomi", kode:"JT-571"},
  {id:24, operator:"Batik Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Jakarta", tanggal:"2026-10-15", keberangkatan:"07:30", kedatangan:"09:10", durasiMenit:100, harga:760000, kelas:"Ekonomi", kode:"ID-6310"},
  {id:25, operator:"Citilink", transportasi:"pesawat", asal:"Yogyakarta", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"08:00", kedatangan:"09:15", durasiMenit:75, harga:620000, kelas:"Ekonomi", kode:"QG-252"},
  {id:26, operator:"Garuda Indonesia", transportasi:"pesawat", asal:"Yogyakarta", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"17:00", kedatangan:"18:20", durasiMenit:80, harga:990000, kelas:"Ekonomi", kode:"GA-206"},
  {id:27, operator:"Lion Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Yogyakarta", tanggal:"2026-10-16", keberangkatan:"11:00", kedatangan:"12:15", durasiMenit:75, harga:640000, kelas:"Ekonomi", kode:"JT-560"},
  {id:28, operator:"Wings Air", transportasi:"pesawat", asal:"Lombok", tujuan:"Surabaya", tanggal:"2026-10-17", keberangkatan:"14:00", kedatangan:"15:10", durasiMenit:130, harga:870000, kelas:"Ekonomi", kode:"IW-1891"},
  {id:29, operator:"Batik Air", transportasi:"pesawat", asal:"Labuan Bajo", tujuan:"Jakarta", tanggal:"2026-10-18", keberangkatan:"10:30", kedatangan:"13:00", durasiMenit:150, harga:1590000, kelas:"Ekonomi", kode:"ID-6542"},
  {id:30, operator:"Wings Air", transportasi:"pesawat", asal:"Bali", tujuan:"Lombok", tanggal:"2026-10-17", keberangkatan:"09:00", kedatangan:"09:55", durasiMenit:55, harga:540000, kelas:"Ekonomi", kode:"IW-1820"},
  {id:31, operator:"AirAsia", transportasi:"pesawat", asal:"Bandung", tujuan:"Bali", tanggal:"2026-10-17", keberangkatan:"12:00", kedatangan:"15:00", durasiMenit:180, harga:980000, kelas:"Ekonomi", kode:"QZ-7511"},
  {id:32, operator:"Lion Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Lombok", tanggal:"2026-10-17", keberangkatan:"05:45", kedatangan:"08:45", durasiMenit:180, harga:1050000, kelas:"Ekonomi", kode:"JT-840"},
  {id:33, operator:"KAI Mutiara", transportasi:"kereta", asal:"Surabaya", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"06:30", kedatangan:"11:00", durasiMenit:270, harga:240000, kelas:"Bisnis", kode:"KA-21"},
  {id:34, operator:"KAI Sancaka", transportasi:"kereta", asal:"Yogyakarta", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"07:00", kedatangan:"11:10", durasiMenit:250, harga:180000, kelas:"Ekonomi", kode:"KA-89"},
  {id:35, operator:"KAI Ranggajati", transportasi:"kereta", asal:"Surabaya", tujuan:"Bandung", tanggal:"2026-10-16", keberangkatan:"08:30", kedatangan:"15:00", durasiMenit:390, harga:260000, kelas:"Eksekutif", kode:"KA-113"},
  {id:36, operator:"KAI Lodaya", transportasi:"kereta", asal:"Bandung", tujuan:"Yogyakarta", tanggal:"2026-10-16", keberangkatan:"07:30", kedatangan:"13:00", durasiMenit:330, harga:230000, kelas:"Eksekutif", kode:"KA-91"},
  {id:37, operator:"KAI Argo Dwipangga", transportasi:"kereta", asal:"Jakarta", tujuan:"Yogyakarta", tanggal:"2026-10-16", keberangkatan:"08:00", kedatangan:"14:00", durasiMenit:360, harga:480000, kelas:"Eksekutif", kode:"KA-10"},
  {id:38, operator:"KAI Malioboro Ekspres", transportasi:"kereta", asal:"Yogyakarta", tujuan:"Malang", tanggal:"2026-10-16", keberangkatan:"08:30", kedatangan:"15:30", durasiMenit:420, harga:220000, kelas:"Eksekutif", kode:"KA-171"},
  {id:39, operator:"Rosalia Indah", transportasi:"bus", asal:"Surabaya", tujuan:"Jakarta", tanggal:"2026-10-15", keberangkatan:"16:00", kedatangan:"04:00", durasiMenit:720, harga:380000, kelas:"Eksekutif", kode:"RI-110"},
  {id:40, operator:"Sinar Jaya", transportasi:"bus", asal:"Jakarta", tujuan:"Bandung", tanggal:"2026-10-16", keberangkatan:"09:00", kedatangan:"12:30", durasiMenit:210, harga:130000, kelas:"Eksekutif", kode:"SJ-88"},
  {id:41, operator:"Pahala Kencana", transportasi:"bus", asal:"Bandung", tujuan:"Yogyakarta", tanggal:"2026-10-16", keberangkatan:"20:00", kedatangan:"04:30", durasiMenit:510, harga:240000, kelas:"Eksekutif", kode:"PK-92"},
  {id:42, operator:"Restu", transportasi:"bus", asal:"Surabaya", tujuan:"Bali", tanggal:"2026-10-16", keberangkatan:"18:00", kedatangan:"06:00", durasiMenit:720, harga:320000, kelas:"Eksekutif", kode:"RS-05"},
  {id:43, operator:"Tentrem", transportasi:"bus", asal:"Malang", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"07:00", kedatangan:"09:00", durasiMenit:120, harga:65000, kelas:"Ekonomi", kode:"TT-01"},
  {id:44, operator:"Sinar Jaya", transportasi:"bus", asal:"Surabaya", tujuan:"Malang", tanggal:"2026-10-15", keberangkatan:"14:00", kedatangan:"16:30", durasiMenit:150, harga:110000, kelas:"Eksekutif", kode:"SJ-77"},
  {id:45, operator:"KAI Ambarawa", transportasi:"kereta", asal:"Surabaya", tujuan:"Semarang", tanggal:"2026-10-15", keberangkatan:"07:00", kedatangan:"11:30", durasiMenit:270, harga:200000, kelas:"Eksekutif", kode:"KA-220"},
  {id:46, operator:"KAI Joglosemarkerto", transportasi:"kereta", asal:"Semarang", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"08:00", kedatangan:"11:00", durasiMenit:180, harga:150000, kelas:"Ekonomi", kode:"KA-221"},
  {id:47, operator:"Batik Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Semarang", tanggal:"2026-10-16", keberangkatan:"09:00", kedatangan:"10:10", durasiMenit:70, harga:680000, kelas:"Ekonomi", kode:"ID-6320"},
  {id:48, operator:"Lion Air", transportasi:"pesawat", asal:"Semarang", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"15:00", kedatangan:"16:10", durasiMenit:70, harga:620000, kelas:"Ekonomi", kode:"JT-561"},
  {id:49, operator:"Sinar Jaya", transportasi:"bus", asal:"Surabaya", tujuan:"Semarang", tanggal:"2026-10-15", keberangkatan:"21:00", kedatangan:"02:30", durasiMenit:330, harga:170000, kelas:"Eksekutif", kode:"SJ-210"},
  {id:50, operator:"KAI Prameks", transportasi:"kereta", asal:"Yogyakarta", tujuan:"Solo", tanggal:"2026-10-15", keberangkatan:"06:00", kedatangan:"07:00", durasiMenit:60, harga:15000, kelas:"Ekonomi", kode:"KA-301"},
  {id:51, operator:"Rosalia Indah", transportasi:"bus", asal:"Surabaya", tujuan:"Solo", tanggal:"2026-10-15", keberangkatan:"20:30", kedatangan:"02:00", durasiMenit:330, harga:190000, kelas:"Eksekutif", kode:"RI-120"},
  {id:52, operator:"Batik Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Solo", tanggal:"2026-10-16", keberangkatan:"13:00", kedatangan:"14:15", durasiMenit:75, harga:700000, kelas:"Ekonomi", kode:"ID-6330"},
  {id:53, operator:"Lion Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Medan", tanggal:"2026-10-16", keberangkatan:"08:00", kedatangan:"10:20", durasiMenit:140, harga:1250000, kelas:"Ekonomi", kode:"JT-970"},
  {id:54, operator:"Garuda Indonesia", transportasi:"pesawat", asal:"Jakarta", tujuan:"Medan", tanggal:"2026-10-16", keberangkatan:"16:00", kedatangan:"18:20", durasiMenit:140, harga:1890000, kelas:"Ekonomi", kode:"GA-180"},
  {id:55, operator:"Citilink", transportasi:"pesawat", asal:"Surabaya", tujuan:"Medan", tanggal:"2026-10-17", keberangkatan:"09:30", kedatangan:"12:30", durasiMenit:180, harga:1390000, kelas:"Ekonomi", kode:"QG-970"},
  {id:56, operator:"Lion Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Makassar", tanggal:"2026-10-16", keberangkatan:"10:00", kedatangan:"13:30", durasiMenit:210, harga:1350000, kelas:"Ekonomi", kode:"JT-990"},
  {id:57, operator:"Batik Air", transportasi:"pesawat", asal:"Surabaya", tujuan:"Makassar", tanggal:"2026-10-17", keberangkatan:"07:00", kedatangan:"10:30", durasiMenit:210, harga:1290000, kelas:"Ekonomi", kode:"ID-6360"},
  {id:58, operator:"KAI Bima", transportasi:"kereta", asal:"Malang", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"08:00", kedatangan:"10:30", durasiMenit:150, harga:200000, kelas:"Eksekutif", kode:"KA-320"},
  {id:59, operator:"KAI Ambarawa", transportasi:"kereta", asal:"Semarang", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"14:00", kedatangan:"18:30", durasiMenit:270, harga:200000, kelas:"Eksekutif", kode:"KA-222"},
  {id:60, operator:"KAI Prameks", transportasi:"kereta", asal:"Solo", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"05:30", kedatangan:"06:30", durasiMenit:60, harga:15000, kelas:"Ekonomi", kode:"KA-302"},
  {id:61, operator:"Nusantara", transportasi:"bus", asal:"Semarang", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"09:00", kedatangan:"14:30", durasiMenit:330, harga:170000, kelas:"Eksekutif", kode:"NS-31"},
  {id:62, operator:"Rosalia Indah", transportasi:"bus", asal:"Solo", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"07:30", kedatangan:"10:00", durasiMenit:150, harga:120000, kelas:"Eksekutif", kode:"RI-122"},
  {id:63, operator:"Eka", transportasi:"bus", asal:"Solo", tujuan:"Surabaya", tanggal:"2026-10-15", keberangkatan:"19:30", kedatangan:"01:00", durasiMenit:330, harga:190000, kelas:"Eksekutif", kode:"EK-09"},
  {id:64, operator:"Sinar Jaya", transportasi:"bus", asal:"Semarang", tujuan:"Yogyakarta", tanggal:"2026-10-15", keberangkatan:"08:00", kedatangan:"13:00", durasiMenit:300, harga:175000, kelas:"Eksekutif", kode:"SJ-211"},
  {id:65, operator:"Batik Air", transportasi:"pesawat", asal:"Malang", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"10:00", kedatangan:"11:30", durasiMenit:90, harga:720000, kelas:"Ekonomi", kode:"ID-6380"},
  {id:66, operator:"Lion Air", transportasi:"pesawat", asal:"Medan", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"09:00", kedatangan:"11:20", durasiMenit:140, harga:1250000, kelas:"Ekonomi", kode:"JT-971"},
  {id:67, operator:"Lion Air", transportasi:"pesawat", asal:"Makassar", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"14:30", kedatangan:"17:00", durasiMenit:150, harga:1350000, kelas:"Ekonomi", kode:"JT-991"},
  {id:68, operator:"Citilink", transportasi:"pesawat", asal:"Solo", tujuan:"Jakarta", tanggal:"2026-10-16", keberangkatan:"11:00", kedatangan:"12:15", durasiMenit:75, harga:660000, kelas:"Ekonomi", kode:"QG-253"},
  {id:69, operator:"Susi Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Bandung", tanggal:"2026-10-16", keberangkatan:"07:00", kedatangan:"07:50", durasiMenit:50, harga:450000, kelas:"Ekonomi", kode:"SI-101"},
  {id:70, operator:"Batik Air", transportasi:"pesawat", asal:"Jakarta", tujuan:"Malang", tanggal:"2026-10-16", keberangkatan:"13:00", kedatangan:"14:30", durasiMenit:90, harga:740000, kelas:"Ekonomi", kode:"ID-6381"}
];
const PROMOS = [
  {judul:"Diskon Pesawat 50%", judul_en:"50% Flight Discount", kat:"pesawat", kode:"HEMAT50", desc:"Potongan 50% maks Rp 500rb (demo).", desc_en:"50% off up to Rp 500k (demo).", img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80", periode:"s/d 31 Des 2026 (simulasi)"},
  {judul:"Liburan Hemat Bali", judul_en:"Budget Bali Holiday", kat:"destinasi", kode:"LUX20", desc:"Diskon 20% paket Bali (demo).", desc_en:"20% off Bali packages (demo).", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80", periode:"s/d 30 Nov 2026 (simulasi)"},
  {judul:"Explore Indonesia", judul_en:"Explore Indonesia", kat:"destinasi", kode:"EXPLORE15", desc:"Diskon 15% rute Labuan Bajo & Lombok.", desc_en:"15% off Labuan Bajo & Lombok routes.", img:"https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=700&q=80", periode:"s/d 31 Okt 2026 (simulasi)"},
  {judul:"Kereta Hemat 25%", judul_en:"25% Train Discount", kat:"kereta", kode:"KERETA25", desc:"Potongan 25% maks Rp 150rb (demo).", desc_en:"25% off up to Rp 150k (demo).", img:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=700&q=80", periode:"s/d 31 Okt 2026 (simulasi)"},
  {judul:"Bus Nyaman 10%", judul_en:"10% Comfy Bus", kat:"bus", kode:"BUS10", desc:"Potongan 10% semua bus (demo).", desc_en:"10% off all buses (demo).", img:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80", periode:"s/d 31 Des 2026 (simulasi)"}
];
const PROMO_DISKON = {HEMAT50:.5, LUX20:.2, EXPLORE15:.15, KERETA25:.25, BUS10:.1};

/* ---------- STORAGE ---------- */
/* 100% TANPA DATABASE: penyimpanan hanya di RAM sesi ini (reload = kembali baru). Bukan localStorage. */
const MEM={};
const load=(k,f)=> (k in MEM)? MEM[k] : f;
const save=(k,v)=>{ MEM[k]=v; };
/* Lapor-sendiri: error JS fatal langsung tampil sebagai banner (tidak ada lagi blank misterius) */
window.addEventListener("error",(e)=>{
  const w=$("#toastWrap"); if(!w||!e.message) return;
  const d=document.createElement("div"); d.className="toast err";
  d.textContent="⚠ Galat: "+e.message+" — coba reload halaman.";
  w.appendChild(d);
});
let tickets = DEFAULT_TICKETS.map((x,i)=>({...x,_idx:i})); // 70 struct tiket segar dari kode, tanpa database
let orders = []; // hanya hidup selama sesi ini
let lastResults = [];
let lastSortInfo = null, lastSearchInfo = null; // log algoritma manual untuk ditampilkan di UI
let state = { tab:"pesawat", from:"Surabaya", to:"Yogyakarta", date:"2026-10-15", pax:1, orderFilter:"semua" };
let currentTicket = null, promoAktif = null, payMethod = "QRIS", seatPicked = "-", favOnly = false;
/* Tampilkan hanya destinasi favorit (toggle) */
function renderHomeFav(){ const f=load("travelux_fav",[]);
  $$("#destGrid .dest").forEach(d=>{ d.style.display=(!favOnly||f.includes(d.dataset.cari))?"":"none"; });
  const ft=$("#favToggle"); if(ft) ft.classList.toggle("on",favOnly); }
/* ---------- FITUR v2: jam live, countdown, reveal, kursi, QR ---------- */
function jamLive(){ const el=$("#liveClock"); if(el) el.textContent=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}); }
function countdownPromo(){
  const el=$("#countdown"); if(!el) return;
  let sisa=(2*3600+14*60+9);
  setInterval(()=>{ sisa=Math.max(0,sisa-1);
    const h=String(Math.floor(sisa/3600)).padStart(2,"0"),m=String(Math.floor(sisa%3600/60)).padStart(2,"0"),s=String(sisa%60).padStart(2,"0");
    el.textContent=`${h}:${m}:${s}`; },1000);
}
function initReveal(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("show"); io.unobserve(e.target);} }),{threshold:.12});
  $$(".reveal,.sect").forEach(el=>{el.classList.add("reveal"); io.observe(el);});
}
function animasiAngka(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; io.unobserve(e.target);
    const target=+e.target.dataset.count, t0=performance.now();
    const step=(t)=>{ const p=Math.min(1,(t-t0)/1200); e.target.textContent=Math.round(target*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step); }),{threshold:.5});
  $$("[data-count]").forEach(el=>io.observe(el));
}
/* Kunci okupansi = tiket + tanggal. Batal = bebas lagi otomatis (dihitung dari order aktif). */
function kunciKursi(ord){ return ord.tiketId+"|"+ord.tanggal+"|"+ord.kursi; }
/* Layout kursi realistis per moda: pesawat 3-3 (120), kereta 3 gerbong 2-2 (144), bus 2-2 (48).
   Aisle (lorong) tampil di tengah; kode kursi unik per moda (1A..20F / G1-1A..G3-12D / 1A..12D). */
const SEAT_LAYOUT = {
  pesawat: [{ label:()=>t("seat_eco"), icon:"fa-plane", rows:20, cols:["A","B","C","D","E","F"], aisleAfter:3, kode:(r,c)=>r+c }],
  kereta: [1,2,3].map(g=>({ label:()=>t("seat_car")+" "+g, icon:"fa-train", rows:12, cols:["A","B","C","D"], aisleAfter:2, kode:(r,c)=>"G"+g+"-"+r+c })),
  bus: [{ label:()=>t("seat_bus"), icon:"fa-bus", rows:12, cols:["A","B","C","D"], aisleAfter:2, kode:(r,c)=>r+c }]
};
function daftarKursi(mod){
  const L=SEAT_LAYOUT[mod]||SEAT_LAYOUT.pesawat, out=[];
  L.forEach(g=>{ for(let r=1;r<=g.rows;r++) for(const c of g.cols) out.push(g.kode(r,c)); });
  return out;
}
function hashKursi(s){ let h=0; for(const ch of s) h=(h*31+ch.charCodeAt(0))>>>0; return h; }
/* Okupansi dasar ~10% — deterministik dari id tiket+tanggal+kursi (stabil, bukan acak tiap render) */
function kursiDasar(tk,d){
  const s=new Set(), dt=d||tk.tanggal;
  daftarKursi(tk.transportasi).forEach(k=>{ if(hashKursi(tk.id+"|"+dt+"|"+k)%10===0) s.add(k); });
  return s;
}
function kursiTerisi(){
  const s=new Set();
  if(currentTicket){ const d=state.date||currentTicket.tanggal; kursiDasar(currentTicket,d).forEach(k=>s.add(currentTicket.id+"|"+d+"|"+k)); }
  orders.forEach(o=>{ if(o.status!=="dibatalkan"&&o.kursi&&o.kursi!=="-") s.add(kunciKursi(o)); });
  return s;
}
function renderKursi(keep){
  const box=$("#seatMap"); if(!box||!currentTicket) return;
  const mod=currentTicket.transportasi||"pesawat";
  seatPicked=(typeof keep==="string"&&keep!=="-"&&daftarKursi(mod).includes(keep))?keep:"-";
  const spEl=$("#seatPicked"); if(spEl) spEl.textContent=seatPicked;
  const L=SEAT_LAYOUT[mod]||SEAT_LAYOUT.pesawat;
  const d=state.date||currentTicket.tanggal, dasar=kursiDasar(currentTicket,d), occ=kursiTerisi();
  const key=currentTicket.id+"|"+d+"|", labelTaken=lang==="id"?"Sudah dipesan orang lain":"Booked by someone else";
  box.innerHTML=L.map(g=>`
    <div class="seat-group"><div class="seat-group-head"><i class="fa-solid ${g.icon}"></i> ${g.label()}</div>
    ${Array.from({length:g.rows},(_,i)=>{ const r=i+1;
      return `<div class="seat-row"><span class="seat-rno">${r}</span>`+g.cols.map((c,ci)=>{
        const k=g.kode(r,c), busy=dasar.has(k)||occ.has(key+k);
        return `${ci===g.aisleAfter?'<span class="aisle" aria-hidden="true"></span>':""}<div class="seat${busy?" busy":""}" data-seat="${k}"${busy?` title="${labelTaken}"`:""}>${k}</div>`;
      }).join("")+"</div>"; }).join("")}</div>`).join("");
  if(seatPicked!=="-"){ const p=[...box.querySelectorAll(".seat")].find(x=>x.dataset.seat===seatPicked); if(p) p.classList.add("pick"); }
  box.querySelectorAll(".seat:not(.busy)").forEach(s=>s.onclick=()=>{
    box.querySelectorAll(".seat").forEach(x=>x.classList.remove("pick")); s.classList.add("pick");
    seatPicked=s.dataset.seat; const sp2=$("#seatPicked"); if(sp2) sp2.textContent=seatPicked; });
}
/* ---------- preloader, modal destinasi, badge termurah ---------- */
function initPreloader(){ setTimeout(()=>$("#loader")?.classList.add("hide"), 900); }
function initDestModal(){
  const m=$("#destModal"); if(!m) return;
  $("#dmTutup").onclick=()=>m.hidden=true; m.onclick=(e)=>{ if(e.target===m) m.hidden=true; };
  $("#dmCari").onclick=()=>{ m.hidden=true; state.to=$("#dmJudul").textContent; opt($("#sTujuan"),state.to); showPage("cari"); };
}
function bukaDestModal(kota){
  $("#dmImg").dataset.fbk=""; $("#dmImg").src=CITY_IMG[kota]||IMG_FALLBACK; $("#dmImg").alt=kota;
  $("#dmJudul").textContent=kota; $("#dmDesc").textContent=(lang==="en"?CITY_DESC_EN:CITY_DESC)[kota]||"";
  $("#dmHarga").textContent=t("dm_from")+" "+rupiah(120000+kota.length*40000);
  $("#destModal").hidden=false;
}
/* ---------- TOAST ---------- */
function toast(msg, type=""){
  const d=document.createElement("div"); d.className="toast "+type;
  const ic=type==="err"?"⛔":type==="info"?"💡":"✅";
  d.innerHTML=`<span style="font-size:1.1rem">${ic}</span><span></span>`;
  d.lastChild.textContent=msg;
  $("#toastWrap").appendChild(d); setTimeout(()=>{ d.style.opacity="0"; d.style.transition=".4s"; setTimeout(()=>d.remove(),400); },3000);
}
/* ---------- NAVIGASI ---------- */
function showPage(name){
  $$(".page").forEach(p=>p.classList.remove("active"));
  $("#page-"+name)?.classList.add("active");
  $$("#navLinks a").forEach(a=>a.classList.toggle("active",a.dataset.nav===name));
  $("#navLinks").classList.remove("open"); window.scrollTo({top:0});
  if(name==="pesanan") renderOrders();
  if(name==="beranda") renderHome();
  if(name==="tentang") renderDS();
  if(name==="cari"){
    $$("#searchTabs .tab").forEach(x=>x.classList.toggle("active",x.dataset.t===state.tab));
    opt($("#sAsal"),state.from); opt($("#sTujuan"),state.to);
    if(state.date) $("#sTanggal").value=state.date; setPax("sPax",state.pax||1);
    isiFilterOps();
    try{ jalankanPencarian(); }catch(err){ console.error(err); toast("Gagal memuat pencarian, coba lagi.","err"); }
  }
}
document.addEventListener("click",(e)=>{
  const n=e.target.closest("[data-nav]"); if(n){e.preventDefault(); showPage(n.dataset.nav);}
});
$("#burger").onclick=()=>$("#navLinks").classList.toggle("open");
/* 4 mode tema: cerah / gelap / ocean / sunset */
const THEMES=["light","dark","ocean","sunset"];
function applyTheme(name){
  if(!THEMES.includes(name)) name="light";
  document.documentElement.dataset.theme=name; save("travelux_theme",name);
  $$("#themeDrop [data-theme-val]").forEach(b=>b.classList.toggle("on",b.dataset.themeVal===name));
}
document.documentElement.dataset.theme="light";
$("#themeBtn").onclick=(e)=>{ e.stopPropagation(); $("#themeDrop").hidden=!$("#themeDrop").hidden; $("#notifDrop").hidden=true; };
/* ===== BAHASA ID/EN untuk turis internasional ===== */
let lang = load("travelux_lang","id");
const t = k => (STR[k] && STR[k][lang]) || k;
const STR = {
theme:{id:"Mode Tampilan",en:"Display Mode"}, th_light:{id:"Cerah",en:"Light"}, th_dark:{id:"Gelap",en:"Dark"}, th_ocean:{id:"Ocean",en:"Ocean"}, th_sunset:{id:"Sunset",en:"Sunset"},
nav_home:{id:"Beranda",en:"Home"}, nav_search:{id:"Cari Tiket",en:"Search"}, nav_orders:{id:"Pesanan Saya",en:"My Orders"}, nav_promo:{id:"Promo",en:"Promos"}, nav_about:{id:"Tentang",en:"About"},
hero_badge:{id:"Cinematic Luxury Travel Experience",en:"Cinematic Luxury Travel Experience"},
hero_h1:{id:"Jelajahi Dunia,<br>Pesan <span class=\"hl\">Perjalananmu.</span>",en:"Explore the World,<br>Book <span class=\"hl\">Your Journey.</span>"},
hero_p:{id:"Temukan tiket pesawat, kereta, dan bus dengan harga terbaik untuk liburan impianmu. <b>Jelajahi Dunia, Ciptakan Cerita.</b>",en:"Find the best flight, train, and bus tickets for your dream holiday. <b>Explore the World, Create Stories.</b>"},
hero_go:{id:"Mulai Petualangan",en:"Start Adventure"}, hero_promo:{id:"Lihat Promo",en:"View Promos"},
st_route:{id:"Rute Populer",en:"Popular Routes"}, st_happy:{id:"Traveler Puas",en:"Happy Travelers"}, st_rate:{id:"Rating Aplikasi",en:"App Rating"},
flash:{id:"Flash Sale 50%",en:"Flash Sale 50%"}, flash_mid:{id:"berakhir dalam",en:"ends in"}, flash_go:{id:"Klaim",en:"Claim"},
fl_bali:{id:"Pulau Dewata",en:"Island of Gods"}, fl_more:{id:"Explore More",en:"Explore More"}, fl_dest:{id:"destinasi",en:"destinations"},
f_from:{id:"Dari",en:"From"}, f_to:{id:"Ke",en:"To"}, f_date:{id:"Tanggal Berangkat",en:"Departure Date"}, f_pax:{id:"Penumpang",en:"Passengers"},
f_pax_hint:{id:"Jumlah orang yg ikut (maks 10)",en:"People joining (max 10)"},
search_btn:{id:"Cari Tiket",en:"Search"},
tr1t:{id:"Harga Terbaik",en:"Best Prices"}, tr1d:{id:"Jaminan harga termurah",en:"Cheapest-price guarantee"}, tr2t:{id:"Pembayaran Aman",en:"Secure Payment"}, tr2d:{id:"Transaksi 100% aman (simulasi)",en:"100% secure transaction (simulated)"}, tr3t:{id:"CS 24/7",en:"24/7 Support"}, tr3d:{id:"Siap membantu kapan saja",en:"Always ready to help"},
dest_h:{id:"Destinasi Populer",en:"Popular Destinations"}, dest_p:{id:"Jelajahi destinasi favorit dengan pemandangan yang memukau",en:"Explore favorite destinations with stunning views"}, fav_me:{id:"♥ Favorit saya (",en:"♥ My favorites ("},
promo_h:{id:"Promo Spesial",en:"Special Promos"}, promo_p:{id:"Penawaran demonstrasi — bukan diskon nyata",en:"Demo offers — not real discounts"}, promo_all:{id:"Lihat Semua →",en:"View All →"},
rec_h:{id:"Rekomendasi Tiket",en:"Recommended Tickets"}, rec_p:{id:"Pilihan populer minggu ini (data simulasi)",en:"This week popular picks (simulated data)"},
feat_h:{id:"Kenapa TRAVELUX?",en:"Why TRAVELUX?"},
ft1t:{id:"Pencarian Praktis",en:"Easy Search"}, ft1d:{id:"Filter pesawat, kereta, dan bus dalam satu genggaman.",en:"Filter flights, trains, and buses in one hand."},
ft2t:{id:"Info Tiket Jelas",en:"Clear Ticket Info"}, ft2d:{id:"Jadwal, durasi, transit, dan bagasi tampil transparan.",en:"Schedules, duration, transit, and baggage shown transparently."},
ft3t:{id:"Pemesanan Mudah",en:"Easy Booking"}, ft3d:{id:"Checkout 3 langkah dengan kode booking unik otomatis.",en:"3-step checkout with automatic unique booking code."},
ft4t:{id:"Tanpa Database",en:"No Database"}, ft4d:{id:"Semua data hanya di sesi ini — reload kembali baru, tanpa database.",en:"All data lives in this session only — reload starts fresh, no database."},
tes_h:{id:"Kata Mereka ✦",en:"Travelers Say ✦"}, tes_p:{id:"Testimoni traveler (data demonstrasi)",en:"Traveler testimonials (demo data)"},
tes1:{id:"\"Checkout 2 menit, e-ticket langsung jadi. Desainnya kayak aplikasi travel beneran!\"",en:"\"2-minute checkout, instant e-ticket. The design feels like a real travel app!\""},
tes2:{id:"\"Filter lengkap dan harganya transparan. Desainnya kayak startup beneran.\"",en:"\"Complete filters and transparent prices. Feels like a real startup.\""},
tes3:{id:"\"Dark mode + tiket perforasi-nya mewah. Batal & refund simulasi gampang.\"",en:"\"The dark mode and perforated tickets look premium. Cancellation is easy.\""},
faq_h:{id:"❓ FAQ Singkat",en:"❓ Quick FAQ"},
fq1q:{id:"Apakah ini tiket sungguhan?",en:"Are these real tickets?"}, fq1a:{id:"Tidak. Semua jadwal, harga & promo adalah simulasi untuk demo tugas Struktur Data.",en:"No. All schedules, prices & promos are simulated for a class demo."},
fq2q:{id:"Apakah data saya disimpan?",en:"Is my data stored?"}, fq2a:{id:"Tidak. Tanpa database — semua hilang saat reload, jadi privasimu aman.",en:"No. No database — everything vanishes on reload, so your privacy is safe."},
fq3q:{id:"Bagaimana urutan harga bekerja?",en:"How does price sorting work?"}, fq3a:{id:"Bubble Sort manual mengurutkan semua mode (Termurah, Termahal, Awal, Tercepat) di belakang layar — hasil selalu tampil urut tanpa kamu pikirkan.",en:"A manual Bubble Sort orders every mode (Cheapest, Priciest, Earliest, Fastest) behind the scenes — results always come out sorted."},
 fq4q:{id:"Di mana log sorting & searching?",en:"Where are the sorting & searching logs?"}, fq4a:{id:"Sengaja disembunyikan agar tampilan tetap bersih — algoritmanya tetap jalan di belakang layar. Tekan Ctrl+Shift+L (atau buka ?debug=1) untuk memunculkan Log Bubble Sort, Log Linear Search, dan panel Struktur Data.",en:"They're intentionally hidden to keep the UI clean — the algorithms still run behind the scenes. Press Ctrl+Shift+L (or open ?debug=1) to reveal the Bubble Sort Log, Linear Search Log, and the Data Structure panel."},
news_h:{id:"✉ Dapatkan Promo (demo)",en:"✉ Get Promos (demo)"}, news_p:{id:"Contoh newsletter — tidak mengirim email sungguhan.",en:"Sample newsletter — sends no real email."}, news_btn:{id:"Langganan",en:"Subscribe"}, news_ph:{id:"email@contoh.com",en:"email@example.com"},
cta_h:{id:"Jadikan Setiap Perjalananmu Cerita Indah ♡",en:"Make Every Journey a Beautiful Story ♡"}, cta_btn:{id:"Cari Tiket Sekarang",en:"Search Tickets Now"},
cari_h:{id:"Cari Tiket Terbaik untuk Perjalananmu",en:"Find the Best Tickets for Your Trip"},
mini_date:{id:"Tanggal",en:"Date"}, mini_hint:{id:"💡 <b>Penumpang</b> = jumlah orang yang ikut perjalanan ini. Atur 1–10 orang, harga total menyesuaikan otomatis.",en:"💡 <b>Passengers</b> = people joining this trip. Set 1–10 people, total price adjusts automatically."},
mini_go:{id:"Cari",en:"Go"}, mini_edit:{id:"Ubah",en:"Edit"},
flt:{id:"Filter",en:"Filter"}, flt_reset:{id:"Reset",en:"Reset"}, flt_price:{id:"Kisaran Harga",en:"Price Range"}, flt_op:{id:"Maskapai / Operator",en:"Airline / Operator"}, flt_time:{id:"Waktu Berangkat",en:"Departure Time"}, flt_sort:{id:"Urutkan",en:"Sort by"},
flt_note:{id:"🚂🚌 Kereta & bus melayani Jawa–Bali; luar itu naik pesawat (simulasi).",en:"🚂🚌 Trains & buses serve Java–Bali; beyond that fly (simulated)."},
sort_murah:{id:"Harga Termurah",en:"Cheapest"}, sort_mahal:{id:"Harga Termahal",en:"Priciest"}, sort_awal:{id:"Keberangkatan Paling Awal",en:"Earliest Departure"}, sort_cepat:{id:"Durasi Tercepat",en:"Fastest Duration"},
w_pagi:{id:"Pagi (06–12)",en:"Morning (06–12)"}, w_siang:{id:"Siang (12–17)",en:"Midday (12–17)"}, w_malam:{id:"Malam (17–24)",en:"Night (17–24)"},
unit_tiket:{id:"tiket",en:"tickets"}, chip_filter:{id:"Filter aktif",en:"Filters on"},
empty_h:{id:"Tidak ada tiket ditemukan",en:"No tickets found"}, empty_p:{id:"Coba ubah rute, tanggal, atau reset filter.",en:"Try another route, date, or reset filters."}, empty_btn:{id:"Reset Filter",en:"Reset Filters"},
d_back:{id:"← Kembali ke Hasil Pencarian",en:"← Back to Search Results"},
d_info:{id:"Detail Perjalanan",en:"Trip Details"}, d_form:{id:"Form Pemesanan",en:"Booking Form"},
d_nama:{id:"Nama Pemesan *",en:"Booker Name *"}, d_nik:{id:"NIK (16 digit) *",en:"ID Number (16 digits) *"}, d_email:{id:"Email *",en:"Email *"}, d_telp:{id:"No. Telepon (opsional)",en:"Phone (optional)"}, d_pax:{id:"Jumlah Penumpang",en:"Passengers"}, d_note:{id:"Catatan (opsional)",en:"Notes (optional)"},
d_seat:{id:"Pilih Kursi (simulasi)",en:"Choose Seat (simulated)"}, d_seatpick:{id:"Kursi terpilih:",en:"Selected seat:"}, d_seatfree:{id:"• Gratis, hanya demo",en:"• Free, demo only"},
lg_free:{id:"Kosong",en:"Free"}, lg_pick:{id:"Pilihanmu",en:"Yours"}, lg_busy:{id:"Terisi",en:"Taken"},
d_price:{id:"Ringkasan Harga",en:"Price Summary"}, d_promo:{id:"Kode Promo (demo: HEMAT50 / LUX20)",en:"Promo Code (demo: HEMAT50 / LUX20)"}, d_use:{id:"Pakai",en:"Apply"}, d_paym:{id:"Metode Pembayaran (simulasi)",en:"Payment Method (simulated)"},
d_bag:{id:"Bagasi 20 kg (contoh)",en:"20 kg baggage (sample)"}, d_sim:{id:"⚠ Data tiket bersifat simulasi untuk demo tugas, bukan jadwal transportasi real-time.",en:"⚠ Ticket data is simulated for a class demo, not real-time schedules."},
k_s1:{id:"1 Pilih",en:"1 Choose"}, k_s2:{id:"2 Data",en:"2 Details"}, k_s3:{id:"3 Bayar",en:"3 Pay"}, k_s4:{id:"4 Selesai",en:"4 Done"},
k_ok:{id:"Pesanan Berhasil!",en:"Booking Successful!"}, k_p:{id:"Tiket perjalanan Anda telah dibuat. Detail e-ticket di bawah ini.",en:"Your trip ticket has been created. E-ticket details below."},
k_view:{id:"Lihat Semua Pesanan",en:"View All Orders"}, k_my:{id:"Pesanan Saya",en:"My Orders"}, k_home:{id:"Beranda",en:"Home"}, k_exp:{id:"Export .txt",en:"Export .txt"}, k_print:{id:"Cetak",en:"Print"}, k_mail:{id:"E-ticket telah dikirim ke email Anda (simulasi).",en:"E-ticket has been sent to your email (simulated)."},
k_scan:{id:"Scan saat boarding (simulasi)",en:"Scan when boarding (simulated)"}, k_show:{id:"Tunjukkan layar ini saat check-in (demo).",en:"Show this screen at check-in (demo)."},
o_h:{id:"Pesanan Saya",en:"My Orders"}, o_p:{id:"Kelola pesanan sesi ini (hilang saat reload — tanpa database).",en:"Manage this session's orders (gone on reload — no database)."},
o_searchph:{id:"🔍 Cari kode booking…",en:"🔍 Search booking code…"},
o_empty_h:{id:"Belum ada pesanan",en:"No orders yet"}, o_empty_p:{id:"Mulai petualangan pertamamu sekarang!",en:"Start your first adventure now!"},
pr_h:{id:"Promo Spesial Buat Kamu ✈",en:"Special Promos For You ✈"}, pr_p:{id:"Semua promo adalah data demonstrasi & periode simulasi.",en:"All promos are demo data & simulated periods."},
ab_badge:{id:"Tentang Kami",en:"About Us"}, ab_h:{id:"TRAVELUX — More Journey, More Story.",en:"TRAVELUX — More Journey, More Story."},
ab_p:{id:"<b>TRAVELUX</b> adalah proyek individu mata kuliah <b>Struktur Data</b> (tema NIM Genap: Ticketing). Aplikasi web pemesanan tiket pesawat, kereta, dan bus yang berjalan 100% di browser <b>tanpa database</b> — tanpa backend.",en:"<b>TRAVELUX</b> is an individual <b>Data Structures</b> course project (Ticketing theme). A flight, train, and bus booking web app running 100% in the browser with <b>no database</b> — no backend."},
ab_l1:{id:"Pencarian pesawat, kereta & bus dalam satu aplikasi",en:"Flight, train & bus search in one app"}, ab_l2:{id:"Filter harga, operator & jam + urutan otomatis",en:"Price, operator & time filters + auto sorting"}, ab_l3:{id:"Tanpa database: reload kembali baru, privasi aman",en:"No database: reload starts fresh, privacy safe"},
ab_dev:{id:"Pengembang: Mahasiswa Demo",en:"Developer: Demo Student"},
qop_ph:{id:"Ketik operator / kode / kota…",en:"Type operator / code / city…"},
sortlog_h:{id:"Log Bubble Sort (manual)",en:"Bubble Sort Log (manual)"}, sortlog_p:{id:"Hasil di bawah diurutkan dengan Bubble Sort buatan sendiri — setiap banding & tukar dicatat.",en:"Results below are sorted with a hand-written Bubble Sort — every compare & swap is logged."},
searchlog_h:{id:"Log Linear Search (manual)",en:"Linear Search Log (manual)"}, searchlog_p:{id:"Pencarian cepat memeriksa array satu per satu dari indeks 0.",en:"Quick search checks the array one by one from index 0."},
daily_note:{id:"🗓️ Jadwal harian — tiket tersedia di tanggal mana pun (simulasi)",en:"🗓️ Daily schedule — tickets available on any date (simulated)"},
ds_h:{id:"🧠 Struktur Data di Balik TRAVELUX",en:"🧠 Data Structures Behind TRAVELUX"},
ds_p:{id:"Bukan sekadar tampilan — ini bukti Array, Struct, Pointer, Sorting, dan Searching yang benar-benar dipakai aplikasi.",en:"Not just visuals — real Array, Struct, Pointer, Sorting, and Searching used by the app."},
ds_array_t:{id:"Array of Struct",en:"Array of Struct"}, ds_array_d:{id:"70 tiket disimpan berurutan di satu array. Setiap kartu menampilkan Array[n] sebagai indeks aslinya.",en:"70 tickets stored sequentially in one array. Each card shows Array[n] as its original index."},
ds_struct_t:{id:"Struct Tiket",en:"Ticket Struct"}, ds_struct_d:{id:"Satu tiket = satu struct dengan field id, operator, asal, tujuan, harga, dan lainnya.",en:"One ticket = one struct with id, operator, origin, destination, price, and more."},
ds_ptr_t:{id:"Pointer / Reference",en:"Pointer / Reference"}, ds_ptr_d:{id:"currentTicket menunjuk struct yang dipilih. JavaScript memakai reference (bukan alamat memori mentah), jadi perubahan objek ikut terlihat.",en:"currentTicket points to the selected struct. JavaScript uses references (not raw memory addresses), so object changes are visible."},
ds_live:{id:"Panel Live — Pointer Aktif",en:"Live Panel — Active Pointer"}, ds_c_label:{id:"Total tiket",en:"Total tickets"}, ds_r_label:{id:"Rute unik",en:"Unique routes"}, ds_o_label:{id:"Pesanan sesi",en:"Session orders"},
ds_hint:{id:"Klik “Pilih Tiket” di halaman Cari, lalu buka Tentang untuk melihat pointer berpindah.",en:"Click “Choose” on the Search page, then open About to watch the pointer move."},
ft_p:{id:"Jelajahi Dunia, Ciptakan Cerita. Platform demo pemesanan tiket untuk tugas Struktur Data.",en:"Explore the World, Create Stories. A demo ticket-booking platform for a Data Structures assignment."},
ft_nav:{id:"Navigasi",en:"Navigation"}, ft_help:{id:"Bantuan",en:"Help"}, ft_contact:{id:"Kontak Contoh",en:"Sample Contact"},
ft_home:{id:"Beranda",en:"Home"}, ft_search:{id:"Cari Tiket",en:"Search"}, ft_about:{id:"Tentang Kami",en:"About Us"},
dm_close:{id:"Tutup",en:"Close"}, dm_go:{id:"Cari Tiket ke sini",en:"Search tickets here"}, dm_from:{id:"Mulai dari",en:"From"},
pf_h:{id:"Profil Penumpang (demo lokal)",en:"Passenger Profile (local demo)"}, pf_nama:{id:"Nama",en:"Name"}, pf_email:{id:"Email",en:"Email"}, pf_save:{id:"Simpan",en:"Save"}, pf_close:{id:"Tutup",en:"Close"},
g_yes:{id:"Ya",en:"Yes"}, g_no:{id:"Batal",en:"Cancel"},
confirm_cancel:{id:"Batalkan pesanan",en:"Cancel order"},
pay_within:{id:"Selesaikan dalam",en:"Complete within"}, pay_done:{id:"Saya Sudah Bayar",en:"I Have Paid"},
bnama_ph:{id:"Contoh: Budi Santoso",en:"Example: Budi Santoso"},
nt1:{id:"🎉 Flash Sale 50% s/d 31 Des 2026 (demo)",en:"🎉 Flash Sale 50% until Dec 31, 2026 (demo)"},
nt2:{id:"✈ Rute baru: Bali → Labuan Bajo",en:"✈ New route: Bali → Labuan Bajo"},
nt3:{id:"🎫 E-ticket + QR boarding sudah tersedia",en:"🎫 E-ticket + boarding QR now available"},
err_nama:{id:"Nama pemesan minimal 3 huruf!",en:"Booker name needs at least 3 letters!"},
err_nik:{id:"NIK harus tepat 16 digit angka! Cek KTP/KK kamu.",en:"ID number must be exactly 16 digits! Check your ID card."},
err_email:{id:"Format email tidak valid!",en:"Invalid email format!"},
err_seat:{id:"Pilih kursi dulu ya!",en:"Please choose a seat first!"},
s_from:{id:"Mulai dari",en:"From"},
ord_cancel:{id:"Batalkan",en:"Cancel"}, ord_detail_b:{id:"Berhasil",en:"Confirmed"},
st_menunggu:{id:"Menunggu konfirmasi",en:"Pending"}, st_berhasil:{id:"Berhasil",en:"Confirmed"}, st_dibatalkan:{id:"Dibatalkan",en:"Cancelled"},
tk_direct:{id:"Langsung",en:"Direct"}, tk_per:{id:"/penumpang",en:"/person"}, tk_choose:{id:"Pilih Tiket",en:"Choose"}, tk_cheap:{id:"★ TERMURAH",en:"★ CHEAPEST"}, tk_rank:{id:"peringkat #",en:"rank #"},
kv_op:{id:"Maskapai/Operator",en:"Airline/Operator"}, kv_no:{id:"Nomor",en:"Number"}, kv_dep:{id:"Berangkat",en:"Depart"}, kv_arr:{id:"Tiba",en:"Arrive"}, kv_class:{id:"Kelas",en:"Class"}, kv_bag:{id:"Bagasi",en:"Baggage"},
bp_pax:{id:"PENUMPANG",en:"PASSENGER"}, bp_nik:{id:"NIK",en:"ID NO"}, bp_date:{id:"TANGGAL",en:"DATE"}, bp_seat:{id:"KURSI",en:"SEAT"}, bp_gate:{id:"GATE",en:"GATE"}, bp_board:{id:"BOARDING",en:"BOARDING"}, bp_class:{id:"KELAS",en:"CLASS"}, bp_px:{id:"PAX",en:"PAX"}, bp_pay:{id:"BAYAR",en:"PAY"}, bp_tag:{id:"BOARDING PASS",en:"BOARDING PASS"},
 seat_eco:{id:"Kabin Ekonomi",en:"Economy Cabin"}, seat_car:{id:"Gerbong",en:"Carriage"}, seat_bus:{id:"Bus",en:"Bus"},
 ord_qr:{id:"QR & kode batang boarding",en:"Boarding QR & barcode"}, ord_qr_off:{id:"QR disembunyikan — pesanan sudah dibatalkan.",en:"QR hidden — this order was cancelled."},
 dl_png:{id:"Unduh PNG",en:"Download PNG"}, dl_pdf:{id:"Unduh PDF",en:"Download PDF"},
 dl_wait:{id:"Menyiapkan file tiket…",en:"Preparing the ticket file…"},
 dl_off:{id:"Ekspor PNG/PDF butuh internet (CDN). Memakai dialog Cetak sebagai cadangan.",en:"PNG/PDF export needs internet (CDN). Using the Print dialog as fallback."},
 dl_ok_png:{id:"Tiket PNG terunduh!",en:"PNG ticket downloaded!"}, dl_ok_pdf:{id:"Tiket PDF terunduh!",en:"PDF ticket downloaded!"},
 dl_fail:{id:"Ekspor PDF gagal — memakai dialog Cetak.",en:"PDF export failed — using the Print dialog."},
};
const TAB_T={pesawat:{id:"Pesawat",en:"Flights"},kereta:{id:"Kereta Api",en:"Trains"},bus:{id:"Bus",en:"Buses"}};
const CAT_C={semua:{id:"Semua",en:"All"},pesawat:{id:"Pesawat",en:"Flights"},kereta:{id:"Kereta",en:"Trains"},bus:{id:"Bus",en:"Buses"},destinasi:{id:"Destinasi",en:"Destinations"}};
const ST_S={semua:{id:"Semua",en:"All"},menunggu:{id:"Menunggu",en:"Pending"},berhasil:{id:"Berhasil",en:"Confirmed"},dibatalkan:{id:"Dibatalkan",en:"Cancelled"}};
const CITY_DESC_EN={"Bali":"Island of Gods, beaches & culture.","Yogyakarta":"Temples, food, and arts.","Jakarta":"Energetic capital city.","Bandung":"Cool city of flowers.","Surabaya":"City of Heroes.","Malang":"Bromo & cool highlands.","Lombok":"Exotic beaches & Rinjani.","Labuan Bajo":"Gateway to Komodo.","Semarang":"Lawang Sewu & old town.","Solo":"Legendary palace & batik.","Medan":"Maimun Palace & cuisine.","Makassar":"Losari Beach & Fort Rotterdam."};
/* Fallback global anti-broken-image: sekali gagal -> placeholder gradasi (tidak pernah tampil ikon rusak) */
const IMG_FALLBACK = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#061B38"/><stop offset=".55" stop-color="#073B73"/><stop offset="1" stop-color="#1677FF"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><text x="300" y="190" font-size="64" text-anchor="middle" fill="#fff" opacity=".9">✈</text><text x="300" y="240" font-size="24" text-anchor="middle" fill="#9fd8ff" font-family="sans-serif">TRAVELUX</text></svg>`);
document.addEventListener("error", (e) => {
  const t = e.target;
  if (t && t.tagName === "IMG" && !t.dataset.fbk) { t.dataset.fbk = "1"; t.src = IMG_FALLBACK; }
}, true);

  $("#avatarBtn").onclick=()=>{ const p=load("travelux_profil",{nama:"",email:""}); $("#pNama").value=p.nama; $("#pEmail").value=p.email; $("#profilModal").hidden=false; };
$("#toTop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
window.onscroll=()=>{
  $("#toTop").style.display=window.scrollY>500?"block":"none";
  const h=document.documentElement, p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
  const bar=$("#progress"); if(bar) bar.style.width=(p*100)+"%";
};
document.addEventListener("keydown",(e)=>{ if(e.key!=="Escape") return;
  ["payModal","genModal","destModal","profilModal"].forEach(id=>{ const m=$("#"+id); if(m) m.hidden=true; });
  stopPayTimer(); const n=$("#notifDrop"),td=$("#themeDrop"); if(n) n.hidden=true; if(td) td.hidden=true;
});

/* ---------- STRUKTUR DATA: Bubble Sort & Linear Search manual (log ditampilkan di UI) ---------- */
const L=(id,en)=> lang==="en"?en:id;
const escTxt=(s)=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function fmtSort(v,key){ return key==="harga"?rupiah(v):key==="durasiMenit"?durasi(v):String(v); }
/* Bubble Sort manual: salinan array of struct, catat setiap banding & tukar */
function bubbleSortManual(arr,key,dir){
  const a=arr.slice(); const log=[]; let cmp=0, swap=0;
  const t0=performance.now(), n=a.length, ASC=dir!=="desc";
  for(let i=0;i<n-1;i++){
    let swapped=false;
    log.push({k:"pass",txt:`${L("Putaran","Pass")} ${i+1} • ${L("cek","check")} ${n-1-i} ${L("pasangan","pairs")}`});
    for(let j=0;j<n-1-i;j++){
      cmp++;
      const va=a[j][key], vb=a[j+1][key];
      let bad;
      if(key==="keberangkatan"){ const c=String(va).localeCompare(String(vb)); bad=ASC?c>0:c<0; }
      else bad=ASC?va>vb:va<vb;
      if(bad){
        const oa=a[j].operator, ob=a[j+1].operator, sa=fmtSort(va,key), sb=fmtSort(vb,key);
        [a[j],a[j+1]]=[a[j+1],a[j]]; swap++; swapped=true;
        log.push({k:"swp",txt:`${L("tukar","swap")} [${j}] ↔ [${j+1}] • ${oa} ${sa} ⇄ ${ob} ${sb}`});
      } else {
        log.push({k:"cmp",txt:`${L("banding","compare")} [${j}] ${a[j].operator} ${fmtSort(va,key)} vs ${a[j+1].operator} ${fmtSort(vb,key)} → ${L("tetap","keep")}`});
      }
    }
    if(!swapped){ log.push({k:"stop",txt:`${L("Putaran","Pass")} ${i+1}: ${L("tidak ada tukar → berhenti dini","no swaps → early stop")}`}); break; }
  }
  return {sorted:a,log,cmp,swap,ms:performance.now()-t0,n};
}
/* Linear/Sequential Search manual: periksa array satu per satu dari indeks 0 */
function linearSearchManual(arr,q){
  const needle=String(q).toLowerCase().trim(), found=[], log=[];
  const t0=performance.now();
  for(let i=0;i<arr.length;i++){
    const x=arr[i];
    const hay=(x.operator+" "+x.kode+" "+x.asal+" "+x.tujuan).toLowerCase();
    const ok=hay.includes(needle);
    log.push({k:ok?"ok":"cmp",txt:`[${i}] ${x.operator} ${x.kode} • ${x.asal}→${x.tujuan} → ${ok?L("COCOK","MATCH"):L("tidak cocok","no match")}`});
    if(ok) found.push(x);
  }
  return {found,log,checked:arr.length,ms:performance.now()-t0,q};
}
/* Render konsol log sorting (dibatasi 90 baris agar tetap ringan) */
function renderSortLog(){
  const box=$("#sortLog"), body=$("#sortLogBody"), sum=$("#sortLogSum");
  if(!box) return;
  if(!lastSortInfo||lastSortInfo.n===0){ box.hidden=true; return; }
  box.hidden=false;
  const s=lastSortInfo;
  if(sum) sum.innerHTML=`<span class="ds-pill">${s.n} ${L("data","items")}</span><span class="ds-pill">${s.cmp} ${L("banding","compares")}</span><span class="ds-pill">${s.swap} ${L("tukar","swaps")}</span><span class="ds-pill">${s.ms.toFixed(1)} ms</span><span class="ds-pill algo">O(n²)</span>`;
  const rows=s.log.slice(0,90).map(r=>`<div class="logrow ${r.k}">${escTxt(r.txt)}</div>`).join("");
  if(body) body.innerHTML=rows+(s.log.length>90?`<div class="logmore">… ${s.log.length-90} ${L("langkah lain (dibatasi agar ringan)","more steps (capped for performance)")}</div>`:"");
}
/* Render konsol log searching */
function renderSearchLog(){
  const box=$("#searchLog"), body=$("#searchLogBody"), sum=$("#searchLogSum");
  if(!box) return;
  if(!lastSearchInfo||!lastSearchInfo.q){ box.hidden=true; if(body) body.innerHTML=""; return; }
  box.hidden=false;
  const s=lastSearchInfo;
  if(sum) sum.innerHTML=`“${escTxt(s.q)}” • <span class="ds-pill ok">${s.found.length} ${L("cocok","matches")}</span><span class="ds-pill">${s.checked} ${L("diperiksa","checked")}</span><span class="ds-pill">${s.ms.toFixed(2)} ms</span><span class="ds-pill algo">O(n)</span>`;
  const rows=s.log.slice(0,60).map(r=>`<div class="logrow ${r.k}">${escTxt(r.txt)}</div>`).join("");
  if(body) body.innerHTML=rows+(s.log.length>60?`<div class="logmore">… ${s.log.length-60} ${L("baris lain","more rows")}</div>`:"");
}
/* Panel bukti Array / Struct / Pointer di halaman Tentang */
function renderDS(){
  const el=$("#dsCurrent"); if(!el) return;
  const x=currentTicket, sample=x||tickets[0];
  el.innerHTML = x
    ? `<span class="tok">currentTicket</span> <span class="tok-arrow">→</span> <span class="tok-id">Tiket[${x._idx}]</span> <span class="tok-arrow">→</span> <span class="tok-key">id</span> ${x.id} • <b>${escTxt(x.operator)}</b> • ${escTxt(x.asal)} → ${escTxt(x.tujuan)} • ${rupiah(x.harga)}`
    : `<span class="tok">currentTicket</span> = <b>null</b> <span class="muted">— ${L("pilih tiket di halaman Cari untuk melihat pointer aktif","pick a ticket on the Search page to see the live pointer")}</span>`;
  const c=$("#dsCount"); if(c) c.textContent=tickets.length;
  const r=$("#dsRoutes"); if(r) r.textContent=new Set(tickets.map(v=>v.asal+"→"+v.tujuan)).size;
  const o=$("#dsOrders"); if(o) o.textContent=orders.length;
  const st=$("#dsStructSample");
  if(st&&sample) st.textContent=`{ id:${sample.id}, operator:"${sample.operator}", transportasi:"${sample.transportasi}", asal:"${sample.asal}", tujuan:"${sample.tujuan}", harga:${sample.harga} }`;
}

/* pencarian tiket: filter rute + tanggal + operator + waktu + harga */
function cariTiket(){
  let h=tickets.filter(t=>t.transportasi===state.tab);
  if(state.from) h=h.filter(t=>t.asal===state.from);
  if(state.to) h=h.filter(t=>t.tujuan===state.to);
  const min=+$("#fMin").value||0, max=+$("#fMax").value||Infinity;
  h=h.filter(t=>t.harga>=min&&t.harga<=max&&t.harga<=+$("#fRange").value);
  const ops=[...$$("#fOps input:checked")].map(c=>c.value);
  if(ops.length) h=h.filter(t=>ops.includes(t.operator));
  const times=[...$$(".fTime:checked")].map(c=>c.value);
  if(times.length) h=h.filter(t=>{const jam=+t.keberangkatan.split(":")[0];
    return times.some(w=>w==="pagi"?jam>=6&&jam<12:w==="siang"?jam>=12&&jam<17:jam>=17);});
  const mode=$("#sortSel").value;
  let key="harga", dir="asc";
  if(mode==="termahal"){ dir="desc"; }
  else if(mode==="awal"){ key="keberangkatan"; }
  else if(mode==="cepat"){ key="durasiMenit"; }
  lastSortInfo=bubbleSortManual(h,key,dir); lastSortInfo.mode=mode;
  return lastSortInfo.sorted;
}
function durasi(t){const h=Math.floor(t/60),m=t%60;return h?`${h}j ${m}m`:`${m}m`;}
/* Daftar filter yang sedang aktif (jujur ke pengguna) */
function infoFilter(){
  const out=[]; const EN=lang==="en";
  if($("#fMin").value) out.push("Min "+rupiah(+$("#fMin").value||0));
  if($("#fMax").value) out.push((EN?"Max ":"Maks ")+rupiah(+$("#fMax").value||0));
  if(+$("#fRange").value<3000000) out.push((EN?"Slider max ":"Slider maks ")+rupiah(+$("#fRange").value));
  const nOp=$$("#fOps input:checked").length, nTm=$$(".fTime:checked").length;
  if(nOp) out.push((EN?"Operators: ":"Operator: ")+nOp);
  if(nTm) out.push((EN?"Times: ":"Jam: ")+nTm);
  return out;
}

/* ---------- RENDER: BERANDA ---------- */
function opt(el, val){ el.innerHTML=CITIES.map(c=>`<option ${c===val?"selected":""}>${c}</option>`).join(""); }
function renderHome(){
  const dest=$("#destGrid"); if(!dest) return;
  const favs=load("travelux_fav",[]);
  $("#favCount").textContent=favs.length;
  const CITY_RATE = {"Bali":"4.9","Yogyakarta":"4.8","Jakarta":"4.6","Bandung":"4.7","Surabaya":"4.7","Malang":"4.8","Lombok":"4.9","Labuan Bajo":"5.0","Semarang":"4.7","Solo":"4.8","Medan":"4.7","Makassar":"4.8"};
  dest.innerHTML=CITIES.map(c=>`
    <div class="dest" data-cari="${c}">
      <img src="${CITY_IMG[c]}" alt="Destinasi ${c}" loading="lazy">
      <div class="ov"></div>
      <button class="fav ${favs.includes(c)?"on":""}" data-fav="${c}" title="Favorit">♥</button>
      <span class="rate">★ ${CITY_RATE[c]||"4.7"}</span>
      <div class="dt"><b>${c}</b><p>${(lang==="en"?CITY_DESC_EN:CITY_DESC)[c]}</p><span class="pr">${t("dm_from")} ${rupiah(120000+ c.length*40000)}</span>${["Surabaya","Semarang","Solo","Medan","Makassar"].includes(c)?'<small class="credit">Foto: Wikimedia Commons (CC BY-SA)</small>':""}</div>
    </div>`).join("");
  dest.querySelectorAll("[data-cari]").forEach(d=>d.onclick=(e)=>{
    if(e.target.dataset.fav) return;
    bukaDestModal(d.dataset.cari);
  });
  dest.querySelectorAll("[data-fav]").forEach(b=>b.onclick=(e)=>{
    e.stopPropagation(); let f=load("travelux_fav",[]);
    f=f.includes(b.dataset.fav)?f.filter(x=>x!==b.dataset.fav):[...f,b.dataset.fav];
    save("travelux_fav",f); toast(lang==="id"?"Favorit diperbarui ♥":"Favorites updated ♥"); renderHome();
  });
  const rec=[...tickets.filter(t=>t.transportasi==="pesawat")].sort((a,b)=>a.harga-b.harga).slice(0,3);
  $("#recGrid").innerHTML=rec.map(rt=>`
    <div class="rec"><div class="rh"><span class="op">${rt.operator}</span><span class="badge-c">${lang==="id"?"Rekomendasi":"Recommended"}</span></div>
    <div class="tm"><div><b>${rt.keberangkatan}</b><br><small>${rt.asal.slice(0,3).toUpperCase()}</small></div>
    <span class="rline"></span><small>${durasi(rt.durasiMenit)}</small><span class="rline"></span>
    <div style="text-align:right"><b>${rt.kedatangan}</b><br><small>${rt.tujuan.slice(0,3).toUpperCase()}</small></div></div>
    <div class="rh"><span class="price">${rupiah(rt.harga)}</span><button class="btn btn-primary btn-sm" data-pilih="${rt.id}">${t("tk_choose")}</button></div></div>`).join("");
  $("#recGrid").querySelectorAll("[data-pilih]").forEach(b=>b.onclick=()=>bukaDetail(+b.dataset.pilih));
  const hist=load("travelux_history",[]);
  $("#searchHistory").innerHTML=hist.length?((lang==="id"?"Terakhir: ":"Recent: ")+hist.slice(0,3).map(h=>`<button data-h="${h}">${h}</button>`).join("")):"";
  $("#searchHistory").querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{
    const [a,ct]=b.dataset.h.split(" → "); state.from=a; state.to=ct;
    opt($("#hAsal"),a); opt($("#hTujuan"),ct); opt($("#sAsal"),a); opt($("#sTujuan"),ct); showPage("cari");
  });
  $("#orderCount").textContent=orders.length;
  renderHomeFav();
}
/* ---------- PENCARIAN ---------- */
function skeleton(){ const sk=$("#skeleton"); sk.hidden=false;
  sk.innerHTML="<div class='skel-label'>🔍 Mencari tiket terbaik untukmu…</div><div class='skel'></div><div class='skel'></div><div class='skel'></div>"; }
function jalankanPencarian(){
  if(!state.from||!state.to){ toast("Lengkapi kota asal & tujuan!","err"); return; }
  if(state.from===state.to){ toast("Kota asal & tujuan tidak boleh sama!","err"); return; }
  skeleton(); $("#resultList").innerHTML=""; $("#emptyBox").hidden=true;
  const btn=$("#sCari"); if(btn){ btn.disabled=true; btn.style.opacity=".6"; }
  setTimeout(()=>{
    if(btn){ btn.disabled=false; btn.style.opacity=""; }
    $("#skeleton").hidden=true;
    const h=cariTiket();
    $("#resSummary").textContent=`${h.length} ${t("unit_tiket")} • ${state.from} → ${state.to} • ${state.date||"-"} • ${state.pax} pax`;
    const sebab=infoFilter();
    $("#filterChip").hidden=!sebab.length;
    if(sebab.length) $("#filterChip").textContent=(lang==="id"?"Filter aktif: ":"Filters: ")+sebab.join(" • ");
    else $("#filterChip").textContent=t("chip_filter");
    renderSortLog(); lastSearchInfo=null; renderSearchLog();
    if(!h.length){ $("#emptyBox").hidden=false;
      const w=$("#emptyWhy");
      if(w) w.innerHTML=sebab.length
        ? `<b>${lang==="id"?"Hasil nol karena filter:":"Zero results due to filters:"}</b><br>`+sebab.map(s=>`<span>${s}</span>`).join("")
        : (lang==="id"?"Rute ini belum punya tiket. Coba rute lain.":"No tickets on this route yet. Try another route.");
      return; }
    lastResults=h; $("#qOp").value=""; const qc=$("#qClear"); if(qc) qc.hidden=true;
    tampilTiket(h); renderSortLog();
  },700);
}
/* gambar daftar tiket + simpan untuk pencarian cepat (quick=true: jangan sentuh empty-state utama) */
function tampilTiket(list,quick=false){
  if(!quick) $("#emptyBox").hidden=list.length>0;
  if(!list.length){ $("#resultList").innerHTML=`<div class="empty"><div class="empty-art">🔍</div><h3>${lang==="id"?"Tidak cocok dengan pencarian cepat":"No quick-search match"}</h3><p class="muted">${lang==="id"?"Coba kata kunci operator, kode, atau kota lain.":"Try another operator, code, or city."}</p></div>`; return; }
  const termurah=Math.min(...list.map(t=>t.harga));
  $("#resultList").innerHTML=list.map((x,idx)=>`
    <div class="ticket ${x.transportasi}" data-arr="${x._idx}" style="animation-delay:${Math.min(idx*0.06,0.5)}s"><div>
      <div class="t-top"><span class="t-logo ${x.transportasi}"><b>${x.operator.trim()[0]}</b><i class="fa-solid ${x.transportasi==="pesawat"?"fa-plane":x.transportasi==="kereta"?"fa-train":"fa-bus"}"></i></span>
      <div><b>${x.operator}</b> ${x.harga===termurah?`<span class="badge-termurah">${t("tk_cheap")}</span>`:``}<br><small class="muted">${x.kode} • ${x.kelas}</small> <span class="idx-chip" title="${lang==="id"?"Indeks array of struct":"Array index of struct"}">Array[${x._idx}]</span> <span class="rank-chip">${t("tk_rank")}${idx+1}</span></div></div>
      <div class="route"><div><b>${x.keberangkatan}</b><br><small>${x.asal}</small></div>
      <span class="rline"></span><small>${durasi(x.durasiMenit)} ${t("tk_direct")}</small><span class="rline"></span>
      <div style="text-align:right"><b>${x.kedatangan}</b><br><small>${x.tujuan}</small></div></div>
    </div>
    <div class="t-right"><span class="price" style="font-weight:800;font-size:1.15rem">${rupiah(x.harga)}</span>
    <small class="muted">${t("tk_per")}</small><button class="btn btn-primary btn-sm" data-pilih="${x.id}">${t("tk_choose")}</button></div></div>`).join("");
  $("#resultList").querySelectorAll("[data-pilih]").forEach(b=>b.onclick=()=>bukaDetail(+b.dataset.pilih));
}
function isiFilterOps(){
  const ops=[...new Set(tickets.filter(t=>t.transportasi===state.tab).map(t=>t.operator))];
  $("#fOps").innerHTML=ops.map(o=>`<label><input type="checkbox" value="${o}"> ${o}</label>`).join("");
}
/* ---------- DETAIL & BOOKING ---------- */
/* Membuat kode booking unik */
function buatKodeBooking(){ return "TLX"+Date.now().toString(36).toUpperCase().slice(-4)+Math.random().toString(36).slice(2,5).toUpperCase(); }
function bukaDetail(id){
  const tk=tickets.find(x=>x.id===id); if(!tk) return; currentTicket=tk; promoAktif=null; $("#bPromo").value="";
  const pp=load("travelux_pending",null); // promo dari halaman promo -> otomatis terpasang
  if(pp&&PROMO_DISKON[String(pp).toUpperCase()]){ promoAktif=String(pp).toUpperCase(); $("#bPromo").value=promoAktif;
    setTimeout(()=>toast(`Promo ${promoAktif} ${lang==="id"?"terpasang otomatis!":"auto-applied!"}`,"info"),400); }
  save("travelux_pending",null);
  $("#dImg").dataset.fbk=""; $("#dImg").src=CITY_IMG[tk.tujuan]||IMG_FALLBACK; $("#dImg").alt="Banner "+tk.tujuan;
  $("#dOp").textContent=`${tk.operator} • ${tk.kode} • ${tk.kelas}`;
  $("#dRoute").textContent=`${tk.asal} → ${tk.tujuan}`;
  $("#dCode").textContent=tk.transportasi.toUpperCase();
  $("#dDep").textContent=tk.keberangkatan; $("#dFrom").textContent=tk.asal;
  $("#dArr").textContent=tk.kedatangan; $("#dTo").textContent=tk.tujuan;
  $("#dMeta").innerHTML=`<span class="chip">${durasi(tk.durasiMenit)}</span><span class="chip">${state.date||tk.tanggal}</span><span class="chip">${t("d_bag")}</span>`;
  $("#dKv").innerHTML=[[t("kv_op"),tk.operator],[t("kv_no"),tk.kode],[t("kv_dep"),`${state.date||tk.tanggal} (${tk.keberangkatan})`],[t("kv_arr"),tk.kedatangan],[t("kv_class"),tk.kelas],[t("kv_bag"),"20 kg"]].map(([k,v])=>`<div class="r"><span class="muted">${k}</span><b>${v}</b></div>`).join("");
  setPax("bPax",state.pax||1);
  const last=orders[0]; // isi otomatis dari pesanan terakhir biar cepat
  if(last){ if(!$("#bNama").value) $("#bNama").value=last.nama||""; if(!$("#bNik").value) $("#bNik").value=last.nik||""; if(!$("#bEmail").value) $("#bEmail").value=last.email||""; }
  hitungTotal(); renderKursi(); renderDS(); showPage("detail");
}
function hitungTotal(){
  if(!currentTicket) return 0;
  const pax=+$("#bPax").value||1; let total=currentTicket.harga*pax;
  let diskon=0;
  if(promoAktif&&PROMO_DISKON[promoAktif]){ diskon=Math.min(total*PROMO_DISKON[promoAktif], promoAktif==="HEMAT50"?500000:150000); total-=diskon; }
  const pajak=Math.round(total*0.1);
  $("#bKv").innerHTML=`<div class="r"><span>Harga × ${pax}</span><b>${rupiah(currentTicket.harga*pax)}</b></div>
    ${diskon?`<div class="r"><span>Promo ${promoAktif}</span><b style="color:var(--green)">−${rupiah(diskon)}</b></div>`:""}
    <div class="r"><span>Pajak & biaya (10%)</span><b>${rupiah(pajak)}</b></div>
    <div class="r"><span>Total</span><b style="font-size:1.2rem;color:var(--orange)">${rupiah(total+pajak)}</b></div>`;
  return total+pajak;
}
/* Gate + jam boarding turunan dari kode (stabil, bukan acak tiap render) */
function gateDari(kode){ const s=[...kode].reduce((a,c)=>a+c.charCodeAt(0),0); return "ABCDEFG"[s%3]+(1+s%12); }
function boardingDari(jam){ const [h,m]=jam.split(":").map(Number); const t=((h*60+m-30)%1440+1440)%1440; return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"); }
function vaDari(bank,kode){
  const digits=(kode.replace(/\D/g,"")+"1234567890").slice(0,10);
  return {BCA:"39010"+digits, BRI:"88810"+digits, Mandiri:"89000"+digits, BNI:"8810"+digits.slice(0,10)}[bank]||("99000"+digits);
}
/* QR ala QRIS: finder pattern 3 sudut + modul acak dari kode */
function gambarQRReal(canvas, kode, n=29){
  if(!canvas) return; const x=canvas.getContext("2d"), S=canvas.width, m=S/n;
  x.fillStyle="#fff"; x.fillRect(0,0,S,S); x.fillStyle="#111";
  let seed=[...kode].reduce((a,c)=>a+c.charCodeAt(0)*31,7);
  const rnd=()=>{ seed=(seed*1103515245+12345)%2147483648; return seed/2147483648; };
  const finder=(cx,cy)=>{ x.fillStyle="#111"; x.fillRect(cx*m,cy*m,7*m,7*m); x.fillStyle="#fff"; x.fillRect((cx+1)*m,(cy+1)*m,5*m,5*m); x.fillStyle="#111"; x.fillRect((cx+2)*m,(cy+2)*m,3*m,3*m); };
  const inFinder=(i,j)=> (i<8&&j<8)||(i>n-9&&j<8)||(i<8&&j>n-9);
  for(let j=0;j<n;j++) for(let i=0;i<n;i++){ if(!inFinder(i,j)&&rnd()>.52) x.fillRect(i*m,j*m,m,m); }
  finder(0,0); finder(n-7,0); finder(0,n-7);
}
let payTimer=null, payTotal=0, payBank="BCA", payWallet="DANA";
const OWNER="SURURI"; // nama pemilik semua akun payment demo
function stopPayTimer(){ if(payTimer){ clearInterval(payTimer); payTimer=null; } }
/* NIK disensor: 3578123456781234 -> 3578********1234 (cegah disalahgunakan) */
function maskNIK(nik){ nik=String(nik||""); return nik.length===16 ? nik.slice(0,4)+"********"+nik.slice(-4) : nik||"-"; }
/* Atur jumlah penumpang 1-10 + update tampilan ("3 orang") */
function setPax(id,v){
  v=Math.max(1,Math.min(10,Math.round(+v||1)));
  const h=$("#"+id); if(h) h.value=v;
  const vw=$("#"+id+"View"); if(vw) vw.textContent = id==="sPax" ? String(v) : v+" orang";
  if(id==="bPax") hitungTotal();
  return v;
}
/* Buka modal pembayaran realistis (validasi dulu, lalu QRIS/VA/E-Wallet/Kartu + countdown 10:00) */
function bukaPembayaran(){
  const nama=$("#bNama").value.trim(), nik=$("#bNik").value.replace(/\D/g,""), email=$("#bEmail").value.trim();
  const err=$("#bErr"); err.hidden=true;
  if(nama.length<3){ err.textContent=t("err_nama"); err.hidden=false; $("#bNama").focus(); return; }
  if(!/^\d{16}$/.test(nik)){ err.textContent=t("err_nik"); err.hidden=false; $("#bNik").focus(); return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ err.textContent=t("err_email"); err.hidden=false; $("#bEmail").focus(); return; }
  if(seatPicked==="-"){ toast(t("err_seat"),"err"); $("#seatMap")?.scrollIntoView({behavior:"smooth",block:"center"}); return; }
  payTotal=hitungTotal(); stopPayTimer();
  $("#payModal").hidden=false; renderPayBody();
  let sisa=600;
  $("#payTime").textContent="10:00";
  payTimer=setInterval(()=>{ sisa--;
    if(sisa<=0){ stopPayTimer(); $("#payModal").hidden=true; toast("Waktu pembayaran habis. Silakan ulangi.","err"); return; }
    $("#payTime").textContent=String(Math.floor(sisa/60)).padStart(2,"0")+":"+String(sisa%60).padStart(2,"0");
  },1000);
}
function renderPayBody(){
  const box=$("#payBody"); if(!box||!currentTicket) return;
  const EN=lang==="en";
  $("#payTitle").innerHTML=`<i class="fa-solid fa-lock"></i> ${EN?"Pay via":"Bayar via"} ${payMethod}`;
  const totalHtml=`<div class="pay-total"><span>${EN?"Total Due":"Total Bayar"}</span><b>${rupiah(payTotal)}</b></div>`;
  const copyTxt=EN?"Copy":"Salin", doneTxt=t("pay_done");
  if(payMethod==="QRIS"){
    const ref="TLX"+Date.now().toString().slice(-8);
    box.innerHTML=`${totalHtml}<div class="qris-card"><div class="qris-head"><b>QRIS</b><span>${EN?"scan any e-wallet":"scan semua e-wallet"}</span></div>
      <canvas id="payQR" width="200" height="200"></canvas>
      <b class="owner-name">SURURI</b><small>NMID: ID1024${ref} • Ref: ${ref}</small>
      <small>${EN?"Merchant (owner):":"Merchant (pemilik):"} <b class="owner-name sm">SURURI</b></small>
      <button class="btn btn-ghost btn-sm" id="copyRef"><i class="fa-solid fa-copy"></i> ${copyTxt} Ref</button></div>
      <ol class="pay-steps">${EN
        ?`<li>Open GoPay / OVO / DANA / m-banking</li><li>Choose <b>Scan QRIS</b> and scan the code above</li><li>Confirm <b>${rupiah(payTotal)}</b> then pay</li>`
        :`<li>Buka GoPay / OVO / DANA / m-banking</li><li>Pilih <b>Scan QRIS</b> lalu pindai kode di atas</li><li>Pastikan nominal <b>${rupiah(payTotal)}</b> lalu bayar</li>`}</ol>`;
    gambarQRReal($("#payQR"), ref+payTotal);
    $("#copyRef").onclick=()=>{ navigator.clipboard?.writeText(ref); toast(EN?"Reference no. copied":"No. referensi disalin"); };
  } else if(payMethod==="VA"){
    const va=vaDari(payBank,"TLX"+payTotal);
    const bankC={BCA:"#1b4f9c",BRI:"#c8102e",Mandiri:"#b78a00",BNI:"#f26522"};
    box.innerHTML=`${totalHtml}<label>${EN?"Destination Bank":"Bank Tujuan"}</label><div class="pay-grid" id="bankGrid">
      ${["BCA","BRI","Mandiri","BNI"].map(b=>`<button class="pay${b===payBank?" active":""}" data-bank="${b}"><span class="bdot" style="--bc:${bankC[b]}"></span>${b}</button>`).join("")}</div>
      <div class="va-card"><small>${EN?"Virtual Account No.":"No. Virtual Account"} ${payBank}</small><b id="vaNum">${va}</b>
      <small>${EN?"Account name (owner):":"Nama rekening (pemilik):"} <b class="owner-name sm">SURURI</b></small>
      <button class="btn btn-ghost btn-sm" id="copyVA"><i class="fa-solid fa-copy"></i> ${copyTxt}</button></div>
      <ol class="pay-steps">${EN
        ?`<li>Open <b>${payBank}</b> m-banking / ATM</li><li>Choose <b>Virtual Account</b> → enter the number above</li><li>Pay exactly <b>${rupiah(payTotal)}</b> before time runs out</li>`
        :`<li>Buka m-banking / ATM <b>${payBank}</b></li><li>Pilih <b>Virtual Account</b> → masukkan nomor di atas</li><li>Bayar tepat <b>${rupiah(payTotal)}</b> sebelum timer habis</li>`}</ol>`;
    box.querySelectorAll("[data-bank]").forEach(b=>b.onclick=()=>{ payBank=b.dataset.bank; renderPayBody(); });
    $("#copyVA").onclick=()=>{ navigator.clipboard?.writeText(va); toast(EN?"VA number copied":"Nomor VA disalin"); };
  } else if(payMethod==="E-Wallet"){
    const walC={DANA:"#108ee9",OVO:"#4c1d95",GoPay:"#00aed6"};
    box.innerHTML=`${totalHtml}<label>${EN?"Digital Wallet":"Dompet Digital"}</label><div class="pay-grid" id="walGrid">
      ${["DANA","OVO","GoPay"].map(w=>`<button class="pay${w===payWallet?" active":""}" data-wal="${w}"><span class="bdot" style="--bc:${walC[w]}"></span>${w}</button>`).join("")}</div>
      <label>${EN?"Phone No.":"No. HP"} ${payWallet}</label><input id="walHP" inputmode="numeric" placeholder="08xxxxxxxxxx" value="081234567890">
      <div class="va-card slim"><small>${EN?"Bill to:":"Tagihan ke:"}</small><b id="walEcho">081234567890 • ${payWallet}</b><small>${EN?"Wallet holder (owner):":"Pemilik wallet:"}</small><b class="owner-name sm">SURURI</b></div>
      <ol class="pay-steps">${EN
        ?`<li>Pick a wallet & enter an active phone number</li><li>Click <b>${doneTxt}</b> — bill notification sent (simulated)</li><li>Approve <b>${rupiah(payTotal)}</b> in your app</li>`
        :`<li>Pilih dompet & isi nomor HP aktif</li><li>Klik <b>${doneTxt}</b> — notifikasi tagihan dikirim (simulasi)</li><li>Setujui pembayaran sebesar <b>${rupiah(payTotal)}</b> di aplikasimu</li>`}</ol>`;
    box.querySelectorAll("[data-wal]").forEach(b=>b.onclick=()=>{ payWallet=b.dataset.wal; renderPayBody(); });
    $("#walHP").oninput=(e)=>{ const v=e.target.value.replace(/\D/g,"").slice(0,14);
      $("#walEcho").textContent=(v||"-")+" • "+payWallet; };
  } else {
    box.innerHTML=`${totalHtml}<div class="cc-brand"><b>VISA</b><span>${EN?"Credit Card (demo)":"Kartu Kredit (demo)"}</span></div>
      <label>${EN?"Card No. (demo: 16 digits)":"No. Kartu (demo: 16 digit)"}</label><input id="ccNum" inputmode="numeric" placeholder="4111 1111 1111 1111" maxlength="19">
      <div class="va-card slim"><small>${EN?"Card holder (owner):":"Pemegang kartu (pemilik):"}</small><b class="owner-name sm">SURURI</b><small id="ccEcho">4111 •••• •••• ••••</small></div>
      <div class="row2"><div><label>Expired</label><input id="ccExp" placeholder="MM/YY" maxlength="5"></div><div><label>CVV</label><input id="ccCvv" inputmode="numeric" placeholder="123" maxlength="4"></div></div>
      <ol class="pay-steps">${EN
        ?`<li>Use a demo card, not a real one</li><li>Click <b>${doneTxt}</b> to process (simulated)</li>`
        :`<li>Gunakan kartu demo, bukan kartu asli</li><li>Klik <b>${doneTxt}</b> untuk memproses (simulasi)</li>`}</ol>`;
    $("#ccNum").oninput=(e)=>{ const d=e.target.value.replace(/\D/g,"").slice(0,16);
      e.target.value=d.replace(/(\d{4})(?=\d)/g,"$1 ");
      const m=$("#ccEcho"); if(m) m.textContent=d.length>=4 ? d.slice(0,4)+" •••• •••• "+(d.slice(-4)||"••••") : "4111 •••• •••• ••••"; };
    $("#ccExp").oninput=(e)=>{ let v=e.target.value.replace(/\D/g,"").slice(0,4); e.target.value=v.length>2?v.slice(0,2)+"/"+v.slice(2):v; };
  }
}
/* validasi + buat pesanan sesi ini (tanpa database; dipanggil setelah pembayaran simulasi) */
function konfirmasiPesanan(){
  const EN2=lang==="en";
  if(payMethod==="E-Wallet"){ const hp=$("#walHP")?.value.replace(/\D/g,"")||""; if(hp.length<10){ toast(EN2?"E-wallet phone needs 10+ digits!":"No. HP e-wallet minimal 10 digit!","err"); return; } }
  if(payMethod==="Kartu"){
    const num=$("#ccNum")?.value.replace(/\D/g,"")||"";
    if(num.length!==16){ toast(EN2?"Card number must be 16 digits (demo)!":"No. kartu harus 16 digit (demo)!","err"); return; }
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test($("#ccExp")?.value||"")){ toast(EN2?"Expiry format MM/YY!":"Format expired MM/YY!","err"); return; }
    if(($("#ccCvv")?.value||"").length<3){ toast(EN2?"CVV needs 3+ digits!":"CVV minimal 3 digit!","err"); return; }
  }
  const kk=currentTicket.id+"|"+(state.date||currentTicket.tanggal)+"|"+seatPicked;
  if(kursiTerisi().has(kk)){ // kursi keburu diambil order lain -> tolak, peta di-refresh
    stopPayTimer(); $("#payModal").hidden=true; renderKursi();
    toast(lang==="id"?"Kursi sudah dipakai orang lain, pilih yang lain!":"Seat just taken by someone else, pick another!","err");
    $("#seatMap")?.scrollIntoView({behavior:"smooth",block:"center"}); return; }
  stopPayTimer(); $("#payModal").hidden=true;
  const nama=$("#bNama").value.trim(), nik=$("#bNik").value.replace(/\D/g,""), email=$("#bEmail").value.trim();
  const total=hitungTotal(), kode=buatKodeBooking();
  const order={ kode, tiketId:currentTicket.id, operator:currentTicket.operator, kodeTiket:currentTicket.kode,
    asal:currentTicket.asal, tujuan:currentTicket.tujuan, tanggal:state.date||currentTicket.tanggal,
    dep:currentTicket.keberangkatan, arr:currentTicket.kedatangan, nama, nik, email,
    telp:$("#bTelp").value.trim(), note:$("#bNote").value.trim(),
    pax:+$("#bPax").value, total, status:"berhasil", dibuat:new Date().toLocaleString("id-ID"),
    promo:promoAktif||"-", kursi:seatPicked, transportasi:currentTicket.transportasi, bayar:payMethod+(payMethod==="VA"?" "+payBank:payMethod==="E-Wallet"?" "+payWallet:""),
    gate:gateDari(kode), boarding:boardingDari(currentTicket.keberangkatan), kelas:currentTicket.kelas };
  orders.unshift(order); save("travelux_orders",orders);
  $("#kCode").textContent=order.kode;
  tampilBoardingPass(order);
  $("#kLihat").onclick=()=>showPage("pesanan");
  const wa=`TRAVELUX ✈ ${order.kode}%0A${order.operator} ${order.kodeTiket}%0A${order.asal} (${order.dep}) → ${order.tujuan} (${order.arr})%0A${order.tanggal} • ${t("bp_seat")} ${order.kursi} • Gate ${order.gate}%0A${order.nama} • ${rupiah(order.total)}`;
  const wal=$("#waShare"); if(wal) wal.href=`https://wa.me/?text=${wa}`;
  renderDS();
  toast(lang==="id"?`Pembayaran ${rupiah(total)} via ${order.bayar} berhasil! 🎉`:`Payment ${rupiah(total)} via ${order.bayar} successful! 🎉`); showPage("konfirmasi");
}
/* boarding pass senyata mungkin — barcode & ikon beda per moda */
function ikonModa(mod){ return mod==="kereta"?"fa-train":mod==="bus"?"fa-bus":"fa-plane"; }
/* Kapsi di bawah barcode sesuai moda — dipakai boarding pass, detail pesanan, dan ekspor */
function capBawah(o){
  const mod=o.transportasi||"pesawat";
  return mod==="pesawat" ? `${o.kodeTiket} • ${(o.nama||"").toUpperCase().slice(0,20)}`
    : mod==="kereta" ? `SCAN KAI • ${t("bp_seat")} ${o.kursi}`
    : `B ${String(Math.abs([...o.kode].reduce((a,c)=>a+c.charCodeAt(0),0))%9000+1000)} TLX • ${o.kursi}`;
}
/* Template boarding pass dipisah agar bisa dipakai ulang (UI + PNG/PDF) */
function boardingPassHTML(o){
  const mod=o.transportasi||"pesawat", ikon=ikonModa(mod);
  return `
  <div class="bp-head"><span class="t-logo ${mod}"><b>${o.operator.trim()[0]}</b><i class="fa-solid ${ikon}"></i></span>
    <div><b>${o.operator}</b><small>${o.kodeTiket} • ${o.kelas}</small></div>
    <span class="bp-tag">${t("bp_tag")}</span></div>
  <div class="bp-route"><div><small>${o.asal}</small><b>${o.dep}</b></div>
    <div class="bp-plane"><span></span><i class="fa-solid ${ikon}"></i><span></span></div>
    <div class="right"><small>${o.tujuan}</small><b>${o.arr}</b></div></div>
  <div class="bp-grid">
    <div><small>${t("bp_pax")}</small><b>${o.nama}</b></div><div><small>${t("bp_nik")}</small><b>${maskNIK(o.nik)}</b></div><div><small>${t("bp_date")}</small><b>${o.tanggal}</b></div>
    <div><small>${t("bp_seat")}</small><b>${o.kursi}</b></div><div><small>${t("bp_gate")}</small><b>${o.gate}</b></div>
    <div><small>${t("bp_board")}</small><b>${o.boarding}</b></div><div><small>${t("bp_class")}</small><b>${o.kelas}</b></div>
    <div><small>${t("bp_px")}</small><b>${o.pax} ${lang==="id"?"orang":"people"}</b></div><div><small>${t("bp_pay")}</small><b>${o.bayar}</b></div>
  </div>
  <div class="bp-foot"><div><small>${lang==="id"?"Kode Booking":"Booking Code"}</small><b class="bp-code">${o.kode}</b><small>${o.pax} pax • ${rupiah(o.total)} • ${o.bayar}</small></div>
    <div class="bc-wrap"><div class="barcode bc-${mod}"></div><small>${capBawah(o)}</small></div></div>`;
}
function tampilBoardingPass(o){
  const mod=o.transportasi||"pesawat";
  $("#eTicket").innerHTML=boardingPassHTML(o);
  gambarQRReal($("#qrCanvas"), o.kode+o.nama, 21);
  const bc=$("#barcode"); if(bc) bc.className="barcode bc-"+mod; // barcode konfirmasi ikut pola moda
  $("#qrText").textContent=`${o.nama} • ${t("bp_seat")} ${o.kursi} • ${t("bp_gate")} ${o.gate} • ${t("bp_board")} ${o.boarding}`;
}
/* ---------- EKSPOR TIKET PNG/PDF (html2canvas + jsPDF via CDN; fallback = dialog Cetak) ---------- */
async function buatKanvasTiket(kode, fallbackPrint){
  const o=orders.find(x=>x.kode===kode); if(!o) throw new Error("order tidak ditemukan");
  if(!window.html2canvas){ toast(t("dl_off"),"info"); if(fallbackPrint) window.print(); return null; }
  const wrap=document.createElement("div"); wrap.id="ticketExport";
  wrap.style.cssText="position:fixed;left:-9999px;top:0;width:820px;padding:24px;background:#fff;z-index:-1";
  wrap.innerHTML=boardingPassHTML(o)+`<div class="qr-row qr-export"><canvas width="147" height="147"></canvas><div><b>${t("k_scan")}</b><br><small class="muted">${o.nama} • ${t("bp_seat")} ${o.kursi} • ${t("bp_gate")} ${o.gate} • ${t("bp_board")} ${o.boarding}</small></div></div>`;
  document.body.appendChild(wrap);
  gambarQRReal(wrap.querySelector("canvas"), o.kode+o.nama, 21);
  try{ return await window.html2canvas(wrap,{scale:2,backgroundColor:"#ffffff",logging:false,useCORS:true}); }
  finally{ wrap.remove(); }
}
async function unduhPNG(kode){
  toast(t("dl_wait"),"info");
  let c=null; try{ c=await buatKanvasTiket(kode,false); }catch(e){}
  if(!c) return;
  c.toBlob(b=>{ if(!b) return;
    const url=URL.createObjectURL(b), a=document.createElement("a"); a.href=url; a.download=kode+".png"; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),5000);
    toast(t("dl_ok_png")); },"image/png");
}
async function unduhPDF(kode){
  toast(t("dl_wait"),"info");
  let c=null; try{ c=await buatKanvasTiket(kode,true); }catch(e){}
  if(!c) return;
  try{
    const J=window.jspdf&&window.jspdf.jsPDF; if(!J) throw new Error("jsPDF belum termuat");
    const pdf=new J({orientation:"p",unit:"mm",format:"a4"}); // A4 portrait, margin 12mm
    const M=12, pw=210-M*2, ph=297-M*2, ratio=c.width/c.height;
    let w=pw, h=w/ratio; if(h>ph){ h=ph; w=h*ratio; }
    pdf.setFillColor(255,255,255); pdf.rect(0,0,210,297,"F");
    pdf.addImage(c.toDataURL("image/jpeg",0.92),"JPEG",(210-w)/2,(297-h)/2,w,h);
    pdf.save(kode+".pdf");
    toast(t("dl_ok_pdf"));
  }catch(e){
    toast(t("dl_fail"),"err"); window.print();
  }
}
/* ---------- PESANAN ---------- */
function renderOrders(){
  const q=($("#orderSearch").value||"").toLowerCase();
  let list=orders.filter(o=>(state.orderFilter==="semua"||o.status===state.orderFilter)&&o.kode.toLowerCase().includes(q));
  $("#orderCount").textContent=orders.length;
  const badgeTxt={menunggu:t("st_menunggu"),berhasil:t("st_berhasil"),dibatalkan:t("st_dibatalkan")};
  $("#orderEmpty").hidden=list.length>0; $("#orderList").innerHTML=list.map(o=>{
    const mod=o.transportasi||"pesawat", ikon=ikonModa(mod);
    const qr= o.status!=="dibatalkan" ? `
      <div class="o-qr"><div class="o-qr-head"><i class="fa-solid ${ikon}"></i> ${t("ord_qr")}</div>
      <div class="o-qr-body"><canvas class="qr-mini" width="120" height="120" data-qr="${o.kode}"></canvas>
      <div class="o-qr-side"><div class="barcode bc-${mod}"></div><small>${capBawah(o)}</small>
      <div class="o-qr-actions"><button class="btn btn-ghost btn-sm" data-png="${o.kode}"><i class="fa-solid fa-image"></i> PNG</button>
      <button class="btn btn-ghost btn-sm" data-pdf="${o.kode}"><i class="fa-solid fa-file-pdf"></i> PDF</button></div></div></div></div>`
      : `<div class="o-qr o-qr-off"><small>${t("ord_qr_off")}</small></div>`;
    return `
    <div class="order"><img src="${CITY_IMG[o.tujuan]||IMG_FALLBACK}" alt="${o.tujuan}">
    <div><span class="badge-${o.status}">${badgeTxt[o.status]||o.status}</span>
    <b> ${o.asal} → ${o.tujuan}</b><br><small class="muted">${o.kode} • ${o.tanggal} • ${o.pax} ${lang==="id"?"orang":"people"} • ${o.dibuat}</small><br>
    <small>${o.operator} • ${o.nama} • NIK ${maskNIK(o.nik)}</small></div>
    <div style="text-align:right"><b>${rupiah(o.total)}</b><br><br>
    <button class="btn btn-ghost btn-sm" data-det="${o.kode}">${lang==="id"?"Detail":"Details"}</button>
    ${o.status!=="dibatalkan"?`<button class="btn btn-ghost btn-sm" data-batal="${o.kode}">${t("ord_cancel")}</button>`:""}
    <button class="btn btn-ghost btn-sm" data-copy="${o.kode}"><i class="fa-solid fa-copy"></i></button></div>
    <div class="o-det" data-detbox="${o.kode}" hidden>
      <div><small>NIK</small><b>${maskNIK(o.nik)}</b></div><div><small>Email</small><b>${o.email||"-"}</b></div>
      <div><small>${lang==="id"?"Telepon":"Phone"}</small><b>${o.telp||"-"}</b></div><div><small>${t("bp_seat")}</small><b>${o.kursi||"-"}</b></div>
      <div><small>${t("bp_gate")}</small><b>${o.gate||"-"}</b></div><div><small>${t("bp_board")}</small><b>${o.boarding||"-"}</b></div>
      <div><small>${t("bp_pay")}</small><b>${o.bayar||"-"}</b></div><div><small>Promo</small><b>${o.promo||"-"}</b></div>
      ${o.note?`<div class="span2"><small>${lang==="id"?"Catatan":"Notes"}</small><b>${o.note}</b></div>`:""}
      ${qr}
    </div></div>`;}).join("");
  $("#orderList").querySelectorAll("[data-det]").forEach(b=>b.onclick=()=>{
    const box=$(`[data-detbox="${b.dataset.det}"]`); if(box) box.hidden=!box.hidden; });
  $("#orderList").querySelectorAll("[data-batal]").forEach(b=>b.onclick=()=>mintaKonfirmasi(t("confirm_cancel")+" "+b.dataset.batal+"?",()=>{
    const o=orders.find(x=>x.kode===b.dataset.batal); o.status="dibatalkan"; save("travelux_orders",orders); renderOrders(); toast(lang==="id"?"Pesanan dibatalkan.":"Order cancelled."); }));
  $("#orderList").querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>{navigator.clipboard?.writeText(b.dataset.copy);toast((lang==="id"?"Kode disalin: ":"Code copied: ")+b.dataset.copy);});
  $("#orderList").querySelectorAll("canvas[data-qr]").forEach(cv=>{
    const o=list.find(x=>x.kode===cv.dataset.qr); if(o) gambarQRReal(cv,o.kode+o.nama,21); });
  $("#orderList").querySelectorAll("[data-png]").forEach(b=>b.onclick=()=>unduhPNG(b.dataset.png));
  $("#orderList").querySelectorAll("[data-pdf]").forEach(b=>b.onclick=()=>unduhPDF(b.dataset.pdf));
  renderDS();
}
function mintaKonfirmasi(msg, ok){
  $("#gTitle").textContent=lang==="id"?"Konfirmasi":"Confirm"; $("#gMsg").textContent=msg; $("#genModal").hidden=false;
  $("#gOk").onclick=()=>{$("#genModal").hidden=true; ok();};
  $("#gNo").onclick=()=>$("#genModal").hidden=true;
}
/* ---------- PROMO ---------- */
function renderPromo(kat="semua"){
  $("#promoGrid").innerHTML=PROMOS.filter(p=>kat==="semua"||p.kat===kat).map(p=>`
    <div class="promo"><img src="${p.img}" alt="${lang==="id"?p.judul:p.judul_en}" onerror="this.style.display='none'">
    <div class="promo-txt"><span class="badge-o">${p.kode}</span><h3>${lang==="id"?p.judul:p.judul_en}</h3><small>${lang==="id"?p.desc:p.desc_en}</small><small>📅 ${p.periode}</small>
    <button class="btn btn-primary btn-sm" data-promo="${p.kode}">${lang==="id"?"Gunakan Promo":"Use Promo"}</button></div></div>`).join("");
  $("#promoGrid").querySelectorAll("[data-promo]").forEach(b=>b.onclick=()=>{navigator.clipboard?.writeText(b.dataset.promo);
    save("travelux_pending",b.dataset.promo);
    toast(lang==="id"?`Kode ${b.dataset.promo} disalin & otomatis terpasang saat pilih tiket!`:`Code ${b.dataset.promo} copied & auto-applied at checkout!`,"info");});
}
/* ===== Terapkan bahasa ke seluruh UI ===== */
function setT(sel,key){ const el=typeof sel==="string"?$(sel):sel; if(!el||!STR[key]) return; const txt=STR[key][lang];
  const tn=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());
  if(tn) tn.nodeValue=" "+txt+" "; else el.textContent=txt; }
function setPH(sel,key){ const el=$(sel); if(el&&STR[key]) el.placeholder=STR[key][lang]; }
function applyLang(){
  document.documentElement.lang=lang; save("travelux_lang",lang);
  $("#langID")?.classList.toggle("on",lang==="id"); $("#langEN")?.classList.toggle("on",lang==="en");
  $$("[data-i18n]").forEach(el=>{ const k=el.dataset.i18n; if(STR[k]) el.textContent=STR[k][lang]; });
  // navbar & simple
  setT("#navLinks a[data-nav=beranda]","nav_home"); setT("#navLinks a[data-nav=cari]","nav_search");
  setT("#navLinks a[data-nav=pesanan]","nav_orders"); setT("#navLinks a[data-nav=promo]","nav_promo");
  setT("#navLinks a[data-nav=tentang]","nav_about");
  const hb=$(".hero-badge"); if(hb) hb.innerHTML=`<i class="fa-solid fa-compass"></i> ${t("hero_badge")}`;
  const h1=$(".hero-content h1"); if(h1) h1.innerHTML=t("hero_h1");
  const hp=$(".hero-content>p"); if(hp) hp.innerHTML=t("hero_p");
  setT(".hero-btns [data-nav=cari]","hero_go"); setT(".hero-btns [data-nav=promo]","hero_promo");
  setT(".hero-stats div:nth-child(1) span","st_route"); setT(".hero-stats div:nth-child(2) span","st_happy"); setT(".hero-stats div:nth-child(3) span","st_rate");
  const fs=$(".flash-strip"); if(fs){ const b0=fs.querySelector("b"); if(b0) b0.textContent=t("flash");
    const tn=[...fs.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(tn) tn.nodeValue=" "+t("flash_mid")+" "; }
  setT(".flash-strip .btn","flash_go");
  setT("#hCari","search_btn");
  const heads=$$("#page-beranda .sect-head h2");
  if(heads[0]) heads[0].textContent=t("dest_h"); if(heads[1]) heads[1].textContent=t("promo_h");
  if(heads[2]) heads[2].textContent=t("rec_h"); if(heads[3]) heads[3].textContent=t("tes_h");
  const subs=$$("#page-beranda .sect-head p");
  if(subs[0]) subs[0].textContent=t("dest_p"); if(subs[1]) subs[1].textContent=t("promo_p");
  if(subs[2]) subs[2].textContent=t("rec_p"); if(subs[3]) subs[3].textContent=t("tes_p");
  setT("#favToggle","fav_me");
  setT(".container.sect .sect-head .link[data-nav=promo]","promo_all");
  const fh=$(".feat .center, .sect.feat h2"); if(fh) fh.textContent=t("feat_h");
  const fc=$$(".feat-card"); const fk=[["ft1t","ft1d"],["ft2t","ft2d"],["ft3t","ft3d"],["ft4t","ft4d"]];
  fc.forEach((c,i)=>{ if(!fk[i]) return; const h=c.querySelector("h4"),p=c.querySelector("p"); if(h) h.textContent=t(fk[i][0]); if(p) p.textContent=t(fk[i][1]); });
  const tt=$$("#testiTrack .testi"); const tk=["tes1","tes2","tes3"];
  tt.forEach((c,i)=>{ const p=c.querySelector("p"); if(p&&tk[i]) p.textContent=t(tk[i]); });
  const dts=$$(".faq-grid details"); const fq=[["fq1q","fq1a"],["fq2q","fq2a"],["fq3q","fq3a"],["fq4q","fq4a"]];
  dts.forEach((d,i)=>{ if(!fq[i]) return; const s=d.querySelector("summary"),p=d.querySelector("p"); if(s) s.textContent=t(fq[i][0]); if(p) p.textContent=t(fq[i][1]); });
  const nh=$(".card.news h3"); if(nh) nh.textContent=t("news_h"); const np=$(".card.news>p"); if(np) np.textContent=t("news_p");
  setT("#newsBtn","news_btn"); setPH("#newsEmail","news_ph");
  const ch=$(".cta-panorama h2"); if(ch) ch.textContent=t("cta_h"); setT(".cta-panorama .btn","cta_btn");
  // labels home search
  const hfields=$$(".search-grid .field label");
  if(hfields[0]) hfields[0].innerHTML=`<i class="fa-solid fa-circle-dot"></i> ${t("f_from")}`;
  if(hfields[1]) hfields[1].innerHTML=`<i class="fa-solid fa-location-dot"></i> ${t("f_to")}`;
  if(hfields[2]) hfields[2].innerHTML=`<i class="fa-solid fa-calendar-days"></i> ${t("f_date")}`;
  if(hfields[3]) hfields[3].innerHTML=`<i class="fa-solid fa-users"></i> ${t("f_pax")}`;
  const hhint=$(".search-grid .field small"); if(hhint) hhint.textContent=t("f_pax_hint");
  // trust
  const tr=$$(".trust-row>div"); const trk=[["tr1t","tr1d"],["tr2t","tr2d"],["tr3t","tr3d"]];
  tr.forEach((c,i)=>{ if(!trk[i]) return; const b=c.querySelector("b"),s=c.querySelector("span"); if(b) b.textContent=t(trk[i][0]); if(s) s.textContent=t(trk[i][1]); });
  // cari page
  const chh=$("#page-cari .page-hero h2"); if(chh) chh.textContent=t("cari_h");
  const chp=$("#page-cari .page-hero>p, #page-cari .page-hero p"); if(chp) chp.textContent=lang==="id"?"Temukan tiket pesawat, kereta, dan bus (data simulasi, bukan jadwal real-time).":"Find flight, train, and bus tickets (simulated data, not real-time schedules).";
  const ml=$$(".mini-field label");
  if(ml[0]) ml[0].textContent=t("f_from"); if(ml[1]) ml[1].textContent=t("f_to"); if(ml[2]) ml[2].textContent=t("mini_date");
  if(ml[3]){ const tn=[...ml[3].childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(tn) tn.nodeValue=t("f_pax")+" "; }
  const mh=$(".mini-hint"); if(mh) mh.innerHTML=t("mini_hint"); setT("#sCari","mini_go"); setT("#sUbah","mini_edit");
  const fltH=$(".filter h3"); if(fltH){ const tn=[...fltH.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(tn) tn.nodeValue=" "+t("flt")+" "; }
  setT("#resetFilter","flt_reset");
  const fll=$$(".filter>label");
  if(fll[0]) fll[0].textContent=t("flt_price"); if(fll[1]) fll[1].textContent=t("flt_op");
  if(fll[2]) fll[2].textContent=t("flt_time"); if(fll[3]) fll[3].textContent=t("flt_sort");
  const mn2=$("#modeNote"); if(mn2) mn2.textContent=t("flt_note");
  const sm={termurah:"sort_murah",termahal:"sort_mahal",awal:"sort_awal",cepat:"sort_cepat"};
  $$("#sortSel option").forEach(o=>{ if(sm[o.value]) o.textContent=t(sm[o.value]); });
  $$(".fTime").forEach(c=>{ const lab=c.closest("label"); const wm={pagi:"w_pagi",siang:"w_siang",malam:"w_malam"}[c.value];
    const tn=lab?[...lab.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()):null; if(tn&&wm) tn.nodeValue=" "+t(wm); });
  const eb=$("#emptyBox"); if(eb){ eb.querySelector("h3").textContent=t("empty_h"); eb.querySelector("p").textContent=t("empty_p"); setT("#emptyReset","empty_btn"); }
  // tabs
  $$(".tab[data-t]").forEach(b=>{ const ic=b.querySelector("i")?.outerHTML||"";
    if(TAB_T[b.dataset.t]){ const n=tickets.filter(x=>x.transportasi===b.dataset.t).length; b.innerHTML=`${ic} ${TAB_T[b.dataset.t][lang]} <span class="pill">${n}</span>`; } });
  $$("#promoTabs .tab[data-c]").forEach(b=>{ if(CAT_C[b.dataset.c]) b.textContent=CAT_C[b.dataset.c][lang]; });
  $$("#orderTabs .tab[data-s]").forEach(b=>{ if(ST_S[b.dataset.s]) b.textContent=ST_S[b.dataset.s][lang]; });
  $$("#payGrid .pay").forEach(b=>{ const ic=b.querySelector("i")?.outerHTML||""; b.innerHTML=ic+b.dataset.pay; });
  // detail statics
  setT("[data-nav=cari].back, .back","d_back");
  const bk=document.querySelector("#page-detail .back"); if(bk) bk.textContent=t("d_back");
  const dcs=$$("#page-detail .card h3");
  dcs.forEach(h=>{ const txt=h.textContent;
    if(/Detail Perjalanan|Trip Details/.test(txt)) h.innerHTML=`<i class="fa-solid fa-circle-info"></i> ${t("d_info")}`;
    else if(/Form Pemesanan|Booking Form/.test(txt)) h.innerHTML=`<i class="fa-solid fa-pen-to-square"></i> ${t("d_form")}`;
    else if(/Pilih Kursi|Choose Seat/.test(txt)) h.innerHTML=`<i class="fa-solid fa-couch"></i> ${t("d_seat")}`;
    else if(/Ringkasan Harga|Price Summary/.test(txt)) h.textContent=t("d_price"); });
  const dl=$$("#page-detail .card label");
  dl.forEach(l=>{ const txt=l.textContent;
    if(/^Nama/.test(txt)) l.childNodes[0].nodeValue=t("d_nama")+" ";
    else if(/^NIK|^ID Number/.test(txt)){ const tn=[...l.childNodes].find(n=>n.nodeType===3); if(tn) tn.nodeValue=t("d_nik")+" "; }
    else if(/^Email/.test(txt)) l.textContent=t("d_email");
    else if(/Telepon|Phone/.test(txt)) l.textContent=t("d_telp");
    else if(/Penumpang|Passengers/.test(txt)&&!l.closest(".mini-field")){ const tn=[...l.childNodes].find(n=>n.nodeType===3); if(tn) tn.nodeValue=t("d_pax")+" "; }
    else if(/Catatan|Notes/.test(txt)) l.textContent=t("d_note");
    else if(/Kode Promo|Promo Code/.test(txt)) l.textContent=t("d_promo");
    else if(/Metode|Payment Method/.test(txt)) l.textContent=t("d_paym"); });
  setPH("#bPromo","d_promo"); setPH("#bNama","bnama_ph");
  const sp=$("#page-detail .seat-map")?.closest(".card")?.querySelector("small");
  if(sp) sp.innerHTML=`${t("d_seatpick")} <b id="seatPicked">${seatPicked}</b> ${t("d_seatfree")}`;
  const lf=$("#lgFree"),lp=$("#lgPick"),lb=$("#lgBusy");
  if(lf) lf.textContent=t("lg_free"); if(lp) lp.textContent=t("lg_pick"); if(lb) lb.textContent=t("lg_busy");
  setT("#bPromoBtn","d_use");
  const bc=$("#bConfirm"); if(bc){ const tn=[...bc.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(tn) tn.nodeValue=(lang==="id"?"Bayar":"Pay")+" "; }
  $$("#page-detail .note").forEach(n=>{ if(/simulasi|simulated/.test(n.textContent)) n.textContent=t("d_sim"); });
  // konfirmasi statics
  const steps=$$(".steps span"); ["k_s1","k_s2","k_s3","k_s4"].forEach((k,i)=>{ if(steps[i]) steps[i].textContent=t(k); });
  const sk=$(".success-card h2"); if(sk) sk.textContent=t("k_ok");
  const skp=$(".success-card>p"); if(skp) skp.textContent=t("k_p");
  setT("#kLihat","k_view");
  $$(".success-card .row3 .btn").forEach(b=>{ const nav=b.dataset.nav; if(nav==="pesanan") b.textContent=t("k_my"); else if(nav==="beranda") b.textContent=t("k_home"); });
  setT("#exportTxt","k_exp"); setT("#printBtn","k_print"); setT("#dlPng","dl_png"); setT("#dlPdf","dl_pdf");
  const kn=$(".success-card .note"); if(kn) kn.textContent=t("k_mail");
  const qrH=$(".qr-row b"); if(qrH) qrH.textContent=t("k_scan");
  const qrS=$(".qr-row small:last-child"); if(qrS) qrS.textContent=t("k_show");
  // pesanan statics
  const oh=$("#page-pesanan h2"); if(oh) oh.textContent=t("o_h");
  const op=$("#page-pesanan h2 + p"); if(op) op.textContent=t("o_p");
  setPH("#orderSearch","o_searchph");
  const oe=$("#orderEmpty"); if(oe){ oe.querySelector("h3").textContent=t("o_empty_h"); oe.querySelector("p").textContent=t("o_empty_p"); oe.querySelector(".btn").textContent=t("search_btn"); }
  // promo statics
  const prh=$("#page-promo h2"); if(prh) prh.textContent=t("pr_h");
  const prp=$("#page-promo .promo-hero p"); if(prp) prp.textContent=t("pr_p");
  // tentang
  const ab=$("#page-tentang"); if(ab){
    const bdg=ab.querySelector(".badge-c"); if(bdg) bdg.textContent=t("ab_badge");
    const h2=ab.querySelector("h2"); if(h2) h2.textContent=t("ab_h");
    const pp=ab.querySelector("p"); if(pp) pp.innerHTML=t("ab_p");
    const lis=ab.querySelectorAll(".check-list li"); ["ab_l1","ab_l2","ab_l3"].forEach((k,i)=>{ if(lis[i]) lis[i].textContent=t(k); });
    const tm=ab.querySelector(".team b"); if(tm) tm.textContent=t("ab_dev");
  }
  setPH("#qOp","qop_ph");
  setT("#sortLogTitle","sortlog_h"); setT("#searchLogTitle","searchlog_h"); setT("#sortLogHint","sortlog_p"); setT("#searchLogHint","searchlog_p"); setT("#dailyChip","daily_note");
  setT("#dsHeading","ds_h"); setT("#dsSub","ds_p");
  setT("#dsArrayT","ds_array_t"); setT("#dsArrayD","ds_array_d"); setT("#dsStructT","ds_struct_t"); setT("#dsStructD","ds_struct_d");
  setT("#dsPtrT","ds_ptr_t"); setT("#dsPtrD","ds_ptr_d"); setT("#dsLiveTitle","ds_live");
  setT("#dsCLabel","ds_c_label"); setT("#dsRLabel","ds_r_label"); setT("#dsOLabel","ds_o_label"); setT("#dsHint","ds_hint");
  const nd=$$("#notifDrop div"); if(nd[0]) nd[0].textContent=t("nt1"); if(nd[1]) nd[1].textContent=t("nt2"); if(nd[2]) nd[2].textContent=t("nt3");
  // footer
  const fp=$(".foot-grid>div:first-child p"); if(fp) fp.textContent=t("ft_p");
  const fh4=$$(".foot-grid h4"); if(fh4[0]) fh4[0].textContent=t("ft_nav"); if(fh4[1]) fh4[1].textContent=t("ft_help"); if(fh4[2]) fh4[2].textContent=t("ft_contact");
  const fl=$$(".foot-grid a");
  fl.forEach(a=>{ const nv=a.dataset.nav;
    if(nv==="beranda") a.textContent=t("ft_home"); else if(nv==="cari") a.textContent=t("ft_search");
    else if(nv==="promo") a.textContent=t("nav_promo"); else if(nv==="pesanan") a.textContent=t("k_my");
    else if(nv==="tentang") a.textContent=t("ft_about"); });
  // modals
  setT("#dmTutup","dm_close"); setT("#dmCari","dm_go");
  const pmh=$("#profilModal h3"); if(pmh) pmh.innerHTML=`<i class="fa-solid fa-user"></i> ${t("pf_h")}`;
  const pml=$$("#profilModal label"); if(pml[0]) pml[0].textContent=t("pf_nama"); if(pml[1]) pml[1].textContent=t("pf_email");
  setT("#pSave","pf_save"); setT("#pClose","pf_close");
  setT("#gOk","g_yes"); setT("#gNo","g_no");
  setT("#payDone","pay_done");
  const pt=$(".pay-timer"); if(pt){ const tn=[...pt.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(tn) tn.nodeValue=" "+t("pay_within")+" "; }
  // re-render dinamis
  renderHome(); renderPromo(); renderOrders(); renderDS(); renderSortLog(); renderSearchLog();
  if(currentTicket&&$("#page-detail").classList.contains("active")) renderKursi(seatPicked);
  if($("#page-cari").classList.contains("active")){ try{ jalankanPencarian(); }catch(e){} }
}
/* ---------- EVENT WIRING ---------- */
function init(){
  const today="2026-10-15"; $("#hTanggal").value=today; $("#sTanggal").value=today; $("#hTanggal").min=today; $("#sTanggal").min=today;
  opt($("#hAsal"),"Surabaya"); opt($("#hTujuan"),"Yogyakarta"); opt($("#sAsal"),"Surabaya"); opt($("#sTujuan"),"Yogyakarta");
  state.date=today; isiFilterOps(); renderHome(); renderPromo(); renderDS();
  /* Mode demo tersembunyi (?debug=1 / Ctrl+Shift+L): tampilkan log algoritma + panel Struktur Data.
     Logika di baliknya selalu jalan — mode ini hanya membuka tampilannya. */
  if(new URLSearchParams(location.search).has("debug")) document.body.classList.add("dsdebug");
  addEventListener("keydown",e=>{
    if(e.ctrlKey&&e.shiftKey&&(e.key==="L"||e.key==="l")){
      e.preventDefault();
      const on=document.body.classList.toggle("dsdebug");
      if(on){ renderSortLog(); renderSearchLog(); renderDS(); }
      toast(on?(lang==="id"?"Mode demo: log & panel Struktur Data tampil":"Demo mode: algorithm logs & DS panel shown")
              :(lang==="id"?"Mode demo ditutup":"Demo mode hidden"),"info");
    }
  });
  if(window.matchMedia("(max-width:680px)").matches) $("#sortLog")?.removeAttribute("open");
  $$("#homeTabs .tab").forEach(t=>t.onclick=()=>{$$("#homeTabs .tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");state.tab=t.dataset.t;});
  $$("#searchTabs .tab").forEach(t=>t.onclick=()=>{$$("#searchTabs .tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");state.tab=t.dataset.t;isiFilterOps();jalankanPencarian();});
  const syncHome=()=>{state.from=$("#hAsal").value;state.to=$("#hTujuan").value;state.date=$("#hTanggal").value;state.pax=+$("#hPax").value;};
  const tglValid=()=>{ // data demo bertanggal tetap, jadi hanya wajib diisi (simulasi)
    if(!state.date){ toast(lang==="id"?"Pilih tanggal berangkat!":"Pick a departure date!","err"); return false; }
    return true; };
  $("#hCari").onclick=()=>{syncHome();
    if(!tglValid())return;
    opt($("#sAsal"),state.from);opt($("#sTujuan"),state.to);$("#sTanggal").value=state.date;setPax("sPax",state.pax);
    const h=`${state.from} → ${state.to}`; let hist=load("travelux_history",[]); hist=[h,...hist.filter(x=>x!==h)].slice(0,5); save("travelux_history",hist);
    showPage("cari");};
  const swapMsg=()=>toast(lang==="id"?"Rute ditukar ⇄":"Route swapped ⇄","info");
  $("#swapBtn").onclick=()=>{const a=$("#hAsal").value;$("#hAsal").value=$("#hTujuan").value;$("#hTujuan").value=a;swapMsg();};
  $("#swapBtn2").onclick=()=>{const a=$("#sAsal").value;$("#sAsal").value=$("#sTujuan").value;$("#sTujuan").value=a;
    state.from=$("#sAsal").value;state.to=$("#sTujuan").value;swapMsg();jalankanPencarian();};
  [["hAsal","hTujuan"],["sAsal","sTujuan"]].forEach(([a,b])=>{ // cegah kota asal = tujuan (otomatis tukar)
    let prev=$( "#"+a).value;
    $("#"+a).addEventListener("focus",()=>{ prev=$("#"+a).value; });
    $("#"+a).addEventListener("change",()=>{ if($("#"+a).value===$("#"+b).value){ $("#"+b).value=prev; swapMsg(); } });
    let prevB=$("#"+b).value;
    $("#"+b).addEventListener("focus",()=>{ prevB=$("#"+b).value; });
    $("#"+b).addEventListener("change",()=>{ if($("#"+b).value===$("#"+a).value){ $("#"+a).value=prevB; swapMsg(); } });
  });
  $("#sCari").onclick=()=>{state.from=$("#sAsal").value;state.to=$("#sTujuan").value;state.date=$("#sTanggal").value;state.pax=+$("#sPax").value;if(!tglValid())return;jalankanPencarian();};
  const qBox=$("#qOp"), qClear=$("#qClear");
  if(qBox) qBox.oninput=()=>{
    const q=qBox.value.trim(); if(qClear) qClear.hidden=!q;
    if(!q){ lastSearchInfo=null; renderSearchLog(); tampilTiket(lastResults,true); return; }
    lastSearchInfo=linearSearchManual(lastResults,q);
    tampilTiket(lastSearchInfo.found,true); renderSearchLog();
  };
  if(qClear) qClear.onclick=()=>{ qBox.value=""; qClear.hidden=true; qBox.dispatchEvent(new Event("input")); qBox.focus(); };
  $("#sUbah").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
  ["#fMin","#fMax","#sortSel"].forEach(s=>$(s).oninput=jalankanPencarian);
  $("#fRange").oninput=()=>{$("#fRangeVal").textContent=rupiah($("#fRange").value);jalankanPencarian();};
  document.addEventListener("change",(e)=>{if(e.target.matches("#fOps input,.fTime"))jalankanPencarian();});
  const reset=()=>{["#fMin","#fMax"].forEach(s=>$(s).value="");$("#fRange").value=3000000;$("#fRangeVal").textContent="Rp 3.000.000";$$("#fOps input,.fTime").forEach(c=>c.checked=false);$("#sortSel").value="termurah";$("#qOp").value="";jalankanPencarian();toast(lang==="id"?"Filter direset ✓":"Filters reset ✓","info");};
  $("#resetFilter").onclick=reset; $("#emptyReset").onclick=reset;
  $("#emptyLoose").onclick=()=>{ // longgarkan: naikkan batas harga ke tiket termahal rute ini
    const semua=tickets.filter(x=>x.transportasi===state.tab&&x.asal===state.from&&x.tujuan===state.to);
    const mx=semua.length?Math.max(...semua.map(x=>x.harga)):3000000;
    $("#fMin").value="";$("#fMax").value="";$("#fRange").value=Math.min(3000000,mx);
    $("#fRangeVal").textContent=rupiah(+$("#fRange").value);$$("#fOps input,.fTime").forEach(c=>c.checked=false);
    jalankanPencarian(); };
  document.addEventListener("click",(e)=>{ // stepper penumpang global 1-10
    const b=e.target.closest("[data-pax]"); if(!b) return;
    setPax(b.dataset.pax, (+$("#"+b.dataset.pax)?.value||1) + (+b.dataset.d));
  });
  // v2 wiring
  setInterval(jamLive,1000); jamLive(); countdownPromo(); initReveal(); animasiAngka();
  window.addEventListener("scroll",()=>$("#navbar").classList.toggle("scrolled",scrollY>40),{passive:true});
  $("#bellBtn").onclick=(e)=>{e.stopPropagation(); const d=$("#notifDrop"); d.hidden=!d.hidden; $("#themeDrop").hidden=true;};
  document.addEventListener("click",(e)=>{ if(!e.target.closest("#notifDrop,#bellBtn")) $("#notifDrop").hidden=true; if(!e.target.closest("#themeDrop,#themeBtn")) $("#themeDrop").hidden=true; });
  applyTheme("light");
  $$("#themeDrop [data-theme-val]").forEach(b=>b.onclick=()=>{ applyTheme(b.dataset.themeVal); $("#themeDrop").hidden=true; toast({id:"Tema diganti ♥",en:"Theme changed ♥"}[lang]||"OK","info"); });
  $("#payGrid")?.querySelectorAll(".pay").forEach(b=>b.onclick=()=>{
    $("#payGrid").querySelectorAll(".pay").forEach(x=>x.classList.remove("active")); b.classList.add("active");
    payMethod=b.dataset.pay; $("#payLabel").textContent=payMethod; });
  $("#newsBtn").onclick=()=>{ const v=$("#newsEmail").value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return toast(lang==="id"?"Email newsletter tidak valid!":"Invalid newsletter email!","err");
    toast(lang==="id"?"Berhasil langganan (demo). Kode: HEMAT50":"Subscribed (demo). Code: HEMAT50","info"); $("#newsEmail").value=""; };
  $("#testiPrev").onclick=()=>$("#testiTrack").scrollBy({left:-320,behavior:"smooth"});
  $("#testiNext").onclick=()=>$("#testiTrack").scrollBy({left:320,behavior:"smooth"});
  $("#bPromoBtn").onclick=()=>{const k=$("#bPromo").value.trim().toUpperCase();
    if(PROMO_DISKON[k]){promoAktif=k;hitungTotal();toast(lang==="id"?`Promo ${k} dipakai!`:`Promo ${k} applied!`);}else toast(lang==="id"?"Kode promo tidak valid (coba HEMAT50).":"Invalid promo code (try HEMAT50).","err");};
  $("#bConfirm").onclick=bukaPembayaran;
  $("#payClose").onclick=()=>{ stopPayTimer(); $("#payModal").hidden=true; };
  $("#payDone").onclick=()=>konfirmasiPesanan();
  $("#copyCode").onclick=()=>{navigator.clipboard?.writeText($("#kCode").textContent);toast(lang==="id"?"Kode booking disalin!":"Booking code copied!");};
  $("#exportTxt").onclick=()=>{
    const txt=`TRAVELUX E-TICKET\nKode: ${$("#kCode").textContent}\n${$("#eTicket").innerText}\n\nMore Journey, More Story.`;
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"}));a.download=$("#kCode").textContent+".txt";a.click();};
  $("#printBtn").onclick=()=>window.print();
  $("#dlPng").onclick=()=>unduhPNG($("#kCode").textContent.trim());
  $("#dlPdf").onclick=()=>unduhPDF($("#kCode").textContent.trim());
  $$("#orderTabs .tab").forEach(t=>t.onclick=()=>{$$("#orderTabs .tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");state.orderFilter=t.dataset.s;renderOrders();});
  $("#orderSearch").oninput=renderOrders;
  $$("#promoTabs .tab").forEach(t=>t.onclick=()=>{$$("#promoTabs .tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");renderPromo(t.dataset.c);});
  $("#favToggle").onclick=()=>{const f=load("travelux_fav",[]);
    if(!f.length){ toast(lang==="id"?"Belum ada favorit. Klik ♥ pada destinasi.":"No favorites yet. Tap ♥ on a destination.","info"); return; }
    favOnly=!favOnly; renderHomeFav();
    toast(favOnly?(lang==="id"?"Menampilkan favorit saja":"Showing favorites only"):(lang==="id"?"Menampilkan semua destinasi":"Showing all destinations"),"info");};
  $("#resetDataFoot").onclick=(e)=>{ e.preventDefault();
    mintaKonfirmasi(lang==="id"?"Muat ulang web dari awal?":"Reload the web from scratch?",()=>location.reload()); };
  // v3 wiring
  initPreloader(); initDestModal(); applyLang();
  $("#langID").onclick=()=>{ lang="id"; applyLang(); };
  $("#langEN").onclick=()=>{ lang="en"; applyLang(); toast("Language: English. Selamat datang, tourist!","info"); };
  document.addEventListener("click",(e)=>{ const d=e.target.closest("[data-cari]"); if(d && !e.target.dataset.fav){ bukaDestModal(d.dataset.cari); } });
  $("#pSave").onclick=()=>{ const n=$("#pNama").value.trim(), m=$("#pEmail").value.trim();
    if(n.length<3) return toast(lang==="id"?"Nama profil minimal 3 huruf!":"Profile name needs 3+ letters!","err");
    if(m&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) return toast(lang==="id"?"Email profil tidak valid!":"Invalid profile email!","err");
    save("travelux_profil",{nama:n,email:m}); if(n){$("#bNama").value=n; $("#bEmail").value=m||$("#bEmail").value;}
    $("#profilModal").hidden=true; toast(lang==="id"?"Profil tersimpan ♥":"Profile saved ♥"); };
  $("#pClose").onclick=()=>$("#profilModal").hidden=true;
  setInterval(()=>{ const t=$("#testiTrack"); if(t&&document.querySelector("#page-beranda.active")){ t.scrollBy({left:t.scrollLeft+t.clientWidth>=t.scrollWidth-10?-t.scrollLeft:320,behavior:"smooth"}); } },5000);
}
document.addEventListener("DOMContentLoaded",init);
