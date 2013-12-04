<?php

namespace Grid\FacebookComment\Model\Paragraph\Structure;

use Grid\Paragraph\Model\Paragraph\Structure\AbstractLeaf;

/**
 * FacebookComment
 *
 * @author David Pozsar <david.pozsar@megaweb.hu>
 */
class FacebookComment extends AbstractLeaf
{

    /**
     * @const string
     */
    const COLORSCHEME_LIGHT = 'light';

    /**
     * @const string
     */
    const COLORSCHEME_DARK = 'dark';

    /**
     * @const string
     */
    const COLORSCHEME_DEFAULT = self::COLORSCHEME_LIGHT;

    /**
     * @const string
     */
    const ORDER_BY_SOCIAL = 'social';

    /**
     * @const string
     */
    const ORDER_BY_REVERSE_TIME = 'reverse_time';

    /**
     * @const string
     */
    const ORDER_BY_TIME = 'time';

    /**
     * @const string
     */
    const ORDER_BY_DEFAULT = self::ORDER_BY_SOCIAL;

    /**
     * @const int
     */
    const NUM_POSTS_DEFAULT = 10;

    /**
     * Paragraph type
     *
     * @var string
     */
    protected static $type = 'facebookComment';

    /**
     * Paragraph-render view-open
     *
     * @var string
     */
    protected static $viewOpen = 'grid/paragraph/render/facebookComment';

    /**
     * @var array
     */
    protected static $validColorschemes = array(
        self::COLORSCHEME_LIGHT,
        self::COLORSCHEME_DARK,
    );

    /**
     * @var array
     */
    protected static $validOrderBys = array(
        self::ORDER_BY_SOCIAL,
        self::ORDER_BY_REVERSE_TIME,
        self::ORDER_BY_TIME,
    );

    /**
     * Comment plugin parameter: href
     *
     * @var string
     */
    protected $href;

    /**
     * Comment plugin parameter: colorscheme
     *
     * @var string
     */
    protected $colorscheme = self::COLORSCHEME_DEFAULT;

    /**
     * Comment plugin parameter: num_posts
     *
     * @var int
     */
    protected $numPosts = self::NUM_POSTS_DEFAULT;

    /**
     * Comment plugin parameter: order_by
     *
     * @var int
     */
    protected $orderBy = self::ORDER_BY_DEFAULT;

    /**
     * Comment plugin parameter: width
     *
     * @var int
     */
    protected $width;

    /**
     * Set comment plugin parameter: href
     *
     * @param   string|null $href
     * @return  FacebookComment
     */
    public function setHref( $href )
    {
        $this->href = empty( $href ) ? null : (string) $href;
        return $this;
    }

    /**
     * Set comment plugin parameter: colorscheme
     *
     * @param   string|null $colorscheme
     * @return  FacebookComment
     */
    public function setColorscheme( $colorscheme )
    {
        $colorscheme = strtolower( $colorscheme );

        if ( empty( $colorscheme ) ||
             ! in_array( $colorscheme, static::$validColorschemes ) )
        {
            $colorscheme = static::COLORSCHEME_DEFAULT;
        }

        $this->colorscheme = $colorscheme;
        return $this;
    }

    /**
     * Set comment plugin parameter: num_posts
     *
     * @param   string|null $numPosts
     * @return  FacebookComment
     */
    public function setNumPosts( $numPosts )
    {
        $this->numPosts = empty( $numPosts )
                ? static::NUM_POSTS_DEFAULT
                : (int) $numPosts;

        return $this;
    }

    /**
     * Set comment plugin parameter: order_by
     *
     * @param   string|null $orderBy
     * @return  FacebookComment
     */
    public function setOrderBy( $orderBy )
    {
        $orderBy = strtolower( $orderBy );

        if ( empty( $orderBy ) ||
             ! in_array( $orderBy, static::$validOrderBys ) )
        {
            $orderBy = static::ORDER_BY_DEFAULT;
        }

        $this->orderBy = $orderBy;
        return $this;
    }

    /**
     * Set comment plugin parameter: width
     *
     * @param   string|null $width
     * @return  FacebookComment
     */
    public function setWidth( $width )
    {
        $this->width = empty( $width ) ? null : abs( (int) $width );
        return $this;
    }

    /**
     * @return  \Grid\Facebook\Model\ApplicationSettings\AdapterInterface
     */
    public function getApplicationSettings()
    {
        return $this->getServiceLocator()
                    ->get( 'Grid\Facebook\Model\ApplicationSettings\AdapterFactory' )
                    ->factory( array( 'application' => 'comment' ) );
    }

}
