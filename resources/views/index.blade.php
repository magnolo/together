<!doctype html>
<html ng-app="app" ng-strict-di>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel Angular Material Starter</title>

    <meta name="theme-color" content="#0690B7">

    <link rel="manifest" href="manifest.json">

    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->

    <style><?php require(public_path("css/critical.css")) ?></style>

</head>
<body md-theme="@{{vm.themes.active.name}}" md-theme-watch ng-controller="IndexController as vm"
          class="@{{state.current.bodyClass || ''}}">

    
        <ms-splash-screen id="splash-screen">
            <div class="center">
                <div class="logo">
                    <span>F</span>
                </div>
                <!-- Material Design Spinner -->
                <div class="spinner-wrapper">
                    <div class="spinner">
                        <div class="inner">
                            <div class="gap"></div>
                            <div class="left">
                                <div class="half-circle"></div>
                            </div>
                            <div class="right">
                                <div class="half-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Material Design Spinner -->
            </div>
        </ms-splash-screen>
  


    <app-root></app-root>


    <script>
    (function(){
        var link = document.createElement("link");
        link.href = "{!! elixir('css/final.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);
    })();
    </script>

    <script src="{!! elixir('js/final.js') !!}" async></script>

</body>
</html>
