// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('contactForm');
//     if (!form) return;
  
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
  
//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData.entries());
  
//       try {
//         const res = await fetch('/contact', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
  
//         const msg = await res.text();
  
//         if (res.ok) {
//           alert(msg); // ✅ success popup
//           form.reset();
//         } else {
//           alert('❌ ' + msg);
//         }
//       } catch (err) {
//         alert('Something went wrong!');
//         console.error(err);
//       }
//     });
//   });
  
// Get the popup and close button elements
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Handle form submission
document.getElementById('contact').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Show the popup
  popup.style.display = 'flex';

  // Optionally, you can clear the form fields after submission
  document.getElementById('contactForm').reset();
});

// Close the popup when the button is clicked
closePopup.addEventListener('click', function() {
  popup.style.display = 'none';
});

