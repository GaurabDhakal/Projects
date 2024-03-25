let versionInfoElem = document.querySelector(".versionInfo");
let versionInfo = document.createElement("p");

async function getVersion() {
    try {
        let data = await fetch("./version.json"); 
        let versionData = await data.json();
        versionInfo.textContent = `Version: ${versionData[0].version}`;
        versionInfoElem.appendChild(versionInfo); 
    } catch (error) {
        console.error('Error fetching version:', error);
    }
}

getVersion();