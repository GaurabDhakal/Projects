function checkActive(attribute,winAddress){
    console.log(winAddress)
    if(winAddress.endsWith(attribute)||winAddress=="/"&&attribute=="index.html"){
        return true;
      }
}
  function buildHTML(elementData) {
      const element = document.createElement(elementData.tagName);
      for (const attribute in elementData.attributes) {
        if (elementData.tagName == 'a'&&checkActive(elementData.attributes.href, window.location.pathname)) {
            element.classList.add('active');
        }
        if (attribute === 'class') {
          element.classList.add(...elementData.attributes[attribute].split(' ')); 
        } 
        else{
          element.setAttribute(attribute, elementData.attributes[attribute]);
      }
      }

      if (elementData.content) {
        if (typeof elementData.content === 'string') {
          element.textContent = elementData.content;
        } else {
          elementData.content.forEach(child => {
            element.appendChild(buildHTML(child)); 
          });
        }
      }

      return element;
    }



async function fetchAndParseJSON() {
  const response = await fetch('./JS/navbar.json');
  const data = await response.json();
  const navigation = buildHTML(data[0]); 
  navbarContainer.appendChild(navigation);
  const elem = document.querySelector(".active")
  elem.href = "#"
  console.log(elem)
}
fetchAndParseJSON();


