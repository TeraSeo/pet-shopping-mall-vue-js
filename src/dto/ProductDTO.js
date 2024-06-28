class ProductDTO {
    constructor({ id, checked = false, category, deliveryFee, image, imagePath, name, price, quantity, subCategory, user_id }) {
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
      this.user_id = user_id;
    }
  }
  
  export default ProductDTO;