<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bd_suenosmarinera' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ')I_q^F(%>Du nSEy)+55dz2GYOhw,wM%la(Iw6Mum!P8BR#P&JaT~>|1J.?9/(!e' );
define( 'SECURE_AUTH_KEY',  'jjQ{&@nH*8adCf*9r(bWf3ay;8&k?}RaB>{zg>*>vV@..NjeS[Vu3^I:eL`vWk0!' );
define( 'LOGGED_IN_KEY',    'c$TLtFfetqspwjcUeEZ!F6!crv{o<*f.5BM(:juZM5]H16}xl`I/C#[_?zu>d]5v' );
define( 'NONCE_KEY',        'L44Ww8-  <`+Xh&aA*45SNc*3>cmMQ|^B4,hXtE>(VmSU-I78W+3j6sg/@yEngVY' );
define( 'AUTH_SALT',        '^HCtwo 3^6%&!f?M),`km{P:wD_?E]SVb.C(w@qPgua9^0#WYWDC,Xg(Y]3`;jVo' );
define( 'SECURE_AUTH_SALT', 'XBNBin-_%:HQCf;hB9:h*kuIj}.I(7<Z*LkerdI`bV($6xBC!X|}F:pcg76N6{@w' );
define( 'LOGGED_IN_SALT',   'j<^p9w?9d/<o(o#BR^gLN}RBYeeWw_{{Z,?/}m~$,*yU,VDv]LafhC>>yrrhrH&m' );
define( 'NONCE_SALT',       '2a,6[0~!pY1%z~_7;x[s S<VU`4}?I,+L9=_Ag!<#}%8p/0C[F7FlgcvTA$I`/xt' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



define( 'SURECART_ENCRYPTION_KEY', 'c$TLtFfetqspwjcUeEZ!F6!crv{o<*f.5BM(:juZM5]H16}xl`I/C#[_?zu>d]5v' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
