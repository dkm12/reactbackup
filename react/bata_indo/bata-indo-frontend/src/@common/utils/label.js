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
        "en": "Brithday",
        "id": "Brithday"
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
        "en": "Folder",
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
        "en": "Employee Leave"
    },
    {
        "labelId": "BL00174",
        "en": "Approve Claim Request"
    },
    {
        "labelId": "BL00175",
        "en": "Cash Local Conveyance Claim"
    },
    {
        "labelId": "BL00176",
        "en": "Cash Domestic Travel Claim"
    },
    {
        "labelId": "BL00177",
        "en": "Cash Advance Imprest"
    },
    {
        "labelId": "BL00178",
        "en": "View Claim Request"
    },
    {
        "labelId": "BL00179",
        "en": "New Claim Request"
    },
    {
        "labelId": "BL00180",
        "en": "Attachment (Mode of Travel)"
    },
    {
        "labelId": "BL00181",
        "en": "Attachment (Parking)"
    },
    {
        "labelId": "BL00182",
        "en": "Food/Meal Amount "
    },
    {
        "labelId": "BL00183",
        "en": "Attachment (Food)"
    },
    {
        "labelId": "BL00184",
        "en": "Employee Name"
    },
    {
        "labelId": "BL00185",
        "en": "Employee Code"
    },
    {
        "labelId": "BL00186",
        "en": "Total Claim Amount"
    },
    {
        "labelId": "BL00187",
        "en": "Transaction Number"
    },
    {
        "labelId": "BL00188",
        "en": "Status Code"
    },
    {
        "labelId": "BL00189",
        "en": "Next Approver"
    },
    {
        "labelId": "BL00190",
        "en": "Actioned By"
    },
    {
        "labelId": "BL00191",
        "en": "New Local Conveyance  "
    },
    {
        "labelId": "BL00192",
        "en": "Claim Id"
    },
    {
        "labelId": "BL00193",
        "en": "Claim Date"
    },
    {
        "labelId": "BL00194",
        "en": "Status"
    },
    {
        "labelId": "BL00195",
        "en": "Action "
    },
    {
        "labelId": "BL00196",
        "en": "New Travel Claim  "
    },
    {
        "labelId": "BL00197",
        "en": "Fare Amount"
    },
    {
        "labelId": "BL00198",
        "en": "Amount (Excluding Tax)"
    },
    {
        "labelId": "BL00199",
        "en": "Invoice No."
    },
    {
        "labelId": "BL00200",
        "en": "For Cashier"
    },
    {
        "labelId": "BL00201",
        "en": "Paid Amount"
    },
    {
        "labelId": "BL00202",
        "en": "Employee Leave Request"
    },
    {
        "labelId": "BL00203",
        "en": "Approve Leave Request"
    },
    {
        "labelId": "BL00204",
        "en": "View Leave Request"
    },
    {
        "labelId": "BL00205",
        "en": "New Leave Request"
    },
    {
        "labelId": "BL00206",
        "en": "Leave Summary"
    },
    {
        "labelId": "BL00207",
        "en": "Approve Employee Leave"
    },
    {
        "labelId": "BL00208",
        "en": "Annual Leave season two balance"
    },
    {
        "labelId": "BL00209",
        "en": "Special Leave taken"
    },
    {
        "labelId": "BL00210",
        "en": "New Advance Imprest"
    },
    {
        "labelId": "BL00211",
        "en": "Purpose"
    },
    {
        "labelId": "BL00212",
        "en": "Pay Cash Reimbursement"
    },
    {
        "labelId": "BL00213",
        "en": "New Cash Reimbursement "
    },
    {
        "labelId": "BL00214",
        "en": "Edit Topic"
    },
    {
        "labelId": "BL00215",
        "en": "UnLike"
    },
    {
        "labelId": "BL00216",
        "en": "Comments "
    },
    {
        "labelId": "BL00217",
        "en": "Report"
    },
    {
        "labelId": "BL00218",
        "en": "Employee Corner Report"
    },
    {
        "labelId": "BL00219",
        "en": "Reported Type"
    },
    {
        "labelId": "BL00220",
        "en": "Created By"
    },
    {
        "labelId": "BL00221",
        "en": "Bill Amount"
    },
    {
        "labelId": "BL00222",
        "en": "File"
    },
    {
        "labelId": "BL00223",
        "en": "Distance"
    },
    {
        "labelId": "BL00224",
        "en": "Pay Claim Request "
    },
    {
        "labelId": "BL00225",
        "en": "For Approver"
    },
    {
        "labelId": "BL00226",
        "en": "Approve Advance Request"
    },
    {
        "labelId": "BL00227",
        "en": "Pay Advance Imprest"
    },
    {
        "labelId": "BL00228",
        "en": "Search User"
    },
    {
        "labelId": "BL00229",
        "en": "Organizational Values"
    },
    {
        "labelId": "BL00230",
        "en": "Message"
    },
    {
        "labelId": "BL00231",
        "en": "Details"
    },
    {
        "labelId": "BL00232",
        "en": "ID"
    },
    {
        "labelId": "BL00233",
        "en": "New Memorandum"
    },
    {
        "labelId": "BL00234",
        "en": "Memorandum Request"
    },
    {
        "labelId": "BL00235",
        "en": "View Memorandum Request"
    },
    {
        "labelId": "BL00236",
        "en": "New Memorandum Request"
    },
    {
        "labelId": "BL00237",
        "en": "Reference No"
    },
    {
        "labelId": "BL00238",
        "en": "Memo Type"
    },
    {
        "labelId": "BL00239",
        "en": "Submitted Date"
    },
    {
        "labelId": "BL00240",
        "en": "Normal"
    },
    {
        "labelId": "BL00241",
        "en": "Express"
    },
    {
        "labelId": "BL00242",
        "en": "Memo Classification"
    },
    {
        "labelId": "BL00243",
        "en": "Standard"
    },
    {
        "labelId": "BL00244",
        "en": "Confidential"
    },
    {
        "labelId": "BL00245",
        "en": "Select multiple approver (If required)*"
    },
    {
        "labelId": "BL00246",
        "en": "Approver Name"
    },
    {
        "labelId": "BL00247",
        "en": "Internal Memorandum"
    },
    {
        "labelId": "BL00248",
        "en": "Consent Raised By"
    },
    {
        "labelId": "BL00249",
        "en": "Query"
    },
    {
        "labelId": "BL00250",
        "en": "For Consent Reply"
    },
    {
        "labelId": "BL00251",
        "en": "Answer"
    },
    {
        "labelId": "BL00252",
        "en": "Consent Memorandum"
    },
    {
        "labelId": "BL00253",
        "en": "Consent Memorandum Request"
    },
    {
        "labelId": "BL00254",
        "en": "Approve Memorandum"
    },
    {
        "labelId": "BL00255",
        "en": "Approve Memorandum Request"
    },
    {
        "labelId": "BL00256",
        "en": "Referral Jobs"
    },
    {
        "labelId": "BL00257",
        "en": "Remark by Talent HR Second"
    },
    {
        "labelId": "BL00258",
        "en": "Remark by Talent HR First"
    },
    {
        "labelId": "BL00259",
        "en": "Joining Date"
    },
    {
        "labelId": "BL00260",
        "en": "New Joinee"
    },
    {
        "labelId": "BL00261",
        "en": "Referral Joinee Form"
    },
    {
        "labelId": "BL00262",
        "en": "Referral Applicants"
    },
    {
        "labelId": "BL00263",
        "en": "Official Information"
    },
    {
        "labelId": "BL00264",
        "en": "Type Of Employee"
    },
    {
        "labelId": "BL00265",
        "en": "Employee Category"
    },
    {
        "labelId": "BL00266",
        "en": "Division Code"
    },
    {
        "labelId": "BL00267",
        "en": "Zone Code"
    },
    {
        "labelId": "BL00268",
        "en": "Vertical Code"
    },
    {
        "labelId": "BL00269",
        "en": "Sub-Department"
    },
    {
        "labelId": "BL00270",
        "en": "City"
    },
    {
        "labelId": "BL00271",
        "en": "State"
    },
    {
        "labelId": "BL00272",
        "en": "Date Of Joining"
    },
    {
        "labelId": "BL00273",
        "en": "RM"
    },
    {
        "labelId": "BL00274",
        "en": "H.O.D."
    },
    {
        "labelId": "BL00275",
        "en": "Personal Information"
    },
    {
        "labelId": "BL00276",
        "en": "Salutation"
    },
    {
        "labelId": "BL00277",
        "en": "First Name"
    },
    {
        "labelId": "BL00278",
        "en": "Middle Name"
    },
    {
        "labelId": "BL00279",
        "en": "Last Name"
    },
    {
        "labelId": "BL00280",
        "en": "Date Of Birth"
    },
    {
        "labelId": "BL00281",
        "en": "Gender"
    },
    {
        "labelId": "BL00282",
        "en": "Marital Status"
    },
    {
        "labelId": "BL00283",
        "en": "Contact Number"
    },
    {
        "labelId": "BL00284",
        "en": "Emergency Contact Number"
    },
    {
        "labelId": "BL00285",
        "en": "Present Address"
    },
    {
        "labelId": "BL00286",
        "en": "Permanent Address"
    },
    {
        "labelId": "BL00287",
        "en": "Create Job"
    },
    {
        "labelId": "BL00288",
        "en": "Referral Job Entry"
    },
    {
        "labelId": "BL00289",
        "en": "Add Job"
    },
    {
        "labelId": "BL00290",
        "en": "Edit Job"
    },
    {
        "labelId": "BL00291",
        "en": "Joining Status"
    },
    {
        "labelId": "BL00292",
        "en": "Referral Application Form"
    },
    {
        "labelId": "BL00293",
        "en": "Applicant Details"
    },
    {
        "labelId": "BL00294",
        "en": "Job Code"
    },
    {
        "labelId": "BL00295",
        "en": "Internal Jobs"
    },
    {
        "labelId": "BL00296",
        "en": "Job Application Form"
    },
    {
        "labelId": "BL00297",
        "en": "Internal Job Posting Applicants"
    },
    {
        "labelId": "BL00298",
        "en": "Current Role Since"
    },
    {
        "labelId": "BL00299",
        "en": "IJP Position Name"
    },
    {
        "labelId": "BL00300",
        "en": "IJP Designation"
    },
    {
        "labelId": "BL00301",
        "en": "IJP Department"
    },
    {
        "labelId": "BL00302",
        "en": "IJP Location"
    },
    {
        "labelId": "BL00303",
        "en": "Applied On Date"
    },
    {
        "labelId": "BL00304",
        "en": "Official Email Id"
    },
    {
        "labelId": "BL00305",
        "en": "Approved by RM Name"
    },
    {
        "labelId": "BL00306",
        "en": "Approved by RM on Date"
    },
    {
        "labelId": "BL00307",
        "en": "Approved by Approver Name"
    },
    {
        "labelId": "BL00308",
        "en": "Approved by Approver on Date"
    },
    {
        "labelId": "BL00309",
        "en": "Remark By Talent HR"
    },
    {
        "labelId": "BL00310",
        "en": "Total Experience"
    },
    {
        "labelId": "BL00311",
        "en": "Full Name"
    },
    {
        "labelId": "BL00312",
        "en": "Approve Applicants Request"
    },
    {
        "labelId": "BL00313",
        "en": "Masters"
    },
    {
        "labelId": "BL00314",
        "en": "Active"
    },
    {
        "labelId": "BL00315",
        "en": "Inactive"
    },
    {
        "labelId": "BL00316",
        "en": "Create"
    },
    {
        "labelId": "BL00317",
        "en": "Bill Code"
    },
    {
        "labelId": "BL00318",
        "en": "Bill Type"
    },
    {
        "labelId": "BL00319",
        "en": "City Name"
    },
    {
        "labelId": "BL00320",
        "en": "City Code"
    },
    {
        "labelId": "BL00321",
        "en": "City Type Mappig"
    },
    {
        "labelId": "BL00322",
        "en": "City Type Code"
    },
    {
        "labelId": "BL00323",
        "en": "Department Code"
    },
    {
        "labelId": "BL00324",
        "en": "Department Name"
    },
    {
        "labelId": "BL00325",
        "en": "Designation Code"
    },
    {
        "labelId": "BL00326",
        "en": "Designation Name"
    },
    {
        "labelId": "BL00327",
        "en": "Division"
    },
    {
        "labelId": "BL00328",
        "en": "Division Name"
    },
    {
        "labelId": "BL00329",
        "en": "Employee Category Code"
    },
    {
        "labelId": "BL00330",
        "en": "Employee Category Name"
    },
    {
        "labelId": "BL00331",
        "en": "Employee Type"
    },
    {
        "labelId": "BL00332",
        "en": "Employee Type Code"
    },
    {
        "labelId": "BL00333",
        "en": "Employee Type Name"
    },
    {
        "labelId": "BL00334",
        "en": "Gender"
    },
    {
        "labelId": "BL00335",
        "en": "Gender Code"
    },
    {
        "labelId": "BL00336",
        "en": "Gender Name"
    },
    {
        "labelId": "BL00337",
        "en": "Grade"
    },
    {
        "labelId": "BL00338",
        "en": "Grade Code"
    },
    {
        "labelId": "BL00339",
        "en": "Grade Name"
    },
    {
        "labelId": "BL00340",
        "en": "HOD Code"
    },
    {
        "labelId": "BL00341",
        "en": "HOD Name"
    },
    {
        "labelId": "BL00342",
        "en": "Leave Category Code"
    },
    {
        "labelId": "BL00343",
        "en": "Leave Category Name"
    },
    {
        "labelId": "BL00344",
        "en": "Local Travel Mode Eligibility"
    },
    {
        "labelId": "BL00345",
        "en": "Eligibility Type"
    },
    {
        "labelId": "BL00346",
        "en": "Eligibility Unit"
    },
    {
        "labelId": "BL00347",
        "en": "Eligibility Amount"
    },
    {
        "labelId": "BL00348",
        "en": "Location Code"
    },
    {
        "labelId": "BL00349",
        "en": "Location Name"
    },
    {
        "labelId": "BL00350",
        "en": "Marital Status Code"
    },
    {
        "labelId": "BL00351",
        "en": "Marital Status Name"
    },
    {
        "labelId": "BL00352",
        "en": "Travel Mode Eligibility"
    },
    {
        "labelId": "BL00353",
        "en": "Salutation Code"
    },
    {
        "labelId": "BL00354",
        "en": "Salutation Name"
    },
    {
        "labelId": "BL00355",
        "en": "State Code"
    },
    {
        "labelId": "BL00356",
        "en": "State Name"
    },
    {
        "labelId": "BL00357",
        "en": "Sub Department Code"
    },
    {
        "labelId": "BL00358",
        "en": "Sub Department Name"
    },
    {
        "labelId": "BL00359",
        "en": "Vertical"
    },
    {
        "labelId": "BL00360",
        "en": "Vertical Name"
    },
    {
        "labelId": "BL00361",
        "en": "Zone "
    },
    {
        "labelId": "BL00362",
        "en": "Zone Name"
    },
    {
        "labelId": "BL00363",
        "en": "Organizational Code"
    },
    {
        "labelId": "BL00364",
        "en": "Organizational Name"
    },
    {
        "labelId": "BL00365",
        "en": "Training Category"
    },
    {
        "labelId": "BL00366",
        "en": "Training Category Code"
    },
    {
        "labelId": "BL00367",
        "en": "Training Category Name"
    },
    {
        "labelId": "BL00368",
        "en": "Training Sub Category"
    },
    {
        "labelId": "BL00369",
        "en": "Training Sub Category Name"
    },
    {
        "labelId": "BL00370",
        "en": "Training Sub Category Code"
    },
    {
        "labelId": "BL00371",
        "en": "Created Date"
    },
    {
        "labelId": "BL00372",
        "en": "Internal Job Entry"
    },
    {
        "labelId": "BL00373",
        "en": "Internal Job Posting Form"
    },
    {
        "labelId": "BL00374",
        "en": "Code"
    },
    {
        "labelId": "BL00375",
        "en": "Training List"
    },
    {
        "labelId": "BL00376",
        "en": "Approve Training Requests"
    },
    {
        "labelId": "BL00377",
        "en": "Trx No"
    },
    {
        "labelId": "BL00378",
        "en": "Requested Date"
    },
    {
        "labelId": "BL00379",
        "en": "Training Name"
    },
    {
        "labelId": "BL00380",
        "en": "Training Detail"
    },
    {
        "labelId": "BL00381",
        "en": "Learning Platform"
    },
    {
        "labelId": "BL00382",
        "en": "For Admin"
    },
    {
        "labelId": "BL00383",
        "en": "Training Duration"
    },
    {
        "labelId": "BL00384",
        "en": "Training Description"
    },
    {
        "labelId": "BL00385",
        "en": "Edit Training Application"
    },
    {
        "labelId": "BL00386",
        "en": "Applied"
    },
    {
        "labelId": "BL00387",
        "en": "View Training Application"
    },
    {
        "labelId": "BL00388",
        "en": "New Training Application "
    },
    {
        "labelId": "BL00389",
        "en": "Training Applications"
    },
    {
        "labelId": "BL00390",
        "en": "Upcoming Trainings"
    },
    {
        "labelId": "BL00391",
        "en": "Applied Trainings"
    },
    {
        "labelId": "BL00392",
        "en": "Poll Now"
    },
    {
        "labelId": "BL00393",
        "en": "Poll List"
    },
    {
        "labelId": "BL00394",
        "en": "Poll Master List"
    },
    {
        "labelId": "BL00395",
        "en": "Create Poll"
    },
    {
        "labelId": "BL00396",
        "en": "Question"
    },
    {
        "labelId": "BL00397",
        "en": "Set Options"
    },
    {
        "labelId": "BL00398",
        "en": "Option1"
    },
    {
        "labelId": "BL00399",
        "en": "Option2"
    },
    {
        "labelId": "BL00400",
        "en": "Option3"
    },
    {
        "labelId": "BL00401",
        "en": "Option4"
    },
    {
        "labelId": "BL00402",
        "en": "Poll Publish Date"
    },
    {
        "labelId": "BL00403",
        "en": "Add Survey"
    },
    {
        "labelId": "BL00404",
        "en": "Assign User Role"
    },
    {
        "labelId": "BL00405",
        "en": "Edit Survey"
    },
    {
        "labelId": "BL00406",
        "en": "S.No"
    },
    {
        "labelId": "BL00407",
        "en": "My Job Application"
    },
    {
        "labelId": "BL00408",
        "en": "Job Type"
    },
    {
        "labelId": "BL00409",
        "en": "Pending With"
    },
    {
        "labelId": "BL00410",
        "en": "Wishes Sent"
    },
    {
        "labelId": "BL00411",
        "en": "Travel Claim Detail"
    },
    {
        "labelId": "BL00412",
        "en": "Cash Reimbursement Detail"
    },
    {
        "labelId": "BL00413",
        "en": "Approver History"
    },
    {
        "labelId": "BL00414",
        "en": "Banners"
    },
    {
        "labelId": "BL00415",
        "en": "Add Banner"
    },
    {
        "labelId": "BL00416",
        "en": "Upload Banner"
    },
    {
        "labelId": "BL00417",
        "en": "Edit Banner"
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
