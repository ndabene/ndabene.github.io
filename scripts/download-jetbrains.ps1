# Telechargement JetBrains Mono depuis GitHub
$fontsDir = "assets/fonts"

Write-Host "Telechargement JetBrains Mono depuis GitHub..." -ForegroundColor Cyan

# URLs directes depuis le repo officiel JetBrains/JetBrainsMono
$jetbrainsBase = "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts"
$jetbrainsFonts = @{
    "jetbrains-mono-regular.woff2" = "$jetbrainsBase/JetBrainsMono-Regular.woff2"
    "jetbrains-mono-medium.woff2" = "$jetbrainsBase/JetBrainsMono-Medium.woff2"
    "jetbrains-mono-semibold.woff2" = "$jetbrainsBase/JetBrainsMono-SemiBold.woff2"
    "jetbrains-mono-bold.woff2" = "$jetbrainsBase/JetBrainsMono-Bold.woff2"
}

$downloaded = 0
$failed = 0

foreach ($font in $jetbrainsFonts.GetEnumerator()) {
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
Write-Host "JetBrains Mono: $downloaded/$($jetbrainsFonts.Count) telecharges" -ForegroundColor Green

