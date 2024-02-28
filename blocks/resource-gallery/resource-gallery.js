import { addAnchorLink } from '../../scripts/scripts.js';

function autoLink(string) {
  const pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi;
  return string.replace(pattern, '$1<a href="$2">$2</a>');
}

export default async function decorateFaq($block) {
  const source = new URL($block.querySelector('a').href).pathname;
  const resp = await fetch(source);
  const json = await resp.json();
  $block.innerText = '';
  const $tileWrapper = document.createElement('div');
  $tileWrapper.classList.add('tiles-wrapper');

//Get keys of tags and roles
//alert(Object.keys(row));
  let tagKeys = [];
  let roleKeys = [];

  for (const key in json.data[1]) {
    if (key.substring(0, 2) === "T:") {tagKeys.push(key); }
    if (key.substring(0, 2) === "R:") {roleKeys.push(key); }
  }
  tagKeys.sort();
  roleKeys.sort();
  

  //parsing the JSON rows i.e. the resource records
  json.data.forEach((row, i) => {  
    const $tile = document.createElement('div');
    $tile.classList.add('resource-tile');
    $tile.setAttribute("onclick", "window.open('" +row.URL+ "');");
    $tile.id = `q${(i + 1)}`;

    const $tileInnerShadow = document.createElement('div');
    $tileInnerShadow.classList.add('resource-tile-inner-shadow');    

    //title
    const $title = document.createElement('h1');
    $title.classList.add('resource-tile-title');
    $title.innerText = row.Title;

    //description
    const $description = document.createElement('div');
    $description.classList.add('resource-tile-description');
    $description.innerText = row.Description;

    //Tags
    const $tags = document.createElement('div');
    $tags.classList.add('resource-tile-tags');
  
    let tagText = "";
    for (const tagKey of tagKeys) {
      if (row[tagKey] === "X") {
        const tagLabel = tagKey.substring(2);
        tagText += '<span class="resource-tag-label ' +tagLabel+ '">' +tagLabel+ '</span>';
      }      
    }
    $tags.innerHTML = "Tags: " + tagText;


    //Roles
    const $roles = document.createElement('div');
    $roles.classList.add('resource-tile-roles');
    let roleText = "";
    for (const roleKey of roleKeys) {
      if (row[roleKey] === "X") {
        const roleLabel = roleKey.substring(2);
        roleText += '<span class="resource-role-label ' +roleLabel+ '">' +roleLabel+ '</span>';
      }      
    }
    $roles.innerHTML = "Roles: " + roleText;

    
    //Source
    const $source = document.createElement('div');
    $source.classList.add('resource-tile-source');
    $source.innerHTML = row.Source + ' ★★★★★ 842 <img class="language-flag" width="38" height="38" alt="English" src="/images/language-icons/EN.webp" />';

     
    //info tool tip
    const $info = document.createElement("div");
    $info.classList.add('resource-tile-info');

    let tooltipText = '<div class="resource-tooltip-label">Resource ID:</div><div class="resource-tooltip-value">' +(i+2)+ '</div><br />';
    tooltipText += '<div class="resource-tooltip-label">Contributor:</div><div class="resource-tooltip-value">' +row.Contributor+ '</div><br />';
    tooltipText += '<div class="resource-tooltip-label">Verified on:</div><div class="resource-tooltip-value">' +row.VerificationDate+ '</div>';
    tooltipText += '<div class="resource-tooltip-label">Impressions:</div><div class="resource-tooltip-value">' +row.Impressions+ '</div>';
    tooltipText += '<div class="resource-tooltip-label">Rating:</div><div class="resource-tooltip-value">' +row.Rating+ '</div>';
    $info.innerHTML = '<img class="resource-info-icon" alt ="info button" width="25" height="25" src="/images/info-icon.webp"><div class="resource-tool-tip">' +tooltipText+ '</div>';
      

    $tileInnerShadow.append($title, $source, $description, $roles, $tags, $info);

    $tile.append($tileInnerShadow);
    $tileWrapper.append($tile);
  });
  $block.append($tileWrapper);

  const selected = document.getElementById(window.location.hash.slice(1));
  if (selected) {
    selected.scrollIntoView();
  }
}
