<?php
/**
 * Fichier de sécurité - Empêche l'accès direct au répertoire
 *
 * @package ndabene.github.io
 * @author Nicolas Dabène
 */

// Silence is golden
header('HTTP/1.0 403 Forbidden');
exit('Accès interdit');
