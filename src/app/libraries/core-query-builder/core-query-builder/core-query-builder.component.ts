import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef,isDevMode } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiLanguageService } from 'src/app/services/multi-language.service';


export enum EnumOparator {
  EQUAL = 'EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_OR_EQUAL_THAN = 'GREATER_OR_EQUAL_THAN',
  LESS_OR_EQUAL_THAN = 'LESS_OR_EQUAL_THAN',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  CONTAINS = 'CONTAINS',
  IN = 'IN',
  NOT_EQUAL = 'NOT_EQUAL',
  NOT_STARTS_WITH = 'NOT_STARTS_WITH',
  NOT_ENDS_WITH = 'NOT_ENDS_WITH',
  NOT_CONTAINS = 'NOT_CONTAINS',
  NOT_IN = 'NOT_IN'
}
@Component({
  selector: 'core-query-builder',
  templateUrl: './core-query-builder.component.html',
  styleUrls: ['./core-query-builder.component.scss']
})
export class CoreQueryBuilderComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() totalCols! : any[];
  @Input() mainForm!: FormGroup;
  @Input() filterStringInput!: string;
  @Input() expressionInput!: string;
  @Output() jsonEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() expressionEmitter: EventEmitter<string> = new EventEmitter<string>();
  // @Output() formEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  
  isDevMode!: boolean;
  count = 0;
  subscriptions: Subscription[] = [];
  filterString!: string;
  filterFormJsonString!: string;
  lang! : string;
  groups: FormGroup[] = [];
  relationalOperator: any[] = [
  {
    value : EnumOparator.EQUAL
  },
  // {
  //   value : EnumOparator.GREATER_THAN
  // },
  // {
  //   value : EnumOparator.LESS_THAN
  // },
  // {
  //   value : EnumOparator.GREATER_OR_EQUAL_THAN
  // },
  // {
  //   value : EnumOparator.LESS_OR_EQUAL_THAN
  // },
  {
    value : EnumOparator.STARTS_WITH
  },
  {
    value : EnumOparator.ENDS_WITH
  },
  {
    value : EnumOparator.CONTAINS
  },
  // {
  //   value : EnumOparator.IN
  // },
  {
    value : EnumOparator.NOT_EQUAL
  },
  {
    value : EnumOparator.NOT_STARTS_WITH
  },
  {
    value : EnumOparator.NOT_ENDS_WITH
  },
  {
    value : EnumOparator.NOT_CONTAINS
  },
  // {
  //   value : EnumOparator.NOT_IN
  // },
]
  columnType!: string;

  constructor(private fb: FormBuilder,
              private mls : MultiLanguageService
    ) { this.isDevMode = isDevMode() }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    
    this.subcribeForm()
    this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
    this.jsonEmitter.emit(this.filterFormJsonString)
  }

  ngOnChanges(changes : SimpleChanges){
    if (!!changes['mainForm'] && this.mainForm){
      this.mainForm.get('logicalOperator')?.setValue('AND', Validators.required)
      let data = this.mainForm.getRawValue()
      this.filterString = this.computed(data);
      this.expressionEmitter.emit(this.filterString)
      this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
      this.jsonEmitter.emit(this.filterFormJsonString)
    }
  }

   writeValue(form: FormGroup): void {
    this.mainForm = form;
  }

  onSubmit(): void {

  }

  subcribeForm(){
    this.subscriptions.push(
      this.mainForm.valueChanges.subscribe(value => {
        if (value) {
          this.filterString = this.computed(value);
          this.expressionEmitter.emit(this.filterString)
          this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
          this.jsonEmitter.emit(this.filterFormJsonString)
          // this.formEmitter.emit(this.mainForm)
        }
      })!
    )
  }

  ngAfterViewInit(){}

  field(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.totalCols.length > 0 ? this.totalCols[0].netType : null),
      type: new FormControl(this.totalCols.length > 0 ? this.totalCols[0].columnType : null),
      value: new FormControl(null),
      relationalOperator: new FormControl(EnumOparator.EQUAL),
      filters: new FormArray([])
    });
  }

  filter(): FormGroup {
    return this.fb.group({
      logicalOperator: new FormControl("AND"),
      filters: this.fb.array([])
    });
  }

  addField(form: FormGroup) {
    (form.get("filters") as FormArray).push(this.field());
  }

  removeField(form: FormGroup, fieldIndex: number) {
    (form.get("filters") as FormArray).removeAt(fieldIndex);
  }

  addGroup(form: FormGroup): void {
    const newFormGroup = this.filter();
    this.groups.push(newFormGroup);
    (form.get("filters") as FormArray).push(this.filter());
  }

  removeGroup(groupToRemove: any) {
    (groupToRemove.group.get("filters") as FormArray).removeAt(
      groupToRemove.index
    );
  }

  htmlEntities(str: string) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

   computed(filter: any) {
    if (!filter || Object.keys(filter).length === 0) {
      return "";
    }
    let str = "(";
    for (let i = 0; i < filter.filters?.length; i++) {
      if (i > 0) {
        str += ` ` + filter.logicalOperator + ` `;
      }
      if (filter.filters[i] && !!filter.filters[i]?.hasOwnProperty('filters')) {
        if(filter.filters[i]?.filters.length !== 0){
          str += this.computed(filter.filters[i]);
        }
      } else {
        str +=
          filter.filters[i].name +
          " " +
          this.htmlEntities(filter.filters[i].relationalOperator) +
          " " +
          filter.filters[i].value;
      }
    }

    return str + ")";
  }

  setValueType(event : any, childFilter : FormGroup){
    this.columnType = this.totalCols.filter(x => x.netType === event)[0].columnType;
    if(!!childFilter){
      childFilter.get('type')!.setValue(this.columnType)
      const value = this.mainForm.getRawValue()
      this.filterString = this.computed(value);
      this.expressionEmitter.emit(this.filterString)
      this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
      this.jsonEmitter.emit(this.filterFormJsonString)
    }
  }

  setValueChange(event : any, childFilter : FormGroup){
    // console.log(this.mainForm)
    if(!!event){
      const value = this.mainForm.getRawValue()
      this.filterString = this.computed(value);
      this.expressionEmitter.emit(this.filterString)
      this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
      this.jsonEmitter.emit(this.filterFormJsonString)
    }
  }
  setRelationalChange(event : any, childFilter : FormGroup){
    // console.log(this.mainForm)
    if(!!event){
      const value = this.mainForm.getRawValue()
      this.filterString = this.computed(value);
      this.expressionEmitter.emit(this.filterString)
      this.filterFormJsonString = JSON.stringify(this.mainForm.getRawValue(), null, 2)
      this.jsonEmitter.emit(this.filterFormJsonString)
    }
  }



}
