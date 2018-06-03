export default {
  getItems(storageName) {
    let itemsInStorage = localStorage.getItem(storageName);
    let items = [];

    try {
      items = JSON.parse(itemsInStorage);
    }
    catch (e) {
      console.log(e);
    }

    return Array.isArray(items)
      ? items
      : [];
  },

  setItems(storageName, items) {
    if (Array.isArray(items)) {
      localStorage.setItem(storageName, JSON.stringify(items));
      return items;
    }
  }
};