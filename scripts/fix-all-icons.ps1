# Fix TOUTES les icones FA restantes
$files = Get-ChildItem -Path "_includes","_layouts","pages" -Filter "*.html" -Recurse -ErrorAction SilentlyContinue
$files += Get-ChildItem -Path "_includes","_layouts","pages" -Filter "*.md" -Recurse -ErrorAction SilentlyContinue

$replacements = @{
    '<i class="fas fa-rss"></i>' = '{% include icon.html name="rss" %}'
    '<i class="fas fa-user"></i>' = '{% include icon.html name="user" %}'
    '<i class="fas fa-heart"></i>' = '{% include icon.html name="heart" %}'
    '<i class="fas fa-coffee"></i>' = '{% include icon.html name="coffee" %}'
    '<i class="fas fa-share-alt"></i>' = '{% include icon.html name="share" %}'
    '<i class="fab fa-linkedin-in"></i>' = '{% include icon.html name="linkedin" %}'
    '<i class="fab fa-twitter"></i>' = '{% include icon.html name="twitter" %}'
    '<i class="fab fa-facebook-f"></i>' = '{% include icon.html name="facebook" %}'
    '<i class="fab fa-reddit-alien"></i>' = '{% include icon.html name="reddit" %}'
    '<i class="fab fa-whatsapp"></i>' = '{% include icon.html name="whatsapp" %}'
    '<i class="fab fa-telegram"></i>' = '{% include icon.html name="telegram" %}'
    '<i class="fas fa-envelope"></i>' = '{% include icon.html name="envelope" %}'
    '<i class="fas fa-link"></i>' = '{% include icon.html name="link" %}'
    '<i class="fas fa-chart-line"></i>' = '{% include icon.html name="chart-line" %}'
    '<i class="fas fa-filter"></i>' = '{% include icon.html name="filter" %}'
    '<i class="fas fa-search"></i>' = '{% include icon.html name="search" %}'
    '<i class="fas fa-times"></i>' = '{% include icon.html name="times" %}'
    '<i class="fas fa-home"></i>' = '{% include icon.html name="home" %}'
    '<i class="fas fa-history"></i>' = '{% include icon.html name="history" %}'
    '<i class="fas fa-sort-alpha-down"></i>' = '{% include icon.html name="sort-alpha" %}'
    '<i class="fas fa-newspaper"></i>' = '{% include icon.html name="newspaper" %}'
    '<i class="fas fa-chevron-down"></i>' = '{% include icon.html name="chevron-down" %}'
    '<i class="fas fa-chevron-down toc-arrow"></i>' = '{% include icon.html name="chevron-down" class="icon toc-arrow" %}'
    '<i class="fas fa-blog"></i>' = '{% include icon.html name="newspaper" %}'
}

$total = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    
    $changed = $false
    foreach ($r in $replacements.GetEnumerator()) {
        if ($content -match [regex]::Escape($r.Key)) {
            $content = $content -replace [regex]::Escape($r.Key), $r.Value
            $changed = $true
            $total++
        }
    }
    
    if ($changed) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nTotal: $total remplacements" -ForegroundColor Cyan

