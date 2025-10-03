# Script de remplacement FontAwesome vers SVG sprite
# Remplace toutes les icones FA par nos includes SVG

$files = Get-ChildItem -Path "_includes" -Filter "*.html" -Recurse

# Mapping FontAwesome -> SVG sprite
$replacements = @{
    '<i class="fas fa-calendar-alt"></i>' = '{% include icon.html name="calendar" %}'
    '<i class="fas fa-clock"></i>' = '{% include icon.html name="clock" %}'
    '<i class="fas fa-arrow-right"></i>' = '{% include icon.html name="arrow-right" %}'
    '<i class="fas fa-check-circle"></i>' = '{% include icon.html name="check-circle" %}'
    '<i class="fas fa-map-marker-alt"></i>' = '{% include icon.html name="map-marker" %}'
    '<i class="fab fa-linkedin"></i>' = '{% include icon.html name="linkedin" %}'
    '<i class="fas fa-cube"></i>' = '{% include icon.html name="cube" %}'
    '<i class="fas fa-graduation-cap"></i>' = '{% include icon.html name="graduation-cap" %}'
    '<i class="fas fa-file-pdf"></i>' = '{% include icon.html name="file-pdf" %}'
    '<i class="fas fa-fire"></i>' = '{% include icon.html name="fire" %}'
    '<i class="fas fa-eye"></i>' = '{% include icon.html name="eye" %}'
    '<i class="fas fa-star"></i>' = '{% include icon.html name="star" %}'
    '<i class="fas fa-external-link-alt"></i>' = '{% include icon.html name="external-link" %}'
    '<i class="fas fa-copy"></i>' = '{% include icon.html name="copy" %}'
    '<i class="fas fa-check"></i>' = '{% include icon.html name="check" %}'
    '<i class="fas fa-edit"></i>' = '{% include icon.html name="edit" %}'
    '<i class="fas fa-lock" title="Acces securise"></i>' = '{% include icon.html name="lock" aria_label="Acces securise" %}'
    '<i class="fas fa-lock"></i>' = '{% include icon.html name="lock" %}'
    '<i class="fas fa-list-ol"></i>' = '{% include icon.html name="list" %}'
    '<i class="fas fa-chevron-left"></i>' = '{% include icon.html name="chevron-left" %}'
    '<i class="fas fa-chevron-right"></i>' = '{% include icon.html name="chevron-right" %}'
    '<i class="fas fa-users"></i>' = '{% include icon.html name="users" %}'
}

$totalReplacements = 0
$filesModified = 0

Write-Host "Remplacement des icones FontAwesome..." -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($replacement in $replacements.GetEnumerator()) {
        $old = $replacement.Key
        $new = $replacement.Value
        
        if ($content -match [regex]::Escape($old)) {
            $content = $content -replace [regex]::Escape($old), $new
            $fileReplacements++
            $totalReplacements++
        }
    }
    
    if ($fileReplacements -gt 0) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  > $($file.Name): $fileReplacements remplacements" -ForegroundColor Green
        $filesModified++
    }
}

Write-Host ""
Write-Host "Resume:" -ForegroundColor Cyan
Write-Host "  Fichiers modifies: $filesModified" -ForegroundColor Green
Write-Host "  Total remplacements: $totalReplacements" -ForegroundColor Green
Write-Host ""
Write-Host "Gain estime: ~300ms First Paint (FontAwesome retire)" -ForegroundColor Yellow

