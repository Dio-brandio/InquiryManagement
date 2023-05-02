$(document).ready(function () {
    sideNavPosition() 
    window.onresize= sideNavPosition

    $('#iconNavbarSidenav').click((e)=>{
        $("#sidenav-main").toggleClass('left-100')
    })
    $("#closeSideNav").click(function (e) { 
        $("#sidenav-main").addClass('left-100')
    });
});

function sideNavPosition() {
        if (window.innerWidth <= 1200) {  
            $("#sidenav-main").addClass('left-100')
        }
        else{
            $("#sidenav-main").removeClass('left-100')
        }
}