function showNavigation() {
    var menu = document.getElementById("navigation").style;
    if (menu.display == 'block') {
        menu.display= 'none';
    }else{
        menu.display='block';
    }
}
var menu_1 = document.getElementById("navigation");
window.onclick = function(event){
    if(event.target == menu_1){
        menu_1.style.display = "none";
    }
}
