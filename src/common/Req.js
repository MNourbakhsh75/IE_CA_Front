export const GetRequest = async (url) =>{
    var headers = {
        // 'Accept':"aplication/json",
        'Content-Type':'aplication/json; charset=utf-8',
    }

    if(localStorage.getItem("token"))
        headers["token"] = localStorage.getItem("token");

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

// export const searchHousesAPI = async (maxPrice, minArea, propertyType, dealType) => {
//   return fetch(apiUrls['searchHouse'], {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       'minArea': minArea || '',
//       'maxPrice': maxPrice || '',
//       'propertyType': propertyType || '',
//       'dealType': dealType || '',
//     }),
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(function (data) {
//       return data.results
//     }).catch(function (error) {
//       console.log('Fetch error ==> ' + error.message)
//       return false
//     })
// }