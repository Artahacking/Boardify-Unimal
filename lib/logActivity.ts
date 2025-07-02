// logActivity.ts

// Fungsi untuk mencatat aktivitas
export const logActivity = (description: string, user: string, options?: { link?: string }) => {
    const activityLog = localStorage.getItem("activityLog");
    const logData = activityLog ? JSON.parse(activityLog) : [];
  
    const newLogItem = {
      id: logData.length + 1, // Menggunakan panjang log data untuk memberikan ID unik
      description,            // Deskripsi aktivitas
      timestamp: new Date().toLocaleString(), // Waktu pencatatan
      user,                   // Pengguna yang melakukan aktivitas
      ...options              // Menyertakan tautan atau opsi lain jika ada
    };
  
    logData.push(newLogItem); // Tambahkan log baru ke log data
    localStorage.setItem("activityLog", JSON.stringify(logData)); // Simpan log ke local storage
  };
  
  // Fungsi untuk mendapatkan log aktivitas
  export const getActivityLog = (): ActivityItem[] => {
    // Mengambil log aktivitas dari local storage
    const activityLog = localStorage.getItem("activityLog");
  
    // Jika tidak ada log yang tersimpan, kembalikan array kosong
    if (!activityLog) {
      return [];
    }
  
    // Mengembalikan log aktivitas yang sudah diparsing menjadi array objek
    return JSON.parse(activityLog);
  };
  
  // Tipe data untuk aktivitas log
  export interface ActivityItem {
    id: number;   
    name: string;            // ID unik untuk setiap log
    description: string;      // Deskripsi aktivitas
    timestamp: string;        // Waktu pencatatan log
    user: string;             // Pengguna yang melakukan aktivitas
    link?: string;            // Tautan opsional untuk menghubungkan aksi dengan deskripsi atau file yang terkait
  }
  