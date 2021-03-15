class Artist {
    constructor(name, record_house, birth_date, profile_picture) {
        this._id;
        this.name = name;
        this.record_house = record_house;
        this.birth_date = birth_date;
        this.profile_picture = profile_picture;
        this.age = 0;
        this.albums = [];
    }
    get_id() {
        return this._id;
    }
    set_id(_id) {
        this._id = _id;
    }
    get_name() {
        return this.name;
    }
    set_name(name) {
        this.name = name;
    }
    get_recordHouse() {
        return this.record_house;
    }
    set_recordHouse(record_house) {
        this.record_house = record_house;
    }
    get_birthDate() {
        return this.birth_date;
    }
    set_birhDate(birth_date) {
        this.birth_date = birth_date;
    }
    get_profilePicture() {
        return this.profile_picture;
    }
    set_profilePicture(profile_picture) {
        this.profile_picture = profile_picture;
    }
    get_age() {
        return this.age;
    }
    set_age(age) {
        this.age = age;
    }
    get_albums() {
        return this.albums;
    }
    set_albums(albums) {
        this.albums = albums;
    }
    calculate_age() {
        let age = 0
        if (this.get_birthDate().getMonth() > new Date().getMonth()) {
            age = (new Date().getFullYear() - this.get_birthDate().getFullYear()) - 1;
        } else if (this.get_birthDate().getMonth() == new Date().getMonth()) {
            if (this.get_birthDate().getDay() < new Date().getDay()) {
                age = (new Date().getFullYear() - this.get_birthDate().getFullYear()) - 1;
            } else {
                age = (new Date().getFullYear() - this.get_birthDate().getFullYear());
            }
        } else {
            age = (new Date().getFullYear() - this.get_birthDate().getFullYear());
        }
        this.set_age(age);
    }
    add_albums(album) {
        this.albums.push(album);
    }
}