import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from '@lodash';

const labels = [
    {
        "labelId": "BL00001",
        "en": "View Profile",
        "id": "Lihat Profil"
    },
    {
        "labelId": "BL00002",
        "en": "Notifications",
        "id": "Pemberitahuan"
    },
    {
        "labelId": "BL00003",
        "en": "Logout",
        "id": "Logout"
    },
    {
        "labelId": "BL00004",
        "en": "Birthday",
        "id": "Birthday"
    },
    {
        "labelId": "BL00005",
        "en": "Send Wishes",
        "id": "Kirim Keinginan"
    },
    {
        "labelId": "BL00006",
        "en": "Work Anniversaries",
        "id": "Hari Jadi Kerja"
    },
    {
        "labelId": "BL00007",
        "en": "Quick Links",
        "id": "Link Cepat"
    },
    {
        "labelId": "BL00008",
        "en": "Task List",
        "id": "Daftar Tugas"
    },
    {
        "labelId": "BL00009",
        "en": "Announcements",
        "id": "Pengumuman"
    },
    {
        "labelId": "BL00010",
        "en": "Read More",
        "id": "Baca Selengkapnya"
    },
    {
        "labelId": "BL00011",
        "en": "New Joiner",
        "id": "Gabungan Baru"
    },
    {
        "labelId": "BL00012",
        "en": "Current Vaccancies",
        "id": "Lowongan Saat Ini"
    },
    {
        "labelId": "BL00013",
        "en": "Home",
        "id": "dirumah"
    },
    {
        "labelId": "BL00014",
        "en": "Our Organization",
        "id": "Organisasi Kami"
    },
    {
        "labelId": "BL00015",
        "en": "Gallery",
        "id": "Galeri"
    },
    {
        "labelId": "BL00016",
        "en": "Photos",
        "id": "Photo"
    },
    {
        "labelId": "BL00017",
        "en": "Videos",
        "id": "Video"
    },
    {
        "labelId": "BL00018",
        "en": "Document Library",
        "id": "Pustaka Dokumen"
    },
    {
        "labelId": "BL00019",
        "en": "HR Policies",
        "id": "Kebijakan SDM"
    },
    {
        "labelId": "BL00020",
        "en": "Forms for Use",
        "id": "Formulir untuk Digunakan"
    },
    {
        "labelId": "BL00021",
        "en": "Appreciation Card",
        "id": "Kartu Apresiasi"
    },
    {
        "labelId": "BL00022",
        "en": "Employee Services",
        "id": "Layanan Karyawan"
    },
    {
        "labelId": "BL00023",
        "en": "Refer an Employee",
        "id": "Merujuk Karyawan"
    },
    {
        "labelId": "BL00024",
        "en": "Local Conveyance Claim",
        "id": "Klaim Pengangkutan Lokal"
    },
    {
        "labelId": "BL00025",
        "en": "Domestic Travel Claim",
        "id": "Klaim Perjalanan Domestik"
    },
    {
        "labelId": "BL00026",
        "en": "Cash Reimbursement Claim",
        "id": "Klaim Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00027",
        "en": "Internal Job Posting",
        "id": "Posting Pekerjaan Internal"
    },
    {
        "labelId": "BL00028",
        "en": "Advance Imprest",
        "id": "Imprest Muka"
    },
    {
        "labelId": "BL00029",
        "en": "Memorandum",
        "id": "nota"
    },
    {
        "labelId": "BL00030",
        "en": "Employee Corner",
        "id": "Sudut Karyawan"
    },
    {
        "labelId": "BL00031",
        "en": "Polls & Surveys",
        "id": "Jajak Pendapat & Survei"
    },
    {
        "labelId": "BL00032",
        "en": "Current Job Openings",
        "id": "Lowongan Kerja Saat Ini"
    },
    {
        "labelId": "BL00033",
        "en": "Apply for Training",
        "id": "Terapkan untuk Pelatihan"
    },
    {
        "labelId": "BL00034",
        "en": "HR Services",
        "id": "Layanan SDM"
    },
    {
        "labelId": "BL00035",
        "en": "Manage Referrals",
        "id": "Kelola Referensi"
    },
    {
        "labelId": "BL00036",
        "en": "Talent HR New Hire",
        "id": "Talenta HR Karyawan Baru"
    },
    {
        "labelId": "BL00037",
        "en": "Induction HR New Hire",
        "id": "Induksi HR Karyawan Baru"
    },
    {
        "labelId": "BL00038",
        "en": "Manage IJPs",
        "id": "Kelola IJP"
    },
    {
        "labelId": "BL00039",
        "en": "Claim Requests",
        "id": "Permintaan Klaim"
    },
    {
        "labelId": "BL00040",
        "en": "Approve Local Conveyance Claim",
        "id": "Setujui Klaim Pengangkutan Lokal"
    },
    {
        "labelId": "BL00041",
        "en": "Approve Cash Reimbursement Claim",
        "id": "Setujui Klaim Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00042",
        "en": "Approve Domestic Travel Claim",
        "id": "Setujui Klaim Perjalanan Domestik"
    },
    {
        "labelId": "BL00043",
        "en": "Approve Advance Imprest",
        "id": "Setujui Imprest Tingkat Jauh"
    },
    {
        "labelId": "BL00044",
        "en": "Approve IJPs Requests",
        "id": "Menyetujui Permintaan IJPs"
    },
    {
        "labelId": "BL00045",
        "en": "Approve Training Requests",
        "id": "Menyetujui Permintaan Pelatihan"
    },
    {
        "labelId": "BL00046",
        "en": "Manage Masters & Approvers",
        "id": "Kelola Master & Pemberi Persetujuan"
    },
    {
        "labelId": "BL00047",
        "en": "Manage Vacancies (Current & IJP)",
        "id": "Kelola Lowongan (Saat Ini & IJP)"
    },
    {
        "labelId": "BL00048",
        "en": "Manage Masters",
        "id": "Kelola Master"
    },
    {
        "labelId": "BL00049",
        "en": "Manage LC Approvers",
        "id": "Kelola Pemberi Persetujuan LC"
    },
    {
        "labelId": "BL00050",
        "en": "Manage Cash Reimbursement Approvers",
        "id": "Kelola Pemberi Persetujuan Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00051",
        "en": "Manage Domestic Travel Claim Approvers",
        "id": "Kelola Pemberi Persetujuan Klaim Perjalanan Domestik"
    },
    {
        "labelId": "BL00052",
        "en": "Manage Advance Imprest Approvers",
        "id": "Kelola Pemberi Persetujuan Imprest Muka"
    },
    {
        "labelId": "BL00053",
        "en": "Manage Trainings",
        "id": "Kelola Pelatihan"
    },
    {
        "labelId": "BL00054",
        "en": "Title",
        "id": "titel"
    },
    {
        "labelId": "BL00055",
        "en": "Description",
        "id": "deskripsi"
    },
    {
        "labelId": "BL00056",
        "en": "Publish Date",
        "id": "Tanggal Publikasi"
    },
    {
        "labelId": "BL00057",
        "en": "Publish till date",
        "id": "Terbitkan hingga saat ini"
    },
    {
        "labelId": "BL00058",
        "en": "Add Announcements",
        "id": "Menambahkan Pengumuman"
    },
    {
        "labelId": "BL00059",
        "en": "Picture",
        "id": "gambaran"
    },
    {
        "labelId": "BL00060",
        "en": "Video",
        "id": "video"
    },
    {
        "labelId": "BL00061",
        "en": "Photo",
        "id": "Foto"
    },
    {
        "labelId": "BL00062",
        "en": "Upload",
        "id": "meng"
    },
    {
        "labelId": "BL00063",
        "en": "Upload File",
        "id": "Unggah Berkas"
    },
    {
        "labelId": "BL00064",
        "en": "Create",
        "id": "Membuat"
    },
    {
        "labelId": "BL00065",
        "en": "Edit",
        "id": "mengedit"
    },
    {
        "labelId": "BL00066",
        "en": "Folders",
        "id": "map"
    },
    {
        "labelId": "BL00067",
        "en": "Delete",
        "id": "menghapus"
    },
    {
        "labelId": "BL00068",
        "en": "New",
        "id": "baru"
    },
    {
        "labelId": "BL00069",
        "en": "Job Title",
        "id": "Jabatan Pekerjaan"
    },
    {
        "labelId": "BL00070",
        "en": "Job Description",
        "id": "Deskripsi Pekerjaan"
    },
    {
        "labelId": "BL00071",
        "en": "Year of Experience",
        "id": "Tahun Pengalaman"
    },
    {
        "labelId": "BL00072",
        "en": "Designation",
        "id": "Penunjukan"
    },
    {
        "labelId": "BL00073",
        "en": "Department",
        "id": "jurusan"
    },
    {
        "labelId": "BL00074",
        "en": "Location",
        "id": "Lokasinya"
    },
    {
        "labelId": "BL00075",
        "en": "No. of Vacancy",
        "id": "Jumlah Lowongan"
    },
    {
        "labelId": "BL00076",
        "en": "Publish from Date",
        "id": "Terbitkan dari Tanggal"
    },
    {
        "labelId": "BL00077",
        "en": "Publish till Date",
        "id": "Terbitkan hingga Tanggal"
    },
    {
        "labelId": "BL00078",
        "en": "Attachment (Upload JD)",
        "id": "Lampiran (Unggah JD)"
    },
    {
        "labelId": "BL00079",
        "en": "Candidate Name",
        "id": "Nama Kandidat"
    },
    {
        "labelId": "BL00080",
        "en": "Current Organization",
        "id": "Organisasi Saat Ini"
    },
    {
        "labelId": "BL00081",
        "en": "Phone/Mobile No.",
        "id": "Telepon/Ponsel No."
    },
    {
        "labelId": "BL00082",
        "en": "Email ID",
        "id": "Email ID"
    },
    {
        "labelId": "BL00083",
        "en": "Current Location",
        "id": "Lokasi Saat Ini"
    },
    {
        "labelId": "BL00084",
        "en": "Current Designation",
        "id": "Penunjukan Saat Ini"
    },
    {
        "labelId": "BL00085",
        "en": "Current Department",
        "id": "Departemen Saat Ini"
    },
    {
        "labelId": "BL00086",
        "en": "Resume",
        "id": "Lanjutkan"
    },
    {
        "labelId": "BL00087",
        "en": "Referred By",
        "id": "Dirujuk Oleh"
    },
    {
        "labelId": "BL00088",
        "en": "Referred on Date",
        "id": "Dirujuk pada Tanggal"
    },
    {
        "labelId": "BL00089",
        "en": "Current Status",
        "id": "Status"
    },
    {
        "labelId": "BL00090",
        "en": "Remark by Talent HR",
        "id": "Komentar oleh Talent HR"
    },
    {
        "labelId": "BL00091",
        "en": "Remark by Induction HR",
        "id": "Komentar oleh Induction HR"
    },
    {
        "labelId": "BL00092",
        "en": "Referred",
        "id": "Disebut"
    },
    {
        "labelId": "BL00093",
        "en": "Shortlisted",
        "id": "Daftar pendek"
    },
    {
        "labelId": "BL00094",
        "en": "Not Shortlisted",
        "id": "Tidak Terdaftar"
    },
    {
        "labelId": "BL00095",
        "en": "Selected",
        "id": "Dipilih"
    },
    {
        "labelId": "BL00096",
        "en": "Not Selected",
        "id": "Tidak Dipilih"
    },
    {
        "labelId": "BL00097",
        "en": "Joined",
        "id": "Bergabung"
    },
    {
        "labelId": "BL00098",
        "en": "Not Joined",
        "id": "Tidak Bergabung"
    },
    {
        "labelId": "BL00099",
        "en": "Name",
        "id": "Nama"
    },
    {
        "labelId": "BL00100",
        "en": "Year with Bata",
        "id": "Tahun dengan Bata"
    },
    {
        "labelId": "BL00101",
        "en": "Employee Code",
        "id": "Kode Karyawan"
    },
    {
        "labelId": "BL00102",
        "en": "Travel Purpose",
        "id": "Tujuan Perjalanan"
    },
    {
        "labelId": "BL00103",
        "en": "Travel From Location",
        "id": "Bepergian dari lokasi"
    },
    {
        "labelId": "BL00104",
        "en": "Travel To Location",
        "id": "Perjalanan ke lokasi"
    },
    {
        "labelId": "BL00105",
        "en": "Travel From Date",
        "id": "Perjalanan Dari Tanggal"
    },
    {
        "labelId": "BL00106",
        "en": "Travel To Date",
        "id": "Perjalanan Hingga Saat Ini"
    },
    {
        "labelId": "BL00107",
        "en": "Mode of Travel",
        "id": "Mode Perjalanan"
    },
    {
        "labelId": "BL00108",
        "en": "Attachment of Bill (if it Taxi or Public Transport)",
        "id": "Lampiran Tagihan (jika itu Taksi atau Transportasi Umum)"
    },
    {
        "labelId": "BL00109",
        "en": "Toll Amount",
        "id": "Jumlah Tol"
    },
    {
        "labelId": "BL00110",
        "en": "Attach Bill",
        "id": "Lampirkan Tagihan"
    },
    {
        "labelId": "BL00111",
        "en": "Parking Amount",
        "id": "Jumlah Parkir"
    },
    {
        "labelId": "BL00112",
        "en": "Food/Meal (Select any one and enter amount)",
        "id": "Makanan/Makanan (Pilih salah satu dan masukkan jumlah)"
    },
    {
        "labelId": "BL00113",
        "en": "Outer Jabodetabek & Pwk – Enter Amount",
        "id": "Outer Jabodetabek & Pwk – Masukkan Jumlah"
    },
    {
        "labelId": "BL00114",
        "en": "Intern Jabodetabek & Pwk – Enter Amount",
        "id": "Magang Jabodetabek & Pwk – Masukkan Jumlah"
    },
    {
        "labelId": "BL00115",
        "en": "Total Bill Amount",
        "id": "Jumlah Total Tagihan"
    },
    {
        "labelId": "BL00116",
        "en": "Declaration",
        "id": "deklarasi"
    },
    {
        "labelId": "BL00117",
        "en": "I hereby declare that the above details are correct to the best of my knowledge. I am also attaching the receipts/bills for the expenses incurred with the claim form",
        "id": "Dengan ini saya menyatakan bahwa detail di atas benar dengan pengetahuan saya yang terbaik.Saya juga melampirkan tanda terima/tagihan untuk biaya yang dikeluarkan dengan formulir klaim"
    },
    {
        "labelId": "BL00118",
        "en": "Cash Reimbursement",
        "id": "Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00119",
        "en": "Reimbursement Purpose",
        "id": "Tujuan Penggantian Biaya"
    },
    {
        "labelId": "BL00120",
        "en": "Bill No.",
        "id": "Nomor Tagihan"
    },
    {
        "labelId": "BL00121",
        "en": "Expense Date",
        "id": "Tanggal Pengeluaran"
    },
    {
        "labelId": "BL00122",
        "en": "Amount",
        "id": "jumlah"
    },
    {
        "labelId": "BL00123",
        "en": "Attachment",
        "id": "Lampiran"
    },
    {
        "labelId": "BL00124",
        "en": "Total",
        "id": "total"
    },
    {
        "labelId": "BL00125",
        "en": "Travel Detail",
        "id": "Detail Perjalanan"
    },
    {
        "labelId": "BL00126",
        "en": "Travel Duration",
        "id": "Durasi Perjalanan"
    },
    {
        "labelId": "BL00127",
        "en": "From Date",
        "id": "Dari Tanggal"
    },
    {
        "labelId": "BL00128",
        "en": "To Date",
        "id": "Hingga Saat Ini"
    },
    {
        "labelId": "BL00129",
        "en": "Travel Place/Location",
        "id": "Tempat/Lokasi Perjalanan"
    },
    {
        "labelId": "BL00130",
        "en": "Travel Date",
        "id": "Tanggal Perjalanan"
    },
    {
        "labelId": "BL00131",
        "en": "Travel From",
        "id": "Perjalanan Dari"
    },
    {
        "labelId": "BL00132",
        "en": "Travel To",
        "id": "Perjalanan Ke"
    },
    {
        "labelId": "BL00133",
        "en": "Mode of Travel",
        "id": "Mode Perjalanan"
    },
    {
        "labelId": "BL00134",
        "en": "Attachment",
        "id": "Lampiran"
    },
    {
        "labelId": "BL00135",
        "en": "Hotel Details",
        "id": "Detail Hotel"
    },
    {
        "labelId": "BL00136",
        "en": "Hotel Name",
        "id": "Nama Hotel"
    },
    {
        "labelId": "BL00137",
        "en": "City",
        "id": "kota"
    },
    {
        "labelId": "BL00138",
        "en": "Tax Amount",
        "id": "Jumlah Pajak"
    },
    {
        "labelId": "BL00139",
        "en": "Total Amount (Including Taxes)",
        "id": "Jumlah Total (Termasuk Pajak)"
    },
    {
        "labelId": "BL00140",
        "en": "Remarks",
        "id": "Komentar"
    },
    {
        "labelId": "BL00141",
        "en": "Food Details",
        "id": "Detail Makanan"
    },
    {
        "labelId": "BL00142",
        "en": "Restaurant Name",
        "id": "Nama Restoran"
    },
    {
        "labelId": "BL00143",
        "en": "Date",
        "id": "tanggal"
    },
    {
        "labelId": "BL00144",
        "en": "Other Details",
        "id": "Detail Lainnya"
    },
    {
        "labelId": "BL00145",
        "en": "Bill For",
        "id": "Tagihan Untuk"
    },
    {
        "labelId": "BL00146",
        "en": "Laundry",
        "id": "binatu"
    },
    {
        "labelId": "BL00147",
        "en": "Mobile Calls",
        "id": "Panggilan Seluler"
    },
    {
        "labelId": "BL00148",
        "en": "Others",
        "id": "Lain"
    },
    {
        "labelId": "BL00149",
        "en": "Bill Description",
        "id": "Deskripsi Tagihan"
    },
    {
        "labelId": "BL00150",
        "en": "Bill Amount",
        "id": "Jumlah Tagihan"
    },
    {
        "labelId": "BL00151",
        "en": "Advance Imprest",
        "id": "Permintaan di muka"
    },
    {
        "labelId": "BL00152",
        "en": "Purpose of asking Advance",
        "id": "Tujuan meminta Uang Muka"
    },
    {
        "labelId": "BL00153",
        "en": "Description",
        "id": "deskripsi"
    },
    {
        "labelId": "BL00154",
        "en": "Add topic",
        "id": "Menambahkan topik"
    },
    {
        "labelId": "BL00155",
        "en": "View",
        "id": "melihat"
    },
    {
        "labelId": "BL00156",
        "en": "Like",
        "id": "Ibarat"
    },
    {
        "labelId": "BL00157",
        "en": "Post comment",
        "id": "Posting komentar"
    },
    {
        "labelId": "BL00158",
        "en": "Report",
        "id": "lapor"
    },
    {
        "labelId": "BL00159",
        "en": "View All",
        "id": "Lihat Semua"
    },
    {
        "labelId": "BL00160",
        "en": "Annual & Special Leave",
        "id": "Cuti Tahunan & Khusus"
    },
    {
        "labelId": "BL00161",
        "en": "Leave",
        "id": "berangkat"
    },
    {
        "labelId": "BL00162",
        "en": "Annual Leave",
        "id": "Cuti Tahunan"
    },
    {
        "labelId": "BL00163",
        "en": "Special Leave",
        "id": "Cuti Khusus"
    },
    {
        "labelId": "BL00164",
        "en": "Name of Employee",
        "id": "Nama Karyawan"
    },
    {
        "labelId": "BL00165",
        "en": "Employee Code",
        "id": "Kode Karyawan"
    },
    {
        "labelId": "BL00166",
        "en": "Designation",
        "id": "Penunjukan"
    },
    {
        "labelId": "BL00167",
        "en": "Department",
        "id": "jurusan"
    },
    {
        "labelId": "BL00168",
        "en": "Location",
        "id": "Lokasinya"
    },
    {
        "labelId": "BL00169",
        "en": "Type of Leave",
        "id": "Tipe Cuti"
    },
    {
        "labelId": "BL00170",
        "en": "Leave Category",
        "id": "Kategori Cuti"
    },
    {
        "labelId": "BL00171",
        "en": "Leave From Date",
        "id": "Cuti Dari Tanggal"
    },
    {
        "labelId": "BL00172",
        "en": "Leave To Date",
        "id": "Biarkan Hingga Saat Ini"
    },
    {
        "labelId": "BL00173",
        "en": "Employee Leave",
        "id": "Cuti Karyawan"
    },
    {
        "labelId": "BL00174",
        "en": "Approve Claim Request",
        "id": "Menyetujui permintaan klaim"
    },
    {
        "labelId": "BL00175",
        "en": "Cash Local Conveyance Claim",
        "id": "Klaim transportasi lokal"
    },
    {
        "labelId": "BL00176",
        "en": "Cash Domestic Travel Claim",
        "id": "Klaim Perjalanan Domestik"
    },
    {
        "labelId": "BL00177",
        "en": "Cash Advance Imprest",
        "id": "Pengajuan Cash Advance"
    },
    {
        "labelId": "BL00178",
        "en": "View Claim Request",
        "id": "Lihat Permintaan Klaim"
    },
    {
        "labelId": "BL00179",
        "en": "New Claim Request",
        "id": "Permintaan klaim baru"
    },
    {
        "labelId": "BL00180",
        "en": "Attachment (Mode of Travel)",
        "id": "Lampiran (mode perjalanan)"
    },
    {
        "labelId": "BL00181",
        "en": "Attachment (Parking)",
        "id": "Lampiran (parkir)"
    },
    {
        "labelId": "BL00182",
        "en": "Food/Meal Amount ",
        "id": "Makanan"
    },
    {
        "labelId": "BL00183",
        "en": "Attachment (Food)",
        "id": "Lampiran (makanan)"
    },
    {
        "labelId": "BL00184",
        "en": "Employee Name",
        "id": "Nama Karyawan"
    },
    {
        "labelId": "BL00185",
        "en": "Employee Code",
        "id": "Kode Karyawan"
    },
    {
        "labelId": "BL00186",
        "en": "Total Claim Amount",
        "id": "Jumlah Total Klaim"
    },
    {
        "labelId": "BL00187",
        "en": "Transaction Number",
        "id": "Nomor Transaksi"
    },
    {
        "labelId": "BL00188",
        "en": "Status Code",
        "id": "Kode Status"
    },
    {
        "labelId": "BL00189",
        "en": "Next Approver",
        "id": "Persetujuan Berikutnya"
    },
    {
        "labelId": "BL00190",
        "en": "Actioned By",
        "id": "Ditindaklanjuti oleh"
    },
    {
        "labelId": "BL00191",
        "en": "New Local Conveyance  ",
        "id": "Klaim transportasi lokal baru"
    },
    {
        "labelId": "BL00192",
        "en": "Claim Id",
        "id": "ID Klaim"
    },
    {
        "labelId": "BL00193",
        "en": "Claim Date",
        "id": "Tanggal Klaim"
    },
    {
        "labelId": "BL00194",
        "en": "Status",
        "id": "Status"
    },
    {
        "labelId": "BL00195",
        "en": "Action ",
        "id": "Action"
    },
    {
        "labelId": "BL00196",
        "en": "New Travel Claim  ",
        "id": "Klaim Perjalanan Baru"
    },
    {
        "labelId": "BL00197",
        "en": "Fare Amount",
        "id": "Jumlah Tarif"
    },
    {
        "labelId": "BL00198",
        "en": "Amount (Excluding Tax)",
        "id": "Jumlah (tidak termasuk pajak)"
    },
    {
        "labelId": "BL00199",
        "en": "Invoice No.",
        "id": "Nomor Invoice"
    },
    {
        "labelId": "BL00200",
        "en": "For Cashier",
        "id": "Untuk Kasir"
    },
    {
        "labelId": "BL00201",
        "en": "Paid Amount",
        "id": "Jumlah Pembayaran"
    },
    {
        "labelId": "BL00202",
        "en": "Employee Leave Request",
        "id": "Permintaan Cuti Karyawan"
    },
    {
        "labelId": "BL00203",
        "en": "Approve Leave Request",
        "id": "Menyetujui Permintaan Cuti"
    },
    {
        "labelId": "BL00204",
        "en": "View Leave Request",
        "id": "Lihat Permintaan Cuti"
    },
    {
        "labelId": "BL00205",
        "en": "New Leave Request",
        "id": "Permintaan Cuti Baru"
    },
    {
        "labelId": "BL00206",
        "en": "Leave Summary",
        "id": "Ringkasan Cuti"
    },
    {
        "labelId": "BL00207",
        "en": "Approve Employee Leave",
        "id": "Menyetujui Cuti Karyawan"
    },
    {
        "labelId": "BL00208",
        "en": "Annual Leave season two balance",
        "id": "Jumlah Cuti Tahunan Musim Kedua"
    },
    {
        "labelId": "BL00209",
        "en": "Special Leave taken",
        "id": "Cuti Khusus Diambil"
    },
    {
        "labelId": "BL00210",
        "en": "New Advance Imprest",
        "id": "Advance Baru Terintegrasi"
    },
    {
        "labelId": "BL00211",
        "en": "Purpose",
        "id": "Tujuan"
    },
    {
        "labelId": "BL00212",
        "en": "Pay Cash Reimbursement",
        "id": "Membayar Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00213",
        "en": "New Cash Reimbursement ",
        "id": "Penggantian Uang Baru"
    },
    {
        "labelId": "BL00214",
        "en": "Edit Topic",
        "id": "Mengedit topik"
    },
    {
        "labelId": "BL00215",
        "en": "Unlike",
        "id": "Unlike"
    },
    {
        "labelId": "BL00216",
        "en": "Comments ",
        "id": "Komentar"
    },
    {
        "labelId": "BL00217",
        "en": "Report",
        "id": "Laporan"
    },
    {
        "labelId": "BL00218",
        "en": "Employee Corner Report",
        "id": "Sudut karyawan"
    },
    {
        "labelId": "BL00219",
        "en": "Reported Type",
        "id": "Tipe yang Dilaporkan"
    },
    {
        "labelId": "BL00220",
        "en": "Created By",
        "id": "Dibuat oleh"
    },
    {
        "labelId": "BL00221",
        "en": "Bill Amount",
        "id": "Jumlah Tagihan"
    },
    {
        "labelId": "BL00222",
        "en": "File",
        "id": "File"
    },
    {
        "labelId": "BL00223",
        "en": "Distance",
        "id": "Jarak"
    },
    {
        "labelId": "BL00224",
        "en": "Pay Claim Request ",
        "id": "Bayar Permintaan Klaim"
    },
    {
        "labelId": "BL00225",
        "en": "For Approver",
        "id": "Untuk approver"
    },
    {
        "labelId": "BL00226",
        "en": "Approve Advance Request",
        "id": "Menyetujui Permintaan Cash Advance"
    },
    {
        "labelId": "BL00227",
        "en": "Pay Advance Imprest",
        "id": "Bayar Cash Advance"
    },
    {
        "labelId": "BL00228",
        "en": "Search User",
        "id": "Mencari user"
    },
    {
        "labelId": "BL00229",
        "en": "Organizational Values",
        "id": "Nilai-Nilai Organisasi"
    },
    {
        "labelId": "BL00230",
        "en": "Message",
        "id": "Pesan"
    },
    {
        "labelId": "BL00231",
        "en": "Details",
        "id": "Detail"
    },
    {
        "labelId": "BL00232",
        "en": "ID",
        "id": "ID"
    },
    {
        "labelId": "BL00233",
        "en": "New Memorandum",
        "id": "Memorandum Baru"
    },
    {
        "labelId": "BL00234",
        "en": "Memorandum Request",
        "id": "Permintaan Memorandum"
    },
    {
        "labelId": "BL00235",
        "en": "View Memorandum Request",
        "id": "Lihat Permintaan Memorandum"
    },
    {
        "labelId": "BL00236",
        "en": "New Memorandum Request",
        "id": "Permintaan Memorandum Baru"
    },
    {
        "labelId": "BL00237",
        "en": "Reference No",
        "id": "Nomor Referensi"
    },
    {
        "labelId": "BL00238",
        "en": "Memo Type",
        "id": "Tipe Memo"
    },
    {
        "labelId": "BL00239",
        "en": "Submitted Date",
        "id": "Tanggal yang Diajukan"
    },
    {
        "labelId": "BL00240",
        "en": "Normal",
        "id": "Normal"
    },
    {
        "labelId": "BL00241",
        "en": "Express",
        "id": "Cepat"
    },
    {
        "labelId": "BL00242",
        "en": "Memo Classification",
        "id": "Klasifikasi Memo"
    },
    {
        "labelId": "BL00243",
        "en": "Standard",
        "id": "Standar"
    },
    {
        "labelId": "BL00244",
        "en": "Confidential",
        "id": "Rahasia"
    },
    {
        "labelId": "BL00245",
        "en": "Select multiple approver (If required)*",
        "id": "Pilih Beberapa Pemberi Persetujuan (jika diperlukan) *"
    },
    {
        "labelId": "BL00246",
        "en": "Approver Name",
        "id": "Nama approver"
    },
    {
        "labelId": "BL00247",
        "en": "Internal Memorandum",
        "id": "Memorandum Internal"
    },
    {
        "labelId": "BL00248",
        "en": "Consent Raised By",
        "id": "Persetujuan dikumpulkan oleh"
    },
    {
        "labelId": "BL00249",
        "en": "Query",
        "id": "Pertanyaan"
    },
    {
        "labelId": "BL00250",
        "en": "For Consent Reply",
        "id": "Balasan persetujuan"
    },
    {
        "labelId": "BL00251",
        "en": "Answer",
        "id": "Jawaban"
    },
    {
        "labelId": "BL00252",
        "en": "Consent Memorandum",
        "id": "Memorandum Persetujuan"
    },
    {
        "labelId": "BL00253",
        "en": "Consent Memorandum Request",
        "id": "Permintaan Memorandum Persetujuan"
    },
    {
        "labelId": "BL00254",
        "en": "Approve Memorandum",
        "id": "Menyetujui Memorandum"
    },
    {
        "labelId": "BL00255",
        "en": "Approve Memorandum Request",
        "id": "Menyetujui Permintaan Memorandum"
    },
    {
        "labelId": "BL00256",
        "en": "Referral Jobs",
        "id": "Rujukan Pekerjaan"
    },
    {
        "labelId": "BL00257",
        "en": "Remark by Talent HR Second",
        "id": "Komentar oleh Talent HR 2"
    },
    {
        "labelId": "BL00258",
        "en": "Remark by Talent HR First",
        "id": "Komentar oleh Talent HR 1"
    },
    {
        "labelId": "BL00259",
        "en": "Join Date",
        "id": "Tanggal Bergabung"
    },
    {
        "labelId": "BL00260",
        "en": "New Joinee",
        "id": "Karyawan Baru"
    },
    {
        "labelId": "BL00261",
        "en": "Referral Joinee Form",
        "id": "Referral Karyawan baru"
    },
    {
        "labelId": "BL00262",
        "en": "Referral Applicants",
        "id": "Pelamar referral"
    },
    {
        "labelId": "BL00263",
        "en": "Official Information",
        "id": "Informasi Resmi"
    },
    {
        "labelId": "BL00264",
        "en": "Type Of Employee",
        "id": "Jenis karyawan"
    },
    {
        "labelId": "BL00265",
        "en": "Employee Category",
        "id": "Kategori Karyawan"
    },
    {
        "labelId": "BL00266",
        "en": "Division Code",
        "id": "Kode Divisi"
    },
    {
        "labelId": "BL00267",
        "en": "Zone Code",
        "id": "Kode Area"
    },
    {
        "labelId": "BL00268",
        "en": "Vertical Code",
        "id": "Kode Vertikal"
    },
    {
        "labelId": "BL00269",
        "en": "Sub-Department",
        "id": "Sub-Departemen"
    },
    {
        "labelId": "BL00270",
        "en": "City",
        "id": "Kota"
    },
    {
        "labelId": "BL00271",
        "en": "State",
        "id": "Negara"
    },
    {
        "labelId": "BL00272",
        "en": "Date Of Joining",
        "id": "Tanggal Bergabung"
    },
    {
        "labelId": "BL00273",
        "en": "RM",
        "id": "RM."
    },
    {
        "labelId": "BL00274",
        "en": "H.O.D.",
        "id": "Kepala Departmen"
    },
    {
        "labelId": "BL00275",
        "en": "Personal Information",
        "id": "Informasi pribadi"
    },
    {
        "labelId": "BL00276",
        "en": "Salutation",
        "id": "Sapaan"
    },
    {
        "labelId": "BL00277",
        "en": "First Name",
        "id": "Nama Depan"
    },
    {
        "labelId": "BL00278",
        "en": "Middle Name",
        "id": "Nama Tengah"
    },
    {
        "labelId": "BL00279",
        "en": "Last Name",
        "id": "Nama Keluarga"
    },
    {
        "labelId": "BL00280",
        "en": "Date Of Birth",
        "id": "Tanggal Lahir"
    },
    {
        "labelId": "BL00281",
        "en": "Gender",
        "id": "Jenis Kelamin"
    },
    {
        "labelId": "BL00282",
        "en": "Marital Status",
        "id": "Status Pernikahan"
    },
    {
        "labelId": "BL00283",
        "en": "Contact Number",
        "id": "Nomor Kontak"
    },
    {
        "labelId": "BL00284",
        "en": "Emergency Contact Number",
        "id": "Nomor Kontak Darurat"
    },
    {
        "labelId": "BL00285",
        "en": "Present Address",
        "id": "Alamat Sekarang"
    },
    {
        "labelId": "BL00286",
        "en": "Permanent Address",
        "id": "Alamat Tetap"
    },
    {
        "labelId": "BL00287",
        "en": "Create Job",
        "id": "Membuat Pekerjaan"
    },
    {
        "labelId": "BL00288",
        "en": "Referral Job Entry",
        "id": "Entri Pekerjaan Rujukan"
    },
    {
        "labelId": "BL00289",
        "en": "Add Job",
        "id": "Tambahkan Pekerjaan"
    },
    {
        "labelId": "BL00290",
        "en": "Edit Job",
        "id": "Edit Pekerjaan"
    },
    {
        "labelId": "BL00291",
        "en": "Joining Status",
        "id": "Status Bergabung"
    },
    {
        "labelId": "BL00292",
        "en": "Referral Application Form",
        "id": "Formulir Aplikasi Rujukan"
    },
    {
        "labelId": "BL00293",
        "en": "Applicant Details",
        "id": "Rincian Pemohon"
    },
    {
        "labelId": "BL00294",
        "en": "Job Code",
        "id": "Kode Pekerjaan"
    },
    {
        "labelId": "BL00295",
        "en": "Internal Jobs",
        "id": "Pekerjaan Internal"
    },
    {
        "labelId": "BL00296",
        "en": "Job Application Form",
        "id": "Formulir Pekerjaan"
    },
    {
        "labelId": "BL00297",
        "en": "Internal Job Posting Applicants",
        "id": "Pelamar Pekerjaan Internal"
    },
    {
        "labelId": "BL00298",
        "en": "Current Role Since",
        "id": "Jabatan Saat Ini Sejak"
    },
    {
        "labelId": "BL00299",
        "en": "IJP Position Name",
        "id": "Nama Posisi IJP"
    },
    {
        "labelId": "BL00300",
        "en": "IJP Designation",
        "id": "Tujuan IJP"
    },
    {
        "labelId": "BL00301",
        "en": "IJP Department",
        "id": "Departmen IJP"
    },
    {
        "labelId": "BL00302",
        "en": "IJP Location",
        "id": "Lokasi IJP"
    },
    {
        "labelId": "BL00303",
        "en": "Applied On Date",
        "id": "Ditetapkan Tanggal"
    },
    {
        "labelId": "BL00304",
        "en": "Official Email Id",
        "id": "ID Email Resmi"
    },
    {
        "labelId": "BL00305",
        "en": "Approved by RM Name",
        "id": "Disetujui oleh Nama RM"
    },
    {
        "labelId": "BL00306",
        "en": "Approved by RM on Date",
        "id": "Disetujui oleh RM pada Tanggal"
    },
    {
        "labelId": "BL00307",
        "en": "Approved by Approver Name",
        "id": "Disetujui dengan nama Pemberi Persetujuan"
    },
    {
        "labelId": "BL00308",
        "en": "Approved by Approver on Date",
        "id": "Disetujui oleh Pemberi Persetujuan pada tanggal"
    },
    {
        "labelId": "BL00309",
        "en": "Remark By Talent HR",
        "id": "Komentar oleh Talent HR"
    },
    {
        "labelId": "BL00310",
        "en": "Total Experience",
        "id": "Total Pengalaman"
    },
    {
        "labelId": "BL00311",
        "en": "Full Name",
        "id": "Nama lengkap"
    },
    {
        "labelId": "BL00312",
        "en": "Approve Applicants Request",
        "id": "Menyetujui Permintaan Pelamar"
    },
    {
        "labelId": "BL00313",
        "en": "Masters",
        "id": "Master"
    },
    {
        "labelId": "BL00314",
        "en": "Active",
        "id": "Aktif"
    },
    {
        "labelId": "BL00315",
        "en": "Inactive",
        "id": "Tidak aktif"
    },
    {
        "labelId": "BL00316",
        "en": "Create",
        "id": "Membuat"
    },
    {
        "labelId": "BL00317",
        "en": "Bill Code",
        "id": "Kode Tagihan"
    },
    {
        "labelId": "BL00318",
        "en": "Bill Type",
        "id": "Tipe Tagihan"
    },
    {
        "labelId": "BL00319",
        "en": "City Name",
        "id": "Nama Kota"
    },
    {
        "labelId": "BL00320",
        "en": "City Code",
        "id": "Kode Kota"
    },
    {
        "labelId": "BL00321",
        "en": "City Type Mappig",
        "id": "Peta Tipe Kota"
    },
    {
        "labelId": "BL00322",
        "en": "City Type Code",
        "id": "Kode Tipe Kota"
    },
    {
        "labelId": "BL00323",
        "en": "Department Code",
        "id": "Kode Departemen"
    },
    {
        "labelId": "BL00324",
        "en": "Department Name",
        "id": "Nama Departemen"
    },
    {
        "labelId": "BL00325",
        "en": "Designation Code",
        "id": "Kode Penunjukan"
    },
    {
        "labelId": "BL00326",
        "en": "Designation Name",
        "id": "Nama Penunjukan"
    },
    {
        "labelId": "BL00327",
        "en": "Division",
        "id": "Divisi"
    },
    {
        "labelId": "BL00328",
        "en": "Division Name",
        "id": "Nama Divisi"
    },
    {
        "labelId": "BL00329",
        "en": "Employee Category Code",
        "id": "Kode Kategori Karyawan"
    },
    {
        "labelId": "BL00330",
        "en": "Employee Category Name",
        "id": "Nama kategori karyawan"
    },
    {
        "labelId": "BL00331",
        "en": "Employee Type",
        "id": "Tipe karyawan"
    },
    {
        "labelId": "BL00332",
        "en": "Employee Type Code",
        "id": "Kode Jenis Karyawan"
    },
    {
        "labelId": "BL00333",
        "en": "Employee Type Name",
        "id": "Nama Tipe Karyawan"
    },
    {
        "labelId": "BL00334",
        "en": "Gender",
        "id": "Gender"
    },
    {
        "labelId": "BL00335",
        "en": "Gender Code",
        "id": "Kode Gender"
    },
    {
        "labelId": "BL00336",
        "en": "Gender Name",
        "id": "Nama Gender"
    },
    {
        "labelId": "BL00337",
        "en": "Grade",
        "id": "Grading"
    },
    {
        "labelId": "BL00338",
        "en": "Grade Code",
        "id": "Kode Grading"
    },
    {
        "labelId": "BL00339",
        "en": "Grade Name",
        "id": "Nama Grading"
    },
    {
        "labelId": "BL00340",
        "en": "HOD Code",
        "id": "Kode Kepala Departmen"
    },
    {
        "labelId": "BL00341",
        "en": "HOD Name",
        "id": "Nama Kepala Departmen"
    },
    {
        "labelId": "BL00342",
        "en": "Leave Category Code",
        "id": "Tinggalkan Kode Kategori"
    },
    {
        "labelId": "BL00343",
        "en": "Leave Category Name",
        "id": "Tinggalkan Nama Kategori"
    },
    {
        "labelId": "BL00344",
        "en": "Local Travel Mode Eligibility",
        "id": "Kelayakan Mode Perjalanan Lokal"
    },
    {
        "labelId": "BL00345",
        "en": "Eligibility Type",
        "id": "Jenis kelayakan"
    },
    {
        "labelId": "BL00346",
        "en": "Eligibility Unit",
        "id": "Unit Kelayakan"
    },
    {
        "labelId": "BL00347",
        "en": "Eligibility Amount",
        "id": "Jumlah Kelayakan"
    },
    {
        "labelId": "BL00348",
        "en": "Location Code",
        "id": "Kode Lokasi"
    },
    {
        "labelId": "BL00349",
        "en": "Location Name",
        "id": "Nama lokasi"
    },
    {
        "labelId": "BL00350",
        "en": "Marital Status Code",
        "id": "Kode Status Perkawinan"
    },
    {
        "labelId": "BL00351",
        "en": "Marital Status Name",
        "id": "Status Perkawinan"
    },
    {
        "labelId": "BL00352",
        "en": "Travel Mode Eligibility",
        "id": "Mode Perjalanan Kelayakan"
    },
    {
        "labelId": "BL00353",
        "en": "Salutation Code",
        "id": "Kode Sapaan"
    },
    {
        "labelId": "BL00354",
        "en": "Salutation Name",
        "id": "Nama Sapaan"
    },
    {
        "labelId": "BL00355",
        "en": "State Code",
        "id": "Kode Negara"
    },
    {
        "labelId": "BL00356",
        "en": "State Name",
        "id": "Nama Negara"
    },
    {
        "labelId": "BL00357",
        "en": "Sub Department Code",
        "id": "Kode Sub Departmen"
    },
    {
        "labelId": "BL00358",
        "en": "Sub Department Name",
        "id": "Nama Sub Departmen"
    },
    {
        "labelId": "BL00359",
        "en": "Vertical",
        "id": "Vertikal"
    },
    {
        "labelId": "BL00360",
        "en": "Vertical Name",
        "id": "Nama Vertikal"
    },
    {
        "labelId": "BL00361",
        "en": "Zone ",
        "id": "Area"
    },
    {
        "labelId": "BL00362",
        "en": "Zone Name",
        "id": "Nama Area"
    },
    {
        "labelId": "BL00363",
        "en": "Organizational Code",
        "id": "Kode Organisasi"
    },
    {
        "labelId": "BL00364",
        "en": "Organizational Name",
        "id": "Nama Organisasi"
    },
    {
        "labelId": "BL00365",
        "en": "Training Category",
        "id": "Kategori Pelatihan"
    },
    {
        "labelId": "BL00366",
        "en": "Training Category Code",
        "id": "Kode Kategori Pelatihan"
    },
    {
        "labelId": "BL00367",
        "en": "Training Category Name",
        "id": "Nama Kategori Pelatihan"
    },
    {
        "labelId": "BL00368",
        "en": "Training Sub Category",
        "id": "Pelatihan Sub Kategori"
    },
    {
        "labelId": "BL00369",
        "en": "Training Sub Category Name",
        "id": "Nama Sub Kategori Pelatihan"
    },
    {
        "labelId": "BL00370",
        "en": "Training Sub Category Code",
        "id": "Kode Sub Kategori Pelatihan"
    },
    {
        "labelId": "BL00371",
        "en": "Created Date",
        "id": "Dibuat Tanggal"
    },
    {
        "labelId": "BL00372",
        "en": "Internal Job Entry",
        "id": "Pekerjaan Internal"
    },
    {
        "labelId": "BL00373",
        "en": "Internal Job Posting Form",
        "id": "Formulir Pekerjaan Internal"
    },
    {
        "labelId": "BL00374",
        "en": "Code",
        "id": "Kode"
    },
    {
        "labelId": "BL00375",
        "en": "Training List",
        "id": "Daftar Pelatihan"
    },
    {
        "labelId": "BL00376",
        "en": "Approve Training Requests",
        "id": "Menyetujui permintaan pelatihan"
    },
    {
        "labelId": "BL00377",
        "en": "Trx No",
        "id": "No transaksi"
    },
    {
        "labelId": "BL00378",
        "en": "Requested Date",
        "id": "Tanggal yang diminta"
    },
    {
        "labelId": "BL00379",
        "en": "Training Name",
        "id": "Nama Pelatihan"
    },
    {
        "labelId": "BL00380",
        "en": "Training Detail",
        "id": "Detail Pelatihan"
    },
    {
        "labelId": "BL00381",
        "en": "Learning Platform",
        "id": "Platform Belajar"
    },
    {
        "labelId": "BL00382",
        "en": "For Admin",
        "id": "Untuk Admin"
    },
    {
        "labelId": "BL00383",
        "en": "Training Duration",
        "id": "Durasi Pelatihan"
    },
    {
        "labelId": "BL00384",
        "en": "Training Description",
        "id": "Deskripsi Pelatihan"
    },
    {
        "labelId": "BL00385",
        "en": "Edit Training Application",
        "id": "Edit aplikasi pelatihan"
    },
    {
        "labelId": "BL00386",
        "en": "Applied",
        "id": "Terapan"
    },
    {
        "labelId": "BL00387",
        "en": "View Training Application",
        "id": "Lihat Aplikasi Pelatihan"
    },
    {
        "labelId": "BL00388",
        "en": "New Training Application ",
        "id": "Aplikasi Pelatihan Baru"
    },
    {
        "labelId": "BL00389",
        "en": "Training Applications",
        "id": "Aplikasi Pelatihan"
    },
    {
        "labelId": "BL00390",
        "en": "Upcoming Trainings",
        "id": "Pelatihan Mendatang"
    },
    {
        "labelId": "BL00391",
        "en": "Applied Trainings",
        "id": "Pelatihan yang Diterapkan"
    },
    {
        "labelId": "BL00392",
        "en": "Poll Now",
        "id": "Polling Sekarang"
    },
    {
        "labelId": "BL00393",
        "en": "Poll List",
        "id": "Daftar Polling"
    },
    {
        "labelId": "BL00394",
        "en": "Poll Master List",
        "id": "Master Daftar Poling"
    },
    {
        "labelId": "BL00395",
        "en": "Create Poll",
        "id": "Buat Polling"
    },
    {
        "labelId": "BL00396",
        "en": "Question",
        "id": "Pertanyaan"
    },
    {
        "labelId": "BL00397",
        "en": "Set Options",
        "id": "Tetapkan Opsi"
    },
    {
        "labelId": "BL00398",
        "en": "Option1",
        "id": "Pilihan 1"
    },
    {
        "labelId": "BL00399",
        "en": "Option2",
        "id": "Pilihan 2"
    },
    {
        "labelId": "BL00400",
        "en": "Option3",
        "id": "Pilihan 3"
    },
    {
        "labelId": "BL00401",
        "en": "Option4",
        "id": "Pilihan 4"
    },
    {
        "labelId": "BL00402",
        "en": "Poll Publish Date",
        "id": "Tanggal Publikasi Polling"
    },
    {
        "labelId": "BL00403",
        "en": "Add Survey",
        "id": "Tambahkan Survei"
    },
    {
        "labelId": "BL00404",
        "en": "Assign User Role",
        "id": "Tetapkan Pengguna"
    },
    {
        "labelId": "BL00405",
        "en": "Edit Survey",
        "id": "Edit Survei"
    },
    {
        "labelId": "BL00406",
        "en": "S.No",
        "id": "S.NO."
    },
    {
        "labelId": "BL00407",
        "en": "My Job Application",
        "id": "Aplikasi Pekerjaan Saya"
    },
    {
        "labelId": "BL00408",
        "en": "Job Type",
        "id": "Jenis Pekerjaan"
    },
    {
        "labelId": "BL00409",
        "en": "Pending With",
        "id": "Tertunda Dengan"
    },
    {
        "labelId": "BL00410",
        "en": "Wishes Sent",
        "id": "Kirim Ucapan"
    },
    {
        "labelId": "BL00411",
        "en": "Travel Claim Detail",
        "id": "Detail Klaim Perjalanan"
    },
    {
        "labelId": "BL00412",
        "en": "Cash Reimbursement Detail",
        "id": "Detail Penggantian Uang Tunai"
    },
    {
        "labelId": "BL00413",
        "en": "Approver History",
        "id": "Riwayat Pemberi Persetujuan"
    },
    {
        "labelId": "BL00414",
        "en": "Banners",
        "id": "Spanduk"
    },
    {
        "labelId": "BL00415",
        "en": "Add Banner",
        "id": "Tambahkan Spanduk"
    },
    {
        "labelId": "BL00416",
        "en": "Upload Banner",
        "id": "Unggah spanduk"
    },
    {
        "labelId": "BL00417",
        "en": "Edit Banner",
        "id": "Edit Spanduk"
    },
    {
        "labelId": "BL00418",
        "en": "Min Amount",
        "id": "Jumlah Min."
    },
    {
        "labelId": "BL00419",
        "en": "Max Amount",
        "id": "Jumlah Maks."
    },
    {
        "labelId": "BL00420",
        "en": "Add Links",
        "id": "Tambahkan Tautan"
    },
    {
        "labelId": "BL00421",
        "en": "Training",
        "id": "Pelatihan"
    },
    {
        "labelId": "BL00422",
        "en": "Search",
        "id": "Mencari"
    },
    {
        "labelId": "BL00423",
        "en": "Clear",
        "id": "Bersih"
    },
    {
        "labelId": "BL00424",
        "en": "Internal Job Applications",
        "id": "Lamaran Pekerjaan Internal"
    },
    {
        "labelId": "BL00425",
        "en": "Referral Job Applications",
        "id": "Lamaran Pekerjaan Referensi"
    },
    {
        "labelId": "BL00426",
        "en": "Add More",
        "id": "tambahkan lagi"
    },
    {
        "labelId": "BL00427",
        "en": "Holiday",
        "id": "Hari libur"
    },
    {
        "labelId": "BL00428",
        "en": "Holiday Code",
        "id": "Kode Liburan"
    },
    {
        "labelId": "BL00429",
        "en": "Holiday Name",
        "id": "Nama Liburan"
    },
    {
        "labelId": "BL00430",
        "en": "Day",
        "id": "Hari"
    },
    {
        "labelId": "BL00431",
        "en": "Year",
        "id": "Tahun"
    },
    {
        "labelId": "BL00432",
        "en": "My Profile",
        "id": "Profil Saya"
    },
    {
        "labelId": "BL00433",
        "en": "Inbox",
        "id": "kotak masuk"
    },
    {
        "labelId": "BL00434",
        "en": "Birthday Wishes List",
        "id": "Daftar Keinginan Ulang Tahun"
    },
    {
        "labelId": "BL00435",
        "en": "Work Anniversary Wishes List",
        "id": "Daftar Keinginan Hari Jadi Kerja"
    },
]


function Label({ labelId }) {


    const lang = useSelector(({ i18n }) => i18n.language);
    console.log("lang", lang);
    const foundId = labels.find((label) => label.labelId === labelId);
    //console.log("id", foundId[lang]);
    return (

        <>
            <span>{foundId[lang]}</span>
        </>
    )
}

function GetLabel(labelId) {
    const lang = useSelector(({ i18n }) => i18n.language);
    let result;
    if (_.isArray(labelId)) {
        result = [];
        labelId.forEach(lbs => {
            const foundId = labels.find((label) => label.labelId === lbs);
            result.push(foundId[lang])
        })
    } else if (_.isString(labelId)) {
        const foundId = labels.find((label) => label.labelId === labelId);
        result = foundId[lang];
    }
    // console.log("result", result);
    return result;
}

function GetLabelWithLang(labelId, lang) {
    //console.log("lang",lang);
    //const lang = useSelector(({ i18n }) => i18n.language);
    let result;
    if (_.isArray(labelId)) {
        result = [];
        labelId.forEach(lbs => {
            const foundId = labels.find((label) => label.labelId === lbs);
            result.push(foundId[lang])
        })
    } else if (_.isString(labelId)) {
        const foundId = labels.find((label) => label.labelId === labelId);
        result = foundId[lang];
    }
    // console.log("result", result);
    return result;
}
export { Label, GetLabel, GetLabelWithLang }
