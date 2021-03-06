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
export var CreateRubric = (str) => {
    // to convert first aplha to upper
     str = str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    //  remove first and end white space
    return str.replace(/\s+/g,' ').trim()
}

//Find all the white spaces and replace it with dash and then remove the frist and last dash with empty string 
// we used this regex
export var CreateRubricSlug = (str) => {
         str = str.replace(/\s+/g,'-').replace(/(^-+)*(-+$)*/g,'')
    //  remove first and end white space         
    return '/' + str.toLowerCase()
}

export var slugify = (text) => {
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    text =  text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(p, c =>
          b.charAt(a.indexOf(c)))     // Replace special chars
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text

      return '/'+ text
  }


export var RemoveOverflow = (str, strlength)  => {
    if(str.length > strlength) {
        str =     str.substring(0, strlength) + "..."
        return str;
    }
    else {
        return str
    }
    

}
// export var 