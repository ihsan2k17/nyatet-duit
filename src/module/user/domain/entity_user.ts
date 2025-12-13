export class EntityUserLogin {
    constructor(
        public username?: string,
        public name?: string,
        public password?: string,
        public useractive?: number,
        public userlevel?: string,
        public email?: string,
        public isonline?: number
    ){}

    canLogin() {
        return this.useractive === 1;
    }
    
    login() {
        if(!this.canLogin()) {
            throw new Error("User is Not Active")
        }
        this.isonline = 1;
    }

    logout() {
        this.isonline = 0
    }
}