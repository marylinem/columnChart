(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
	<script src="//www.amcharts.com/lib/4/core.js"></script>
	<script src="//www.amcharts.com/lib/4/charts.js"></script>
	
	<div id="chartdiv" style="width: 900px; height 800px;"></div>
	
	<script>
	// Create chart instance in one go
	var chart = am4core.createFromConfig({
	  // Create pie series
	  "series": [{
		"type": "PieSeries",
		"dataFields": {
		  "value": "litres",
		  "category": "country"
		}
	  }],
	
	  // Add data
	  "data": [{
		"country": "Lithuania",
		"litres": 501.9
	  }, {
		"country": "Czech Republic",
		"litres": 301.9
	  }, {
		"country": "Ireland",
		"litres": 201.1
	  }, {
		"country": "Germany",
		"litres": 165.8
	  }, {
		"country": "Australia",
		"litres": 139.9
	  }, {
		"country": "Austria",
		"litres": 128.3
	  }, {
		"country": "UK",
		"litres": 99
	  }, {
		"country": "Belgium",
		"litres": 60
	  }, {
		"country": "The Netherlands",
		"litres": 50
	  }],
	
	  // And, for a good measure, let's add a legend
	  "legend": {}
	
	}, "chartdiv", am4charts.PieChart);
	</script>
	
	`;

	class Chart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');		
			
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			
		}
	}
	
	customElements.define("com-demo-chart", Chart);
})();