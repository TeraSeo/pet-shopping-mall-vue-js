class UserDTO {
    constructor({ id, checked = false, name, email, role, isVerified }) {
      this.checked = checked;
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.isVerified = isVerified;
    }
  }
  
  export default UserDTO;