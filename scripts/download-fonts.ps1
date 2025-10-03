# Script PowerShell pour telecharger les fonts Google en woff2
# Self-hosted fonts pour performances optimales

$fontsDir = "assets/fonts"
New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null

Write-Host "Telechargement des fonts Google..." -ForegroundColor Cyan

# Inter Font URLs (Google Fonts API)
$interFonts = @{
    "inter-regular.woff2" = "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhiI2B.woff2"
    "inter-medium.woff2" = "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZJhiI2B.woff2"
    "inter-semibold.woff2" = "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZJhiI2B.woff2"
    "inter-bold.woff2" = "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2"
}

# JetBrains Mono URLs
$jetbrainsFonts = @{
    "jetbrains-mono-regular.woff2" = "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOVkZVVkhg.woff2"
    "jetbrains-mono-medium.woff2" = "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTPlKVkZVVkhg.woff2"
    "jetbrains-mono-semibold.woff2" = "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTIlGVkZVVkhg.woff2"
    "jetbrains-mono-bold.woff2" = "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTWlCVkZVVkhg.woff2"
}

$allFonts = $interFonts + $jetbrainsFonts
$downloaded = 0
$failed = 0

foreach ($font in $allFonts.GetEnumerator()) {
    $filename = $font.Key
    $url = $font.Value
    $outputPath = Join-Path $fontsDir $filename
    
    try {
        Write-Host "  > $filename..." -NoNewline
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        Write-Host " OK" -ForegroundColor Green
        $downloaded++
    }
    catch {
        Write-Host " ERREUR" -ForegroundColor Red
        Write-Host "     Erreur: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Resume:" -ForegroundColor Cyan
Write-Host "   Telecharges: $downloaded" -ForegroundColor Green
Write-Host "   Echecs: $failed" -ForegroundColor Red
Write-Host ""
Write-Host "Fonts self-hosted prets!" -ForegroundColor Green
Write-Host "Gain estime: ~200ms sur LCP" -ForegroundColor Yellow
