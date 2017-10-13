<!DOCTYPE HTML>
<html>

	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="utf-8">

		<title>Tool Page</title>

		<script id="sap-ui-bootstrap"
			src="https://sapui5.netweaver.ondemand.com/sdk/resources/sap-ui-core.js"
			data-sap-ui-libs="sap.m"
			data-sap-ui-theme="sap_belize"
			data-sap-ui-xx-bindingSyntax="complex"
			data-sap-ui-preload="async"
			data-sap-ui-compatVersion="edge" 
			data-sap-ui-resourceroots='{"sap.tnt.sample.ToolPage": "./ui5/", "sap.ui.demo.mock": "mockdata"}'>
		</script>

		<!-- Application launch configuration -->
		<script>

			sap.ui.getCore().attachInit(function() {
				new sap.m.App ({
					pages: [
						new sap.m.Page({
							title: "Tool Page",
							showHeader: false,
							enableScrolling : false,
							content: [ new sap.ui.core.ComponentContainer({
								height : "100%", name : "sap.tnt.sample.ToolPage"
							})]
						})
					]
				}).placeAt("content");
			});

		</script>
	</head>

	<!-- UI Content -->
	<body class="sapUiBody" id="content" role="application">
	</body>

</html>
