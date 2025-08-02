let ultinmoId = 0;  
class Administrador {
    constructor(userName, pass){
        this.id = ++ultinmoId;
        this.userName = userName;
        this.pass = pass;
    }
}