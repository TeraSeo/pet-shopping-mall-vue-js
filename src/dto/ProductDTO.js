class ProductDTO {
    constructor({ id, checked = false, category, deliveryFee, image, imagePath, name, price, quantity, subCategory, summary, user_id }) {
      this.id = id;
      this.checked = checked;
      this.category = category;
      this.deliveryFee = deliveryFee;
      this.image = image;
      this.imagePath = imagePath;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      this.subCategory = subCategory;
      this.summary = summary;
      this.user_id = user_id;
    }
  }
  
  export default ProductDTO;