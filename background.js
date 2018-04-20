function getOptions() {
    return browser.storage.sync.get();
}

browser.runtime.onMessage.addListener(function(message) {
    switch(message.type) {
        case 'notification':
            getOptions().then((options) => {
                if (options.notifications) {
                    browser.notifications.create(message.id, {
                        message: message.content,
                        title: message.title,
                        type: 'basic',
                    });
                }
            });
            break;
        case 'options':
            return getOptions();
            break;
    }
});