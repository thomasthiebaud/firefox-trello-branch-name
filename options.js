function saveOptions(e) {
  browser.storage.sync.set({
    hash: document.querySelector("#hash").checked,
    notifications: document.querySelector("#notifications").checked,
    useCustomOptions: true,
  });
  e.preventDefault();
}
  
function restoreOptions() {
  const gettingItem = browser.storage.sync.get();
  gettingItem.then((res) => {
    if (res.useCustomOptions) {
      document.querySelector("#hash").checked = res.hash;      
      document.querySelector("#notifications").checked = res.notifications;
    }
  });
}
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);