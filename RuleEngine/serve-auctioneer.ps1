param(
  [string]$Prefix = "http://localhost:8080/"
)

$rootPath = [IO.Path]::GetFullPath($PSScriptRoot)
$loadablePath = Join-Path $rootPath "Customization\loadable"
$listener = [Net.HttpListener]::new()
$listener.Prefixes.Add($Prefix)

function Get-ContentType([string]$Path) {
  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".css" { return "text/css; charset=utf-8" }
    ".html" { return "text/html; charset=utf-8" }
    ".js" { return "application/javascript; charset=utf-8" }
    ".json" { return "application/json; charset=utf-8" }
    ".svg" { return "image/svg+xml" }
    ".png" { return "image/png" }
    ".jpg" { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    default { return "application/octet-stream" }
  }
}

function Send-Bytes($Context, [int]$StatusCode, [string]$ContentType, [byte[]]$Bytes) {
  $Context.Response.StatusCode = $StatusCode
  $Context.Response.ContentType = $ContentType
  $Context.Response.ContentLength64 = $Bytes.Length
  $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
  $Context.Response.Close()
}

function Send-Text($Context, [int]$StatusCode, [string]$Text) {
  Send-Bytes $Context $StatusCode "text/plain; charset=utf-8" ([Text.Encoding]::UTF8.GetBytes($Text))
}

function Get-SystemCatalog {
  $systems = @(
    Get-ChildItem -LiteralPath $loadablePath -Filter "*.json" -File |
      Where-Object { $_.Name -ne "system-index.json" } |
      Sort-Object Name |
      ForEach-Object {
        try {
          $definition = Get-Content -LiteralPath $_.FullName -Raw | ConvertFrom-Json
          $id = [string]$definition.systemId
          if ([string]::IsNullOrWhiteSpace($id)) {
            $id = [IO.Path]::GetFileNameWithoutExtension($_.Name)
          }
          $name = [string]$definition.systemName
          if ([string]::IsNullOrWhiteSpace($name)) {
            $name = $id
          }
          [PSCustomObject]@{
            id = $id
            name = $name
            file = "Customization/loadable/$($_.Name)"
            default = $id -eq "standard-natural"
          }
        } catch {
          Write-Warning "Skipping invalid system file $($_.Name): $($_.Exception.Message)"
        }
      }
  )
  return [PSCustomObject]@{ systems = $systems }
}

function Send-SystemCatalog($Context) {
  $json = Get-SystemCatalog | ConvertTo-Json -Depth 4 -Compress
  Send-Bytes $Context 200 "application/json; charset=utf-8" ([Text.Encoding]::UTF8.GetBytes($json))
}

function Send-StaticFile($Context) {
  $relativePath = [Uri]::UnescapeDataString($Context.Request.Url.AbsolutePath).TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($relativePath)) {
    $relativePath = "auctioneer.html"
  }
  if ($relativePath.Contains("..")) {
    Send-Text $Context 400 "Invalid path"
    return
  }

  $candidatePath = Join-Path $rootPath ($relativePath -replace "/", "\")
  $fullPath = [IO.Path]::GetFullPath($candidatePath)
  if (!$fullPath.StartsWith($rootPath, [StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    Send-Text $Context 404 "Not found"
    return
  }

  Send-Bytes $Context 200 (Get-ContentType $fullPath) ([IO.File]::ReadAllBytes($fullPath))
}

try {
  $listener.Start()
  Write-Host "Auctioneer is available at $Prefix`auctioneer.html"
  Write-Host "The /api/systems endpoint discovers JSON files in Customization/loadable on every request."
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    if ($context.Request.Url.AbsolutePath -eq "/api/systems") {
      Send-SystemCatalog $context
    } else {
      Send-StaticFile $context
    }
  }
} finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
