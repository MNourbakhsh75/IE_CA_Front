export const getReq = async (url) =>{
    var headers = {
        'Content-Type':'aplication/json; charset=utf-8',
    }
    return fetch(url,
                {
                    method:'GET',
                    mode: 'cors',
                    headers
                })  
        .then(response=> {
            return new Promise((resolve, reject) => {
            response
                .json()
                .then(responseJSON => {
                    resolve(responseJSON);
                })
                .catch(err => reject(err));
        });
    }).catch(
        (err)=>{console.log(`ee`,err)
        return false
        }
        );
}
export const postReq = async (url,data) => {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
    return fetch(url, {
            method: 'POST',
            headers,
            body: data,
        })
        .then(response => {
            return new Promise((resolve, reject) => {
                response
                    .json()
                    .then(responseJSON => {
                        resolve(responseJSON);
                    })
                    .catch(err => reject(err));
            });
        }).catch((err) => {
            console.log(err)
            return false
        });
}
export const deleteReq = async (url) => {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
    return fetch(url, {
            method: 'DELETE',
            headers,
        })
        .then(response => {
            return new Promise((resolve, reject) => {
                response
                    .json()
                    .then(responseJSON => {
                        resolve(responseJSON);
                    })
                    .catch(err => reject(err));
            });
        }).catch((err) => {
            console.log(err)
            return false
        });
}
export const putReq = async (url, data) => {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
    return fetch(url, {
            method: 'PUT',
            // mode : 'CORS',
            headers,
            body: data,
        })
        .then(response => {
            return new Promise((resolve, reject) => {
                response
                    .json()
                    .then(responseJSON => {
                        resolve(responseJSON);
                    })
                    .catch(err => reject(err));
            });
        }).catch((err) => {
            console.log(err)
            return false
        });
}