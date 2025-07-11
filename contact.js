// Contact Page Specific JavaScript - Valmortheos Portfolio

document.addEventListener('DOMContentLoaded', () => {
    console.log("Contact page JS loaded.");

    const contactForm = document.getElementById('contactForm'); // Pastikan form memiliki ID 'contactForm'

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah submit form standar

            // Ambil data form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            // Validasi sederhana (bisa diperluas)
            if (name === '') {
                alert('Nama tidak boleh kosong.');
                isValid = false;
                return;
            }

            if (email === '') {
                alert('Email tidak boleh kosong.');
                isValid = false;
                return;
            } else if (!validateEmail(email)) {
                alert('Format email tidak valid.');
                isValid = false;
                return;
            }

            if (message === '') {
                alert('Pesan tidak boleh kosong.');
                isValid = false;
                return;
            }

            if (isValid) {
                // Simulasi pengiriman form
                console.log('Form submitted (simulated):');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                // Tampilkan pesan sukses (placeholder)
                const formSection = document.querySelector('.contact-form-section');
                let successMessage = formSection.querySelector('.form-success-message');
                if (!successMessage) {
                    successMessage = document.createElement('p');
                    successMessage.classList.add('form-success-message');
                    successMessage.style.color = 'green';
                    successMessage.style.marginTop = '1rem';
                    successMessage.style.textAlign = 'center';
                    formSection.appendChild(successMessage);
                }
                successMessage.textContent = 'Pesan Anda telah "dikirim"! (Ini hanya simulasi)';

                contactForm.reset(); // Reset form setelah "submit"

                // Hapus pesan sukses setelah beberapa detik
                setTimeout(() => {
                    if (successMessage) successMessage.remove();
                }, 5000);

                // Di aplikasi nyata, Anda akan mengirim data ini ke server
                // menggunakan fetch() atau XMLHttpRequest
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Pesan Anda telah terkirim!');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat mengirim pesan.');
                });
                */
            }
        });
    }

    // Fungsi validasi email sederhana
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Animasi input focus (jika diperlukan lebih dari CSS)
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        // Untuk label yang tetap di atas jika ada isi (misal saat autofill)
        if (input.value !== '') {
             input.parentElement.classList.add('focused');
        }
    });

});
