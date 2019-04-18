export const getReq = async (url) =>{
    var headers = {
        'Content-Type':'aplication/json; charset=utf-8',
    }

    // if(localStorage.getItem("token"))
    //     headers["token"] = localStorage.getItem("token");

    return fetch(url,
                {
                    method:'GET',
                    mode: 'cors',
                    headers
                    // headers: {
                    //     'Content-Type': 'application/json',
                    // }
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
        // 'Accept': "aplication/json",
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }

    // if (localStorage.getItem("token"))
    //     headers["token"] = localStorage.getItem("token");

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
        // 'Accept': "aplication/json",
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }

    // if (localStorage.getItem("token"))
    //     headers["token"] = localStorage.getItem("token");

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