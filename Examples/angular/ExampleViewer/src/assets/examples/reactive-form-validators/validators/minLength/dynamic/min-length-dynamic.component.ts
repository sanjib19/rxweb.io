import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-minLength-dynamic-validator',
    templateUrl: './min-length-dynamic.component.html'
})
export class MinLengthDynamicValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('https://rxwebioassets.blob.core.windows.net/$web/examples/reactive-form-validators/validators/minLength/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var contact = { countryName:'', mobileNo:'', landLineNo:'', countryCode:'', stateCode:'', stateName:'',  }
			this.contactFormGroup = this.formBuilder.group(contact,formBuilderConfiguration);
		})
    }
}
