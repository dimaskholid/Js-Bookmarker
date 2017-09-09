$(function () {
    if (localStorage.getItem('bookmarks')) {
        fetchBookmarks();
    }
});
//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

function saveBookmarks(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    //validate form
    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    //javascript object to store input
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //localStorage test 
    // localStorage.setItem('test', "Hello world");
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    //localStorage save data as string

    //check if localStorage is null
    if (localStorage.getItem('bookmarks') === null) {
        //initiate array 
        var bookmarks = [];

        //add data to array 
        bookmarks.push(bookmark);

        //set to localStorege
        localStorage.setItem('bookmarks', JSON.stringify(bookmark));
    } else {
        //get array from local storage
        var bookmarks = [];
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        console.log(bookmark);

        // add data to array 
        bookmarks.push(bookmark);

        //add to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }

    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}

function fetchBookmarks() {
    //fetch bookmarks
    var bookmarked = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarked);
    //get output id
    var bookmarkResults = document.getElementById('bookmarkResults');

    //initiation output
    bookmarkResults.innerHTML = '';
    for (var i = 0; i < bookmarked.length; i++) {
        var name = bookmarked[i].name;
        var url = bookmarked[i].url;

        bookmarkResults.innerHTML += '<div class="card-panel">' +
            '<h3>' + name +
            ' <a class="btn" href="' + url + '" target=_blank">Go to link</a> ' +
            ' <a class="btn red" href="#" onclick="deleteBookmark(\'' + url + '\')">Delete</a>' +
            '</h3>' +
            '</div>';
    }
}

function deleteBookmark(url) {
    // get bookmark from localStorage
    var bookmarked = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarked.length; i++) {

        if (bookmarked[i].url == url) {
            console.log(bookmarked[i].url);
            bookmarked.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarked));
    fetchBookmarks();
}

function validateForm(siteName, siteUrl) {

    //if input empty
    if (!siteName || !siteUrl) {
        alert("Please fill the form")
        return false;
    }

    //regex for url 
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    //if url invalid 
    if (!siteUrl.match(regex)) {
        alert("please use valid url");
        return false
    }

    return true;
}