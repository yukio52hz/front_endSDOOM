'use strict';
class User {
    constructor(type, name, nickname, birth_date, gender, email, password, password_confirmation) {
        this.id;
        this.type = type;
        this.name = name;
        this.nickname = nickname;
        this.birth_date = birth_date;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.profile_picture;

    }
    get_id() {
        return this._id;
    }
    set_id(_id) {
        this._id = _id;
    }
    get_type() {
        return this.type;
    }
    set_type(type) {
        this.type = type;
    }
    get_name() {
        return this.name;
    }
    set_name(name) {
        this.name = name;
    }
    get_nickName() {
        return this.nickname;
    }
    set_nickName(nickname) {
        this.nickname = nickname;
    }
    get_birthDate() {
        return this.birth_date;
    }
    set_birthDate(birth_date) {
        this.birth_date = birth_date;
    }
    get_gender() {
        return this.gender;
    }
    set_gender(gender) {
        this.gender = gender;
    }
    get_email() {
        return this.email;
    }
    set_email(email) {
        this.email = email;
    }
    get_password() {
        return this.password;
    }
    set_password(password) {
        this.password = password;
    }
    get_passwordConfirmation() {
        return this.password_confirmation;
    }
    set_passwordConfirmation(password_confirmation) {
        this.password_confirmation = password_confirmation;
    }
    get_profilePicture() {
        return this.profile_picture;
    }
    set_profilePicture(profile_picture) {
        this.profile_picture = profile_picture;
    }

    calculate_age() {
        let age = 0
        if (this.get_birthDate().getMonth() > new Date().getMonth()) {
            return age = (new Date().getFullYear() - this.get_birthDate().getFullYear()) - 1;
        } else if (this.get_birthDate().getMonth() == new Date().getMonth()) {
            if (this.get_birthDate().getDay() < new Date().getDay()) {
                return age = (new Date().getFullYear() - this.get_birthDate().getFullYear()) - 1;
            } else {
                return age = (new Date().getFullYear() - this.get_birthDate().getFullYear());
            }
        } else {
            return age = (new Date().getFullYear() - this.get_birthDate().getFullYear());
        }
    }
    constrain_addSongs() {

    }
}


/*let usuario1 = new Users('normal', 'yukio52hz', new Date('Fri Jan 12 1996'), 'Nb', 'email', 'pass1', 'pass2')

console.log(usuario1.calculate_age())

console.log(new Date('1996,01,12'))*/