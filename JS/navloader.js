function checkActive(attribute,winAddress){
if(winAddress.endsWith(attribute)){
    return true;
  }
}
  
  function buildHTML(elementData) {
      const element = document.createElement(elementData.tagName);
      for (const attribute in elementData.attributes) {
        if (elementData.tagName == 'a'&&checkActive(elementData.attributes.href , window.location.pathname)) {
            element.classList.add('active');
        }
        if (attribute === 'class') {
          element.classList.add(...elementData.attributes[attribute].split(' ')); 
        } 
        else if(attribute=='href'&&!element.classList.contains("active")){
          console.log(element.classList.contains("active"))
          element.setAttribute(attribute,elementData.attributes[attribute]);
        }else{
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
  console.log(data)
  navbarContainer.appendChild(navigation); 
}
fetchAndParseJSON();
