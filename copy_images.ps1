$sourceDir = "c:\Users\ayush\Downloads\coffee_frames"
$targetDir = "c:\Users\ayush\.gemini\antigravity\playground\coffee_website_\public\sequence"

if (-not (Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.jpg" | Sort-Object Name | Select-Object -First 120

$i = 0
foreach ($file in $files) {
    $targetPath = Join-Path -Path $targetDir -ChildPath ("frame_$i.jpg")
    Copy-Item -Path $file.FullName -Destination $targetPath
    $i++
}

Write-Host "Copied $i frames successfully."
