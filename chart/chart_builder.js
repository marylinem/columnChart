(function () {
	let template = document.createElement("template");
	template.innerHTML = `

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
			this._shadowRoot.getElementById("selModel").onclick = (ev) => {
                if (this.dataBindings) {
                    const db = this.dataBindings.getDataBinding('flowChartData');
                    if (db) {
                        db.openSelectModelDialog();
                    }
                }
                this._submit(ev);
            };
            this._shadowRoot.getElementById("createModel").onclick = (ev) => {
                this._submit(ev);
            };
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
					}
				}
			}));
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