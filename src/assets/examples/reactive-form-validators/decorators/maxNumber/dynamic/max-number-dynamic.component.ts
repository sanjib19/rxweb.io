import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-dynamic',
    templateUrl: './max-number-dynamic.component.html'
})
export class MaxNumberDynamicComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let subjectDetails = new SubjectDetails();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('https://rxwebioassets.blob.core.windows.net/$web/examples/reactive-form-validators/decorators/maxNumber/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.subjectDetailsFormGroup = this.formBuilder.formGroup(subjectDetails,formBuilderConfiguration);
        })
    }
}
