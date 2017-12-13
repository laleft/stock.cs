<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ env('APP_NAME') }}</title>
    <link rel="stylesheet" href="/f/css/foundation.css" />
  </head>
  <body>

    <div class="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="medium">
        <button class="menu-icon" type="button" data-toggle="responsive-menu"></button>
        <div class="title-bar-title">Menu</div>
    </div>

    <div class="top-bar" id="responsive-menu">
        <div class="top-bar-left">
            <ul class="dropdown menu" data-dropdown-menu>
            <li class="menu-text">{{ env('APP_NAME') }}</li>
            <li><a href="/articulo">Articulos</a></li>
            <li><a href="#0">Three</a></li>
            </ul>
        </div>
        <div class="top-bar-right">
            <ul class="menu">
            <li><input type="search" placeholder="Search"></li>
            <li><button type="button" class="button">Search</button></li>
            </ul>
        </div>
    </div>
    
    <div class="grid-container">

      <div class="grid-x grid-padding-x">
        <div class="large-12 cell">
          @yield('contenido')
        </div>
      </div>

    <script src="/f/js/vendor/jquery.js"></script>
    <script src="/f/js/vendor/what-input.js"></script>
    <script src="/f/js/vendor/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>

  </body>
</html>