class api {
  async getCategories() {
    
  }
  async getCategoryById(id) {
    const response = await fetch(`http://jservice.io/api/category?id=${id}`);
    const json = await response.json();
    return json;
  }
}

export default new api();