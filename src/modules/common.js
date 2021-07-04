module.exports = {
    formatDate:(dt)=>{
        const date = dt || new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();       
        day = day >= 10 ? day : '0' + day;
        return  year + '' + month + '' + day;
    },
    DashedFormatDate:(dt)=>{
        return `${dt.substr(0,4)}-${dt.substr(4,2)}-${dt.substr(6,2)}`;
    },
    isEmpty:(param) => {
        return Object.keys(param).length === 0;
    },
    validNumber:(value) => {
        return /^[0-9]*$/.test(value);
    }
}