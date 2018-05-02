// Get Cookies logic for LoginKey
export var getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Find all the white spaces and replace it with single space and make the letters with alpha uper case 
// we used this regex
export var toTitleCase = (str) => {
    // to convert first aplha to upper
     str = str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    //  remove first and end white space
    return str.replace(/\s+/g,' ').trim()
}

//Find all the white spaces and replace it with dash and then remove the frist and last dash with empty string 
// we used this regex
export var removeWhitespaces = (str) => {
         str = str.replace(/\s+/g,'-')
    //  remove first and end white space         
    return str.replace(/(^-+)*(-+$)*/g,'')
}

// export var 