<?php

namespace Grid\FacebookComment\Model\ApplicationSettings;

use Grid\Facebook\Model\ApplicationSettings\AbstractAdapter;

/**
 * CommentAdapter
 *
 * @author David Pozsar <david.pozsar@megaweb.hu>
 */
class CommentAdapter extends AbstractAdapter
{

    /**
     * @const string
     */
    const APPLICATION = 'comment';

    /**
     * @const string
     */
    const MODE_ADMINS = 'admins';

    /**
     * Facebook comment (may) need an `appId`
     *
     * @return  array
     */
    public static function getDefaultSettingsKeys()
    {
        return array(
            'appId',
        );
    }

}
