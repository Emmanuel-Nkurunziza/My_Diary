// Mobile Menu
const mobileMenuBtn = document.querySelector('.menu-button');
const mobileMenuWrapper = document.querySelector('.menu4mobile');
const closeMenuBtn = document.querySelector('.close-menu');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  closeMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.add('hidden');
    document.body.style.overflow = 'unset';
  });
}

// Display the delete modal
document.querySelector('#infopanel').addEventListener('click', () => {
  document.getElementById('infopanel').style.display = 'block';
});