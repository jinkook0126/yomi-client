module.exports = {
    formatDate:()=>{
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();       
        day = day >= 10 ? day : '0' + day;
        return  year + '' + month + '' + day;
    },
}