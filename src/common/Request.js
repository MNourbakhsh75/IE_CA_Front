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
    }).catch((err)=>console.log(err));
}