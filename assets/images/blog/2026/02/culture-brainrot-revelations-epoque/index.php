<?php
/**
 * Index protection for image directory
 * Prevents direct directory listing
 *
 * Article: 5 Choses Surprenantes que la Culture « Brainrot » Révèle sur Notre Époque
 * Date: 2026-02-10
 * Author: Nicolas Dabène
 */

// Redirect to homepage if someone tries to access this directory directly
header('Location: /');
exit;
