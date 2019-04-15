
export const cmpDate = (time) => {
    var res = {
        exp: '',
        dif: {}
    }
    var deadlineTime = new Date(time)
    var currentTime = new Date(Math.floor(Date.now()));
    // console.log(deadlineTime)
    var cmp = (deadlineTime - currentTime) / 1000
    if (cmp <= 0) {
        res.exp = true
        res.dif = ''
    } else {
        var days = Math.floor(cmp / 86400);
        var hours = Math.floor(cmp / 3600);
        var minutes = Math.floor(cmp / 60) % 60;
        var seconds = Math.floor(cmp % 60)
        // var hh = hours*60 + minutes
        // console.log(hh,seconds)
        res.exp = false
        res.dif = {
            d : days,
            h : hours,
            m : minutes,
            s : seconds
        }
    }
    return res
}

export const persianDigit= (m) =>{
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return m.replace(/[0-9]/g, function (w) {
        return id[+w]
    });
}