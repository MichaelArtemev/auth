class UserService{
    set name(name){
        this.name = name.trim().toLowerCase();
    }
    get name(){
        return this.name;
    }
    set password(password){
        if(validatePassword(password.trim())){
            this._password = CryptoJS.MD5(password);
        }else{
            console.error("incorrect password")
        }
    }
    get password(){
        return this._password;
    }

    authUser(){
        axios({
            method: 'POST',
            url: `https://site/usernam${this.name}&password=${this._password}`
        }).then((response) => {
            if(response.status !== 200){
                console.error(response.statusText)
            }else{
                return response;
            }
        })
    }
    validatePassword(str){
        if (typeof str !== 'string') {
            return [false, 'Error in validatePassword'];
        }
        if (str.length < 8) {
            return [false, 'Password must have at least 8 characters'];
        }
        if (str.search(/[a-z]/) === -1) {
            return [false, 'Password must contain at least one lower case letter'];
        }
        if (str.search(/[A-Z]/) === -1) {
            return [false, 'Password must contain at least one upper case letter'];
        }
        if (str.search(/[0123456789]/) === -1) {
            return [false, 'Password must contain at least one digit'];
        }
        if (str.search(/[!@#$%^&*()\-=_+~[\]{}'"\\|,./<>?]/) === -1) {
            return [false, 'Password must contain at least one symbol'];
        }
        if (str.search(/\s/) !== -1) {
            return [false, 'Password may not contain spaces'];
        }
        return [true];
    }
}

const formEl = document.getElementById('#formLogin');

formEl.onclick = () => {
  let nameValue = document.getElementById('#name').value;
  let passwordValue = document.getElementById('#password').value; 
  const user = new UserService();

  user.name = nameValue;
  user.password = passwordValue;

  const result = user.authUser();__

  if(result){
      document.location.href = '/home';
  }else{
      alert("error")
  }
};

