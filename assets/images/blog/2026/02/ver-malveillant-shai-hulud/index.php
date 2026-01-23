<?php
/**
 * Index protection for image directory
 * Prevents direct directory listing
 *
 * Article: Comprendre le ver malveillant Shai-Hulud : Quand npm install devient une porte dérobée
 * Date: 2026-02-25
 * Author: Nicolas Dabène
 */

// Redirect to homepage if someone tries to access this directory directly
header('Location: /');
exit;
