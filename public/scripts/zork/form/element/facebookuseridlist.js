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
    js.style( "/styles/scripts/taglist.css" );

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
                      ! response.first_name || ! response.last_name )
            {
                js.require( "js.ui.dialog" ).alert( {
                    "message": js.core.translate(
                        "facebookComment.facebookUserIdList.notUser.%s"
                    ).format( idOrName )
                } );
            }
            else
            {
                callback( response );
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
        element.parent().addClass( "js-tag-list ui-widget" )

        var splitWith       = /[\s\n,]+/g,
            separator       = element.is( "textarea" ) ? ",\n" : ", ",
            searchText      = $( '<input type="search">' ),
            searchButton    = $( '<button type="button">' ),
            searchDiv       = $( '<div class="js-tag-search">' ),
            userList        = $( '<div>' ),
            addUser         = function ( user ) {
                if ( user && user.id )
                {
                    var label = $( "<label />", {
                                    "text": user.name || user.username || ( "#" + user.id ),
                                    "class": "js-tag ui-state-default ui-widget-content ui-corner-all",
                                    "title": user.username || ( "#" + user.id )
                                } ).hide(),
                        close = $( '<button type="button" />' )
                                .button( {
                                    "text": false,
                                    "icons": {
                                        "primary": "ui-icon-close"
                                    }
                                } )
                                .click( function () {
                                    label.hide( "fast", function () {
                                        var olds    = String( element.val() ).split( splitWith ),
                                            news    = [],
                                            found   = false;

                                        olds.forEach( function ( id ) {
                                            if ( user.id === id )
                                            {
                                                found = true;
                                            }
                                            else if ( id )
                                            {
                                                news.push( id );
                                            }
                                        } );

                                        if ( found )
                                        {
                                            element.val( news.join( separator ) );
                                        }

                                        label.remove();
                                    } );
                                } );

                    userList.append( label.append( close ) );
                    label.show( "fast" );
                }
            },
            update          = function ( event, insert ) {
                if ( insert && insert.id )
                {
                    addUser( insert );
                }
                else
                {
                    userList.empty();

                    var ids = String( element.val() ).split( splitWith );

                    ids.forEach( function ( id ) {
                        if ( id )
                        {
                            search( id, addUser );
                        }
                    } );
                }
            };

        element.before(
            searchDiv.append( searchText )
                     .append( searchButton.button( {
                         "text": false,
                         "icons": {
                             "primary": "ui-icon-plus"
                         }
                     } ) )
        );

        element.hide()
               .on( "change", update )
               .before( userList );

        js.facebook.init( false, update );

        searchButton.on( "click", function () {
            var val = searchText.val();

            if ( val )
            {
                search( val, function ( insert ) {
                    var olds    = String( element.val() ).split( splitWith ),
                        news    = [],
                        found   = false;

                    insert.id = String( insert.id );

                    olds.forEach( function ( id ) {
                        if ( insert.id === id )
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
                        news.push( insert.id );
                        element.val( news.join( separator ) )
                                .trigger( "change", [ insert ] );
                    }
                } );
            }

            return false;
        } );
    };

    global.Zork.Form.Element.prototype.facebookUserIdList.isElementConstructor = true;

} ( window, jQuery, zork ) );
