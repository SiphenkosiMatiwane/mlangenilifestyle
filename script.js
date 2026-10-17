/*
  MLANGENI LIFESTYLE WEBSITE
  IMPORTANT: Replace the placeholder below with the business WhatsApp number.
  Use international format without +, spaces or dashes. Example South Africa: 27821234567
*/
const WHATSAPP_NUMBER = "27XXXXXXXXX";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

function openWhatsApp(message) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) {
    alert("To activate WhatsApp orders, open script.js and replace 27XXXXXXXXX with Mlangeni Lifestyle's WhatsApp number.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp("Hi Mlangeni Lifestyle! I'd like to place an order. Please share your menu, prices and availability.");
  });
});
document.querySelectorAll(".order-item").forEach(button => {
  button.addEventListener("click", () => {
    openWhatsApp(`Hi Mlangeni Lifestyle! I'd like to order: ${button.dataset.item}. Please confirm the price and availability.`);
  });
});

const filters = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card[data-category]");
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(filter => filter.classList.toggle("active", filter === button));
  const category = button.dataset.filter;
  menuCards.forEach(card => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
  const special = document.querySelector(".special-card");
  special.hidden = category !== "all";
}));

const chatLauncher = document.getElementById("chatLauncher");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

chatLauncher.addEventListener("click", () => {
  chatWindow.hidden = !chatWindow.hidden;
  if (!chatWindow.hidden) chatInput.focus();
});
chatClose.addEventListener("click", () => { chatWindow.hidden = true; });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") chatWindow.hidden = true;
});

const answers = {
  menu: "Our menu includes kota, loaded kota, burgers, loaded burgers, ribs, chips and other fast-food favourites. Tap a menu item on the website to ask about it or message us on WhatsApp.",
  prices: "Prices can change depending on the meal and available options. We don't want to give you an incorrect price, so please message us on WhatsApp and we'll help confirm the current price.",
  location: "We're in Witbank, Hlalanikahle Ext 3, next to the Taxi Rank and Community Hall. Use the 'Find Us' section on this website for directions.",
  order: "Ordering is easy! Tap any 'Order this' button or the WhatsApp order button, then send your message. We'll confirm availability and price with you.",
  hours: "Our opening hours haven't been added to this website yet. Please message us on WhatsApp to confirm today's opening and closing times.",
  delivery: "Please contact us on WhatsApp to ask whether delivery is available in your area and what the delivery fee may be.",
  contact: "You can contact Mlangeni Lifestyle through the WhatsApp order button on this website. The business WhatsApp number needs to be configured in the website settings.",
  thanks: "You're welcome! 😊 We hope to serve you soon. Message us on WhatsApp if you'd like to order.",
  default: "I can help with our menu, prices, location, ordering, opening hours or delivery. Choose one of the quick questions below, or message us on WhatsApp for more help."
};

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `message ${who === "user" ? "user-message" : "bot-message"}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getAnswer(question) {
  const q = question.toLowerCase();
  if (/menu|food|eat|sell|offer|kota|burger|rib|chip|available/.test(q)) return answers.menu;
  if (/price|cost|how much|cheap|expensive/.test(q)) return answers.prices;
  if (/where|address|location|find you|directions|taxi rank|community hall/.test(q)) return answers.location;
  if (/order|buy|purchase|whatsapp|place an/.test(q)) return answers.order;
  if (/hour|open|close|time|today/.test(q)) return answers.hours;
  if (/deliver|delivery|drop off/.test(q)) return answers.delivery;
  if (/contact|number|phone|call/.test(q)) return answers.contact;
  if (/thank|thanks|thx/.test(q)) return answers.thanks;
  return answers.default;
}
function respond(question) {
  const clean = question.trim();
  if (!clean) return;
  addMessage(clean, "user");
  window.setTimeout(() => addMessage(getAnswer(clean), "bot"), 250);
}
document.querySelectorAll("[data-question]").forEach(button => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    const labels = {menu:"Show me the menu",prices:"What are your prices?",location:"Where are you located?",order:"How do I order?",hours:"What are your opening hours?"};
    respond(labels[question] || question);
  });
});
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  respond(chatInput.value);
  chatInput.value = "";
});
