async function loadProducts() {
  const res = await fetch('data/products.json');
  return await res.json();
}

function createNav(products) {
  const navLinks = document.getElementById('navLinks');
  const mobileMenu = document.getElementById('mobileMenu');

  function addSimple(text, href) {
    const a = document.createElement('a');
    a.className = 'py-2 px-2';
    a.href = href;
    a.textContent = text;
    navLinks.appendChild(a);

    const m = a.cloneNode(true);
    mobileMenu.appendChild(m);
  }

  addSimple('Home', 'index.html');
  addSimple('About Us', 'about.html');

  const categories = ['Engineering Products', 'GRC Products', 'Metals & Mining Ores', 'Other Products'];
  categories.forEach(cat => {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative group';
    const button = document.createElement('button');
    button.className = 'py-2 px-2';
    button.textContent = `${cat} \u25BC`;
    wrapper.appendChild(button);

    const dropdown = document.createElement('div');
    dropdown.className = 'absolute hidden group-hover:block bg-white shadow mt-2';
    const catProducts = products.filter(p => p.category === cat);
    if (catProducts.length === 0) {
      const span = document.createElement('span');
      span.className = 'block px-4 py-2 text-gray-500';
      span.textContent = 'Coming soon';
      dropdown.appendChild(span);
    } else {
      catProducts.forEach(p => {
        const a = document.createElement('a');
        a.className = 'block px-4 py-2 hover:bg-gray-100';
        a.href = `product.html?id=${p.id}`;
        a.textContent = p.name;
        dropdown.appendChild(a);
      });
    }
    wrapper.appendChild(dropdown);
    navLinks.appendChild(wrapper);

    const m = wrapper.cloneNode(true);
    mobileMenu.appendChild(m);
  });

  addSimple('Contact Us', 'contact.html');

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

function populateHomepage(products) {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  products.filter(p => p.homepage).forEach(p => {
    const card = document.createElement('a');
    card.href = `product.html?id=${p.id}`;
    card.className = 'border p-4 block hover:shadow';
    card.innerHTML = `<img src="${p.image}" alt="${p.name}" class="mb-2"><h3 class="font-semibold">${p.name}</h3><p>${p.tagline}</p>`;
    grid.appendChild(card);
  });
}

function populateProductPage(products) {
  const detail = document.getElementById('productDetail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const product = products.find(p => p.id === params.get('id'));
  if (!product) {
    detail.textContent = 'Product not found';
    return;
  }
  const specs = product.specs.map(s => `<li>${s}</li>`).join('');
  detail.innerHTML = `
    <div class="md:flex gap-6">
      <img src="${product.image}" alt="${product.name}" class="md:w-1/2 mb-4 md:mb-0">
      <div class="md:w-1/2">
        <h1 class="text-2xl font-semibold mb-2">${product.name}</h1>
        <p class="mb-4">${product.tagline}</p>
        <ul class="list-disc ml-6 mb-4">${specs}</ul>
        <form action="#" method="POST" class="space-y-2 bg-gray-100 p-4">
          <input type="hidden" name="product" value="${product.name}">
          <input type="text" name="name" placeholder="Name" class="w-full border p-2" required>
          <input type="email" name="email" placeholder="Email" class="w-full border p-2" required>
          <textarea name="message" placeholder="Message" class="w-full border p-2" required></textarea>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2">Inquire</button>
        </form>
      </div>
    </div>`;
}

loadProducts().then(products => {
  createNav(products);
  populateHomepage(products);
  populateProductPage(products);
});

// Stats count up
window.addEventListener('scroll', () => {
  document.querySelectorAll('#stats span').forEach(el => {
    if (el.dataset.done) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.dataset.done = true;
      const target = +el.dataset.count;
      let n = 0;
      const inc = target / 60;
      const interval = setInterval(() => {
        n += inc;
        if (n >= target) { n = target; clearInterval(interval); }
        el.textContent = Math.round(n);
      }, 30);
    }
  });
});
