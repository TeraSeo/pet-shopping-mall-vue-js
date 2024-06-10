class UserDTO {
    constructor({ checked = false, name, email, role, verified }) {
      this.checked = checked;
      this.name = name;
      this.email = email;
      this.role = role;
      this.isVerified = verified;
    }
  }
  
  export default UserDTO;