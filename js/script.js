// =========================================
// 1. FUNGSI TOGGLE MENU HAMBURGER
// =========================================
// Mengambil elemen tombol dan menu dari HTML
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Tambahkan event listener saat tombol diklik
menuToggle.addEventListener('click', function() {
    // Toggle class 'active' pada menu
    // Jika ada class 'active', akan dihapus. Jika tidak ada, akan ditambahkan
    navMenu.classList.toggle('active');
    
    // Ubah simbol hamburger jadi silang (X) saat menu terbuka
    if (navMenu.classList.contains('active')) {
        menuToggle.innerHTML = '&#10005;'; // Simbol X
    } else {
        menuToggle.innerHTML = '&#9776;'; // Simbol hamburger
    }
});

// =========================================
// 2. TUTUP MENU SAAT LINK DIKLIK
// =========================================
// Ambil semua link di dalam menu navigasi
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Tutup menu (hilangkan class 'active')
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '&#9776;'; // Kembalikan ke simbol hamburger
    });
});

// =========================================
// 3. SMOOTH SCROLL (GULIR HALUS)
// =========================================
// Saat link dengan href="#..." diklik, scroll akan halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah perilaku default (lompat instan)
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Animasi gulir halus
                block: 'start'
            });
        }
    });
});

// =========================================
// 4. ANIMASI FADE-IN SAAT SCROLL (BONUS)
// =========================================
// Ambil semua kartu produk
const kartuProduk = document.querySelectorAll('.kartu-produk, .item-keunggulan');

// Fungsi untuk mengecek apakah elemen sudah terlihat di layar
function cekScroll() {
    kartuProduk.forEach(kartu => {
        const posisiKartu = kartu.getBoundingClientRect().top;
        const tinggiLayar = window.innerHeight;
        
        // Jika bagian atas kartu sudah masuk layar (kurang dari 80% tinggi layar)
        if (posisiKartu < tinggiLayar * 0.8) {
            kartu.style.opacity = '1';
            kartu.style.transform = 'translateY(0)';
        }
    });
}

// Set kondisi awal: semua kartu transparan dan turun sedikit
kartuProduk.forEach(kartu => {
    kartu.style.opacity = '0';
    kartu.style.transform = 'translateY(30px)';
    kartu.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Jalankan fungsi cekScroll saat halaman dimuat dan saat user scroll
window.addEventListener('load', cekScroll);
window.addEventListener('scroll', cekScroll);

// =========================================
// 5. VALIDASI FORM KONTAK (UNTUK HALAMAN KONTAK NANTI)
// =========================================
// Fungsi ini akan dipakai di halaman kontak.html
function validasiForm(event) {
    event.preventDefault(); // Mencegah form terkirim secara default
    
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const pesan = document.getElementById('pesan').value.trim();
    
    // Validasi sederhana
    if (nama === '' || email === '' || pesan === '') {
        alert('Mohon lengkapi semua field!');
        return false;
    }
    
    // Validasi format email sederhana
    const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatEmail.test(email)) {
        alert('Format email tidak valid!');
        return false;
    }
    
    // Jika semua valid
    alert('Terima kasih ' + nama + '! Pesan Anda telah terkirim.');
    
    // Reset form
    document.getElementById('form-kontak').reset();
    return true;
}

// Console log untuk debugging (bisa dihapus nanti)
console.log('Irham Cell - Website berhasil dimuat!');

// =========================================
// 6. FILTER PRODUK DI HALAMAN KATALOG
// =========================================
// Ambil semua tombol filter
const filterButtons = document.querySelectorAll('.filter-btn');
const produkItems = document.querySelectorAll('.kartu-produk');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Hapus class 'active' dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan class 'active' ke tombol yang diklik
        this.classList.add('active');
        
        // Ambil nilai filter dari data-filter
        const filterValue = this.getAttribute('data-filter');
        
        // Loop semua produk
        produkItems.forEach(item => {
            if (filterValue === 'semua') {
                // Tampilkan semua produk
                item.classList.remove('hidden');
            } else {
                // Cek apakah kategori produk cocok dengan filter
                if (item.getAttribute('data-kategori') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

