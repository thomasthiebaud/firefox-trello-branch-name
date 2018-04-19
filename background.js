browser.runtime.onMessage.addListener(function(message) {
    switch(message.type) {
        case 'notification':
            browser.notifications.create(message.id, {
                message: message.content,
                title: message.title,
                type: 'basic',
            });
            break;
    }
});