// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the target element's ID
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          // Smooth scroll to the target element
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  });
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove 'active' class from all links
    navLinks.forEach(l => l.classList.remove('active'));
    // Add 'active' class to the clicked link
    this.classList.add('active');
  });
});

// Select all skill cards with the 'animate' class
const skillCards = document.querySelectorAll('.animate');

// Function to check if an element is in the viewport
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to add 'in-view' class when the element is scrolled into view
function handleScroll() {
    skillCards.forEach(skillCard => {
        if (isInView(skillCard)) {
            skillCard.classList.add('in-view');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger the scroll function on page load (for any already in view)
handleScroll();

function animateMovingDiv(div, isMobile) {
  const randomX = (isMobile ? Math.random() * 20 - 10 : Math.random() * 30 - 15); // Reduced motion for mobile
  const randomY = (isMobile ? Math.random() * 20 - 10 : Math.random() * 30 - 15); 
  const rotate = (isMobile ? Math.random() * 3 - 1.5 : Math.random() * 5 - 2.5); 

  div.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotate}deg)`;

  setTimeout(() => animateMovingDiv(div, isMobile), 1500 + Math.random() * 1000); 
}

document.addEventListener("DOMContentLoaded", () => {
  const movingDivs = document.querySelectorAll(".moving-div");

  // Detect if the screen width is small (mobile)
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  movingDivs.forEach((div) => animateMovingDiv(div, isMobile));
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  // Function to handle the scroll effect
  const handleScroll = () => {
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    // Remove 'in-view' class from all cards
    cards.forEach((card) => card.classList.remove("in-view"));

    // Add 'in-view' class to the closest card
    if (closestCard) closestCard.classList.add("in-view");
  };

  // Check if the screen width is mobile size (e.g., less than 768px)
  const isMobile = window.innerWidth < 768;

  // Attach the scroll event listener only for mobile screens
  if (isMobile) {
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
  }
});
