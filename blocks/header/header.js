import { decorateIcons, getMetadata } from '../../scripts/aem.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';

  const headerMeta = getMetadata('header');
  const headerPath = headerMeta ? new URL(headerMeta).pathname : '/header';
  const resp = await fetch(`${headerPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();

    // decorate header DOM
    const header = document.createElement('div');
    header.innerHTML = html;

    //add Adobe Logo infront of Title
    // Create a "image" element:
    const logo = document.createElement("img");
    logo.src = "/images/logo-distillery.webp";
    logo.id = "header-logo";
    logo.alt = "Header Logo";
    
    // Insert before h1 title:
    header.firstElementChild.insertBefore(logo, header.firstElementChild.children[0]);

    // Create a "image" element:
    const edgybatch = document.createElement("img");
    edgybatch.src = "/images/logo-edgeybatch.webp";
    edgybatch.id = "edgybatch";
    edgybatch.alt = "Main Logo EdgeyBatch";
    // Insert before h1 title:
    header.firstElementChild.insertBefore(edgybatch, header.firstElementChild.children[1]);
  
    decorateIcons(header);
    block.append(header);
  }
}
