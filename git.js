function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(string, search, replacement) {
    return string.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
}

function generateName(event, title) {
    event.preventDefault();
    event.stopPropagation();

    let branchName = title.toLowerCase();
    branchName = branchName.replace(/^\./, '');
    branchName = branchName.replace(/$\//, '');
    branchName = branchName.replace(/$\.lock/, '');
    branchName = replaceAll(branchName, '..', '');
    branchName = replaceAll(branchName, '~', '');
    branchName = replaceAll(branchName, '^', '');
    branchName = replaceAll(branchName, ':', '');
    branchName = replaceAll(branchName, '\\', '');
    branchName = replaceAll(branchName, ' ', '-');    
    
    alert(branchName);

    return false;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createIcon(title) {
    const img = document.createElement("img");
    img.setAttribute('src', browser.extension.getURL("images/icon.png"));
    img.setAttribute('height', '18px');
    img.setAttribute('width', '18px');
    img.setAttribute('class', 'badge');  
    img.addEventListener("click", (event) => generateName(event, title));

    return img;
}

const badges = document.querySelectorAll('.badges') || [];

badges.forEach((badge) => {
    const title = badge.previousElementSibling.innerText;
    badge.appendChild(createIcon(title));
});