function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(string, search, replacement) {
    return string.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
}

function copy(text) {
    const clipboard = document.createElement('textarea');
    clipboard.value = text;
    document.body.appendChild(clipboard);
    clipboard.focus();
    clipboard.select();

    try {
        const success = document.execCommand('copy');
        if (success) {
            console.debug('[Trello Branch Name] Branch name successfully copied to clipboard');
        } else {
            console.debug('[Trello Branch Name] Copy to clipboard failed');
        }
    } catch (err) {
        console.debug('[Trello Branch Name] Copy to clipboard failed', err);
    }
    
    document.body.removeChild(clipboard);
}

function notify(name) {
    browser.runtime.sendMessage({
        content: name,
        id: 'branchNameCopied',
        title: 'Branch name copied to clipboard',
        type: 'notification',
    });
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
    
    copy(branchName);
    notify(branchName);

    return false;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createIcon(badges) {
    const img = document.createElement("img");
    img.setAttribute('src', browser.extension.getURL("images/git_16.png"));
    img.setAttribute('height', '18px');
    img.setAttribute('width', '18px');
    img.setAttribute('class', 'badge');  
    img.addEventListener("click", (event) => {
        let title = badges.previousElementSibling.innerText;
        browser.runtime.sendMessage({ type: 'options' }).then((options) => {
            if (options.hash) {
                title = badges.previousElementSibling.textContent;  
            }
        })
        generateName(event, title)
    });

    return img;
}

document.arrive('.badges', { existing: true }, function() {
    if (this.querySelector('img.badge')) {
        return;
    }

    this.appendChild(createIcon(this));
})