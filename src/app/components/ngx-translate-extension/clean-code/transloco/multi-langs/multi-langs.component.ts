import { OnInit, Component } from '@angular/core';
import * as Diff2Html from 'diff2html';
import * as Diff from 'diff'
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './multi-langs.component.html',
})
export class MultiLangsComponent implements OnInit {

  rightSidebarLinks: any = [{ "id": "on-push", "title": "on-push", "subLink": null }, { "id": "on-push", "title": "on-push", "subLink": null }];
  outputHtml: string;

  tabArray: any[] = [];
  activeTab: string;

  constructor(private http: HttpClient) {

    this.http.get("https://rxwebioassets.blob.core.windows.net/$web/json/data.json").subscribe(response => {
      this.tabArray = response['multi-langs'];
      console.log(this.tabArray)
      this.activeTab = this.tabArray[1].tabName;
      if (this.tabArray.length > 0) {
        this.tabArray.forEach(element => {
          this.init(element);
        });
      }
    })
    
  }

  ngOnInit() {

  }

  init(content) {
    var diff = Diff.createTwoFilesPatch("transloco", "transloco", content.outputHtml.transloco, content.outputHtml.rxweb);

    let outputHtml = Diff2Html.html(diff, {
      drawFileList: false, matching: 'lines', outputFormat: 'side-by-side'
    });

    content.diff = outputHtml;
    this.outputHtml = outputHtml;
    var nameTitle = this.outputHtml.substring(476, 525);
 
    this.outputHtml = this.outputHtml.replace(nameTitle, nameTitle += '<span class="d2h-file-name clean-comparison-right">@rxweb/ngx-translate-extension</span> <a class="pl-1"  target="_blank" href="' + content.githubLink.rxweb + '"><i class="fa fa-github" aria-hidden="true"></i></a>');
    var gitlink = this.outputHtml.substring(476, 525);
    this.outputHtml = this.outputHtml.replace(gitlink, gitlink += `<a class="pl-1" href="` + content.githubLink.transloco + `" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>`)
    content.diff = this.outputHtml
  }
}
