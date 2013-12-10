/**
 * Paragraph dashboard
 * @package zork
 * @subpackage paragraph
 * @author David Pozsar <david.pozsar@megaweb.hu>
 */
( function ( global, $, js )
{
    "use strict";

    if ( typeof js.paragraph.dashboard.facebookComment !== "undefined" )
    {
        return;
    }

    js.require( "js.facebook.xfbml" );

    /**
     * @class Facebook comment dashborad
     * @memberOf global.Zork.Paragraph.prototype.dashboard
     */
    global.Zork.Paragraph.prototype.dashboard.facebookComment = function ( form, element )
    {
        form    = $( form );
        element = $( element );

        var plugin = $( ".fb-comments" ).first(),
            inputs = {
                "colorscheme": form.find( ":input[name='paragraph-facebookComment[colorscheme]']" ),
                "numPosts": form.find( ":input[name='paragraph-facebookComment[numPosts]']" ),
                "orderBy": form.find( ":input[name='paragraph-facebookComment[orderBy]']" ),
                "width": form.find( ":input[name='paragraph-facebookComment[width]']" ),
                "href": form.find( ":input[name='paragraph-facebookComment[href]']" )
            },
            before = {
                "colorscheme": plugin.data( "colorscheme" ),
                "numPosts": plugin.data( "numPosts" ),
                "orderBy": plugin.data( "orderBy" ),
                "width": plugin.data( "width" ),
                "href": inputs.href.val()
            },
            timeout = null,
            set = function ( key, attr, val ) {
                plugin.data( key, val || null )
                      .attr( attr, val || null );

                if ( timeout )
                {
                    clearTimeout( timeout );
                }

                timeout = setTimeout( update, 1000 );
            },
            update = function () {
                timeout = null;
                plugin.html( "" ).removeAttr( "fb-xfbml-state" );
                js.facebook.xfbml( plugin );
            };

        inputs.colorscheme.on( "click change", function () {
            set( "colorscheme", "data-colorscheme", $( this ).val() );
        } );

        inputs.numPosts.on( "keyup change", function () {
            set( "numPosts", "data-num-posts", $( this ).val() );
        } );

        inputs.orderBy.on( "click change", function () {
            set( "orderBy", "data-order-by", $( this ).val() );
        } );

        inputs.width.on( "keyup change", function () {
            set( "width", "data-width", $( this ).val() );
        } );

        inputs.href.on( "keyup change", function () {
            var current = String( global.location.href ).replace( /#.*$/, '' );
            set( "href", "data-href", $( this ).val() || current );
        } );

        return {
            "update": function () {
                before = {
                    "colorscheme": plugin.data( "colorscheme" ),
                    "numPosts": plugin.data( "numPosts" ),
                    "orderBy": plugin.data( "orderBy" ),
                    "width": plugin.data( "width" ),
                    "href": inputs.href.val()
                };
            },
            "restore": function () {
                inputs.colorscheme.val( before.colorscheme ).trigger( "change" );
                inputs.numPosts.val( before.numPosts ).trigger( "change" );
                inputs.orderBy.val( before.orderBy ).trigger( "change" );
                inputs.width.val( before.width ).trigger( "change" );
                inputs.href.val( before.href ).trigger( "change" );
            }
        };
    };

} ( window, jQuery, zork ) );
