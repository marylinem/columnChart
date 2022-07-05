(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<!-- Resources -->

		<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
		<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
		<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
		
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 

		body {
		  background: #fff;
		}
		
		.metric {
		  padding: 10%;
		}
		
		.metric svg {
		  max-width: 100%;
		}
		
		.metric path {
		  stroke-width: 75;
		  stroke: #ecf0f1;
		  fill: none;
		}
		
		.metric text {
		  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
		}
		
		.metric.participation path.data-arc {
		  stroke: #27ae60;
		}
		
		.metric.participation text {
		  fill: #27ae60;
		}		

		#chartdiv {
		width: 100%;
		height: 500px;
		}
		</style>

		<!-- Chart code -->
		<script>
		am5.ready(function() {

		// Create root element
		var root = am5.Root.new("chartdiv");

		// Set themes
		root.setThemes([
		am5themes_Animated.new(root)
		]);

		// Create chart
		var chart = root.container.children.push(am5xy.XYChart.new(root, {
		panX: true,
		panY: true,
		wheelX: "panX",
		wheelY: "zoomX",
		pinchZoomX:true
		}));

		// Add cursor
		var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
		cursor.lineY.set("visible", false);


		// Create axes
		var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
		xRenderer.labels.template.setAll({
		rotation: -90,
		centerY: am5.p50,
		centerX: am5.p100,
		paddingRight: 15
		});

		var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
		maxDeviation: 0.3,
		categoryField: "country",
		renderer: xRenderer,
		tooltip: am5.Tooltip.new(root, {})
		}));

		var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
		maxDeviation: 0.3,
		renderer: am5xy.AxisRendererY.new(root, {})
		}));


		// Create series
		var series = chart.series.push(am5xy.ColumnSeries.new(root, {
		name: "Series 1",
		xAxis: xAxis,
		yAxis: yAxis,
		valueYField: "value",
		sequencedInterpolation: true,
		categoryXField: "country",
		tooltip: am5.Tooltip.new(root, {
			labelText:"{valueY}"
		})
		}));

		series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
		series.columns.template.adapters.add("fill", function(fill, target) {
		return chart.get("colors").getIndex(series.columns.indexOf(target));
		});

		series.columns.template.adapters.add("stroke", function(stroke, target) {
		return chart.get("colors").getIndex(series.columns.indexOf(target));
		});


		// Set data
		var data = [{
		country: "USA",
		value: 2025
		}, {
		country: "China",
		value: 1882
		}, {
		country: "Japan",
		value: 1809
		}, {
		country: "Germany",
		value: 1322
		}, {
		country: "UK",
		value: 1122
		}, {
		country: "France",
		value: 1114
		}, {
		country: "India",
		value: 984
		}, {
		country: "Spain",
		value: 711
		}, {
		country: "Netherlands",
		value: 665
		}, {
		country: "Russia",
		value: 580
		}, {
		country: "South Korea",
		value: 443
		}, {
		country: "Canada",
		value: 441
		}];

		xAxis.data.setAll(data);
		series.data.setAll(data);


		// Make stuff animate on load
		series.appear(1000);
		chart.appear(1000, 100);

		}); // end am5.ready()
		</script>

		<div id="chartdiv"></div>

	`;

	class Chart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			this.$svg = shadowRoot.querySelector('svg');
			
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
		}
	}
	
	customElements.define("com-demo-chart", Chart);
})();