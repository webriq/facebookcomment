-- remove data

DELETE FROM "module"
      WHERE "module" = 'Grid\FacebookComment';

UPDATE "user_right"
   SET "module"     = "_common"."string_set_remove"( "module", '|', 'Grid\FacebookComment' )
 WHERE "group"      = 'settings'
   AND "resource"   = 'settings.facebook'
   AND "privilege"  = 'edit';
