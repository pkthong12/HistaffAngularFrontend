import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { ICoreFormSection } from '../../core-form/core-form/enum-interfaces';
import { ECoreTableToolClass, ECoreTableToolCode, ICoreTableColumnItem, ICoreTableToolClickEventEmitterData, ICoreTableToolItem } from '../../core-table/core-table.component';

import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { CoreControlService } from '../../core-form/core-control.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

@Component({
  selector: 'core-grid-buffer',
  templateUrl: './core-grid-buffer.component.html',
  styleUrls: ['./core-grid-buffer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreGridBufferComponent
    }
  ]
})
export class CoreGridBufferComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit, OnDestroy {

  override writeValue(obj: any[]): void {
    this.gridData = obj;
  }

  showTools: boolean = true;
  /**
   *   code: ECoreTableToolCode;
  class: ECoreTableToolClass;
  caption?: EnumTranslateKey | string; // Later we will remove "| string"
   */
  tools: ICoreTableToolItem[] = [{
    code: ECoreTableToolCode.delete,
    class: ECoreTableToolClass.delete,
    caption: EnumTranslateKey.UI_CORE_CONTROL_TABLE_TOOL_DELETE
  }];

  lang!: string;
  subscriptions: Subscription[] = []

  @Input() formSections!: ICoreFormSection[];
  @Input() gridColumns!: ICoreTableColumnItem[];

  @Output() onBufferFormCreated = new EventEmitter<FormGroup>()

  form!: FormGroup;

  gridData: any[] = []

  constructor(private mls: MultiLanguageService, private coreControlService: CoreControlService) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formSections']) {
      const newSections: ICoreFormSection[] = changes['formSections'].currentValue;
      if (!!!this.form) {
        this.formSections = newSections;
        this.form = this.coreControlService.toFormGroup(this.formSections);
        this.onBufferFormCreated.emit(this.form);
      }
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  onToolClick(e: ICoreTableToolClickEventEmitterData) {
    if (e.code === ECoreTableToolCode.delete) {
      const newData = this.gridData.filter(x => x.id !== e.id);
      newData.map((x, index) => x.id = index + 1);
      this.gridData = newData;
      this.onChange(this.gridData);
      this.markAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      this.gridData.push({
        ...this.form.getRawValue(),
        id: this.gridData.length
      });
      this.onChange(this.gridData);
      this.markAsTouched();
      this.form.reset();
    }
  }

}
