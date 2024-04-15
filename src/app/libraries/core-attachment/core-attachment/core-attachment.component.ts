import { Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild, isDevMode } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { attachmentOptions } from 'src/app/constants/attachmentOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;

import { blob_to_base64_script } from 'src/assets/js/blob2base64_wk';
import { AlertService } from '../../alert/alert.service';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { AppConfigService } from 'src/app/services/app-config.service';


export interface ICoreAttachment {
  assignTo: string;
  serverFileName?: string;
  clientFileName: string;
  clientFileType: string;
  clientFileData: string;
}

@Component({
  selector: 'core-attachment',
  templateUrl: './core-attachment.component.html',
  styleUrls: ['./core-attachment.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreAttachmentComponent
    }
  ]
})
export class CoreAttachmentComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit {

  @Input() override readonly!: boolean;
  @Input() assignTo!: string; // Required
  @Input() valueToShow!: string;

  override value!: ICoreAttachment | null;
  override onChange!: (_: ICoreAttachment | null) => void;

  override writeValue(obj: ICoreAttachment | null): void {
    this.valueToShow = obj?.serverFileName!
  }

  ngControl!: NgControl;

  worker!: Worker;

  @ViewChild('rawInput') rawInput!: ElementRef;

  constructor(
    private injector: Injector,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private appConfigService: AppConfigService,
  ) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueToShow']){
      this.valueToShow = changes['valueToShow']?.currentValue;
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.ngControl = this.injector.get(NgControl), 200);
    
    if (!!!this.assignTo && !!!this.readonly && isDevMode()) {
      this.alertService.error(`
      CoreAttachmentComponent required input 'assignTo'
      `, noneAutoClosedAlertOptions)
    }
  }

  onClickUpload(): void {
    if (this.disabled || this.readonly) return;
    this.rawInput.nativeElement.dispatchEvent(new MouseEvent('click'));
  }

  onClickDownload(): void {
    var uri = this.appConfigService.BASE_URL + '/' + this.appConfigService.STATIC_FOLDER + '/attachments/' + this.valueToShow
    fetch(uri)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = this.valueToShow.substring(52);
        link.click();
      })
      .catch(console.error);
  }

  handleInputChange(e: any) {

    if (!!e.target.files.length) {
      const file = e.target.files[0];

      if (file.size > attachmentOptions.maxFileSize) {
        this.alertService.error(`${this.mls.trans(EnumTranslateKey.UI_CORE_ATTACHMENT_MAXIMUM_ATTACHMENT_FILE_SIZE_ERROR)} (${attachmentOptions.maxFileSize} bytes)`, alertOptions);
        return;
      }

      console.log("file", file)
      const clientFileName = file.name
      const clientFileType = file.type
      let clientFileData = ""

      const blob = new Blob([file]);
      if (typeof Worker !== 'undefined') {
        this.worker = new Worker(blob_to_base64_script)
        this.worker.addEventListener("message", e => {

          console.log("worker message", e)
          clientFileData = e.data
          const index = (clientFileData as string).indexOf('base64,');
          if (index >= 0) {
            clientFileData = (clientFileData as string).substring(index + 7);
          }
          this.onChange({
            assignTo: this.assignTo,
            serverFileName: this.value?.serverFileName,
            clientFileName,
            clientFileType,
            clientFileData,
          });
          this.valueToShow = clientFileName;
          this.markAsTouched();
        })
        this.worker.postMessage(blob);
      } else {
        blobToBase64(blob).then((clientFileData: any) => {
          const index = (clientFileData as string).indexOf('base64,');
          if (index >= 0) {
            clientFileData = (clientFileData as string).substring(index + 7);
          }
          this.onChange({
            assignTo: this.assignTo,
            serverFileName: this.value?.serverFileName,
            clientFileName,
            clientFileType,
            clientFileData,
          });
          this.valueToShow = clientFileName;
          this.markAsTouched();
        });
      }
    }
  }
}
