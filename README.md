# Thrayee Engineering & Infra Solutions Website Template

This repository contains a simple TailwindCSS-based template for a responsive website that loads products from `products.json`. It demonstrates a mobile-first layout with a dynamic navigation menu, featured products grid, product detail page, and contact form with an embedded Google map.

## JSON Structure

`data/products.json` holds product information used across the site.

```json
{
  "id": "hydraulic-pump",
  "name": "Hydraulic Pump",
  "tagline": "High-efficiency industrial pump",
  "specs": ["Pressure: 100 bar", "Flow rate: 50 L/min"],
  "image": "images/hydraulic-pump.jpg",
  "category": "Engineering Products",
  "homepage": true
}
```

- `id`: unique identifier used in product page URLs (`product.html?id=ID`)
- `name`: display name
- `tagline`: short description
- `specs`: bullet list shown on detail page
- `image`: path to the product image
- `category`: used to group products under dropdown menus
- `homepage`: if `true`, product appears in the homepage grid

## Deployment on Hostinger

1. Create a new Git repository on GitHub and push this code.
2. In Hostinger's **Git Manager**, add your repository and deploy via SSH key.
3. Whenever you update `products.json` or any site files, commit and push to GitHub, then trigger a pull from Hostinger.
4. No build step is required; HTML files are served directly.

## Embedding the Map

The homepage includes a Google Maps iframe pointing to JNTU Hyderabad:

```html
<iframe src="https://www.google.com/maps?q=JNTU%20Hyderabad&output=embed"></iframe>
```

Replace the location or parameters if needed. Google Maps provides an "Embed a map" option to generate this URL.

## Contact Forms

The template provides simple HTML forms on the homepage and product pages. They do not submit anywhere by default; integrate them with your own backend or service if needed.



## Missing Figma/XD Files

A full visual design in Figma or Adobe XD is outside the scope of this text-based environment. Use the structure and Tailwind classes in the provided HTML files as a starting point for further design work.
