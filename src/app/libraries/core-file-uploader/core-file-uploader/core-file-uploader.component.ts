import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  isDevMode,
  Injector,
} from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { AlertService } from '../../alert/alert.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { alertOptions } from 'src/app/constants/alertOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { Subscription } from 'rxjs';

declare let coreFileUtils: any;
const { compressImage, blobToBase64 } = coreFileUtils;

export enum EnumCoreFileUploaderType {
  IMAGE_AVATAR = 'IMAGE_AVATAR',
  IMAGE_OTHER = 'IMAGE_OTHER',
  PDF = 'PDF',
  DOC = 'DOC',
  EXCEL = 'EXCEL',
  AUDIO = 'AUDIO',
  OTHER = 'OTHER',
}

@Component({
  selector: 'core-file-uploader',
  templateUrl: './core-file-uploader.component.html',
  styleUrls: ['./core-file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreFileUploaderComponent,
    },
  ],
})
export class CoreFileUploaderComponent extends CoreFormControlBaseComponent implements OnInit, OnDestroy {
  @Input() uploadFileType!: EnumCoreFileUploaderType;
  @Input() fileDataControlName!: string;
  @Input() fileNameControlName!: string;
  @Input() fileTypeControlName!: string;
  @Input() avatarSize!: number;
  @Input() defaultAvatar!: string;
  @Input() hidePreview!: boolean;
  @Input() verticalMode!: boolean;
  @ViewChild('customFileInput') customFileInput!: ElementRef;

  override value!: string;

  ngControl!: NgControl;

  hoverText =
    EnumTranslateKey.UI_CORE_CONTROL_FILE_UPLOADER_CLICK_TO_BROWSE_FILE;
  lang!: string;
  subscriptions: Subscription[] = [];
  chosenFile: any;
  compressedSize: any;
  preview: any;
  loading: boolean = false;
  loadingCaption!: string;

  accept!: string;

  constructor(
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => this.ngControl = this.injector.get(NgControl));

    if (isDevMode() && !!!this.uploadFileType) {
      this.alertService.error(
        `Using CoreFileUploaderComponent required property uploadFileType!: EnumCoreFileUploaderType`,
        { ...alertOptions, autoClose: false }
      );
    }
    if (isDevMode() && !!!this.fileDataControlName) {
      this.alertService.error(
        `Using CoreFileUploaderComponent required property fileDataControlName!: string (base64)`,
        { ...alertOptions, autoClose: false }
      );
    }
    if (isDevMode() && !!!this.fileNameControlName) {
      this.alertService.error(
        `Using CoreFileUploaderComponent required property fileNameControlName!: string`,
        { ...alertOptions, autoClose: false }
      );
    }
    if (isDevMode() && !!!this.fileTypeControlName) {
      this.alertService.error(
        `Using CoreFileUploaderComponent required property fileTypeControlName!: string`,
        { ...alertOptions, autoClose: false }
      );
    }

    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));

    if (
      this.uploadFileType === EnumCoreFileUploaderType.IMAGE_AVATAR ||
      this.uploadFileType === EnumCoreFileUploaderType.IMAGE_OTHER
    ) {
      this.accept = 'image/png, image/gif, image/jpeg';
    } else if (
      this.uploadFileType === EnumCoreFileUploaderType.PDF
    ) {
      this.accept = "application/pdf";
    } else {
      this.alertService.warn(
        `When uploadFileType===${this.uploadFileType} => TO DO...`,
        { ...alertOptions, autoClose: false }
      );
    }
  }

  onHover() {
    console.log('onHover');
    this.customFileInput.nativeElement.style.setProperty(
      '--hover-text',
      this.hoverText
    );
  }

  handleInputChange(e: any) {
    console.log('handleInputChange e', e);
    if (!this.hasFileSize(e.target.files[0].size)) {
      this.alertService.error(
        `File size exceeds 3MB.`,
        { ...alertOptions, autoClose: false }
      );
      return;
    }
    if (!!e.target.files.length) {
      const file = e.target.files[0];
      console.log('handleInputChange file', file);
      this.chosenFile = file;

      if (
        file.type.split('/')[0] === 'image' ||
        file.type.split('/')[0] === 'application'
      ) {
        const blob = new Blob([file]);
        if (file.type !== 'image/gif') {
          compressImage(blob).then((blob: any) => {
            this.compressedSize = blob.size;
            blobToBase64(blob).then((base64: any) => {
              this.preview = base64;

              const index = (base64 as string).indexOf('base64,');
              if (index >= 0) {
                base64 = (base64 as string).substring(index + 7);
              }

              this.onChange(base64);

              const form = this.ngControl.control?.parent;
              const objectToPatch: any = {};
              objectToPatch[this.fileDataControlName] = base64;
              objectToPatch[this.fileNameControlName] = file.name;
              objectToPatch[this.fileTypeControlName] = file.type;
              form?.patchValue(objectToPatch);

              this.markAsTouched();
            });
          });
        } else {
          blobToBase64(blob).then((base64: any) => {
            this.compressedSize = blob.size;
            this.preview = base64;

            const index = (base64 as string).indexOf('base64,');
            if (index >= 0) {
              base64 = (base64 as string).substring(index + 7);
            }

            this.onChange(base64);

            const form = this.ngControl.control?.parent;
            const objectToPatch: any = {};
            objectToPatch[this.fileDataControlName] = base64;
            objectToPatch[this.fileNameControlName] = file.name;
            objectToPatch[this.fileTypeControlName] = file.type;
            form?.patchValue(objectToPatch);

            this.markAsTouched();
          });
        }
      } else if (file.type.split('/')[0] === 'audio') {
        console.log('To do');
      } else {

      }
    } else {
      this.preview = '';
      this.onChange('');
      this.markAsTouched();
      this.chosenFile = '';
    }
  }

  hasFileSize(fileSize : any) {
    if (fileSize < 3 * 1024 * 1024) { return true; }
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }
}
