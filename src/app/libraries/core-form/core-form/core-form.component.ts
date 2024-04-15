import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, isDevMode, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ICoreFormSection } from './enum-interfaces';
import { CoreControlService } from '../core-control.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumCorePageEditMode } from '../../core-page-edit/core-page-edit.component';
import { CoreFormService } from '../core-form.service';
import { ICoreButtonVNS } from '../../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from '../../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

export interface IDynamicFormEmitOnFormCreated {
  formName: string;
  formGroup: FormGroup;
}

@Component({
  selector: 'core-form',
  templateUrl: './core-form.component.html',
  styleUrls: ['./core-form.component.scss'],
})
export class CoreFormComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @Input() formName!: string;
  @Input() submitText!: EnumTranslateKey;
  @Input() leftInputSections!: ICoreFormSection[];
  @Input() leftInputSectionsFlexSize!: number;
  @Input() inputSections!: ICoreFormSection[];
  @Input() mode$!: BehaviorSubject<EnumCorePageEditMode>;
  @Input() bottomTemplateRef!: TemplateRef<any>;
  @Input() customFormButtonItems!: EnumCoreButtonVNSCode[]; // Optional
  @Input() showCaptionButton!: boolean;
  @Input() checkError$ = new BehaviorSubject<boolean>(false);

  @Output() onFormCreated = new EventEmitter<IDynamicFormEmitOnFormCreated>();
  @Output() onFormRefCreated = new EventEmitter<ElementRef<any>>();
  @Output() onSubmit = new EventEmitter();
  @Output() onCancal = new EventEmitter();
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();

  @ViewChild('formRef') formRef!: ElementRef;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];

  form!: FormGroup;
  sections!: ICoreFormSection[];
  lang!: string;
  subscriptions: Subscription[] = [];

  payLoad = '';
  validatorOverview: any;
  isDevMode!: boolean;
  isUpdateMode!: boolean;

  constructor(
    private coreControlService: CoreControlService,
    private multiLanguageService: MultiLanguageService,
    private alertService: AlertService,
    private coreFormService: CoreFormService
  ) {
    this.isDevMode = isDevMode();
  }

  private updateSections(newSections: ICoreFormSection[]): void {

    this.sections.map((section, sectionIndex) => {
      const newSection = newSections[sectionIndex];
      section.rows.map((row, rowIndex) => {
        const newRow = newSection.rows[rowIndex];
        row.map((control, controlIndex) => {
          const newControl = newRow[controlIndex];

          /* THE ONLY PROP TO BE UDATED IS 'hidden', THE OTHERS SHOULD BE MANIPULATED THROUGH this.form.get(YOUR_CONTROL_NAME)... */
          control.hidden = newControl?.hidden;
          /************************************************************************************************************************/
        });
      });

      /* #region Oct the 11th 2023 */
      /* Some sections was posibly have renderOff=true from previous state and their controls must be created/remove */
      /*
      BUT THIS TASK IS HARD SO FAR
      */
      /* #endregion Oct the 11th 2023 */

    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputSections']) {
      let newSections: ICoreFormSection[] =
        changes['inputSections'].currentValue;

      if (!!!this.form) {
        this.sections = newSections;

        let leftGroup;
        let form: FormGroup<any>;

        const mainGroup = this.coreControlService.toGroup(this.sections);

        if (!!this.leftInputSections) {
          leftGroup = this.coreControlService.toGroup(this.leftInputSections);
          form = new FormGroup({ ...leftGroup, ...mainGroup });
        } else {
          form = new FormGroup(mainGroup);
        }

        this.form = form;

      } else {
        this.updateSections(newSections);
      }

      this.onFormCreated.emit({
        formName: this.formName,
        formGroup: this.form,
      });
    }
  }

  ngOnInit() {

    if (!!this.customFormButtonItems) {
      this.buttonItems = this.customFormButtonItems;
    }

    this.subscriptions.push(
      this.mode$.subscribe(
        (x) => (this.isUpdateMode = x === EnumCorePageEditMode.UPDATE)
      )
    );

    console.log(this.mode$);

    /* START: Check if id field is available */
    if (!!!this.form.get('id') && isDevMode()) {
      this.alertService.error(
        `
            Control "id" is mandatory. Please define one in your bussiness component. You can assign its "hidden" property to true if needed.
          `,
        noneAutoClosedAlertOptions
      );
    }
    /* END: Check if id field is available */

    if (isDevMode()) {
      /* START: Check if each field is unique */

      const fields = this.coreFormService.getAllFormBaseControlNames(
        this.sections
      );

      fields.reduce((p, c) => {
        if (c === '') {
          this.alertService.error(
            `Form control name must be definded, '${c}' is invalid form control name!!!`,
            noneAutoClosedAlertOptions
          );
        } else {
          if (p === c) {
            this.alertService.error(
              `Duplicate form control name: '${c}'. Consider to predefine one ONLY!!!.`,
              noneAutoClosedAlertOptions
            );
          }
        }
        return c;
      });
      /* END: Check if each field is unique */
    }

    this.subscriptions.push(
      this.multiLanguageService.lang$.subscribe((x) => (this.lang = x))
    );
  }

  ngAfterViewInit(): void {
    this.onFormRefCreated.emit(this.formRef);
  }

  onFormSubmit() {
    this.checkError$.next(true);

    if (!!this.form.valid) {
      this.payLoad = JSON.stringify(this.form?.getRawValue(), null, 2);
      this.onSubmit.emit(this.form?.getRawValue());
    } else {
      //this.alertService.error(JSON.stringify(this.form.errors, null, 2), noneAutoClosedAlertOptions)
    }

    //setTimeout(() => this.checkError$.next(false), 3000);
  }

  onCancelLocal() {
    this.onCancal.emit(null);
  }

  updatePayload(): void {
    this.payLoad = JSON.stringify(this.form?.getRawValue(), null, 2);
  }

  updateValidorOverview(): void {
    const result: { key: string; errors: any[] }[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const control: AbstractControl = this.form.get(key)!;
      const errors: any[] = [];
      if (!!control.invalid) {
        Object.keys(control.errors!).forEach((key) => {
          errors.push(key);
        });
      }
      result.push({
        key,
        errors,
      });
    });
    this.validatorOverview = JSON.stringify(result, null, 2);
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_DELETE) {
      this.onFormSubmit();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_LIQUIDATE_CONTRACT) {
      this.onFormSubmit();
    }
    this.buttonClick.emit(e);
  }
}
