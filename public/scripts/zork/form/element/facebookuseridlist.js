/**
 * Facebook user id list form element
 * @package zork
 * @subpackage form
 * @author David Pozsar <david.pozsar@megaweb.hu>
 */
( function ( global, $, js, undefined )
{
    "use strict";

    if ( typeof js.form.element.facebookUserIdList !== "undefined" )
    {
        return;
    }

    js.require( "js.facebook" );

    var search = function ( idOrName, callback ) {
        js.facebook.graph( idOrName, function ( response ) {
            if ( ! response || ! response.id )
            {
                js.require( "js.ui.dialog" ).alert( {
                    "message": js.core.translate(
                        "facebookComment.facebookUserIdList.userNotFound.%s"
                    ).format( idOrName )
                } );
            }
            else if ( ! response.name || ! response.username ||
                      ! response.fisrt_name || ! response.last_name )
            {
                js.require( "js.ui.dialog" ).alert( {
                    "message": js.core.translate(
                        "facebookComment.facebookUserIdList.notUser.%s"
                    ).format( idOrName )
                } );
            }
            else
            {
                callback( response.id );
            }
        } );
    };

    /**
     * Facebook user id list
     *
     * @memberOf Zork.Form.Element
     */
    global.Zork.Form.Element.prototype.facebookUserIdList = function ( element )
    {
        element = $( element );

        var splitWith       = /([\s\n]*,[\s\n]*|[\s\n]+)/,
            separator       = element.is( "textarea" ) ? ",\n" : ", ",
            searchText      = $( '<input type="text">' ),
            searchButton    = $( '<input type="button">' ).val( "+" );

        element.before(
            $( "<div>" ).append( searchText )
                        .append( searchButton )
        );

        searchButton.on( "click", function () {
            var val = searchText.val();

            if ( val )
            {
                search( val, function ( insert ) {
                    var olds    = String( element.val() ).split( splitWith ),
                        news    = [],
                        found   = false;

                    insert = String( insert );

                    olds.forEach( function ( id ) {
                        if ( insert === id )
                        {
                            found = true;
                        }

                        if ( id )
                        {
                            news.push( id );
                        }
                    } );

                    if ( ! found )
                    {
                        news.push( insert );
                        element.val( news.join( separator ) );
                    }
                } );
            }

            return false;
        } );
    };

    global.Zork.Form.Element.prototype.facebookUserIdList.isElementConstructor = true;

} ( window, jQuery, zork ) );
