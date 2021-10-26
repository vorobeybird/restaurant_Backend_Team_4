import React from "react";

const  AppService = () => {
   
    const _apiBase = './db.json';
    
    const res = await fetch(_apiBase);
    res.then(data => {return res.json()})
    _transformDish = (dish) => {
        return {
            id: menu[0],
            img: menu[0],
            title: menu[0],
            descr: menu[0],
            price: menu[0],
        };
    }
    const res = await getResource();
    return console.log(res.map(this._transformDish));
    
}