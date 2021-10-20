 class appService {
    constructor() {
        this._apiBase = '../../api.json';
    }
    
    getResource = async () => {
        const res = await fetch(`${this._apiBase}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource();
        return console.log(res.map(this._transformBook));
    }
    
    

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }


    _transformBook = (book) => {
        return {
            id: this._extractId(data[0]),
            title: this.isSet(data[1]),
            price: this.isSet(data[3]),
            sense: this.isSet(data[4]),
        };
    }
}
appService.getAllBooks()