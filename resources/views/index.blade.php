<!DOCTYPE HTML>
<html>

	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>	

		<title>{{ env('APP_NAME') }}</title>
<!-- src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js" -->
		<script id="sap-ui-bootstrap"
			src="/ui5/resources/sap-ui-core.js"
			data-sap-ui-libs="sap.m"
			data-sap-ui-theme="sap_belize"
			data-sap-ui-xx-bindingSyntax="complex"
			data-sap-ui-preload="async"
			data-sap-ui-compatVersion="edge" 
			data-sap-ui-resourceroots='{"cs.stock": "./stock/"}'>
		</script>

		<!-- Application launch configuration -->
		<script>

			sap.ui.getCore().attachInit(function() {
				sap.ui.require([
					"sap/ui/core/ComponentContainer"
				], function(){
					new sap.ui.core.ComponentContainer({
						name : "cs.stock"
					}).placeAt("content");
				});
			});

		</script>

		
	  
	</head>

	<!-- UI Content -->
	<body class="sapUiBody" id="content" role="application">
	</body>

</html>
