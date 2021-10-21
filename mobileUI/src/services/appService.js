import React from "react";

const  AppService = () => {
   
    const _apiBase = './db.json';
    
    const res = await fetch(_apiBase);
    res.then(data => {return res.json()})
    _transformDish = (dish) => {
        return {
            id: menu[0],
            img: menu[1],
            title: menu[3],
            descr: menu[4],
            price: menu[5],
        };
    }
    const res = await getResource();
    return console.log(res.map(this._transformDish));
    
}