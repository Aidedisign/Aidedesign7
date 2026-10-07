// 📌 HOSTEL DATA — edit this list to add real UCC hostels
const hostels = [
  {
    id: 1,
    name: "Ampersand Hostel",
    location: "Amamoma, UCC",
    price: 2800,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
    rooms: "Single & Double rooms available"
  },
  {
    id: 2,
    name: "Sasakawa Hostel",
    location: "Sasakawa, UCC Campus",
    price: 1800,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    rooms: "4-in-a-room, shared facilities"
  },
  {
    id: 3,
    name: "Valco Hostel",
    location: "Kwame Nkrumah Circle, UCC",
    price: 3200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    rooms: "Double rooms with private bath"
  },
  {
    id: 4,
    name: "Casford Hostel",
    location: "Science, UCC",
    price: 2500,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    rooms: "2-in-a-room, en-suite"
  },
  {
    id: 5,
    name: "Atlantic Hostel",
    location: "Apewosika, UCC",
    price: 3800,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
    rooms: "Single rooms with AC"
  },
  {
    id: 6,
    name: "Oguaa Hostel",
    location: "Amamoma, UCC",
    price: 2200,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600",
    rooms: "4-in-a-room, shared kitchen"
  }
];

let selectedHostel = null;

// Render hostel cards
function renderHostels(list) {
  const container = document.getElementById("hostelList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No hostels match your search.</p>";
    return;
  }

  list.forEach(h => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${h.image}" alt="${h.name}">
      <div class="card-body">
        <h3>${h.name}</h3>
        <p class="location">📍 ${h.location}</p>
        <p class="price">GHS ${h.price.toLocaleString()} / semester</p>
        <p style="font-size:0.85rem;color:#555;margin-bottom:10px;">${h.rooms}</p>
        <button onclick="openModal(${h.id})">Reserve Now</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Open reservation modal
function openModal(id) {
  selectedHostel = hostels.find(h => h.id === id);
  document.getElementById("modalTitle").textContent = `Reserve: ${selectedHostel.name}`;
  document.getElementById("modalInfo").textContent =
    `GHS ${selectedHostel.price.toLocaleString()} / semester — ${selectedHostel.location}`;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("reserveForm").reset();
}

// Handle reservation submission
function submitReservation(event) {
  event.preventDefault();
  const name = document.getElementById("studentName").value;
  const email = document.getElementById("studentEmail").value;
  const phone = document.getElementById("studentPhone").value;

  // For now, we save to localStorage so you can see reservations later
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  reservations.push({
    hostel: selectedHostel.name,
    price: selectedHostel.price,
    studentName: name,
    email,
    phone,
    date: new Date().toISOString()
  });
  localStorage.setItem("reservations", JSON.stringify(reservations));

  alert(`✅ Reservation confirmed for ${selectedHostel.name}!\nWe'll contact you at ${email}.`);
  closeModal();
}

// Search & filter
function filterHostels() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const priceRange = document.getElementById("priceFilter").value;

  let filtered = hostels.filter(h =>
    h.name.toLowerCase().includes(query) ||
    h.location.toLowerCase().includes(query)
  );

  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter(h => h.price >= min && h.price <= max);
  }

  renderHostels(filtered);
}

document.getElementById("searchBox").addEventListener("input", filterHostels);
document.getElementById("priceFilter").addEventListener("change", filterHostels);

// Initial render
renderHostels(hostels);
