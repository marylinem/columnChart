(function () {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Chart Properties</legend>
				<table>
					<tr>
						<td>Opacity</td>
						<td><input id="builder_opacity" type="text" size="5" maxlength="5"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<button id="selModel" type="button">Select Model</button>
		<br>
		<br>
		<label for="selMeasure">Select Measure<br></label>
		<select id="selMeasure">
			<option>--NONE--</option>
		</select>
		<br>
		<br>
		<label for="selDim0">Select Events<br></label>
		<select id="selDim0">
			<option>--NONE--</option>
		</select>
		<br>
		<br>
		<label for="selDim1">Select Relation<br></label>
		<select id="selDim1">
			<option>--NONE--</option>
		</select>
		<br>
		<br>
		<label for="selDim2">Select Timestamp<br></label>
		<select id="selDim2">
			<option>--NONE--</option>
		</select>
		<br>
		<br>
		<button id="createModel" type="button">Apply</button>
		<br>
		<br>
		</div>
		
		<div class="sapUiBody" id="content"></div>

		<script
		id="sap-ui-bootstrap"
		src="https://sdk.openui5.org/resources/sap-ui-core.js"
		data-sap-ui-theme="sap_belize"
		data-sap-ui-libs="sap.m"
		data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true"
		data-sap-ui-onInit="module:sap/ui/demo/walkthrough/chart/chart_builder"
		data-sap-ui-resourceroots='{
			"sap.ui.demo.walkthrough": "./"
		}'>
		</script>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class ChartBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({ mode: "open" });
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
						opacity: this.opacity
					}
				}
			}));
		}

		set opacity(newOpacity) {
			this._shadowRoot.getElementById("builder_opacity").value = newOpacity;
		}

		get opacity() {
			return this._shadowRoot.getElementById("builder_opacity").value;
		}
	}
	sap.ui.define([
		"sap/ui/core/mvc/XMLView"
	], function (XMLView) {
		"use strict";
		alert("Code funktioniert")

		XMLView.create({
			viewName: "sap.ui.demo.walkthrough.chart.webapp.view.App"
		}).then(function (oView) {
			oView.placeAt("content");
		});

	});

	customElements.define("com-demo-chart-builder", ChartBuilderPanel);
})();