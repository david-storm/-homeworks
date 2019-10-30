const ATM = {
    isAuth: false, 
    currentUser: {},

    logs : [],
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user" },
        { id: "1123", pin: "222", debet: 10000, type: "user" }
    ],
    // authorization
    auth(id, pin) {
        const result = this.users.filter( user => user.id == id && user.pin == pin);
        if(result.length == 0){
            this.logs.push(`auth : error! id= ${id};`);
            return "invalid pin code";
        }

        this.isAuth = true;
        this.currentUser = result[0];
        this.logs.push(`auth : OK! id= ${id};`);
        return "authorization";
    },
    // check current debet
    check() {
        if(this.isAuth){
            this.logs.push(`check balance! id= ${this.currentUser.id}; debet= ${this.currentUser.debet};`);
            return this.currentUser.debet + "$";
        }

        return "You are not authorized!";
  
    },
    // get cash - available for user only
    getCash(amount) {
        if(this.isAuth){
           
            if(amount > this.currentUser.debet){
                return "Sorry... You do not have enough money in your account.";
            }
            if(amount > this.cash){
                return "Sorry... There is not enough money at the ATM.";
            }
            this.cash -= amount; 
            this.currentUser.debet -= amount;
            this.logs.push(`getCash! id= ${this.currentUser.id}; amount= ${amount};`);
            return  amount + "$$$";
        }
        return "You are not authorized!";
  
    },
    // load cash - available for user only
    loadCash(amount ) {
        if(this.isAuth){
            this.currentUser.debet += amount;
            this.cash += amount;
            this.logs.push(`loadCash! id= ${this.currentUser.id}; amount= ${amount};`);
            return "new balance = "+ this.currentUser.debet + "$";
        }
        return "You are not authorized!";
  
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if(this.isAuth && this.currentUser.type == "admin"){
            this.cash += amount;
            this.logs.push(`loadAtmCash! id= ${this.currentUser.id}; amount= ${amount};`);
            return "new ATM balance =" + this.cash + "$";
        } 
        if(this.isAuth && this.currentUser.type != "admin"){
            this.logs.push(`loadAtmCash! error permission!!!!!! id= ${this.currentUser.id}; amount= ${amount};`);
            return "you do not have permission!!!";
        }
        return "You are not authorized!";
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if(this.isAuth && this.currentUser.type == "admin"){
            this.logs.reverse().forEach(element => {
                console.log(element);
            });
            return "LOGS END";
        }
        if(this.isAuth && this.currentUser.type != "admin"){
            return "you do not have permission!!!";
        }
        return "You are not authorized!";
    },
    // log out
    logout() {
        if(this.isAuth){
        this.currentUser = {};
        this.isAuth = false;
        this.logs.push(`logout! id= ${this.currentUser.id};`);
        return "Bye";
    }
    return "You are not authorized!";
    }
};
